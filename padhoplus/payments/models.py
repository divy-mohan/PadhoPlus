from django.db import models
from django.utils import timezone
from padhoplus.users.models import User
from padhoplus.batches.models import Batch, Enrollment


class BatchPricing(models.Model):
    """Manage pricing variations for batches"""
    PRICING_TYPE_CHOICES = [
        ('one_time', 'One-Time Payment'),
        ('emi', 'EMI Plan'),
        ('subscription', 'Subscription'),
    ]
    
    batch = models.OneToOneField(Batch, on_delete=models.CASCADE, related_name='pricing')
    pricing_type = models.CharField(max_length=20, choices=PRICING_TYPE_CHOICES, default='one_time')
    
    regular_price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    emi_months = models.IntegerField(blank=True, null=True)
    emi_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    stripe_product_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_price_id = models.CharField(max_length=255, blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'batch_pricing'
    
    def __str__(self):
        return f"{self.batch.name} - {self.get_pricing_type_display()}"


class PaymentGateway(models.Model):
    """Configuration for available payment gateways"""
    GATEWAY_CHOICES = [
        ('phonepe', 'PhonePe'),
        ('razorpay', 'Razorpay'),
        ('stripe', 'Stripe'),
        ('paytm', 'Paytm'),
    ]
    
    name = models.CharField(max_length=50, choices=GATEWAY_CHOICES, unique=True)
    display_name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    is_default = models.BooleanField(default=False)
    priority = models.IntegerField(default=0)
    
    supports_upi = models.BooleanField(default=True)
    supports_cards = models.BooleanField(default=True)
    supports_netbanking = models.BooleanField(default=True)
    supports_wallets = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'payment_gateways'
        ordering = ['-is_default', 'priority', 'name']
    
    def __str__(self):
        return self.display_name


class Payment(models.Model):
    """Track all payments"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('phonepe', 'PhonePe'),
        ('razorpay', 'Razorpay'),
        ('stripe', 'Stripe'),
        ('paytm', 'Paytm'),
        ('upi', 'UPI'),
        ('manual', 'Manual Transfer'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    enrollment = models.OneToOneField(Enrollment, on_delete=models.CASCADE, related_name='payment', null=True, blank=True)
    gateway = models.ForeignKey(PaymentGateway, on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='INR')
    
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='phonepe')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    transaction_id = models.CharField(max_length=255, unique=True)
    merchant_transaction_id = models.CharField(max_length=255, blank=True, null=True)
    
    gateway_transaction_id = models.CharField(max_length=255, blank=True, null=True)
    gateway_order_id = models.CharField(max_length=255, blank=True, null=True)
    gateway_response = models.JSONField(blank=True, null=True)
    
    payment_date = models.DateTimeField(blank=True, null=True)
    failed_reason = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'payments'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Payment {self.transaction_id} - {self.student.username}"
