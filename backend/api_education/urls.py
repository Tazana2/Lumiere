from django.urls import path
from . import views

urlpatterns = [
    path("modules/", views.ModuleList.as_view(), name="module_list"),
    path("lessons/", views.LessonList.as_view(), name="lesson_list"),
    path("exercises/find_pair", views.FindPairLessonList.as_view(), name="find_pair_lesson_list"),
    path("exercises/free_text", views.FreeTextLessonList.as_view(), name="free_text_lesson_list"),
    path("exercises/sign_language", views.SignLanguageLessonList.as_view(), name="sign_language_lesson_list"),
    path("exercises/educational_story", views.EducationalStoryLessonList.as_view(), name="educational_story_lesson_list"),
]