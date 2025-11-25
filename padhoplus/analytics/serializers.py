from rest_framework import serializers
from .models import (
    UserProgress, DailyActivity, Streak, 
    Achievement, UserAchievement, Leaderboard
)
from padhoplus.users.serializers import UserSerializer
from padhoplus.batches.serializers import SubjectSerializer, TopicSerializer


class UserProgressSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    topic = TopicSerializer(read_only=True)
    completion_percentage = serializers.ReadOnlyField()
    accuracy = serializers.ReadOnlyField()
    
    class Meta:
        model = UserProgress
        fields = [
            'id', 'user', 'batch', 'subject', 'topic',
            'lectures_watched', 'total_lectures', 'completion_percentage',
            'time_spent_minutes', 'questions_attempted', 'questions_correct',
            'accuracy', 'tests_taken', 'average_test_score', 'strength_level',
            'last_activity_at', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class DailyActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyActivity
        fields = [
            'id', 'user', 'date', 'time_spent_minutes', 'lectures_watched',
            'questions_practiced', 'tests_taken', 'doubts_asked',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = [
            'id', 'user', 'current_streak', 'longest_streak',
            'last_activity_date', 'total_points', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AchievementSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_achievement_type_display', read_only=True)
    
    class Meta:
        model = Achievement
        fields = [
            'id', 'name', 'description', 'icon', 'achievement_type',
            'type_display', 'points', 'criteria', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class UserAchievementSerializer(serializers.ModelSerializer):
    achievement = AchievementSerializer(read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = ['id', 'user', 'achievement', 'earned_at']
        read_only_fields = ['id', 'earned_at']


class LeaderboardSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    type_display = serializers.CharField(source='get_leaderboard_type_display', read_only=True)
    
    class Meta:
        model = Leaderboard
        fields = [
            'id', 'user', 'batch', 'leaderboard_type', 'type_display',
            'rank', 'score', 'period_start', 'period_end',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
