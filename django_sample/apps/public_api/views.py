from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Post
from .serializers import UserSerializer, PostSerializer


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User model."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True, methods=['get'])
    def posts(self, request, pk=None):
        """Get all posts by user."""
        user = self.get_object()
        posts = Post.objects.filter(author=user)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class PostViewSet(viewsets.ModelViewSet):
    """ViewSet for Post model."""
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    @action(detail=False, methods=['get'])
    def published(self, request):
        """Get only published posts."""
        posts = Post.objects.filter(published=True)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data) 