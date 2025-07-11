from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .models import Category, Product, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, OrderItemSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for Category model with drf-spectacular documentation."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    @extend_schema(
        summary="Get active categories",
        description="Returns only active categories",
        responses={200: CategorySerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get only active categories."""
        categories = Category.objects.filter(is_active=True)
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    """ViewSet for Product model with nested routing."""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    @extend_schema(
        summary="Get products by category",
        parameters=[
            OpenApiParameter(name='category_id', type=int, location=OpenApiParameter.PATH)
        ],
        responses={200: ProductSerializer(many=True)}
    )
    @action(detail=False, methods=['get'], url_path='by-category/(?P<category_id>[^/.]+)')
    def by_category(self, request, category_id=None):
        """Get products filtered by category."""
        products = Product.objects.filter(category_id=category_id)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
    
    @extend_schema(
        summary="Get low stock products",
        description="Returns products with stock less than 10",
        responses={200: ProductSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        """Get products with low stock."""
        products = Product.objects.filter(stock__lt=10)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)


class OrderItemViewSet(viewsets.ModelViewSet):
    """ViewSet for OrderItem model."""
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """ViewSet for Order model with nested routing."""
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    @extend_schema(
        summary="Get orders by status",
        parameters=[
            OpenApiParameter(name='status', type=str, location=OpenApiParameter.QUERY)
        ],
        responses={200: OrderSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def by_status(self, request):
        """Get orders filtered by status."""
        status_param = request.query_params.get('status')
        if status_param:
            orders = Order.objects.filter(status=status_param)
        else:
            orders = Order.objects.all()
        serializer = self.get_serializer(orders, many=True)
        return Response(serializer.data)
    
    @extend_schema(
        summary="Cancel order",
        responses={200: OrderSerializer}
    )
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel an order."""
        order = self.get_object()
        order.status = 'cancelled'
        order.save()
        serializer = self.get_serializer(order)
        return Response(serializer.data) 