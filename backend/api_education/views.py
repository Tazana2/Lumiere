from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated # AllowAny for testing
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

class UserProgressList(generics.ListAPIView):
    serializer_class = serializers.UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return models.UserProgress.objects.filter(user=user)

class UserProgressDetail(generics.RetrieveAPIView):
    serializer_class = serializers.UserProgressSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'module_id'  # Cambia el campo de búsqueda a module_id

    def get_queryset(self):
        user = self.request.user
        return models.UserProgress.objects.filter(user=user)

class UpdateUserProgressView(generics.UpdateAPIView):
    serializer_class = serializers.UserProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        module_id = self.kwargs.get("module_id")
        lesson_id = self.kwargs.get("lesson_id")

        try:
            module = models.Module.objects.get(id=module_id)
            lesson = models.Lesson.objects.get(id=lesson_id)
        except (models.Module.DoesNotExist, models.Lesson.DoesNotExist):
            return None

        # Obtener o crear el progreso del usuario
        user_progress, created = models.UserProgress.objects.get_or_create(user=user, module=module, lesson=lesson)
        return user_progress

    def update(self, request, *args, **kwargs):
        user_progress = self.get_object()

        if user_progress is None:
            return Response({"error": "Module or Lesson not found"}, status=status.HTTP_404_NOT_FOUND)

        progress_percentage = request.data.get('progress_percentage')
        if progress_percentage is not None:
            user_progress.progress_percentage = progress_percentage
            user_progress.save()
            return Response({"progress_percentage": user_progress.progress_percentage}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Progress percentage not provided"}, status=status.HTTP_400_BAD_REQUEST)