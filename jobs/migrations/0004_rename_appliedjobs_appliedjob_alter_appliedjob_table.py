# Generated by Django 5.0.6 on 2024-07-04 16:31

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_appliedjobs'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='AppliedJobs',
            new_name='AppliedJob',
        ),
        migrations.AlterModelTable(
            name='appliedjob',
            table='applied_job',
        ),
    ]