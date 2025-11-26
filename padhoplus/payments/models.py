from django.db import models
from django.utils import timezone
from padhoplus.users.models import User
from padhoplus.batches.models import Batch


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


class Enrollment(models.Model):
    """Track student enrollment in batches"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='enrollments')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    enrollment_date = models.DateTimeField(auto_now_add=True)
    completed_date = models.DateTimeField(blank=True, null=True)
    
    progress_percentage = models.FloatField(default=0)
    total_watch_time = models.IntegerField(default=0)  # in minutes
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'enrollments'
        unique_together = ['student', 'batch']
        ordering = ['-enrollment_date']
    
    def __str__(self):
        return f"{self.student.username} -> {self.batch.name}"


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
        ('stripe', 'Stripe'),
        ('razorpay', 'Razorpay'),
        ('upi', 'UPI'),
        ('manual', 'Manual Transfer'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    enrollment = models.OneToOneField(Enrollment, on_delete=models.CASCADE, related_name='payment', null=True, blank=True)
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='INR')
    
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='stripe')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    transaction_id = models.CharField(max_length=255, unique=True)
    stripe_session_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True, null=True)
    
    payment_date = models.DateTimeField(blank=True, null=True)
    failed_reason = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'payments'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Payment {self.transaction_id} - {self.student.username}"


class StudentProgress(models.Model):
    """Track student progress and learning stats"""
    student = models.OneToOneField(User, on_delete=models.CASCADE, related_name='progress')
    
    total_watch_time = models.IntegerField(default=0)  # in minutes
    current_streak = models.IntegerField(default=0)  # in days
    longest_streak = models.IntegerField(default=0)
    
    total_doubts_resolved = models.IntegerField(default=0)
    total_tests_taken = models.IntegerField(default=0)
    average_test_score = models.FloatField(default=0)
    
    last_activity_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'student_progress'
    
    def __str__(self):
        return f"Progress - {self.student.username}"


class Achievement(models.Model):
    """Gamification - Student achievements and badges"""
    TYPE_CHOICES = [
        ('badge', 'Badge'),
        ('milestone', 'Milestone'),
        ('streak', 'Streak'),
        ('achievement', 'Achievement'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    
    icon = models.CharField(max_length=50)  # lucide icon name
    color = models.CharField(max_length=50, default='blue')
    
    points = models.IntegerField(default=10)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'achievements'
    
    def __str__(self):
        return self.title


class StudentAchievement(models.Model):
    """Track which achievements a student has earned"""
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    
    earned_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'student_achievements'
        unique_together = ['student', 'achievement']
    
    def __str__(self):
        return f"{self.student.username} -> {self.achievement.title}"
