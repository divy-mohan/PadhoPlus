from django.contrib import admin
from .models import (
    UserProgress, DailyActivity, Streak,
    Achievement, UserAchievement, Leaderboard
)


@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'batch', 'subject', 'topic', 'lectures_watched', 'questions_attempted', 'strength_level']
    list_filter = ['batch', 'subject', 'strength_level']
    search_fields = ['user__username', 'subject__name']
    autocomplete_fields = ['user', 'batch', 'subject', 'topic']


@admin.register(DailyActivity)
class DailyActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'date', 'time_spent_minutes', 'lectures_watched', 'questions_practiced', 'tests_taken']
    list_filter = ['date']
    search_fields = ['user__username']
    autocomplete_fields = ['user']
    date_hierarchy = 'date'


@admin.register(Streak)
class StreakAdmin(admin.ModelAdmin):
    list_display = ['user', 'current_streak', 'longest_streak', 'total_points', 'last_activity_date']
    search_fields = ['user__username']
    autocomplete_fields = ['user']


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['name', 'achievement_type', 'points', 'is_active']
    list_filter = ['achievement_type', 'is_active']
    search_fields = ['name', 'description']


@admin.register(UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    list_display = ['user', 'achievement', 'earned_at']
    list_filter = ['achievement', 'earned_at']
    search_fields = ['user__username', 'achievement__name']
    autocomplete_fields = ['user', 'achievement']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['user', 'batch', 'leaderboard_type', 'rank', 'score', 'period_start', 'period_end']
    list_filter = ['leaderboard_type', 'batch']
    search_fields = ['user__username']
    autocomplete_fields = ['user', 'batch']
