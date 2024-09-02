from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/users/", include("api.urls")),
    path("api/education/", include("api_education.urls")),
    path("api/posts/", include("api_posts.urls")),
]