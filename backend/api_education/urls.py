from django.urls import path
from . import views

urlpatterns = [
    path("api/modules/", views.ModuleList.as_view(), name="module_list"),
    path("api/modules/<int:pk>/", views.ModuleDetail.as_view(), name="module_detail"),
    path("api/modules/<int:module_id>/lessons/", views.LessonsByModuleList.as_view(), name="lessons_by_module_list"),
    path("api/lessons/<int:pk>/", views.LessonDetail.as_view(), name="lesson_detail"),
]