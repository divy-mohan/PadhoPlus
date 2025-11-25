from django.contrib import admin
from .models import Doubt, DoubtResponse, DoubtUpvote


class DoubtResponseInline(admin.TabularInline):
    model = DoubtResponse
    extra = 0
    readonly_fields = ['responder', 'created_at']


@admin.register(Doubt)
class DoubtAdmin(admin.ModelAdmin):
    list_display = ['title', 'student', 'subject', 'status', 'is_resolved', 'assigned_to', 'created_at']
    list_filter = ['status', 'is_resolved', 'priority', 'subject', 'created_at']
    search_fields = ['title', 'description', 'student__username']
    autocomplete_fields = ['student', 'subject', 'topic', 'lecture', 'assigned_to']
    inlines = [DoubtResponseInline]
    date_hierarchy = 'created_at'
    
    fieldsets = (
        (None, {
            'fields': ('student', 'subject', 'topic', 'lecture')
        }),
        ('Doubt', {
            'fields': ('title', 'description', 'image')
        }),
        ('Status', {
            'fields': ('status', 'priority', 'is_resolved', 'is_public')
        }),
        ('Assignment', {
            'fields': ('assigned_to',)
        }),
        ('Stats', {
            'fields': ('views_count', 'upvotes'),
            'classes': ('collapse',)
        }),
    )


@admin.register(DoubtResponse)
class DoubtResponseAdmin(admin.ModelAdmin):
    list_display = ['doubt', 'responder', 'is_accepted', 'upvotes', 'created_at']
    list_filter = ['is_accepted', 'created_at']
    search_fields = ['doubt__title', 'responder__username', 'content']
    autocomplete_fields = ['doubt', 'responder']


@admin.register(DoubtUpvote)
class DoubtUpvoteAdmin(admin.ModelAdmin):
    list_display = ['user', 'doubt', 'response', 'created_at']
    list_filter = ['created_at']
    autocomplete_fields = ['user', 'doubt', 'response']
