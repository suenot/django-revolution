from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin, GroupAdmin as BaseGroupAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.forms import UserChangeForm, UserCreationForm, AdminPasswordChangeForm
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from .models import User


# Only unregister Group, not AuthUser since we're using custom User model
try:
    admin.site.unregister(Group)
except admin.sites.NotRegistered:
    pass


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    """Admin interface for User model with Unfold styling."""
    
    # Forms for custom user model
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    
    list_display = [
        'user_avatar', 'email_display', 'username_display', 'full_name_display',
        'user_status_display', 'permissions_display', 'last_login_display', 'date_joined_display'
    ]
    list_display_links = ['user_avatar', 'email_display']
    list_filter = [
        'is_verified', 'is_active', 'is_staff', 'is_superuser',
        'email_notifications', 'newsletter_subscription', 'date_joined'
    ]
    search_fields = ['username', 'email', 'first_name', 'last_name', 'phone']
    ordering = ['-date_joined']
    readonly_fields = ['user_avatar_large', 'full_account_info', 'last_login_ip', 'created_at', 'updated_at']
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {
            'fields': (
                'first_name', 'last_name', 'email', 'bio', 'avatar',
                'phone', 'date_of_birth', 'website', 'location'
            )
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser', 'is_verified',
                'groups', 'user_permissions'
            ),
        }),
        ('Preferences', {
            'fields': (
                'email_notifications', 'newsletter_subscription'
            ),
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')
        }),
        ('Security', {
            'fields': ('last_login_ip',)
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'email', 'password1', 'password2',
                'first_name', 'last_name', 'is_active', 'is_staff'
            ),
        }),
    )
    
    def user_avatar(self, obj):
        """Small user avatar for list display."""
        if obj.avatar:
            return format_html(
                '<img src="{}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />',
                obj.avatar
            )
        else:
            initials = f"{obj.first_name[:1]}{obj.last_name[:1]}".upper() or obj.email[:2].upper()
            bg_color = '#0d6efd' if obj.is_staff else '#6f42c1' if obj.is_superuser else '#198754'

            return format_html(
                '<div style="width: 32px; height: 32px; border-radius: 50%; background: {}; '
                'color: white; display: flex; align-items: center; justify-content: center; '
                'font-weight: bold; font-size: 12px;">{}</div>',
                bg_color, initials
            )
    user_avatar.short_description = 'Avatar'

    def user_avatar_large(self, obj):
        """Large user avatar for detail view."""
        if obj.avatar:
            return format_html(
                '<img src="{}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin: 10px 0;" />',
                obj.avatar
            )
        else:
            initials = f"{obj.first_name[:1]}{obj.last_name[:1]}".upper() or obj.email[:2].upper()
            bg_color = '#0d6efd' if obj.is_staff else '#6f42c1' if obj.is_superuser else '#198754'

            return format_html(
                '<div style="width: 80px; height: 80px; border-radius: 50%; background: {}; '
                'color: white; display: flex; align-items: center; justify-content: center; '
                'font-weight: bold; font-size: 24px; margin: 10px 0;">{}</div>',
                bg_color, initials
            )
    user_avatar_large.short_description = 'User Avatar'

    def email_display(self, obj):
        """Styled email display."""
        return format_html(
            '<strong style="color: #0d6efd;">{}</strong>',
            obj.email
        )
    email_display.short_description = 'Email'

    def username_display(self, obj):
        """Styled username display."""
        return format_html(
            '<code style="background: #f8f9fa; padding: 2px 6px; border-radius: 4px; font-size: 11px;">{}</code>',
            obj.username
        )
    username_display.short_description = 'Username'

    def full_name_display(self, obj):
        """Full name or fallback."""
        full_name = obj.full_name
        if full_name != obj.username:
            return format_html('<span style="color: #212529;">{}</span>', full_name)
        return format_html('<span style="color: #6c757d; font-style: italic;">No name set</span>')
    full_name_display.short_description = 'Full Name'

    def user_status_display(self, obj):
        """User status with icons and colors."""
        if obj.is_superuser:
            return format_html(
                '<span style="background: #6f42c1; color: white; padding: 2px 8px; '
                'border-radius: 12px; font-size: 11px; font-weight: 500;">👑 Super</span>'
            )
        elif obj.is_staff:
            return format_html(
                '<span style="background: #0d6efd; color: white; padding: 2px 8px; '
                'border-radius: 12px; font-size: 11px; font-weight: 500;">⚙️ Staff</span>'
            )
        elif obj.is_active:
            return format_html(
                '<span style="background: #198754; color: white; padding: 2px 8px; '
                'border-radius: 12px; font-size: 11px; font-weight: 500;">✅ Active</span>'
            )
        else:
            return format_html(
                '<span style="background: #dc3545; color: white; padding: 2px 8px; '
                'border-radius: 12px; font-size: 11px; font-weight: 500;">❌ Inactive</span>'
            )
    user_status_display.short_description = 'Status'

    def permissions_display(self, obj):
        """Permissions count display."""
        groups_count = obj.groups.count()
        perms_count = obj.user_permissions.count()

        if groups_count > 0 or perms_count > 0:
            return format_html(
                '<span style="color: #fd7e14; font-size: 12px; font-weight: 500;">🔐 G:{} P:{}</span>',
                groups_count, perms_count
            )
        return format_html('<span style="color: #6c757d; font-size: 11px;">No perms</span>')
    permissions_display.short_description = 'Permissions'

    def last_login_display(self, obj):
        """Last login with relative time."""
        if obj.last_login:
            from django.utils import timezone
            now = timezone.now()
            diff = now - obj.last_login

            if diff.days > 30:
                color = '#dc3545'
                text = f"{diff.days}d ago"
            elif diff.days > 7:
                color = '#fd7e14'
                text = f"{diff.days}d ago"
            elif diff.days > 0:
                color = '#ffc107'
                text = f"{diff.days}d ago"
            else:
                color = '#198754'
                hours = diff.seconds // 3600
                text = f"{hours}h ago" if hours > 0 else "Recently"

            return format_html(
                '<span style="color: {}; font-size: 12px; font-weight: 500;">{}</span>',
                color, text
            )
        return format_html('<span style="color: #6c757d; font-size: 11px;">Never</span>')
    last_login_display.short_description = 'Last Login'

    def date_joined_display(self, obj):
        """Join date display."""
        return format_html(
            '<span style="color: #6c757d; font-size: 11px;">{}</span>',
            obj.date_joined.strftime('%Y-%m-%d')
        )
    date_joined_display.short_description = 'Joined'

    def full_account_info(self, obj):
        """Full account information for detail view."""
        status_color = '#198754' if obj.is_active else '#dc3545'
        status_text = 'Active' if obj.is_active else 'Inactive'

        return format_html(
            '<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">'
            '<h3 style="margin: 0 0 10px 0; color: #212529;">Account Information</h3>'
            '<p><strong>Email:</strong> {}</p>'
            '<p><strong>Username:</strong> {}</p>'
            '<p><strong>Full Name:</strong> {}</p>'
            '<p><strong>Status:</strong> <span style="color: {};">{}</span></p>'
            '<p><strong>Verified:</strong> {}</p>'
            '<p><strong>Joined:</strong> {}</p>'
            '</div>',
            obj.email, obj.username, obj.full_name, status_color, status_text,
            '✅ Yes' if obj.is_verified else '❌ No',
            obj.date_joined.strftime('%Y-%m-%d %H:%M')
        )
    full_account_info.short_description = 'Account Info'


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    """Admin interface for Group model with Unfold styling."""
    pass
