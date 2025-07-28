from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChannelViewSet, MessageViewSet, SignalViewSet

router = DefaultRouter()
router.register(r'channels', ChannelViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'signals', SignalViewSet)

app_name = 'trading_signals'

urlpatterns = [
    path('', include(router.urls)),
] 