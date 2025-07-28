from django.db import models
import json


class Channel(models.Model):
    """Telegram channel for tracking trading signals."""
    
    name = models.CharField(max_length=255, verbose_name="Channel Name")
    telegram_id = models.CharField(max_length=100, unique=True, verbose_name="Telegram Channel ID")
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
    entry_price = models.DecimalField(
        max_digits=20, 
        decimal_places=8,
        verbose_name="Entry Price"
    )
    entry_price_now = models.DecimalField(
        max_digits=20, 
        decimal_places=8,
        null=True,
        blank=True,
        verbose_name="Current Entry Price"
    )
    leverage = models.IntegerField(verbose_name="Leverage")
    stop_loss = models.DecimalField(
        max_digits=20, 
        decimal_places=8,
        verbose_name="Stop Loss"
    )
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