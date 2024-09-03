from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from . import models
from . import serializers

class ModuleList(generics.ListAPIView):
    queryset = models.Module.objects.all()
    serializer_class = serializers.ModuleSerializer
    permission_classes = [AllowAny]
    
class LessonList(generics.ListAPIView):
    queryset = models.Lesson.objects.all()
    serializer_class = serializers.LessonSerializer
    permission_classes = [AllowAny]

class FindPairLessonList(generics.ListAPIView):
    queryset = models.FindPairExercises.objects.all()
    serializer_class = serializers.FindPairLessonSerializer
    permission_classes = [AllowAny]

class FreeTextLessonList(generics.ListAPIView):
    queryset = models.FreeTextExercises.objects.all()
    serializer_class = serializers.FreeTextLessonSerializer
    permission_classes = [AllowAny]

class SignLanguageLessonList(generics.ListAPIView):
    queryset = models.SignLanguageExercises.objects.all()
    serializer_class = serializers.SignLanguageLessonSerializer
    permission_classes = [AllowAny]

class EducationalStoryLessonList(generics.ListAPIView):
    queryset = models.EducationalStoryExercises.objects.all()
    serializer_class = serializers.EducationalStoryLesson
    permission_classes = [AllowAny]