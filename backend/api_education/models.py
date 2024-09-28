from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Module(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=255)
    content = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} - {self.module.title}"