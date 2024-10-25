from math import ceil
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated  # AllowAny solo para testing, si es necesario
from . import models
from . import serializers

# Módulo
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

# Lecciones
class LessonsByModuleList(generics.ListAPIView):
    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs.get("module_id")
        return models.Lesson.objects.filter(module_id=module_id)

class LessonDetail(generics.RetrieveAPIView):
    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        lesson_id = self.kwargs.get("pk")
        return models.Lesson.objects.filter(id=lesson_id)

# Progreso del usuario
class UserProgressList(generics.ListAPIView):
    serializer_class = serializers.UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return models.UserProgress.objects.filter(user=user)

class UpdateUserProgressView(generics.UpdateAPIView):
    serializer_class = serializers.UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        lesson_id = self.kwargs.get("lesson_id")

        try:
            lesson = models.Lesson.objects.get(id=lesson_id)
        except models.Lesson.DoesNotExist:
            return None

        # Obtener o crear el progreso de la lección del usuario
        user_progress, created = models.UserProgress.objects.get_or_create(user=user, lesson=lesson)
        return user_progress

    def update(self, request, *args, **kwargs):
        user_progress = self.get_object()

        if user_progress is None:
            return Response({"error": "Lesson not found"}, status=status.HTTP_404_NOT_FOUND)

        completed = request.data.get('completed', False)  # El usuario solo envía si completó o no la lección
        user_progress.is_completed = completed
        user_progress.save()

        return Response({"completed": user_progress.is_completed}, status=status.HTTP_200_OK)

class ModuleProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, module_id):
        user = request.user
        try:
            module = models.Module.objects.get(id=module_id)
        except models.Module.DoesNotExist:
            return Response({"error": "Module not found"}, status=status.HTTP_404_NOT_FOUND)

        total_lessons = models.Lesson.objects.filter(module=module).count()
        completed_lessons = models.UserProgress.objects.filter(user=user, lesson__module=module, is_completed=True).count()

        progress_percentage = ceil((completed_lessons / total_lessons) * 100)
        return Response({"progress_percentage": progress_percentage}, status=status.HTTP_200_OK)