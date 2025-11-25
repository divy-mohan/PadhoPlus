from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from .models import Lecture, Note, Resource, WatchHistory, Bookmark
from .serializers import (
    LectureSerializer, LectureListSerializer, NoteSerializer,
    ResourceSerializer, WatchHistorySerializer, BookmarkSerializer
)


class LectureViewSet(viewsets.ModelViewSet):
    queryset = Lecture.objects.filter(is_active=True)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return LectureListSerializer
        return LectureSerializer
    
    def get_queryset(self):
        queryset = Lecture.objects.filter(is_active=True)
        
        batch = self.request.query_params.get('batch')
        subject = self.request.query_params.get('subject')
        topic = self.request.query_params.get('topic')
        is_demo = self.request.query_params.get('is_demo')
        is_free = self.request.query_params.get('is_free')
        is_live = self.request.query_params.get('is_live')
        
        if batch:
            queryset = queryset.filter(batch__slug=batch)
        if subject:
            queryset = queryset.filter(subject__slug=subject)
        if topic:
            queryset = queryset.filter(topic__slug=topic)
        if is_demo:
            queryset = queryset.filter(is_demo=is_demo.lower() == 'true')
        if is_free:
            queryset = queryset.filter(is_free=is_free.lower() == 'true')
        if is_live:
            queryset = queryset.filter(is_live=is_live.lower() == 'true')
        
        return queryset.select_related('subject', 'topic', 'teacher', 'batch')
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def update_progress(self, request, pk=None):
        lecture = self.get_object()
        user = request.user
        
        history, created = WatchHistory.objects.get_or_create(
            user=user,
            lecture=lecture
        )
        
        watched_duration = request.data.get('watched_duration', 0)
        last_position = request.data.get('last_position', 0)
        is_completed = request.data.get('is_completed', False)
        
        history.watched_duration = max(history.watched_duration, watched_duration)
        history.last_position = last_position
        
        if is_completed and not history.is_completed:
            history.is_completed = True
            history.completed_at = timezone.now()
        
        history.save()
        
        serializer = WatchHistorySerializer(history)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def bookmark(self, request, pk=None):
        lecture = self.get_object()
        user = request.user
        
        bookmark, created = Bookmark.objects.get_or_create(
            user=user,
            lecture=lecture,
            defaults={
                'notes_text': request.data.get('notes_text'),
                'timestamp': request.data.get('timestamp')
            }
        )
        
        if not created:
            bookmark.notes_text = request.data.get('notes_text', bookmark.notes_text)
            bookmark.timestamp = request.data.get('timestamp', bookmark.timestamp)
            bookmark.save()
        
        serializer = BookmarkSerializer(bookmark)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def demo(self, request):
        lectures = self.get_queryset().filter(is_demo=True)[:10]
        serializer = LectureListSerializer(lectures, many=True)
        return Response(serializer.data)


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.filter(is_active=True)
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Note.objects.filter(is_active=True)
        
        batch = self.request.query_params.get('batch')
        subject = self.request.query_params.get('subject')
        topic = self.request.query_params.get('topic')
        file_type = self.request.query_params.get('type')
        is_free = self.request.query_params.get('is_free')
        
        if batch:
            queryset = queryset.filter(batch__slug=batch)
        if subject:
            queryset = queryset.filter(subject__slug=subject)
        if topic:
            queryset = queryset.filter(topic__slug=topic)
        if file_type:
            queryset = queryset.filter(file_type=file_type)
        if is_free:
            queryset = queryset.filter(is_free=is_free.lower() == 'true')
        
        return queryset.select_related('subject', 'topic', 'batch')
    
    @action(detail=True, methods=['post'])
    def download(self, request, pk=None):
        note = self.get_object()
        note.downloads_count += 1
        note.save(update_fields=['downloads_count'])
        return Response({'download_url': note.file.url})
    
    @action(detail=False, methods=['get'])
    def free_resources(self, request):
        file_type = request.query_params.get('type')
        queryset = Note.objects.filter(is_active=True, is_free=True)
        
        if file_type:
            queryset = queryset.filter(file_type=file_type)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.filter(is_active=True)
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Resource.objects.filter(is_active=True)
        lecture = self.request.query_params.get('lecture')
        if lecture:
            queryset = queryset.filter(lecture_id=lecture)
        return queryset


class WatchHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = WatchHistorySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return WatchHistory.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def continue_watching(self, request):
        history = WatchHistory.objects.filter(
            user=request.user,
            is_completed=False
        ).select_related('lecture', 'lecture__subject')[:10]
        serializer = self.get_serializer(history, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def completed(self, request):
        history = WatchHistory.objects.filter(
            user=request.user,
            is_completed=True
        ).select_related('lecture')
        serializer = self.get_serializer(history, many=True)
        return Response(serializer.data)


class BookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['delete'])
    def remove(self, request):
        lecture_id = request.query_params.get('lecture')
        note_id = request.query_params.get('note')
        
        queryset = self.get_queryset()
        if lecture_id:
            queryset = queryset.filter(lecture_id=lecture_id)
        if note_id:
            queryset = queryset.filter(note_id=note_id)
        
        deleted_count, _ = queryset.delete()
        return Response({'deleted': deleted_count})
