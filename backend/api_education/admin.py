from django.contrib import admin
from . import models

admin.site.register(models.Module)
admin.site.register(models.Lesson)
admin.site.register(models.MatchingExercises)
admin.site.register(models.FreeTextExercises)
admin.site.register(models.SignsExercises)
admin.site.register(models.StoryExercises)