from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """ViewSet for Post model with nested routing."""
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    
    def get_queryset(self):
        """Filter posts by user if user_id is provided."""
        queryset = super().get_queryset()
        user_id = self.kwargs.get('user_pk')
        if user_id:
            queryset = queryset.filter(author_id=user_id)
        return queryset.select_related('author')
    
    @extend_schema(
        summary="Get published posts",
        description="Returns only published posts",
        responses={200: PostSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def published(self, request):
        """Get only published posts."""
        posts = self.get_queryset().filter(published=True)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @extend_schema(
        summary="Get posts by author",
        description="Returns posts filtered by author",
        parameters=[
            OpenApiParameter(name='author_id', type=int, location=OpenApiParameter.QUERY)
        ],
        responses={200: PostSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def by_author(self, request):
        """Get posts by specific author."""
        author_id = request.query_params.get('author_id')
        if author_id:
            posts = self.get_queryset().filter(author_id=author_id)
        else:
            posts = self.get_queryset()
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @extend_schema(
        summary="Publish post",
        description="Mark post as published",
        responses={200: PostSerializer}
    )
    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        """Publish a post."""
        post = self.get_object()
        post.published = True
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)
    
    @extend_schema(
        summary="Unpublish post",
        description="Mark post as unpublished",
        responses={200: PostSerializer}
    )
    @action(detail=True, methods=['post'])
    def unpublish(self, request, pk=None):
        """Unpublish a post."""
        post = self.get_object()
        post.published = False
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data) 