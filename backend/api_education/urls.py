from django.urls import path
from . import views

urlpatterns = [
    path("api/modules/", views.ModuleList.as_view(), name="module_list"),
    path("api/lessons/", views.LessonList.as_view(), name="lesson_list"),
    path("api/exercises/find_pair", views.FindPairLessonList.as_view(), name="find_pair_lesson_list"),
    path("api/exercises/free_text", views.FreeTextLessonList.as_view(), name="free_text_lesson_list"),
    path("api/exercises/sign_language", views.SignLanguageLessonList.as_view(), name="sign_language_lesson_list"),
    path("api/exercises/educational_story", views.EducationalStoryLessonList.as_view(), name="educational_story_lesson_list"),
]