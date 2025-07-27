from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Basic user serializer for read operations."""

    full_name = serializers.ReadOnlyField()
    display_name = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "display_name",
            "bio",
            "avatar",
            "phone",
            "date_of_birth",
            "is_verified",
            "website",
            "location",
            "email_notifications",
            "newsletter_subscription",
            "is_active",
            "date_joined",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "is_verified",
            "last_login_ip",
            "is_active",
            "date_joined",
            "created_at",
            "updated_at",
        ]


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""

    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "password_confirm",
            "first_name",
            "last_name",
            "bio",
            "avatar",
            "phone",
            "date_of_birth",
            "website",
            "location",
            "email_notifications",
            "newsletter_subscription",
        ]

    def validate(self, attrs):
        """Validate password confirmation."""
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        """Create user with encrypted password."""
        validated_data.pop("password_confirm")
        user = User.objects.create_user(**validated_data)
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile."""

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "bio",
            "avatar",
            "phone",
            "date_of_birth",
            "website",
            "location",
            "email_notifications",
            "newsletter_subscription",
        ]


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing password."""

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, attrs):
        """Validate password confirmation."""
        if attrs["new_password"] != attrs["new_password_confirm"]:
            raise serializers.ValidationError("New passwords don't match")
        return attrs

    def validate_old_password(self, value):
        """Validate old password."""
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect")
        return value


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        """Validate login credentials."""
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            # Try to authenticate with email
            try:
                user = User.objects.get(email=email)
                user = authenticate(username=user.username, password=password)
            except User.DoesNotExist:
                user = None
            
            if not user:
                raise serializers.ValidationError("Invalid credentials")
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled")
            attrs['user'] = user
        else:
            raise serializers.ValidationError("Must include email and password")
        
        return attrs


class PasswordResetSerializer(serializers.Serializer):
    """Serializer for password reset request."""

    email = serializers.EmailField()

    def validate_email(self, value):
        """Validate email exists."""
        if not User.objects.filter(email=value, is_active=True).exists():
            raise serializers.ValidationError("No active user found with this email")
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer for password reset confirmation."""

    token = serializers.CharField()
    new_password = serializers.CharField(validators=[validate_password])
    new_password_confirm = serializers.CharField()

    def validate(self, attrs):
        """Validate password confirmation."""
        if attrs["new_password"] != attrs["new_password_confirm"]:
            raise serializers.ValidationError("Passwords don't match")
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile with minimal fields."""

    full_name = serializers.ReadOnlyField()
    display_name = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "display_name",
            "bio",
            "avatar",
            "phone",
            "website",
            "location",
            "is_verified",
            "date_joined",
        ]
        read_only_fields = ["id", "username", "email", "is_verified", "date_joined"]
