from django.contrib import admin
from . import models

admin.site.register(models.Module)
admin.site.register(models.Lesson)
admin.site.register(models.FindPairLesson)
admin.site.register(models.FreeTextLesson)
admin.site.register(models.SignLanguageLesson)
admin.site.register(models.EducationalStoryLesson)