from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Category, Product, Order, OrderItem


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    """Admin interface for Category model."""
    
    list_display = ['id', 'name', 'description', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'description']
    ordering = ['name']
    readonly_fields = ['id']
    
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'is_active')
        }),
    )


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    """Admin interface for Product model."""
    
    list_display = ['id', 'name', 'category', 'price', 'stock', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['name', 'description', 'category__name']
    ordering = ['name']
    readonly_fields = ['id', 'created_at']
    list_editable = ['price', 'stock']
    
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'category', 'price', 'stock')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        """Optimize queryset with select_related."""
        return super().get_queryset(request).select_related('category')


class OrderItemInline(admin.TabularInline):
    """Inline admin for OrderItem."""
    
    model = OrderItem
    extra = 1
    fields = ['product', 'quantity', 'price']
    readonly_fields = ['price']
    
    def get_queryset(self, request):
        """Optimize queryset with select_related."""
        return super().get_queryset(request).select_related('product')


@admin.register(Order)
class OrderAdmin(ModelAdmin):
    """Admin interface for Order model."""
    
    list_display = ['id', 'order_number', 'status', 'total_amount', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['order_number']
    ordering = ['-created_at']
    readonly_fields = ['id', 'created_at']
    list_editable = ['status']
    
    fieldsets = (
        ('Order Information', {
            'fields': ('order_number', 'status', 'total_amount')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    inlines = [OrderItemInline]
    
    def get_queryset(self, request):
        """Optimize queryset with prefetch_related."""
        return super().get_queryset(request).prefetch_related('items')


@admin.register(OrderItem)
class OrderItemAdmin(ModelAdmin):
    """Admin interface for OrderItem model."""
    
    list_display = ['id', 'order', 'product', 'quantity', 'price']
    list_filter = ['order__status']
    search_fields = ['order__order_number', 'product__name']
    ordering = ['-id']
    readonly_fields = ['id']
    
    fieldsets = (
        (None, {
            'fields': ('order', 'product', 'quantity', 'price')
        }),
    )
    
    def get_queryset(self, request):
        """Optimize queryset with select_related."""
        return super().get_queryset(request).select_related('order', 'product') 