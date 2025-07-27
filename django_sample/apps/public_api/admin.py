from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Post


@admin.register(Post)
class PostAdmin(ModelAdmin):
    """Admin interface for Post model."""
    
    list_display = ['id', 'title', 'author', 'published', 'created_at']
    list_filter = ['published', 'created_at', 'author']
    search_fields = ['title', 'content', 'author__username', 'author__email']
    ordering = ['-created_at']
    readonly_fields = ['id', 'created_at']
    list_editable = ['published']
    
    fieldsets = (
        (None, {
            'fields': ('title', 'content', 'author', 'published')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        """Optimize queryset with select_related."""
        return super().get_queryset(request).select_related('author') 