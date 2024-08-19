from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title


# This could be a model for a lesson
# class Lesson(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField()
#     is_completed = models.BooleanField(default=False)

#     def __str__(self):
#         return self.title
