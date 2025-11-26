from django.contrib import admin
from .models import BatchPricing, Payment


@admin.register(BatchPricing)
class BatchPricingAdmin(admin.ModelAdmin):
    list_display = ['batch', 'pricing_type', 'regular_price', 'is_active']
    list_filter = ['pricing_type', 'is_active']
    search_fields = ['batch__name']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'student', 'amount', 'status', 'payment_method']
    list_filter = ['status', 'payment_method', 'payment_date']
    search_fields = ['student__username', 'transaction_id']
    readonly_fields = ['created_at', 'updated_at']
