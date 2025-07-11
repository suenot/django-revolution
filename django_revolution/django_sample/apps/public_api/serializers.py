from rest_framework import serializers
from .models import User, Post


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    """Serializer for Post model."""
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'published', 'created_at'] 