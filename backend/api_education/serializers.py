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
        model = models.FindPairExercises
        fields = ["id", "lesson", "title", "description", "image1", "image2", "text1", "text2"]

class FreeTextLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FreeTextExercises
        fields = ["id", "lesson", "title", "description", "prompt"]

class SignLanguageLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SignLanguageExercises
        fields = ["id", "lesson", "title", "description", "video"]

class EducationalStoryLesson(serializers.ModelSerializer):
    class Meta:
        model = models.EducationalStoryExercises
        fields = ["id", "lesson", "title", "description", "content"]