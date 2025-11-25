from django.contrib import admin
from .models import (
    Subject, Topic, Batch, BatchFAQ, Schedule,
    Enrollment, Announcement, BatchReview
)


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order', 'name']


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ['name', 'subject', 'chapter_number', 'order', 'is_active']
    list_filter = ['subject', 'is_active']
    search_fields = ['name', 'subject__name']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['subject', 'chapter_number', 'order']


class BatchFAQInline(admin.TabularInline):
    model = BatchFAQ
    extra = 1


class ScheduleInline(admin.TabularInline):
    model = Schedule
    extra = 1


@admin.register(Batch)
class BatchAdmin(admin.ModelAdmin):
    list_display = ['name', 'target_exam', 'target_year', 'status', 'is_free', 'price', 'is_featured', 'is_active']
    list_filter = ['target_exam', 'status', 'is_free', 'is_featured', 'is_active', 'language']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    filter_horizontal = ['subjects', 'faculty']
    inlines = [ScheduleInline, BatchFAQInline]
    
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'description', 'short_description', 'thumbnail', 'promo_video_url')
        }),
        ('Target', {
            'fields': ('target_exam', 'target_class', 'target_year', 'language')
        }),
        ('Schedule', {
            'fields': ('start_date', 'end_date', 'status')
        }),
        ('Pricing', {
            'fields': ('price', 'discounted_price', 'is_free', 'emi_available', 'emi_months')
        }),
        ('Content', {
            'fields': ('subjects', 'faculty', 'features', 'includes')
        }),
        ('Settings', {
            'fields': ('max_students', 'is_featured', 'is_active')
        }),
    )


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['student', 'batch', 'status', 'progress_percentage', 'enrolled_at']
    list_filter = ['status', 'batch__target_exam', 'enrolled_at']
    search_fields = ['student__username', 'student__email', 'batch__name']
    autocomplete_fields = ['student', 'batch']
    date_hierarchy = 'enrolled_at'


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'batch', 'author', 'priority', 'is_pinned', 'is_active', 'created_at']
    list_filter = ['priority', 'is_pinned', 'is_active', 'batch']
    search_fields = ['title', 'content', 'batch__name']
    autocomplete_fields = ['batch', 'author']
    date_hierarchy = 'created_at'


@admin.register(BatchReview)
class BatchReviewAdmin(admin.ModelAdmin):
    list_display = ['student', 'batch', 'rating', 'is_verified', 'is_active', 'created_at']
    list_filter = ['rating', 'is_verified', 'is_active']
    search_fields = ['student__username', 'batch__name', 'review']
    autocomplete_fields = ['student', 'batch']
