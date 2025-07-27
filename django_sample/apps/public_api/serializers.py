from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class PostSerializer(serializers.ModelSerializer):
    """Serializer for Post model."""
    author = UserSerializer(read_only=True)
    author_id = serializers.IntegerField(write_only=True, source='author')
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'author_id', 'published', 'created_at']
        read_only_fields = ['id', 'created_at'] 