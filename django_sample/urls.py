"""
URL configuration for Django Revolution tests.
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django_revolution import add_revolution_urls

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # Root redirect
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    
    # Simple API endpoints for testing (legacy)
    path('api/', include('apps.public_api.urls')),
    path('api/private/', include('apps.private_api.urls')),
]

# Add Django Revolution URL patterns automatically
# This creates:
# - /api/public/schema/ (Swagger UI)
# - /api/public/schema.yaml (OpenAPI spec)
# - /api/private/schema/ (Swagger UI)
# - /api/private/schema.yaml (OpenAPI spec)
# - /openapi/archive/ (Generated clients)
urlpatterns = add_revolution_urls(urlpatterns) 