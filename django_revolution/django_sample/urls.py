"""
URL configuration for Django Revolution tests.
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # Root redirect
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    
    # API endpoints with Django Revolution
    # path('api/', include('django_revolution.urls')),
    
    # Simple API endpoints for testing
    path('api/', include('django_sample.apps.public_api.urls')),
    path('api/private/', include('django_sample.apps.private_api.urls')),
] 