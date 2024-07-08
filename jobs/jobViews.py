from django.db.models import Subquery
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Job, AppliedJob
from .forms import JobForm
import json


# Create your views here.


@method_decorator(ensure_csrf_cookie, name="dispatch")
class CsrfTokenView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({"message": "Token generated successfully"})


class JobView(View):
    def get(self, request):
        try:
            jobs = Job.objects.all()
            limit = request.GET.get("_limit")

            if limit:
                try:
                    limit = int(limit)
                    jobs = jobs[:limit]
                except ValueError:
                    return JsonResponse(
                        {"message": "Invalid _limit parameter"}, status=400
                    )

            if jobs.exists():
                jobs_data = [job_to_dict(job) for job in jobs]
                return JsonResponse(jobs_data, safe=False)
            return JsonResponse({"message": "No Jobs available"}, status=404)
        except Exception as e:
            return JsonResponse(
                {"message": f"Error in fetching jobs: {str(e)}"}, status=500
            )

    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "User needs to be Logged in"}, status=400)

        try:
            data = json.loads(request.body)
            job_data = {
                "title": data.get("title"),
                "type": data.get("type"),
                "job_desc": data.get("description"),
                "location": data.get("location"),
                "salary": data.get("salary"),
                "res": data.get("fullDesc").get("res"),
                "require": data.get("fullDesc").get("require"),
                "skills": data.get("fullDesc").get("skills"),
                "name": data.get("company").get("name"),
                "company_desc": data.get("company").get("description"),
                "contact_email": data.get("company").get("contactEmail"),
                "contact_phone": data.get("company").get("contactPhone"),
            }
            job_form = JobForm(job_data)

            if job_form.is_valid():
                job = job_form.save(commit=False)
                job.author = request.user
                job.save()
                return JsonResponse({"message": "Job created successfully"}, status=201)
            return JsonResponse(job_form.errors, status=400)
        except Exception as e:
            return JsonResponse(
                {"message": f"Error while creating Job: {str(e)}"}, status=500
            )


class JobDetailView(View):
    def get(self, request, job_slug):
        try:
            job = Job.objects.get(slug=job_slug)
            job_data = job_to_dict(job)
            return JsonResponse(job_data, safe=False)
        except Job.DoesNotExist:
            return JsonResponse({"message": "Job not found"}, status=404)

    def put(self, request, job_slug):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "User needs to be Logged in"}, status=400)

        try:
            job = Job.objects.get(slug=job_slug)
            if job.author != request.user:
                return JsonResponse({"message": "Unauthorized"}, status=403)
            data = json.loads(request.body)
            job_data = {
                "title": data.get("title"),
                "slug": data.get("slug"),
                "type": data.get("type"),
                "job_desc": data.get("description"),
                "location": data.get("location"),
                "salary": data.get("salary"),
                "res": data.get("fullDesc").get("res"),
                "require": data.get("fullDesc").get("require"),
                "skills": data.get("fullDesc").get("skills"),
                "name": data.get("company").get("name"),
                "company_desc": data.get("company").get("description"),
                "contact_email": data.get("company").get("contactEmail"),
                "contact_phone": data.get("company").get("contactPhone"),
            }

            if job_data.get("title") != job.title:
                job.slug = None
                job.title = job_data.get("title")
                job.save()
            job_form = JobForm(job_data, instance=job)

            if job_form.is_valid():
                job_form.save()
                return JsonResponse({"message": "Job updated successfully"})
            return JsonResponse(job_form.errors, status=400)
        except Job.DoesNotExist:
            return JsonResponse({"message": "Job not found"}, status=404)

    def delete(self, request, job_slug):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "User needs to be Logged in"}, status=400)

        try:
            job = Job.objects.get(slug=job_slug)
            if job.author != request.user:
                return JsonResponse({"message": "Unauthorized"}, status=403)

            job.delete()
            return JsonResponse({"message": "Post deleted successfully"})
        except Job.DoesNotExist:
            return JsonResponse({"message": "Job not found"}, status=404)


