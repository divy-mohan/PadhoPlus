from django.contrib import admin
from .models import (
    Subject, Topic, Batch, BatchFAQ, Schedule,
    Enrollment, Announcement, BatchReview
)


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'order']
    list_filter = []
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order', 'name']
    
    def has_add_permission(self, request):
        return request.user.is_staff
    
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_staff
    
    def has_view_permission(self, request, obj=None):
        return request.user.is_staff or request.user.is_superuser


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ['name', 'subject', 'chapter_number', 'order']
    list_filter = ['subject']
    search_fields = ['name', 'subject__name']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['subject', 'chapter_number', 'order']
    
    def has_add_permission(self, request):
        return request.user.is_staff
    
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_staff


class BatchFAQInline(admin.TabularInline):
    model = BatchFAQ
    extra = 1


class ScheduleInline(admin.TabularInline):
    model = Schedule
    extra = 1


@admin.register(Batch)
class BatchAdmin(admin.ModelAdmin):
    list_display = ['name', 'target_exam', 'status', 'is_free', 'price', 'is_featured']
    list_filter = ['target_exam', 'status', 'is_free', 'language', 'is_featured', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
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
            'fields': ('features', 'includes')
        }),
        ('Settings', {
            'fields': ('max_students', 'is_featured', 'is_active')
        }),
    )
    
    def has_add_permission(self, request):
        return request.user.is_staff
    
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_staff


@admin.register(BatchFAQ)
class BatchFAQAdmin(admin.ModelAdmin):
    list_display = ['batch', 'question', 'order']
    list_filter = ['batch']
    search_fields = ['question', 'answer', 'batch__name']
    ordering = ['batch', 'order']
    
    def has_add_permission(self, request):
        return request.user.is_staff
    
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_staff


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['batch', 'subject', 'day', 'start_time', 'end_time', 'is_live']
    list_filter = ['batch', 'day', 'is_live']
    search_fields = ['batch__name', 'subject__name']
    ordering = ['batch', 'day', 'start_time']
    
    def has_add_permission(self, request):
        return request.user.is_staff
    
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_staff


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['student', 'batch', 'status', 'progress_percentage', 'enrolled_at']
    list_filter = ['status', 'batch__target_exam', 'enrolled_at']
    search_fields = ['student__username', 'student__email', 'batch__name']
    autocomplete_fields = ['student', 'batch']
    date_hierarchy = 'enrolled_at'
    
    def has_add_permission(self, request):
        return request.user.is_staff
    
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_staff


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'batch', 'author', 'priority', 'is_pinned', 'created_at']
    list_filter = ['priority', 'is_pinned', 'batch']
    search_fields = ['title', 'content', 'batch__name']
    autocomplete_fields = ['batch', 'author']
    date_hierarchy = 'created_at'
    
    def has_add_permission(self, request):
        return request.user.is_staff
    
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_staff


@admin.register(BatchReview)
class BatchReviewAdmin(admin.ModelAdmin):
    list_display = ['student', 'batch', 'rating', 'is_verified', 'created_at']
    list_filter = ['rating', 'is_verified']
    search_fields = ['student__username', 'batch__name', 'review']
    autocomplete_fields = ['student', 'batch']
    readonly_fields = ['rating', 'review', 'student', 'batch', 'created_at']
    
    def has_add_permission(self, request):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_staff
    
    def has_change_permission(self, request, obj=None):
        return False
