from rest_framework import generics
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