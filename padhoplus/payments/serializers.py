from rest_framework import serializers
from .models import Payment, PaymentGateway, BatchPricing


class PaymentGatewaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentGateway
        fields = [
            'id', 'name', 'display_name', 'icon', 'description',
            'is_active', 'is_default', 'supports_upi', 'supports_cards',
            'supports_netbanking', 'supports_wallets'
        ]


class PaymentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    gateway_name = serializers.CharField(source='gateway.display_name', read_only=True, allow_null=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'transaction_id', 'merchant_transaction_id',
            'student', 'student_name', 'enrollment', 'gateway', 'gateway_name',
            'amount', 'currency', 'payment_method', 'status',
            'gateway_transaction_id', 'gateway_order_id',
            'payment_date', 'failed_reason', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class BatchPricingSerializer(serializers.ModelSerializer):
    batch_name = serializers.CharField(source='batch.name', read_only=True)
    
    class Meta:
        model = BatchPricing
        fields = [
            'id', 'batch', 'batch_name', 'pricing_type',
            'regular_price', 'discounted_price',
            'emi_months', 'emi_amount', 'is_active'
        ]