class JobUserView(View):
    def get(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "User needs to be Logged in"}, status=400)

        try:
            user_jobs = Job.objects.filter(author=request.user)
            jobs = Job.objects.exclude(author=request.user)

            if jobs.exists() or user_jobs.exists():
                job_data = {
                    "user_jobs": [job_to_dict(job) for job in user_jobs],
                    "jobs": [job_to_dict(job) for job in jobs],
                }
                return JsonResponse(job_data, safe=False)
        except Job.DoesNotExist:
            return JsonResponse({"message": "Job not found"}, status=404)
        except:
            return JsonResponse({"message": "Error while fetching Jobs"}, status=500)


class AppliedJobView(View):
    def get(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "User needs to be Logged in"}, status=400)

        try:
            applied_jobs = AppliedJob.objects.filter(user=request.user).values("job")
            jobs = Job.objects.filter(id__in=Subquery(applied_jobs))

            if jobs.exists():
                job_data = [job_to_dict(job) for job in jobs]
                return JsonResponse(job_data, safe=False)
            return JsonResponse({"message": "Job not found"}, status=404)

        except:
            return JsonResponse({"message": "Error while fetching Jobs"}, status=500)

    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "User needs to be Logged in"}, status=400)

        try:
            data = json.loads(request.body)
            slug = data.get("slug")

            try:
                job = Job.objects.get(slug=slug)
            except Job.DoesNotExist:
                return JsonResponse({"message": "Job not found"}, status=500)

            if AppliedJob.objects.filter(user=request.user, job=job).exists():
                return JsonResponse(
                    {"message": "You have already applied for this Job"}, status=400
                )

            applied_job = AppliedJob(user=request.user, job=job)
            applied_job.save()
            return JsonResponse({"message": "Job Applied successfully!"})

        except Exception as e:
            return JsonResponse({"message": "Error while Applying Jobs"}, status=500)

    def delete(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "User needs to be Logged in"}, status=400)

        try:
            data = json.loads(request.body)
            slug = data.get("slug")

            try:
                job = Job.objects.get(slug=slug)
            except Job.DoesNotExist:
                return JsonResponse({"message": "Job not found"}, status=500)

            if not AppliedJob.objects.filter(user=request.user, job=job).exists():
                return JsonResponse({"message": "Job was never Applied before!"}, status=400)

            applied_job = AppliedJob.objects.get(job=job, user=request.user)
            applied_job.delete()
            return JsonResponse({"message": "Job Withdrawn successfully!"})

        except Exception as e:
            return JsonResponse({"message": f"Error while fetching Jobs"}, status=500)


class ApplierView(View):
    def get(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "User needs to be Logged in"}, status=400)

        try:
            user_jobs = Job.objects.filter(author=request.user)

            if not user_jobs.exists():
                return JsonResponse({"message": "No job created by You"}, status=400)

            jobs_data = {}
            for job in user_jobs:
                applied_users = AppliedJob.objects.filter(job=job)

                users = [
                    {"username": applied.user.username, "email": applied.user.email}
                    for applied in applied_users
                ]
                jobs_data[job.slug] = {"users": users, "title": job.title}

            return JsonResponse(jobs_data, safe=False)
        except Exception as e:
            return JsonResponse({"message": "Error while fetching Jobs"}, status=500)


# job to dict helper function
def job_to_dict(job):
    return {
        "title": job.title,
        "slug": job.slug,
        "type": job.type,
        "description": job.job_desc,
        "location": job.location,
        "salary": job.salary,
        "fullDesc": {
            "res": job.res,
            "require": job.require,
            "skills": job.skills,
        },
        "company": {
            "name": job.name,
            "description": job.company_desc,
            "contactEmail": job.contact_email,
            "contactPhone": job.contact_phone,
        },
        "author": job.author_id,
    }
