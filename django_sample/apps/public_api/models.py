from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()


class Post(models.Model):
    """Test post model for public API."""
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        app_label = 'public_api' 