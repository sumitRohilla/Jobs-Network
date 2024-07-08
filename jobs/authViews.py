from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.utils import timezone
from datetime import timedelta
from .models import UserOTP
import json, random, string
from django.conf import settings
from django.core.mail import send_mail


class CheckAuthView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return JsonResponse({"isAuthenticated": True, "user_id": request.user.id})
        else:
            return JsonResponse({"isAuthenticated": False})


class LoginView(View):
    def post(self, request):
        if request.user.is_authenticated:
            return JsonResponse({"message": "User already Logged in!"}, status=400)

        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if " " in username:
                return JsonResponse(
                    {"message": "Username should not contain spaces!"}, status=400
                )

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Logged in successfully"}, status=200)

            try:
                user_obj = User.objects.get(email=username)
                user = authenticate(
                    request, username=user_obj.username, password=password
                )
                if user is not None:
                    login(request, user)
                    return JsonResponse(
                        {"message": "Logged in successfully"}, status=200
                    )
            except User.DoesNotExist:
                return JsonResponse({"message": "Invalid Credentials!"}, status=400)

            return JsonResponse({"message": "Invalid Credentials!"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Error in user login: {str(e)}"}, status=500)


class LogoutView(View):
    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "User already Logged out!"}, status=400)
        logout(request)
        return JsonResponse({"message": "Logged out successfully"}, status=200)


class SendOTP(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            email = data.get("email")

            if " " in username:
                return JsonResponse(
                    {"message": "Username should not contain spaces!"}, status=400
                )

            if User.objects.filter(username=username).exists():
                return JsonResponse({"message": "Username already exists"}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"message": "Email already exists"}, status=400)

            otp_instance = UserOTP.objects.filter(email=email).first()

            if otp_instance:
                if timezone.now() - otp_instance.created_at <= timedelta(minutes=10):
                    return JsonResponse(
                        {"message": "OTP already sent", "otpSent": True}, status=400
                    )
                otp_instance.delete()

            otp = "".join(random.choices(string.digits, k=6))

            UserOTP.objects.create(
                username=username, password=password, email=email, otp=otp
            )

            send_mail(
                "Job Network OTP Code",
                f"Your OTP code for Job Network is {otp}",
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )

            return JsonResponse(
                {"message": "OTP sent successfully", "otpSent": True}, status=200
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Error while sending OTP {str(e)}"}, status=500
            )


class RegisterView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get("email")
            otp = data.get("otp")

            user_otp = UserOTP.objects.filter(email=email, otp=otp).first()
            if user_otp:
                if timezone.now() - user_otp.created_at > timedelta(minutes=10):
                    return JsonResponse({"message": "OTP expired"}, status=400)

                User.objects.create_user(
                    username=user_otp.username,
                    password=user_otp.password,
                    email=user_otp.email,
                )

                user_otp.delete()

                return JsonResponse(
                    {"message": "User registered successfully"}, status=201
                )
            else:
                return JsonResponse({"message": "Invalid OTP"}, status=400)
        except Exception as e:
            return JsonResponse({"message": "Error while verifying OTP"}, status=500)
