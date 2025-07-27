"""
URL configuration for Django Revolution tests.
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django_revolution import add_revolution_urls
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    # Admin
    path("admin/", admin.site.urls),
    # Root redirect
    path(
        "", RedirectView.as_view(url="/schema/public/schema/swagger/", permanent=False)
    ),
]

# Add Django Revolution URL patterns automatically
# This creates:
# - /schema/public/schema/ (OpenAPI spec)
# - /schema/public/schema/swagger/ (Swagger UI)
# - /schema/private/schema/ (OpenAPI spec)
# - /schema/private/schema/swagger/ (Swagger UI)
# - /api/public/ (Public API endpoints)
# - /api/private/ (Private API endpoints)
# - /openapi/archive/ (Generated clients)
#
# Auto-generation command:
# poetry run python manage.py auto_generate

urlpatterns = add_revolution_urls(urlpatterns)

# Add static files serving for development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
