# Generated by Django 4.2.14 on 2024-09-09 04:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Lesson",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("order", models.PositiveIntegerField()),
            ],
            options={
                "ordering": ["order"],
            },
        ),
        migrations.CreateModel(
            name="Module",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="StoryExercises",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("question", models.TextField()),
                ("order", models.PositiveIntegerField()),
                ("description", models.TextField()),
                ("content", models.JSONField()),
                (
                    "lesson",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="story_exercises",
                        to="api_education.lesson",
                    ),
                ),
            ],
            options={
                "ordering": ["order"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="SignsExercises",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("question", models.TextField()),
                ("order", models.PositiveIntegerField()),
                ("description", models.TextField()),
                (
                    "reference",
                    models.FileField(blank=True, null=True, upload_to="signs/"),
                ),
                (
                    "lesson",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="signs_exercises",
                        to="api_education.lesson",
                    ),
                ),
            ],
            options={
                "ordering": ["order"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="MatchingExercises",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("question", models.TextField()),
                ("order", models.PositiveIntegerField()),
                ("pairs", models.JSONField()),
                (
                    "lesson",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="matching_exercises",
                        to="api_education.lesson",
                    ),
                ),
            ],
            options={
                "ordering": ["order"],
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="lesson",
            name="module",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="lessons",
                to="api_education.module",
            ),
        ),
        migrations.CreateModel(
            name="FreeTextExercises",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("question", models.TextField()),
                ("order", models.PositiveIntegerField()),
                ("correct_answer", models.CharField(max_length=255)),
                (
                    "lesson",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="free_text_exercises",
                        to="api_education.lesson",
                    ),
                ),
            ],
            options={
                "ordering": ["order"],
                "abstract": False,
            },
        ),
    ]
