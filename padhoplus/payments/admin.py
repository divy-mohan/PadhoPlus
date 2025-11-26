from django.contrib import admin
from .models import BatchPricing, Enrollment, Payment, StudentProgress, Achievement, StudentAchievement


@admin.register(BatchPricing)
class BatchPricingAdmin(admin.ModelAdmin):
    list_display = ['batch', 'pricing_type', 'regular_price', 'is_active']
    list_filter = ['pricing_type', 'is_active']
    search_fields = ['batch__name']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['student', 'batch', 'status', 'progress_percentage']
    list_filter = ['status', 'enrollment_date']
    search_fields = ['student__username', 'batch__name']
    readonly_fields = ['enrollment_date', 'created_at', 'updated_at']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'student', 'amount', 'status', 'payment_method']
    list_filter = ['status', 'payment_method', 'payment_date']
    search_fields = ['student__username', 'transaction_id']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(StudentProgress)
class StudentProgressAdmin(admin.ModelAdmin):
    list_display = ['student', 'current_streak', 'total_watch_time', 'average_test_score']
    list_filter = ['last_activity_date']
    search_fields = ['student__username']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'points', 'is_active']
    list_filter = ['type', 'is_active']
    search_fields = ['title', 'description']


@admin.register(StudentAchievement)
class StudentAchievementAdmin(admin.ModelAdmin):
    list_display = ['student', 'achievement', 'earned_date']
    list_filter = ['earned_date']
    search_fields = ['student__username', 'achievement__title']
    readonly_fields = ['earned_date']
