from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('parent', 'Parent'),
        ('admin', 'Admin'),
    ]
    
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('hi', 'Hindi'),
        ('hinglish', 'Hinglish'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student', blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.CharField(max_length=255, blank=True, null=True)  # Changed from ImageField to CharField to match DB
    bio = models.TextField(blank=True, null=True)
    
    target_exam = models.CharField(max_length=50, blank=True, null=True)
    target_year = models.IntegerField(blank=True, null=True)
    current_class = models.CharField(max_length=20, blank=True, null=True)
    school_college = models.CharField(max_length=200, blank=True, null=True)
    
    language_preference = models.CharField(max_length=20, choices=LANGUAGE_CHOICES, default='en', blank=True, null=True)
    
    qualifications = models.TextField(blank=True, null=True)
    experience_years = models.IntegerField(blank=True, null=True)
    specialization = models.CharField(max_length=200, blank=True, null=True)
    
    referral_code = models.CharField(max_length=20, unique=True, blank=True, null=True)
    referred_by = models.ForeignKey(
        'self', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='referrals'
    )
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.username
    
    def is_student(self):
        return self.role == 'student'
    
    def is_teacher(self):
        return self.role == 'teacher'
    
    def is_parent(self):
        return self.role == 'parent'
    
    def is_platform_admin(self):
        return self.role == 'admin' or self.is_superuser


class Faculty(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='faculty_profile')
    title = models.CharField(max_length=100, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    intro_video_url = models.URLField(blank=True, null=True)
    subjects = models.JSONField(default=list, blank=True)
    achievements = models.TextField(blank=True, null=True)
    teaching_style = models.TextField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'faculty'
        verbose_name = 'Faculty'
        verbose_name_plural = 'Faculty Members'
        ordering = ['order', 'user__first_name']
    
    def __str__(self):
        return f"{self.user.full_name} - {self.designation or 'Faculty'}"


class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    profile_image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    role = models.CharField(max_length=100, blank=True, null=True)
    exam = models.CharField(max_length=50, blank=True, null=True)
    rank = models.CharField(max_length=50, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    quote = models.TextField()
    video_url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'testimonials'
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.exam or 'Student'}"


class Result(models.Model):
    student_name = models.CharField(max_length=100)
    profile_image = models.ImageField(upload_to='results/', blank=True, null=True)
    exam = models.CharField(max_length=50)
    year = models.IntegerField()
    rank = models.CharField(max_length=50)
    score = models.CharField(max_length=50, blank=True, null=True)
    percentile = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    batch_name = models.CharField(max_length=200, blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'results'
        ordering = ['-year', 'rank']
    
    def __str__(self):
        return f"{self.student_name} - {self.exam} {self.year} (Rank: {self.rank})"
