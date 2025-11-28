from rest_framework import serializers
from .models import (
    Subject, Topic, Batch, BatchFAQ, Schedule, 
    Enrollment, Announcement, BatchReview
)
from padhoplus.users.serializers import UserSerializer


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'slug', 'description', 'icon', 'color', 'order', 'is_active']
        read_only_fields = ['id', 'slug']


class TopicSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Topic
        fields = [
            'id', 'subject', 'subject_id', 'name', 'slug', 'description',
            'chapter_number', 'order', 'is_active'
        ]
        read_only_fields = ['id', 'slug']


class ScheduleSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.IntegerField(write_only=True)
    day_display = serializers.CharField(source='get_day_display', read_only=True)
    
    class Meta:
        model = Schedule
        fields = [
            'id', 'batch', 'subject', 'subject_id', 'day', 'day_display',
            'start_time', 'end_time', 'is_live'
        ]
        read_only_fields = ['id']


class BatchFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchFAQ
        fields = ['id', 'batch', 'question', 'answer', 'order', 'is_active']
        read_only_fields = ['id']


class BatchReviewSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    
    class Meta:
        model = BatchReview
        fields = [
            'id', 'batch', 'student', 'rating', 'review',
            'is_verified', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'student', 'created_at']


class BatchListSerializer(serializers.ModelSerializer):
    target_exam_display = serializers.CharField(source='get_target_exam_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    language_display = serializers.CharField(source='get_language_display', read_only=True)
    enrolled_count = serializers.ReadOnlyField()
    effective_price = serializers.ReadOnlyField()
    
    class Meta:
        model = Batch
        fields = [
            'id', 'name', 'slug', 'short_description', 'thumbnail',
            'target_exam', 'target_exam_display', 'target_class', 'target_year',
            'language', 'language_display', 'status', 'status_display',
            'start_date', 'price', 'discounted_price', 'effective_price',
            'is_free', 'emi_available', 'is_featured', 'enrolled_count'
        ]


class BatchDetailSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True, read_only=True)
    faqs = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    
    target_exam_display = serializers.CharField(source='get_target_exam_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    language_display = serializers.CharField(source='get_language_display', read_only=True)
    enrolled_count = serializers.ReadOnlyField()
    effective_price = serializers.ReadOnlyField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Batch
        fields = [
            'id', 'name', 'slug', 'description', 'short_description', 'thumbnail',
            'promo_video_url', 'target_exam', 'target_exam_display', 'target_class',
            'target_year', 'language', 'language_display', 'start_date', 'end_date',
            'status', 'status_display', 'price', 'discounted_price', 'effective_price',
            'is_free', 'emi_available', 'emi_months',
            'features', 'includes', 'max_students', 'is_featured', 'enrolled_count',
            'schedules', 'faqs', 'reviews', 'average_rating',
            'created_at', 'updated_at'
        ]
    
    def get_faqs(self, obj):
        faqs = obj.faqs.filter(is_active=True)
        return BatchFAQSerializer(faqs, many=True).data
    
    def get_reviews(self, obj):
        reviews = obj.reviews.filter(is_active=True)
        return BatchReviewSerializer(reviews, many=True).data
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.filter(is_active=True)
        if reviews.exists():
            return round(sum(r.rating for r in reviews) / reviews.count(), 1)
        return None


class EnrollmentSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    batch = BatchListSerializer(read_only=True)
    batch_id = serializers.IntegerField(write_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'student', 'batch', 'batch_id', 'status', 'status_display',
            'enrolled_at', 'expires_at', 'amount_paid', 'payment_method',
            'transaction_id', 'progress_percentage', 'last_accessed_at',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'student', 'enrolled_at', 'created_at', 'updated_at']


class AnnouncementSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    batch_name = serializers.CharField(source='batch.name', read_only=True)
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    
    class Meta:
        model = Announcement
        fields = [
            'id', 'batch', 'batch_name', 'author', 'title', 'content',
            'priority', 'priority_display', 'is_pinned', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']
