from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, LoginView, LogoutView, UserProfileView, UserDetailView,
    ChangePasswordView, PasswordResetView, PasswordResetConfirmView,
    UserListView, me, refresh_token
)

# Main router for user management
router = DefaultRouter()

# URL patterns for authentication and user management
urlpatterns = [
    # Authentication endpoints
    path('auth/register/', RegisterView.as_view(), name='user-register'),
    path('auth/login/', LoginView.as_view(), name='user-login'),
    path('auth/logout/', LogoutView.as_view(), name='user-logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('auth/refresh-token/', refresh_token, name='refresh-token'),
    
    # Password management
    path('auth/password/change/', ChangePasswordView.as_view(), name='change-password'),
    path('auth/password/reset/', PasswordResetView.as_view(), name='password-reset'),
    path('auth/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    
    # User profile and management
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('me/', me, name='user-me'),
    path('list/', UserListView.as_view(), name='user-list'),
    path('<str:username>/', UserDetailView.as_view(), name='user-detail'),
    
    # Include router URLs
    path('', include(router.urls)),
] 