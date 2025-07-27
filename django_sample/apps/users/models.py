from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Extended User model with additional fields."""
    
    # Additional fields
    bio = models.TextField('Bio', blank=True, max_length=500)
    avatar = models.URLField('Avatar URL', blank=True)
    phone = models.CharField('Phone', max_length=20, blank=True)
    date_of_birth = models.DateField('Date of Birth', null=True, blank=True)
    is_verified = models.BooleanField('Verified', default=False)
    last_login_ip = models.GenericIPAddressField('Last Login IP', null=True, blank=True)
    
    # Social fields
    website = models.URLField('Website', blank=True)
    location = models.CharField('Location', max_length=100, blank=True)
    
    # Preferences
    email_notifications = models.BooleanField('Email Notifications', default=True)
    newsletter_subscription = models.BooleanField('Newsletter Subscription', default=False)
    
    # Timestamps
    created_at = models.DateTimeField('Created At', auto_now_add=True)
    updated_at = models.DateTimeField('Updated At', auto_now=True)
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        db_table = 'users_user'
    
    def __str__(self):
        return self.username
    
    @property
    def full_name(self):
        """Get user's full name."""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username
    
    @property
    def display_name(self):
        """Get user's display name (full name or username)."""
        return self.full_name if self.first_name or self.last_name else self.username
