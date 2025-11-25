from django.db import models
from padhoplus.users.models import User
from padhoplus.batches.models import Batch, Subject, Topic


class Lecture(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='lectures')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='lectures')
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, blank=True, related_name='lectures')
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='lectures')
    
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True, null=True)
    video_url = models.URLField()
    thumbnail = models.ImageField(upload_to='lectures/thumbnails/', blank=True, null=True)
    duration_minutes = models.IntegerField(default=0)
    
    order = models.IntegerField(default=0)
    is_live = models.BooleanField(default=False)
    live_datetime = models.DateTimeField(blank=True, null=True)
    
    is_demo = models.BooleanField(default=False)
    is_free = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    views_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'lectures'
        ordering = ['batch', 'subject', 'order']
    
    def __str__(self):
        return f"{self.batch.name} - {self.title}"


class Note(models.Model):
    TYPE_CHOICES = [
        ('notes', 'Notes'),
        ('pdf', 'PDF'),
        ('pyq', 'Previous Year Questions'),
        ('formula', 'Formula Sheet'),
        ('dpp', 'Daily Practice Problems'),
        ('solution', 'Solution'),
        ('other', 'Other'),
    ]
    
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='notes', blank=True, null=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='notes')
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, blank=True, related_name='notes')
    lecture = models.ForeignKey(Lecture, on_delete=models.SET_NULL, null=True, blank=True, related_name='notes')
    
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to='notes/')
    file_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='notes')
    
    is_free = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    downloads_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'notes'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} ({self.get_file_type_display()})"


class Resource(models.Model):
    TYPE_CHOICES = [
        ('slide', 'Slides'),
        ('worksheet', 'Worksheet'),
        ('assignment', 'Assignment'),
        ('reference', 'Reference Material'),
        ('other', 'Other'),
    ]
    
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='resources')
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='resources/')
    resource_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='other')
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'resources'
        ordering = ['lecture', 'title']
    
    def __str__(self):
        return f"{self.lecture.title} - {self.title}"


class WatchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watch_history')
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='watch_history')
    
    watched_duration = models.IntegerField(default=0)
    last_position = models.IntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(blank=True, null=True)
    
    first_watched_at = models.DateTimeField(auto_now_add=True)
    last_watched_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'watch_history'
        unique_together = ['user', 'lecture']
        ordering = ['-last_watched_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.lecture.title}"


class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='bookmarks', blank=True, null=True)
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name='bookmarks', blank=True, null=True)
    
    notes_text = models.TextField(blank=True, null=True)
    timestamp = models.IntegerField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'bookmarks'
        ordering = ['-created_at']
    
    def __str__(self):
        if self.lecture:
            return f"{self.user.username} - {self.lecture.title}"
        return f"{self.user.username} - {self.note.title}"
