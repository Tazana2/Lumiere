from django.contrib import admin
from . import models

admin.site.register(models.Module)
admin.site.register(models.Lesson)
admin.site.register(models.FindPairExercises)
admin.site.register(models.FreeTextExercises)
admin.site.register(models.SignLanguageExercises)
admin.site.register(models.EducationalStoryExercises)