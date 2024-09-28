from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from . import models
from . import serializers

class ModuleList(generics.ListAPIView):
    queryset = models.Module.objects.all()
    serializer_class = serializers.ModuleSerializer
    permission_classes = [IsAuthenticated]

class ModuleDetail(generics.RetrieveAPIView):
    serializer_class = serializers.ModuleSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        module_id = self.kwargs.get("pk")
        return models.Module.objects.filter(id=module_id)

class LessonList(generics.ListAPIView):
    queryset = models.Lesson.objects.all()
    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]

class LessonDetail(generics.RetrieveAPIView):
    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        lesson_id = self.kwargs.get("pk")
        return models.Lesson.objects.filter(id=lesson_id)

class LessonsByModuleList(generics.ListAPIView):
    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs.get("module_id")
        return models.Lesson.objects.filter(module_id=module_id)


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

class ExercisesByLessonList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        lesson_type = self.kwargs.get("lesson_type")
        if lesson_type == 1:
            return serializers.MatchingExercisesSerializer
        elif lesson_type == 2:
            return serializers.FreeTextExercisesSerializer
        elif lesson_type == 3:
            return serializers.SignsExercisesSerializer
        elif lesson_type == 4:
            return serializers.StoryExercisesSerializer

    def get_queryset(self):
        lesson_id = self.kwargs.get("lesson_id")
        lesson_type = self.kwargs.get("lesson_type")
        
        if lesson_type == 1:
            return models.MatchingExercises.objects.filter(lesson_id=lesson_id)
        elif lesson_type == 2:
            return models.FreeTextExercises.objects.filter(lesson_id=lesson_id)
        elif lesson_type == 3:
            return models.SignsExercises.objects.filter(lesson_id=lesson_id)
        elif lesson_type == 4:
            return models.StoryExercises.objects.filter(lesson_id=lesson_id)
