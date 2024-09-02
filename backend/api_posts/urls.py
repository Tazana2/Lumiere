from django.urls import path
from . import views

urlpatterns = [
    path("", views.PostListCreate.as_view(), name="post_list"),
    path("delete/<int:pk>/", views.PostDelete.as_view(), name="post_delete"),
]