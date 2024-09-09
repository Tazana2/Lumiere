from rest_framework import serializers
from . import models

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Module
        fields = ["id", "title", "description"]

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = ["id", "module", "title", "description", "order"]

class MatchingExercisesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MatchingExercises
        fields = ["id", "lesson", "question", "pairs"]

class FreeTextExercisesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FreeTextExercises
        fields = ["id", "lesson", "question", "correct_answer"]

class SignsExercisesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SignsExercises
        fields = ["id", "lesson", "question", "description", "reference"]

class StoryExercisesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StoryExercises
        fields = ["id", "lesson", "question", "description", "content"]