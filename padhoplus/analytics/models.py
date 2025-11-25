from django.db import models
from padhoplus.users.models import User
from padhoplus.batches.models import Batch, Subject, Topic


class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='student_progress')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='student_progress')
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, blank=True, related_name='student_progress')
    
    lectures_watched = models.IntegerField(default=0)
    total_lectures = models.IntegerField(default=0)
    time_spent_minutes = models.IntegerField(default=0)
    
    questions_attempted = models.IntegerField(default=0)
    questions_correct = models.IntegerField(default=0)
    
    tests_taken = models.IntegerField(default=0)
    average_test_score = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    strength_level = models.CharField(max_length=20, blank=True, null=True)
    
    last_activity_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'user_progress'
        unique_together = ['user', 'batch', 'subject', 'topic']
        ordering = ['-last_activity_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.subject.name}"
    
    @property
    def completion_percentage(self):
        if self.total_lectures == 0:
            return 0
        return round((self.lectures_watched / self.total_lectures) * 100, 2)
    
    @property
    def accuracy(self):
        if self.questions_attempted == 0:
            return 0
        return round((self.questions_correct / self.questions_attempted) * 100, 2)


class DailyActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='daily_activities')
    date = models.DateField()
    
    time_spent_minutes = models.IntegerField(default=0)
    lectures_watched = models.IntegerField(default=0)
    questions_practiced = models.IntegerField(default=0)
    tests_taken = models.IntegerField(default=0)
    doubts_asked = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'daily_activities'
        unique_together = ['user', 'date']
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.user.username} - {self.date}"


class Streak(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='streak')
    
    current_streak = models.IntegerField(default=0)
    longest_streak = models.IntegerField(default=0)
    last_activity_date = models.DateField(blank=True, null=True)
    
    total_points = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'streaks'
    
    def __str__(self):
        return f"{self.user.username} - Streak: {self.current_streak}"


class Achievement(models.Model):
    TYPE_CHOICES = [
        ('badge', 'Badge'),
        ('certificate', 'Certificate'),
        ('milestone', 'Milestone'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True, null=True)
    achievement_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='badge')
    
    points = models.IntegerField(default=0)
    
    criteria = models.JSONField(default=dict, blank=True)
    
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'achievements'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, related_name='users')
    
    earned_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'user_achievements'
        unique_together = ['user', 'achievement']
        ordering = ['-earned_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.achievement.name}"


class Leaderboard(models.Model):
    TYPE_CHOICES = [
        ('overall', 'Overall'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('batch', 'Batch-wise'),
        ('test', 'Test-wise'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, blank=True, null=True, related_name='leaderboard')
    
    leaderboard_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='overall')
    
    rank = models.IntegerField()
    score = models.DecimalField(max_digits=10, decimal_places=2)
    
    period_start = models.DateField(blank=True, null=True)
    period_end = models.DateField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'leaderboards'
        ordering = ['rank']
    
    def __str__(self):
        return f"{self.user.username} - Rank {self.rank} ({self.get_leaderboard_type_display()})"
