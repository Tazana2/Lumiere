from rest_framework import serializers
from . import models

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Module
        fields = ["id", "title", "description"]

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = ["id", "module", "title", "content"]

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProgress
        fields = ['user', 'module', 'lesson', 'progress_percentage']
        read_only_fields = ['user', 'module', 'lesson']