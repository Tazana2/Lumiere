from django.db import models

class Module(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title


class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f"{self.title} - {self.module.title}"


class FindPairExercises(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='find_pair_exercises')
    title = models.CharField(max_length=255)
    description = models.TextField()
    text1 = models.CharField(max_length=255)
    text2 = models.CharField(max_length=255)
    image1 = models.ImageField(upload_to='find_pair_images/')
    image2 = models.ImageField(upload_to='find_pair_images/')

    def __str__(self):
        return self.title


class FreeTextExercises(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='free_text_exercises')
    title = models.CharField(max_length=255)
    description = models.TextField()
    prompt = models.TextField()

    def __str__(self):
        return self.title


class SignLanguageExercises(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='sign_language_exercises')
    title = models.CharField(max_length=255)
    description = models.TextField()
    video = models.FileField(upload_to='sign_language_videos/')

    def __str__(self):
        return self.title


class EducationalStoryExercises(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='educational_story_exercises')
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = models.TextField()

    def __str__(self):
        return self.title