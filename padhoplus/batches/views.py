from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q, Avg
from .models import (
    Subject, Topic, Batch, BatchFAQ, Schedule,
    Enrollment, Announcement, BatchReview
)
from .serializers import (
    SubjectSerializer, TopicSerializer, BatchListSerializer,
    BatchDetailSerializer, BatchFAQSerializer, ScheduleSerializer,
    EnrollmentSerializer, AnnouncementSerializer, BatchReviewSerializer
)


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.filter(is_active=True)
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    
    @action(detail=True, methods=['get'])
    def topics(self, request, slug=None):
        subject = self.get_object()
        topics = subject.topics.filter(is_active=True)
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.filter(is_active=True)
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Topic.objects.filter(is_active=True)
        subject = self.request.query_params.get('subject')
        if subject:
            queryset = queryset.filter(subject__slug=subject)
        return queryset


class BatchViewSet(viewsets.ModelViewSet):
    queryset = Batch.objects.filter(is_active=True)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BatchDetailSerializer
        return BatchListSerializer
    
    def get_queryset(self):
        queryset = Batch.objects.filter(is_active=True)
        
        exam = self.request.query_params.get('exam')
        status_param = self.request.query_params.get('status')
        language = self.request.query_params.get('language')
        is_free = self.request.query_params.get('is_free')
        featured = self.request.query_params.get('featured')
        search = self.request.query_params.get('search')
        
        if exam:
            queryset = queryset.filter(target_exam=exam)
        if status_param:
            queryset = queryset.filter(status=status_param)
        if language:
            queryset = queryset.filter(language=language)
        if is_free:
            queryset = queryset.filter(is_free=is_free.lower() == 'true')
        if featured:
            queryset = queryset.filter(is_featured=True)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search) |
                Q(target_class__icontains=search)
            )
        
        return queryset.prefetch_related('faculty', 'subjects')
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        batches = self.get_queryset().filter(is_featured=True)[:6]
        serializer = BatchListSerializer(batches, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def enroll(self, request, slug=None):
        batch = self.get_object()
        user = request.user
        
        if not user.is_student():
            return Response(
                {'error': 'Only students can enroll in batches'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if Enrollment.objects.filter(student=user, batch=batch).exists():
            return Response(
                {'error': 'You are already enrolled in this batch'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        enrollment = Enrollment.objects.create(
            student=user,
            batch=batch,
            status='active' if batch.is_free else 'pending',
            amount_paid=0 if batch.is_free else batch.effective_price
        )
        
        serializer = EnrollmentSerializer(enrollment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def demo_lectures(self, request, slug=None):
        batch = self.get_object()
        from padhoplus.content.models import Lecture
        from padhoplus.content.serializers import LectureSerializer
        
        lectures = Lecture.objects.filter(batch=batch, is_demo=True, is_active=True)[:10]
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def review(self, request, slug=None):
        batch = self.get_object()
        user = request.user
        
        if not Enrollment.objects.filter(student=user, batch=batch, status='active').exists():
            return Response(
                {'error': 'You must be enrolled in this batch to review it'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        review, created = BatchReview.objects.update_or_create(
            batch=batch,
            student=user,
            defaults={
                'rating': request.data.get('rating'),
                'review': request.data.get('review', '')
            }
        )
        
        serializer = BatchReviewSerializer(review)
        return Response(serializer.data)


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Schedule.objects.all()
        batch = self.request.query_params.get('batch')
        if batch:
            queryset = queryset.filter(batch__slug=batch)
        return queryset


class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_platform_admin():
            return Enrollment.objects.all()
        elif user.is_teacher():
            return Enrollment.objects.filter(batch__faculty=user)
        return Enrollment.objects.filter(student=user)
    
    @action(detail=False, methods=['get'])
    def my_batches(self, request):
        enrollments = Enrollment.objects.filter(
            student=request.user,
            status='active'
        ).select_related('batch')
        serializer = self.get_serializer(enrollments, many=True)
        return Response(serializer.data)


class AnnouncementViewSet(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Announcement.objects.filter(is_active=True)
        batch = self.request.query_params.get('batch')
        if batch:
            queryset = queryset.filter(batch__slug=batch)
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
