# Backend Developer Guide

Complete guide for working with Django backend.

---

## 📁 Backend Structure

```
padhoplus/
├── users/              # User authentication
│   ├── models.py       # User model
│   ├── views.py        # Auth endpoints
│   ├── serializers.py
│   └── urls.py
├── batches/            # Batch management
│   ├── models.py       # Batch, Enrollment models
│   ├── views.py
│   ├── serializers.py
│   └── admin.py        # Admin registration
├── doubts/             # Doubt Portal
│   ├── models.py       # Doubt, DoubtAnswer models
│   ├── views.py
│   ├── serializers.py
│   └── filters.py      # Search/filter logic
├── payments/           # Payment processing
│   ├── models.py       # Payment model
│   ├── views.py
│   ├── gateways.py     # Stripe/PhonePe integration
│   └── serializers.py
├── analytics/          # User analytics
├── content/            # Course content
├── settings.py         # Django configuration
├── urls.py             # URL routing
├── wsgi.py             # WSGI app
└── manage.py
```

---

## 🗄️ Creating Models

### Model Structure
```python
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Doubt(models.Model):
    SUBJECT_CHOICES = [
        ('physics', 'Physics'),
        ('chemistry', 'Chemistry'),
        ('biology', 'Biology'),
        ('mathematics', 'Mathematics'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('answered', 'Answered'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    topic = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['subject', 'difficulty']),
        ]
    
    def __str__(self):
        return f"{self.title} ({self.subject})"
```

### Registering in Admin
```python
from django.contrib import admin
from .models import Doubt

@admin.register(Doubt)
class DoubtAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject', 'difficulty', 'status', 'created_at']
    list_filter = ['subject', 'difficulty', 'status', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Question Info', {
            'fields': ('user', 'subject', 'topic', 'title', 'description')
        }),
        ('Metadata', {
            'fields': ('difficulty', 'status', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
```

---

## 🔗 Creating Serializers

```python
from rest_framework import serializers
from .models import Doubt

class DoubtSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    asker_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Doubt
        fields = ['id', 'user', 'user_email', 'asker_name', 'subject', 
                  'topic', 'difficulty', 'title', 'description', 'status', 
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_asker_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip()
```

---

## 🎯 Creating ViewSets

```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q

class DoubtViewSet(ModelViewSet):
    serializer_class = DoubtSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Users see their own doubts + all answered doubts
        return Doubt.objects.filter(
            Q(user=self.request.user) | Q(status='answered')
        )
    
    def perform_create(self, serializer):
        # Auto-set current user
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def by_subject(self, request):
        subject = request.query_params.get('subject')
        queryset = self.get_queryset().filter(subject=subject)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
```

---

## 🔐 Permissions & Authentication

```python
from rest_framework.permissions import BasePermission

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_student

class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_staff

# In ViewSet
class DoubtViewSet(ModelViewSet):
    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated(), IsStudent()]
        elif self.action in ['update', 'destroy']:
            return [IsAuthenticated(), IsOwnerOrAdmin()]
        return [IsAuthenticated()]
```

---

## 🔍 Filtering & Search

```python
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter, OrderingFilter

class DoubtFilter(filters.FilterSet):
    subject = filters.ChoiceFilter(choices=Doubt.SUBJECT_CHOICES)
    difficulty = filters.ChoiceFilter(choices=Doubt.DIFFICULTY_CHOICES)
    status = filters.ChoiceFilter(choices=Doubt.STATUS_CHOICES)
    created_at_after = filters.DateTimeFilter(field_name='created_at', lookup_expr='gte')
    
    class Meta:
        model = Doubt
        fields = ['subject', 'difficulty', 'status']

class DoubtViewSet(ModelViewSet):
    filterset_class = DoubtFilter
    filter_backends = [filters.DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'difficulty']
    ordering = ['-created_at']
```

---

## 🚀 Database Migrations

```bash
# Create migration
python manage.py makemigrations

# View SQL
python manage.py sqlmigrate app_name 0001

# Run migrations
python manage.py migrate

# Migrate specific app
python manage.py migrate app_name

# Fake migration (use with caution)
python manage.py migrate app_name --fake
```

---

## 🧪 Testing

```python
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

class DoubtTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='test123',
            is_student=True
        )
        self.doubt = Doubt.objects.create(
            user=self.user,
            subject='physics',
            title='Test',
            description='Test doubt'
        )
    
    def test_create_doubt(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/doubts/', {
            'subject': 'chemistry',
            'topic': 'Organic',
            'difficulty': 'hard',
            'title': 'New doubt',
            'description': 'Test'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_list_doubts(self):
        response = self.client.get('/api/doubts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
```

---

## 🔧 Django Shell

```bash
python manage.py shell

# Common commands
from padhoplus.doubts.models import Doubt

# Create
doubt = Doubt.objects.create(user=user, subject='physics', ...)

# Read
doubts = Doubt.objects.all()
doubt = Doubt.objects.get(id=1)

# Update
doubt.status = 'answered'
doubt.save()

# Delete
doubt.delete()

# Filter
physics_doubts = Doubt.objects.filter(subject='physics')

# Count
count = Doubt.objects.count()
```

---

## 🔄 Signal Handlers

```python
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Doubt)
def doubt_created(sender, instance, created, **kwargs):
    if created:
        # Send notification to faculty
        notify_faculty(instance)
```

---

## 📊 Database Indexing

```python
class Meta:
    indexes = [
        models.Index(fields=['user', 'created_at']),
        models.Index(fields=['subject', 'difficulty']),
        models.Index(fields=['status']),
    ]
    unique_together = ['user', 'email']
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Migration conflicts | Delete conflicting migrations, remake |
| Circular imports | Import in function instead |
| Queryset not updating | Use `refresh_from_db()` |
| Permission denied | Check user permissions |
| CORS errors | Verify CORS_ALLOWED_ORIGINS |

---

**Next**: Read DATABASE.md for schema details
