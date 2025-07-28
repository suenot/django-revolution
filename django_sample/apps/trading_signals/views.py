from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Q
from django.utils import timezone
from datetime import timedelta
from .models import Channel, Message, Signal
from .serializers import (
    ChannelSerializer, ChannelDetailSerializer,
    MessageSerializer, MessageDetailSerializer,
    SignalSerializer, SignalCreateSerializer
)


class ChannelViewSet(viewsets.ModelViewSet):
    """ViewSet для управления каналами."""
    
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ChannelDetailSerializer
        return ChannelSerializer
    
    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        """Получить сообщения канала."""
        channel = self.get_object()
        messages = channel.messages.all().order_by('-date')
        page = self.paginate_queryset(messages)
        if page is not None:
            serializer = MessageSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def signals(self, request, pk=None):
        """Получить сигналы канала."""
        channel = self.get_object()
        signals = channel.signals.all().order_by('-timestamp')
        page = self.paginate_queryset(signals)
        if page is not None:
            serializer = SignalSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = SignalSerializer(signals, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Получить статистику по каналам."""
        channels = Channel.objects.annotate(
            messages_count=Count('messages'),
            signals_count=Count('signals')
        )
        serializer = ChannelSerializer(channels, many=True)
        return Response(serializer.data)


class MessageViewSet(viewsets.ModelViewSet):
    """ViewSet для управления сообщениями."""
    
    queryset = Message.objects.select_related('channel').all()
    serializer_class = MessageSerializer
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return MessageDetailSerializer
        return MessageSerializer
    
    def get_queryset(self):
        queryset = Message.objects.select_related('channel').all()
        
        # Фильтрация по каналу
        channel_id = self.request.query_params.get('channel_id', None)
        if channel_id is not None:
            queryset = queryset.filter(channel_id=channel_id)
        
        # Фильтрация по дате
        date_from = self.request.query_params.get('date_from', None)
        if date_from:
            queryset = queryset.filter(date__gte=date_from)
        
        date_to = self.request.query_params.get('date_to', None)
        if date_to:
            queryset = queryset.filter(date__lte=date_to)
        
        # Поиск по тексту
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(text__icontains=search)
        
        return queryset.order_by('-date')
    
    @action(detail=True, methods=['get'])
    def signals(self, request, pk=None):
        """Получить сигналы сообщения."""
        message = self.get_object()
        signals = message.signals.all().order_by('-timestamp')
        serializer = SignalSerializer(signals, many=True)
        return Response(serializer.data)


class SignalViewSet(viewsets.ModelViewSet):
    """ViewSet для управления торговыми сигналами."""
    
    queryset = Signal.objects.select_related('message', 'channel').all()
    serializer_class = SignalSerializer
    
    def get_serializer_class(self):
        if self.action == 'create':
            return SignalCreateSerializer
        return SignalSerializer
    
    def get_queryset(self):
        queryset = Signal.objects.select_related('message', 'channel').all()
        
        # Фильтрация по каналу
        channel_id = self.request.query_params.get('channel_id', None)
        if channel_id is not None:
            queryset = queryset.filter(channel_id=channel_id)
        
        # Фильтрация по тикеру
        ticker = self.request.query_params.get('ticker', None)
        if ticker:
            queryset = queryset.filter(ticker__iexact=ticker)
        
        # Фильтрация по направлению
        direction = self.request.query_params.get('direction', None)
        if direction:
            queryset = queryset.filter(direction=direction)
        
        # Фильтрация по дате
        date_from = self.request.query_params.get('date_from', None)
        if date_from:
            queryset = queryset.filter(timestamp__gte=date_from)
        
        date_to = self.request.query_params.get('date_to', None)
        if date_to:
            queryset = queryset.filter(timestamp__lte=date_to)
        
        return queryset.order_by('-timestamp')
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Получить недавние сигналы (за последние 24 часа)."""
        yesterday = timezone.now() - timedelta(days=1)
        signals = self.get_queryset().filter(timestamp__gte=yesterday)
        page = self.paginate_queryset(signals)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(signals, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Получить статистику по сигналам."""
        total_signals = Signal.objects.count()
        long_signals = Signal.objects.filter(direction='LONG').count()
        short_signals = Signal.objects.filter(direction='SHORT').count()
        
        # Топ тикеров
        top_tickers = Signal.objects.values('ticker').annotate(
            count=Count('id')
        ).order_by('-count')[:10]
        
        # Сигналы по каналам
        signals_by_channel = Signal.objects.values('channel__name').annotate(
            count=Count('id')
        ).order_by('-count')
        
        return Response({
            'total_signals': total_signals,
            'long_signals': long_signals,
            'short_signals': short_signals,
            'top_tickers': top_tickers,
            'signals_by_channel': signals_by_channel,
        }) 