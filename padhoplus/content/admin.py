from django.contrib import admin
from .models import Lecture, Note, Resource, WatchHistory, Bookmark


class ResourceInline(admin.TabularInline):
    model = Resource
    extra = 1


@admin.register(Lecture)
class LectureAdmin(admin.ModelAdmin):
    list_display = ['title', 'batch', 'subject', 'teacher', 'duration_minutes', 'is_demo', 'is_live', 'is_active', 'views_count']
    list_filter = ['batch', 'subject', 'is_demo', 'is_live', 'is_free', 'is_active']
    search_fields = ['title', 'description', 'batch__name']
    autocomplete_fields = ['batch', 'subject', 'topic', 'teacher']
    ordering = ['batch', 'subject', 'order']
    inlines = [ResourceInline]
    
    fieldsets = (
        (None, {
            'fields': ('batch', 'subject', 'topic', 'teacher', 'title', 'description')
        }),
        ('Video', {
            'fields': ('video_url', 'thumbnail', 'duration_minutes')
        }),
        ('Settings', {
            'fields': ('order', 'is_live', 'live_datetime', 'is_demo', 'is_free', 'is_active')
        }),
        ('Stats', {
            'fields': ('views_count',),
            'classes': ('collapse',)
        }),
    )


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject', 'file_type', 'is_free', 'is_active', 'downloads_count']
    list_filter = ['file_type', 'is_free', 'is_active', 'subject']
    search_fields = ['title', 'description']
    autocomplete_fields = ['batch', 'subject', 'topic', 'lecture']


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['title', 'lecture', 'resource_type', 'is_active']
    list_filter = ['resource_type', 'is_active']
    search_fields = ['title', 'lecture__title']
    autocomplete_fields = ['lecture']


@admin.register(WatchHistory)
class WatchHistoryAdmin(admin.ModelAdmin):
    list_display = ['user', 'lecture', 'watched_duration', 'is_completed', 'last_watched_at']
    list_filter = ['is_completed', 'last_watched_at']
    search_fields = ['user__username', 'lecture__title']
    autocomplete_fields = ['user', 'lecture']
    date_hierarchy = 'last_watched_at'


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ['user', 'lecture', 'note', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'lecture__title', 'note__title']
    autocomplete_fields = ['user', 'lecture', 'note']
