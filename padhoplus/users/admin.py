from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Faculty, Testimonial, Result


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at']
    list_filter = ['role', 'is_active', 'is_staff', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'phone']
    ordering = ['-created_at']
    readonly_fields = ['profile_preview']
    
    def profile_preview(self, obj):
        if obj.profile_image:
            return f'<img src="{obj.profile_image.url}" width="100" height="100" />'
        return 'No image uploaded'
    profile_preview.allow_tags = True
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Profile', {
            'fields': ('role', 'phone', 'profile_image', 'profile_preview', 'bio')
        }),
        ('Student Info', {
            'fields': ('target_exam', 'target_year', 'current_class', 'school_college', 'language_preference'),
            'classes': ('collapse',)
        }),
        ('Teacher Info', {
            'fields': ('qualifications', 'experience_years', 'specialization'),
            'classes': ('collapse',)
        }),
        ('Referral', {
            'fields': ('referral_code', 'referred_by'),
            'classes': ('collapse',)
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Profile', {
            'fields': ('role', 'email', 'first_name', 'last_name', 'phone')
        }),
    )


@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ['user', 'designation', 'is_featured', 'order']
    list_filter = ['is_featured']
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'designation']
    ordering = ['order', 'user__first_name']
    autocomplete_fields = ['user']
    fieldsets = (
        ('Faculty Info', {
            'fields': ('user', 'designation', 'title')
        }),
        ('Profile', {
            'fields': ('subjects', 'specialization', 'achievements', 'teaching_style', 'intro_video_url')
        }),
        ('Display Settings', {
            'fields': ('is_featured', 'order')
        }),
    )


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'exam', 'rank', 'year', 'is_featured', 'is_active', 'order']
    list_filter = ['exam', 'is_featured', 'is_active', 'year']
    search_fields = ['name', 'quote']
    ordering = ['order', '-created_at']


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ['student_name', 'exam', 'year', 'rank', 'percentile', 'is_featured']
    list_filter = ['exam', 'year', 'is_featured', 'is_active']
    search_fields = ['student_name', 'batch_name']
    ordering = ['-year', 'rank']
