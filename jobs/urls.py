from django.urls import path
from .jobViews import (
    JobView,
    JobDetailView,
    JobUserView,
    CsrfTokenView,
    AppliedJobView,
    ApplierView,
)

from .authViews import LoginView, LogoutView, RegisterView, SendOTP, CheckAuthView


urlpatterns = [
    path("csrf-token/", CsrfTokenView.as_view(), name="csrf-token"),
    path("check-auth/", CheckAuthView.as_view(), name="check-auth"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("register/", RegisterView.as_view(), name="register"),
    path("send-otp/", SendOTP.as_view(), name="send-otp"),
    path("jobs/", JobView.as_view(), name="jobs"),
    path("jobs/<slug:job_slug>/", JobDetailView.as_view(), name="job-detail"),
    path("user-jobs/", JobUserView.as_view(), name="user-jobs"),
    path("applied-job/", AppliedJobView.as_view(), name="applied-job"),
    path("applier/", ApplierView.as_view(), name="appliers"),
]
