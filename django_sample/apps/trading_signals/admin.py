from django.contrib import admin
from .models import Channel, Message, Signal


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ["name", "telegram_id", "created_at", "updated_at"]
    list_filter = ["created_at", "updated_at"]
    search_fields = ["name", "telegram_id"]
    readonly_fields = ["created_at", "updated_at"]
    ordering = ["-created_at"]


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ["channel", "telegram_message_id", "date", "created_at"]
    list_filter = ["channel", "date", "created_at"]
    search_fields = ["text", "telegram_message_id", "channel__name"]
    readonly_fields = ["created_at", "updated_at"]
    ordering = ["-date"]
    raw_id_fields = ["channel"]


@admin.register(Signal)
class SignalAdmin(admin.ModelAdmin):
    list_display = [
        "channel", "ticker", "direction", "entry_price", 
        "leverage", "timestamp", "created_at"
    ]
    list_filter = [
        "channel", "direction", "ticker", "leverage", 
        "timestamp", "created_at"
    ]
    search_fields = ["ticker", "channel__name"]
    readonly_fields = ["created_at", "updated_at"]
    ordering = ["-timestamp"]
    raw_id_fields = ["message", "channel"]
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("message", "channel", "direction", "ticker")
        }),
        ("Prices", {
            "fields": ("entry_price", "entry_price_now", "stop_loss", "take_profits")
        }),
        ("Parameters", {
            "fields": ("leverage", "timestamp")
        }),

        ("System Fields", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    ) 