from django.db import models
import json


class Channel(models.Model):
    """Telegram channel for tracking trading signals."""
    
    name = models.CharField(max_length=255, verbose_name="Channel Name")
    telegram_id = models.CharField(max_length=100, unique=True, verbose_name="Telegram Channel ID")
    
    # Channel configuration fields
    forward_type = models.CharField(max_length=50, default="custom", verbose_name="Forward Type")
    signal_fn = models.CharField(max_length=100, default="signal_analyzer", verbose_name="Signal Function")
    signals_only = models.BooleanField(default=True, verbose_name="Signals Only")
    leverage = models.IntegerField(default=1, verbose_name="Leverage")
    portfolio_percent = models.FloatField(default=0.25, verbose_name="Portfolio Percent")
    open_mode = models.CharField(max_length=50, default="default", verbose_name="Open Mode")
    move_stop_to_breakeven = models.BooleanField(default=True, verbose_name="Move Stop to Breakeven")
    allow_signals_without_sl_tp = models.BooleanField(default=True, verbose_name="Allow Signals Without SL/TP")
    max_profit_percent = models.FloatField(default=0.0, verbose_name="Max Profit Percent")
    review = models.BooleanField(default=True, verbose_name="Review")
    position_lifetime = models.CharField(max_length=20, default="0s", verbose_name="Position Lifetime")
    target_chat_id = models.BigIntegerField(default=-4984770976, verbose_name="Target Chat ID")
    
    # Statistics fields
    wins = models.IntegerField(default=0, verbose_name="Wins")
    fails = models.IntegerField(default=0, verbose_name="Fails")
    wins_ratio = models.FloatField(default=0.0, verbose_name="Wins Ratio")
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    
    class Meta:
        verbose_name = "Channel"
        verbose_name_plural = "Channels"
        db_table = "channels"
    
    def __str__(self):
        return f"{self.name} ({self.telegram_id})"


class Message(models.Model):
    """Message from Telegram channel."""
    
    channel = models.ForeignKey(
        Channel, 
        on_delete=models.CASCADE, 
        related_name="messages",
        verbose_name="Channel"
    )
    telegram_message_id = models.CharField(max_length=100, verbose_name="Telegram Message ID")
    date = models.DateTimeField(verbose_name="Message Date")
    text = models.TextField(verbose_name="Message Text")
    media_path = models.JSONField(
        blank=True,
        null=True,
        verbose_name="Media File Paths"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    
    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
        db_table = "messages"
        unique_together = ["channel", "telegram_message_id"]
        indexes = [
            models.Index(fields=["channel", "date"]),
            models.Index(fields=["date"]),
        ]
    
    def __str__(self):
        return f"Сообщение {self.telegram_message_id} из {self.channel.name}"


class Signal(models.Model):
    """Trading signal extracted from message."""
    
    DIRECTION_CHOICES = [
        ("LONG", "Long"),
        ("SHORT", "Short"),
    ]
    
    message = models.ForeignKey(
        Message, 
        on_delete=models.CASCADE, 
        related_name="signals",
        verbose_name="Message"
    )
    channel = models.ForeignKey(
        Channel, 
        on_delete=models.CASCADE, 
        related_name="signals",
        verbose_name="Channel"
    )
    direction = models.CharField(
        max_length=10, 
        choices=DIRECTION_CHOICES,
        verbose_name="Direction"
    )
    ticker = models.CharField(max_length=20, verbose_name="Ticker")
    entry_price = models.FloatField(verbose_name="Entry Price")
    entry_price_now = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Current Entry Price"
    )
    leverage = models.IntegerField(verbose_name="Leverage")
    stop_loss = models.FloatField(verbose_name="Stop Loss")
    timestamp = models.DateTimeField(verbose_name="Timestamp")
    take_profits = models.JSONField(
        blank=True,
        null=True,
        verbose_name="Take Profit Targets"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    
    class Meta:
        verbose_name = "Trading Signal"
        verbose_name_plural = "Trading Signals"
        db_table = "signals"
        indexes = [
            models.Index(fields=["channel", "timestamp"]),
            models.Index(fields=["ticker", "timestamp"]),
            models.Index(fields=["direction", "timestamp"]),
        ]
    
    def __str__(self):
        return f"{self.direction} {self.ticker} @ {self.entry_price}" 