from django.db import models
from django.utils.text import slugify
from padhoplus.users.models import User


class Language(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True)
    icon = models.CharField(max_length=50, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'languages'
        ordering = ['order', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.code})"


class Subject(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=20, blank=True, null=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'subjects'
        ordering = ['order', 'name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class Topic(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='topics')
    name = models.CharField(max_length=200)
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    chapter_number = models.IntegerField(default=1)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'topics'
        ordering = ['subject', 'chapter_number', 'order']
        unique_together = ['subject', 'slug']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.subject.name} - {self.name}"


class Batch(models.Model):
    EXAM_CHOICES = [
        ('jee_main', 'JEE Main'),
        ('jee_advanced', 'JEE Advanced'),
        ('neet', 'NEET'),
        ('boards', 'Board Exams'),
        ('foundation', 'Foundation'),
        ('olympiad', 'Olympiad'),
        ('other', 'Other'),
    ]
    
    CLASS_CHOICES = [
        ('class_6', 'Class 6'),
        ('class_7', 'Class 7'),
        ('class_8', 'Class 8'),
        ('class_9', 'Class 9'),
        ('class_10', 'Class 10'),
        ('class_11', 'Class 11'),
        ('class_12', 'Class 12'),
        ('foundation', 'Foundation'),
        ('drop_year', 'Drop Year'),
    ]
    
    YEAR_CHOICES = [
        (2024, '2024'),
        (2025, '2025'),
        (2026, '2026'),
        (2027, '2027'),
        (2028, '2028'),
        (2029, '2029'),
        (2030, '2030'),
    ]
    
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
    ]
    
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=255, blank=True, null=True)
    target_exam = models.CharField(max_length=50, choices=EXAM_CHOICES)
    target_class = models.CharField(max_length=50, choices=CLASS_CHOICES)
    target_year = models.IntegerField(choices=YEAR_CHOICES, blank=True, null=True)
    language = models.CharField(max_length=20, choices=[('en', 'English'), ('hi', 'Hindi'), ('hinglish', 'Hinglish')], default='en')
    thumbnail = models.ImageField(upload_to='batch_thumbnails/', blank=True, null=True)
    promo_video_url = models.CharField(max_length=500, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, default='upcoming')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_free = models.BooleanField(default=False)
    emi_available = models.BooleanField(default=False)
    emi_months = models.IntegerField(blank=True, null=True)
    features = models.JSONField(default=dict, blank=True)
    includes = models.JSONField(default=dict, blank=True)
    max_students = models.IntegerField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'batches'
        verbose_name_plural = 'Batches'
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class BatchFAQ(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='faqs')
    question = models.CharField(max_length=500)
    answer = models.TextField()
    order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'batch_faqs'
        ordering = ['order']
    
    def __str__(self):
        return f"{self.batch.name} - {self.question[:50]}"


class Schedule(models.Model):
    DAY_CHOICES = [
        ('mon', 'Monday'),
        ('tue', 'Tuesday'),
        ('wed', 'Wednesday'),
        ('thu', 'Thursday'),
        ('fri', 'Friday'),
        ('sat', 'Saturday'),
        ('sun', 'Sunday'),
    ]
    
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='schedules')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    day = models.CharField(max_length=3, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_live = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'schedules'
        ordering = ['day', 'start_time']
    
    def __str__(self):
        return f"{self.batch.name} - {self.subject.name} ({self.get_day_display()} {self.start_time})"


class Enrollment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='enrollments')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    enrolled_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=True, null=True)
    
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    last_accessed_at = models.DateTimeField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'enrollments'
        unique_together = ['student', 'batch']
        ordering = ['-enrolled_at']
    
    def __str__(self):
        return f"{self.student.username} - {self.batch.name}"


class Announcement(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='announcements')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='announcements')
    
    title = models.CharField(max_length=200)
    content = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    
    is_pinned = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'announcements'
        ordering = ['-is_pinned', '-created_at']
    
    def __str__(self):
        return f"{self.batch.name} - {self.title}"


class BatchReview(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='reviews')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='batch_reviews')
    rating = models.IntegerField()
    review = models.TextField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'batch_reviews'
        unique_together = ['batch', 'student']
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.student.username} - {self.batch.name} ({self.rating}/5)"
