from django.contrib import admin
from django.forms import ModelForm
from .models import (
    Language, Subject, Topic, Batch, BatchFAQ, Schedule,
    Enrollment, Announcement, BatchReview, BatchSubjectFaculty
)


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'icon', 'is_active', 'order']
    list_filter = ['is_active']
    search_fields = ['name', 'code']
    ordering = ['order', 'name']
    
    fieldsets = (
        (None, {
            'fields': ('name', 'code', 'icon')
        }),
        ('Settings', {
            'fields': ('is_active', 'order')
        }),
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


class BatchSubjectFacultyInline(admin.TabularInline):
    model = BatchSubjectFaculty
    extra = 1
    fields = ['subject', 'faculty']
    autocomplete_fields = ['subject', 'faculty']


@admin.register(Batch)
class BatchAdmin(admin.ModelAdmin):
    list_display = ['name', 'target_exam', 'status', 'is_free', 'price', 'is_featured']
    list_filter = ['target_exam', 'status', 'is_free', 'language', 'is_featured', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ScheduleInline, BatchSubjectFacultyInline, BatchFAQInline]
    readonly_fields = ['thumbnail_preview']
    
    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return f'<img src="{obj.thumbnail.url}" width="100" height="100" style="border-radius: 5px;" />'
        return 'No image uploaded'
    thumbnail_preview.allow_tags = True
    
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'description', 'short_description', 'thumbnail', 'thumbnail_preview', 'promo_video_url')
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


@admin.register(BatchSubjectFaculty)
class BatchSubjectFacultyAdmin(admin.ModelAdmin):
    list_display = ['batch', 'subject', 'faculty', 'created_at']
    list_filter = ['batch', 'subject']
    search_fields = ['batch__name', 'subject__name', 'faculty__user__full_name']
    readonly_fields = ['created_at', 'updated_at']
    
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


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['batch', 'day', 'start_time', 'end_time', 'subject']
    list_filter = ['batch', 'subject']
    search_fields = ['batch__name', 'subject__name']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['student', 'batch', 'created_at']
    list_filter = ['batch', 'created_at']
    search_fields = ['student__username', 'batch__name']
    ordering = ['-created_at']


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['batch', 'title', 'is_active', 'created_at']
    list_filter = ['batch', 'is_active', 'created_at']
    search_fields = ['title', 'content']
    ordering = ['-created_at']


@admin.register(BatchReview)
class BatchReviewAdmin(admin.ModelAdmin):
    list_display = ['batch', 'student', 'rating', 'is_verified', 'is_active']
    list_filter = ['batch', 'rating', 'is_verified', 'is_active']
    search_fields = ['batch__name', 'student__username', 'review']
    ordering = ['-created_at']
