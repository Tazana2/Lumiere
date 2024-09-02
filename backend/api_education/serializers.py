from rest_framework import serializers
from . import models

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Module
        fields = ["id", "title", "description"]

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = ["id", "module", "title", "description"]

class FindPairLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FindPairLesson
        fields = ["id", "lesson", "title", "description", "image1", "image2", "text1", "text2"]

class FreeTextLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FreeTextLesson
        fields = ["id", "lesson", "title", "description", "prompt"]

class SignLanguageLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SignLanguageLesson
        fields = ["id", "lesson", "title", "description", "video"]

class EducationalStoryLesson(serializers.ModelSerializer):
    class Meta:
        model = models.EducationalStoryLesson
        fields = ["id", "lesson", "title", "description", "content"]