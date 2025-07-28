from rest_framework import serializers
from .models import Channel, Message, Signal


class ChannelSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Channel."""
    
    class Meta:
        model = Channel
        fields = [
            "id", "name", "telegram_id", 
            "created_at", "updated_at"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class MessageSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Message."""
    
    channel_name = serializers.CharField(source="channel.name", read_only=True)
    
    class Meta:
        model = Message
        fields = [
            "id", "channel", "channel_name", "telegram_message_id",
            "date", "text", "media_path", "created_at", "updated_at"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class SignalSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Signal."""
    
    channel_name = serializers.CharField(source="channel.name", read_only=True)
    ticker_display = serializers.CharField(source="get_ticker_display", read_only=True)
    direction_display = serializers.CharField(source="get_direction_display", read_only=True)
    
    class Meta:
        model = Signal
        fields = [
            "id", "message", "channel", "channel_name", "direction", 
            "direction_display", "ticker", "ticker_display", "entry_price",
            "entry_price_now", "leverage", "stop_loss", "timestamp",
            "take_profits", "created_at", "updated_at"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class SignalCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания торгового сигнала."""
    
    class Meta:
        model = Signal
        fields = [
            "message", "channel", "direction", "ticker", "entry_price",
            "entry_price_now", "leverage", "stop_loss", "timestamp", "take_profits"
        ]


class ChannelDetailSerializer(ChannelSerializer):
    """Детальный сериализатор для Channel с сообщениями."""
    
    messages = MessageSerializer(many=True, read_only=True)
    signals_count = serializers.SerializerMethodField()
    
    class Meta(ChannelSerializer.Meta):
        fields = ChannelSerializer.Meta.fields + ["messages", "signals_count"]
    
    def get_signals_count(self, obj):
        return obj.signals.count()


class MessageDetailSerializer(MessageSerializer):
    """Детальный сериализатор для Message с сигналами."""
    
    signals = SignalSerializer(many=True, read_only=True)
    
    class Meta(MessageSerializer.Meta):
        fields = MessageSerializer.Meta.fields + ["signals"] 