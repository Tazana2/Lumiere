from django.urls import path
from . import views

urlpatterns = [
    path("api/", views.PostListCreate.as_view(), name="post_list"),
    path("api/delete/<int:pk>/", views.PostDelete.as_view(), name="post_delete"),
]