# Generated by Django 5.0.6 on 2024-07-04 16:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0004_rename_appliedjobs_appliedjob_alter_appliedjob_table'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appliedjob',
            old_name='jobs',
            new_name='job',
        ),
    ]