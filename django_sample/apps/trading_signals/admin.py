from django.contrib import admin
from .models import Channel, Message, Signal


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ["name", "telegram_id", "leverage", "portfolio_percent", "wins", "fails", "wins_ratio", "created_at"]
    list_filter = ["signals_only", "review", "move_stop_to_breakeven", "created_at", "updated_at"]
    search_fields = ["name", "telegram_id"]
    readonly_fields = ["created_at", "updated_at"]
    ordering = ["-created_at"]
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("name", "telegram_id")
        }),
        ("Configuration", {
            "fields": (
                "forward_type", "signal_fn", "signals_only", "leverage",
                "portfolio_percent", "open_mode", "move_stop_to_breakeven",
                "allow_signals_without_sl_tp", "max_profit_percent", "review",
                "position_lifetime", "target_chat_id"
            )
        }),
        ("Statistics", {
            "fields": ("wins", "fails", "wins_ratio")
        }),
        ("System Fields", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


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