# Generated by Django 4.2.16 on 2024-10-23 05:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("api_education", "0005_alter_userprogress_progress_percentage_and_more"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="userprogress",
            unique_together={("user", "lesson")},
        ),
        migrations.AddField(
            model_name="userprogress",
            name="completed_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="userprogress",
            name="is_completed",
            field=models.BooleanField(default=False),
        ),
        migrations.RemoveField(
            model_name="userprogress",
            name="module",
        ),
        migrations.RemoveField(
            model_name="userprogress",
            name="progress_percentage",
        ),
    ]