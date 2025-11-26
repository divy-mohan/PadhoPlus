from django.contrib import admin
from .models import BatchPricing, Payment, PaymentGateway


@admin.register(PaymentGateway)
class PaymentGatewayAdmin(admin.ModelAdmin):
    list_display = ['name', 'display_name', 'is_active', 'is_default', 'priority']
    list_filter = ['is_active', 'is_default']
    search_fields = ['name', 'display_name']
    list_editable = ['is_active', 'is_default', 'priority']


@admin.register(BatchPricing)
class BatchPricingAdmin(admin.ModelAdmin):
    list_display = ['batch', 'pricing_type', 'regular_price', 'is_active']
    list_filter = ['pricing_type', 'is_active']
    search_fields = ['batch__name']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'student', 'amount', 'status', 'payment_method', 'created_at']
    list_filter = ['status', 'payment_method', 'created_at']
    search_fields = ['student__username', 'transaction_id', 'merchant_transaction_id']
    readonly_fields = ['created_at', 'updated_at', 'gateway_response']
    date_hierarchy = 'created_at'
