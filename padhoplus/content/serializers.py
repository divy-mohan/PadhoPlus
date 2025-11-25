from rest_framework import serializers
from .models import Lecture, Note, Resource, WatchHistory, Bookmark
from padhoplus.batches.serializers import SubjectSerializer, TopicSerializer
from padhoplus.users.serializers import UserSerializer


class ResourceSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_resource_type_display', read_only=True)
    
    class Meta:
        model = Resource
        fields = ['id', 'lecture', 'title', 'file', 'resource_type', 'type_display', 'is_active', 'created_at']
        read_only_fields = ['id', 'created_at']


class LectureSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.IntegerField(write_only=True)
    topic = TopicSerializer(read_only=True)
    topic_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    teacher = UserSerializer(read_only=True)
    teacher_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    resources = ResourceSerializer(many=True, read_only=True)
    batch_name = serializers.CharField(source='batch.name', read_only=True)
    
    class Meta:
        model = Lecture
        fields = [
            'id', 'batch', 'batch_name', 'subject', 'subject_id', 'topic', 'topic_id',
            'teacher', 'teacher_id', 'title', 'description', 'video_url', 'thumbnail',
            'duration_minutes', 'order', 'is_live', 'live_datetime', 'is_demo',
            'is_free', 'is_active', 'views_count', 'resources', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'views_count', 'created_at', 'updated_at']


class LectureListSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    topic_name = serializers.CharField(source='topic.name', read_only=True)
    teacher_name = serializers.CharField(source='teacher.full_name', read_only=True)
    
    class Meta:
        model = Lecture
        fields = [
            'id', 'batch', 'title', 'thumbnail', 'duration_minutes',
            'subject_name', 'topic_name', 'teacher_name', 'order',
            'is_live', 'live_datetime', 'is_demo', 'is_free', 'views_count'
        ]


class NoteSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.IntegerField(write_only=True)
    topic = TopicSerializer(read_only=True)
    topic_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    type_display = serializers.CharField(source='get_file_type_display', read_only=True)
    
    class Meta:
        model = Note
        fields = [
            'id', 'batch', 'subject', 'subject_id', 'topic', 'topic_id', 'lecture',
            'title', 'description', 'file', 'file_type', 'type_display',
            'is_free', 'is_active', 'downloads_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'downloads_count', 'created_at', 'updated_at']


class WatchHistorySerializer(serializers.ModelSerializer):
    lecture = LectureListSerializer(read_only=True)
    lecture_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = WatchHistory
        fields = [
            'id', 'user', 'lecture', 'lecture_id', 'watched_duration',
            'last_position', 'is_completed', 'completed_at',
            'first_watched_at', 'last_watched_at'
        ]
        read_only_fields = ['id', 'user', 'first_watched_at', 'last_watched_at']


class BookmarkSerializer(serializers.ModelSerializer):
    lecture = LectureListSerializer(read_only=True)
    lecture_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    note = NoteSerializer(read_only=True)
    note_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    
    class Meta:
        model = Bookmark
        fields = [
            'id', 'user', 'lecture', 'lecture_id', 'note', 'note_id',
            'notes_text', 'timestamp', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']
