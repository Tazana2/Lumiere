from django.conf import settings
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("users/", include("api_users.urls")),
    path("education/", include("api_education.urls")),
    path("posts/", include("api_posts.urls")),
    path("", include("prueba.urls")),

]