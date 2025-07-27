from django.shortcuts import render
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.db import transaction

from .serializers import (
    UserSerializer, UserCreateSerializer, UserUpdateSerializer,
    ChangePasswordSerializer, LoginSerializer, PasswordResetSerializer,
    PasswordResetConfirmSerializer, UserProfileSerializer
)
from .models import User


class RegisterView(generics.CreateAPIView):
    """User registration view."""
    
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        """Create user and return tokens."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        with transaction.atomic():
            user = serializer.save()
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'message': 'User registered successfully'
            }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """User login view."""
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Authenticate user and return tokens."""
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        # Update last login IP
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        
        user.last_login_ip = ip
        user.save(update_fields=['last_login_ip'])
        
        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'Login successful'
        })


class LogoutView(APIView):
    """User logout view."""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Logout user and blacklist tokens."""
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            
            return Response({
                'message': 'Logout successful'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'message': 'Logout successful'
            }, status=status.HTTP_200_OK)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """User profile view."""
    
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        """Return current user."""
        return self.request.user


class UserDetailView(generics.RetrieveAPIView):
    """Public user profile view."""
    
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'username'


class ChangePasswordView(APIView):
    """Change password view."""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Change user password."""
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        return Response({
            'message': 'Password changed successfully'
        }, status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    """Password reset request view."""
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Request password reset."""
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        # Here you would typically send an email with reset link
        # For demo purposes, we'll just return success
        
        return Response({
            'message': f'Password reset email sent to {email}'
        }, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    """Password reset confirmation view."""
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Confirm password reset."""
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Here you would typically validate the token and reset password
        # For demo purposes, we'll just return success
        
        return Response({
            'message': 'Password reset successfully'
        }, status=status.HTTP_200_OK)


class UserListView(generics.ListAPIView):
    """List users view (public)."""
    
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Filter queryset by search parameter."""
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                username__icontains=search
            ) | queryset.filter(
                first_name__icontains=search
            ) | queryset.filter(
                last_name__icontains=search
            )
        return queryset


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def me(request):
    """Get current user info."""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def refresh_token(request):
    """Refresh access token."""
    try:
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({
                'error': 'Refresh token is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        token = RefreshToken(refresh_token)
        return Response({
            'access': str(token.access_token)
        })
    except Exception as e:
        return Response({
            'error': 'Invalid refresh token'
        }, status=status.HTTP_400_BAD_REQUEST)
