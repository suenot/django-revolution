from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .views import CategoryViewSet, ProductViewSet, OrderViewSet, OrderItemViewSet

# Main router
router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order-items', OrderItemViewSet)

# Nested router for categories
categories_router = routers.NestedDefaultRouter(router, r'categories', lookup='category')
categories_router.register(r'products', ProductViewSet, basename='category-products')

# Nested router for products
products_router = routers.NestedDefaultRouter(router, r'products', lookup='product')
products_router.register(r'order-items', OrderItemViewSet, basename='product-order-items')

# Nested router for orders
orders_router = routers.NestedDefaultRouter(router, r'orders', lookup='order')
orders_router.register(r'items', OrderItemViewSet, basename='order-items')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(categories_router.urls)),
    path('', include(products_router.urls)),
    path('', include(orders_router.urls)),
]