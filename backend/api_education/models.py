from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Module(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.PositiveIntegerField()
    
    class Meta:
        ordering = ["order"] # order lessons by order field

    def __str__(self):
        return f"{self.title} - {self.module.title}"


# Abstract class for exercises
class Exercise(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    question = models.TextField()
    order = models.PositiveIntegerField()

    class Meta:
        abstract = True
        ordering = ["order"] # order exercises by order field

    def __str__(self):
        return self.question

class MatchingExercises(Exercise):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="matching_exercises")
    pairs = models.JSONField() # list of pairs

class FreeTextExercises(Exercise):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="free_text_exercises")
    correct_answer = models.CharField(max_length=255)

class SignsExercises(Exercise):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="signs_exercises")
    description = models.TextField()
    reference = models.FileField(upload_to="signs/", null=True, blank=True)

class StoryExercises(Exercise):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="story_exercises")
    description = models.TextField()
    content = models.JSONField() # list of paragraphs and images