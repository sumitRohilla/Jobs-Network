from django.forms import ModelForm
from .models import Job


class JobForm(ModelForm):
    class Meta:
        model = Job
        fields = [
            "title",
            "type",
            "job_desc",
            "location",
            "salary",
            "res",
            "require",
            "skills",
            "name",
            "company_desc",
            "contact_email",
            "contact_phone",
        ]
