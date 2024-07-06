from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

# Create your models here.


class Job(models.Model):
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=250, unique=True)
    type = models.CharField(max_length=50)
    job_desc = models.TextField()
    location = models.CharField(max_length=100)
    salary = models.CharField(max_length=50)

    # fulldesc fields
    res = models.TextField(blank=True)
    require = models.TextField(blank=True)
    skills = models.TextField()

    # company fields
    name = models.CharField(max_length=100)
    company_desc = models.TextField(blank=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            print("in slug method")
            self.slug = slugify(self.title)

            original_slug = self.slug
            count = 1

            while Job.objects.filter(slug=self.slug).exists():
                self.slug = f"{original_slug}-{count}"
                count += 1
        super().save(*args, **kwargs)

    class Meta:
        db_table = "jobs"
        ordering = ["-updated_at"]


class AppliedJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "applied_job"
        ordering = ["-created_at"]


class UserOTP(models.Model):
    username = models.CharField(max_length=150)
    password = models.CharField(max_length=128)
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

    class Meta:
        ordering = ["-created_at"]
