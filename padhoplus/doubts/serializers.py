from rest_framework import serializers
from .models import Doubt, DoubtResponse, DoubtUpvote
from padhoplus.users.serializers import UserSerializer
from padhoplus.batches.serializers import SubjectSerializer, TopicSerializer


class DoubtResponseSerializer(serializers.ModelSerializer):
    responder = UserSerializer(read_only=True)
    
    class Meta:
        model = DoubtResponse
        fields = [
            'id', 'doubt', 'responder', 'content', 'image',
            'is_accepted', 'upvotes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'responder', 'upvotes', 'created_at', 'updated_at']


class DoubtSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.IntegerField(write_only=True)
    topic = TopicSerializer(read_only=True)
    topic_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    responses = DoubtResponseSerializer(many=True, read_only=True)
    response_count = serializers.SerializerMethodField()
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    
    class Meta:
        model = Doubt
        fields = [
            'id', 'student', 'subject', 'subject_id', 'topic', 'topic_id',
            'lecture', 'title', 'description', 'image', 'status', 'status_display',
            'priority', 'priority_display', 'assigned_to', 'assigned_to_id',
            'is_public', 'is_resolved', 'views_count', 'upvotes', 'responses',
            'response_count', 'created_at', 'updated_at', 'resolved_at'
        ]
        read_only_fields = [
            'id', 'student', 'views_count', 'upvotes',
            'created_at', 'updated_at', 'resolved_at'
        ]
    
    def get_response_count(self, obj):
        return obj.responses.count()


class DoubtListSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    topic_name = serializers.CharField(source='topic.name', read_only=True)
    response_count = serializers.SerializerMethodField()
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Doubt
        fields = [
            'id', 'student_name', 'subject_name', 'topic_name',
            'title', 'status', 'status_display', 'is_resolved',
            'views_count', 'upvotes', 'response_count', 'created_at'
        ]
    
    def get_response_count(self, obj):
        return obj.responses.count()
