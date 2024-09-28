# Generated by Django 4.2.14 on 2024-09-24 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_education", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="matchingexercises",
            name="lesson",
        ),
        migrations.RemoveField(
            model_name="signsexercises",
            name="lesson",
        ),
        migrations.RemoveField(
            model_name="storyexercises",
            name="lesson",
        ),
        migrations.RemoveField(
            model_name="lesson",
            name="description",
        ),
        migrations.AddField(
            model_name="lesson",
            name="content",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name="FreeTextExercises",
        ),
        migrations.DeleteModel(
            name="MatchingExercises",
        ),
        migrations.DeleteModel(
            name="SignsExercises",
        ),
        migrations.DeleteModel(
            name="StoryExercises",
        ),
    ]