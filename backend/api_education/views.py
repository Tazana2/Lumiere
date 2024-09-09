from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from . import models
from . import serializers

class ModuleList(generics.ListAPIView):
    queryset = models.Module.objects.all()
    serializer_class = serializers.ModuleSerializer
    permission_classes = [IsAuthenticated]
    
class LessonList(generics.ListAPIView):
    queryset = models.Lesson.objects.all()
    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]

class MatchingExercisesList(generics.ListAPIView):
    queryset = models.MatchingExercises.objects.all()
    serializer_class = serializers.MatchingExercisesSerializer
    permission_classes = [IsAuthenticated]

class FreeTextExercisesList(generics.ListAPIView):
    queryset = models.FreeTextExercises.objects.all()
    serializer_class = serializers.FreeTextExercisesSerializer
    permission_classes = [IsAuthenticated]

class SignsExercisesLessonList(generics.ListAPIView):
    queryset = models.SignsExercises.objects.all()
    serializer_class = serializers.SignsExercisesSerializer
    permission_classes = [IsAuthenticated]

class StoryExercisesList(generics.ListAPIView):
    queryset = models.StoryExercises.objects.all()
    serializer_class = serializers.StoryExercisesSerializer
    permission_classes = [IsAuthenticated]