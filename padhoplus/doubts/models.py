from django.db import models
from padhoplus.users.models import User
from padhoplus.batches.models import Subject, Topic
from padhoplus.content.models import Lecture


class Doubt(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('answered', 'Answered'),
        ('closed', 'Closed'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doubts')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='doubts')
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, blank=True, related_name='doubts')
    lecture = models.ForeignKey(Lecture, on_delete=models.SET_NULL, null=True, blank=True, related_name='doubts')
    
    title = models.CharField(max_length=300)
    description = models.TextField()
    image = models.ImageField(upload_to='doubts/', blank=True, null=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    
    assigned_to = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='assigned_doubts',
        limit_choices_to={'role': 'teacher'}
    )
    
    is_public = models.BooleanField(default=True)
    is_resolved = models.BooleanField(default=False)
    
    views_count = models.IntegerField(default=0)
    upvotes = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'doubts'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.student.username} - {self.title[:50]}"


class DoubtResponse(models.Model):
    doubt = models.ForeignKey(Doubt, on_delete=models.CASCADE, related_name='responses')
    responder = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doubt_responses')
    
    content = models.TextField()
    image = models.ImageField(upload_to='doubt_responses/', blank=True, null=True)
    
    is_accepted = models.BooleanField(default=False)
    upvotes = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'doubt_responses'
        ordering = ['-is_accepted', '-upvotes', 'created_at']
    
    def __str__(self):
        return f"Response to: {self.doubt.title[:30]} by {self.responder.username}"


class DoubtUpvote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doubt_upvotes')
    doubt = models.ForeignKey(Doubt, on_delete=models.CASCADE, related_name='upvote_records', blank=True, null=True)
    response = models.ForeignKey(DoubtResponse, on_delete=models.CASCADE, related_name='upvote_records', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'doubt_upvotes'
        unique_together = [['user', 'doubt'], ['user', 'response']]
    
    def __str__(self):
        if self.doubt:
            return f"{self.user.username} upvoted doubt: {self.doubt.title[:30]}"
        return f"{self.user.username} upvoted response"
