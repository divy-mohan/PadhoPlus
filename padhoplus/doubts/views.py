from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from .models import Doubt, DoubtResponse, DoubtUpvote
from .serializers import (
    DoubtSerializer, DoubtListSerializer, DoubtResponseSerializer
)


class DoubtViewSet(viewsets.ModelViewSet):
    queryset = Doubt.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return DoubtListSerializer
        return DoubtSerializer
    
    def get_queryset(self):
        queryset = Doubt.objects.filter(is_public=True)
        user = self.request.user
        
        if user.is_authenticated:
            if user.is_teacher():
                queryset = Doubt.objects.filter(
                    Q(is_public=True) | Q(assigned_to=user)
                )
            elif user.is_platform_admin():
                queryset = Doubt.objects.all()
        
        subject = self.request.query_params.get('subject')
        topic = self.request.query_params.get('topic')
        status_param = self.request.query_params.get('status')
        search = self.request.query_params.get('search')
        my_doubts = self.request.query_params.get('my_doubts')
        
        if subject:
            queryset = queryset.filter(subject__slug=subject)
        if topic:
            queryset = queryset.filter(topic__slug=topic)
        if status_param:
            queryset = queryset.filter(status=status_param)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )
        if my_doubts and user.is_authenticated:
            queryset = queryset.filter(student=user)
        
        return queryset.select_related('student', 'subject', 'topic', 'assigned_to')
    
    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_doubts(self, request):
        doubts = Doubt.objects.filter(student=request.user)
        serializer = DoubtListSerializer(doubts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def assigned_to_me(self, request):
        if not request.user.is_teacher():
            return Response(
                {'error': 'Only teachers can view assigned doubts'},
                status=status.HTTP_403_FORBIDDEN
            )
        doubts = Doubt.objects.filter(assigned_to=request.user, is_resolved=False)
        serializer = DoubtListSerializer(doubts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def pending(self, request):
        if not (request.user.is_teacher() or request.user.is_platform_admin()):
            return Response(
                {'error': 'Only teachers and admins can view pending doubts'},
                status=status.HTTP_403_FORBIDDEN
            )
        doubts = Doubt.objects.filter(status='pending')
        serializer = DoubtListSerializer(doubts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def assign(self, request, pk=None):
        doubt = self.get_object()
        teacher_id = request.data.get('teacher_id')
        
        if not (request.user.is_platform_admin() or request.user.is_teacher()):
            return Response(
                {'error': 'Only teachers and admins can assign doubts'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        from padhoplus.users.models import User
        try:
            teacher = User.objects.get(id=teacher_id, role='teacher')
        except User.DoesNotExist:
            return Response(
                {'error': 'Teacher not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        doubt.assigned_to = teacher
        doubt.status = 'in_progress'
        doubt.save()
        
        serializer = self.get_serializer(doubt)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def upvote(self, request, pk=None):
        doubt = self.get_object()
        user = request.user
        
        upvote, created = DoubtUpvote.objects.get_or_create(
            user=user,
            doubt=doubt
        )
        
        if not created:
            upvote.delete()
            doubt.upvotes = max(0, doubt.upvotes - 1)
            doubt.save()
            return Response({'upvoted': False, 'upvotes': doubt.upvotes})
        
        doubt.upvotes += 1
        doubt.save()
        return Response({'upvoted': True, 'upvotes': doubt.upvotes})
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def resolve(self, request, pk=None):
        doubt = self.get_object()
        
        if not (request.user == doubt.student or request.user.is_teacher() or request.user.is_platform_admin()):
            return Response(
                {'error': 'Only the student who asked or a teacher can resolve this doubt'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        doubt.is_resolved = True
        doubt.status = 'closed'
        doubt.resolved_at = timezone.now()
        doubt.save()
        
        serializer = self.get_serializer(doubt)
        return Response(serializer.data)


class DoubtResponseViewSet(viewsets.ModelViewSet):
    serializer_class = DoubtResponseSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = DoubtResponse.objects.all()
        doubt = self.request.query_params.get('doubt')
        if doubt:
            queryset = queryset.filter(doubt_id=doubt)
        return queryset
    
    def perform_create(self, serializer):
        response = serializer.save(responder=self.request.user)
        doubt = response.doubt
        if doubt.status == 'pending':
            doubt.status = 'answered'
            doubt.save()
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        response = self.get_object()
        doubt = response.doubt
        
        if not (request.user == doubt.student or request.user.is_platform_admin()):
            return Response(
                {'error': 'Only the student who asked can accept an answer'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        DoubtResponse.objects.filter(doubt=doubt).update(is_accepted=False)
        
        response.is_accepted = True
        response.save()
        
        doubt.is_resolved = True
        doubt.status = 'closed'
        doubt.resolved_at = timezone.now()
        doubt.save()
        
        serializer = self.get_serializer(response)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def upvote(self, request, pk=None):
        response = self.get_object()
        user = request.user
        
        upvote, created = DoubtUpvote.objects.get_or_create(
            user=user,
            response=response
        )
        
        if not created:
            upvote.delete()
            response.upvotes = max(0, response.upvotes - 1)
            response.save()
            return Response({'upvoted': False, 'upvotes': response.upvotes})
        
        response.upvotes += 1
        response.save()
        return Response({'upvoted': True, 'upvotes': response.upvotes})
