from django.urls import path
from . import views

urlpatterns = [
    path("api/modules/", views.ModuleList.as_view(), name="module_list"),
    path("api/modules/<int:pk>/", views.ModuleDetail.as_view(), name="module_detail"),
    path("api/modules/<int:module_id>/lessons/", views.LessonsByModuleList.as_view(), name="lessons_by_module_list"),
    path("api/lessons/<int:pk>/", views.LessonDetail.as_view(), name="lesson_detail"),
    path("api/progress/", views.UserProgressList.as_view(), name="user_progress_list"),
    path("api/progress/<int:module_id>/", views.UserProgressDetail.as_view(), name="user_progress_detail"),
    path("api/update/<int:module_id>/<int:lesson_id>/", views.UpdateUserProgressView.as_view(), name="update_user_progress"),
]