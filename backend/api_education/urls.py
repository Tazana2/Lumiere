from django.urls import path
from . import views

urlpatterns = [
    path("api/modules/", views.ModuleList.as_view(), name="module_list"),
    path("api/modules/<int:pk>/", views.ModuleDetail.as_view(), name="module_detail"),
    path("api/modules/<int:module_id>/lessons/", views.LessonsByModuleList.as_view(), name="lessons_by_module"),
    path("api/lessons/", views.LessonList.as_view(), name="lesson_list"),
    path("api/lessons/<int:pk>/", views.LessonDetail.as_view(), name="lesson_detail"),
    path("api/lessons/<int:lesson_id>/exercises/<int:lesson_type>/", views.ExercisesByLessonList.as_view(), name="exercises_by_lesson"),
    path("api/exercises/matching", views.MatchingExercisesList.as_view(), name="find_pair_lesson_list"),
    path("api/exercises/free_text", views.FreeTextExercisesList.as_view(), name="free_text_lesson_list"),
    path("api/exercises/signs", views.SignsExercisesLessonList.as_view(), name="sign_language_lesson_list"),
    path("api/exercises/stories", views.StoryExercisesList.as_view(), name="educational_story_lesson_list"),
]