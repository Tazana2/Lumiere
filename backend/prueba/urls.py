from django.urls import path
from . import views

urlpatterns = [
    path('video_feed/', views.video_feed, name='video_feed'),
    path('get_prediction/', views.get_prediction, name='get_prediction'),  # Nueva ruta para predicción
]