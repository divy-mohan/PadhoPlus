from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Sum, Avg, Count, Q, Min
from datetime import timedelta
from .models import (
    UserProgress, DailyActivity, Streak,
    Achievement, UserAchievement, Leaderboard
)
from .serializers import (
    UserProgressSerializer, DailyActivitySerializer, StreakSerializer,
    AchievementSerializer, UserAchievementSerializer, LeaderboardSerializer
)


class ProgressViewSet(viewsets.ModelViewSet):
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_platform_admin():
            return UserProgress.objects.all()
        elif user.is_teacher():
            return UserProgress.objects.filter(batch__faculty=user)
        return UserProgress.objects.filter(user=user)
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        user = request.user
        progress = UserProgress.objects.filter(user=user)
        
        total_time = progress.aggregate(total=Sum('time_spent_minutes'))['total'] or 0
        total_lectures = progress.aggregate(total=Sum('lectures_watched'))['total'] or 0
        total_questions = progress.aggregate(total=Sum('questions_attempted'))['total'] or 0
        total_correct = progress.aggregate(total=Sum('questions_correct'))['total'] or 0
        
        subject_progress = progress.values(
            'subject__name', 'subject__slug'
        ).annotate(
            total_time=Sum('time_spent_minutes'),
            total_lectures=Sum('lectures_watched'),
            accuracy=Avg('questions_correct') * 100 / Avg('questions_attempted')
        )
        
        return Response({
            'total_time_minutes': total_time,
            'total_lectures_watched': total_lectures,
            'total_questions_attempted': total_questions,
            'total_correct': total_correct,
            'overall_accuracy': round((total_correct / total_questions * 100) if total_questions > 0 else 0, 2),
            'subject_progress': list(subject_progress)
        })
    
    @action(detail=False, methods=['get'])
    def weak_topics(self, request):
        user = request.user
        weak_topics = UserProgress.objects.filter(
            user=user,
            questions_attempted__gte=5
        ).annotate(
            accuracy=Sum('questions_correct') * 100 / Sum('questions_attempted')
        ).filter(accuracy__lt=50).select_related('subject', 'topic')[:10]
        
        serializer = self.get_serializer(weak_topics, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def strong_topics(self, request):
        user = request.user
        strong_topics = UserProgress.objects.filter(
            user=user,
            questions_attempted__gte=5
        ).annotate(
            accuracy=Sum('questions_correct') * 100 / Sum('questions_attempted')
        ).filter(accuracy__gte=80).select_related('subject', 'topic')[:10]
        
        serializer = self.get_serializer(strong_topics, many=True)
        return Response(serializer.data)


class TestAnalyticsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def performance(self, request):
        from padhoplus.assessments.models import TestAttempt
        
        user = request.user
        attempts = TestAttempt.objects.filter(
            student=user,
            status='submitted'
        ).select_related('test', 'test__subject')
        
        if not attempts.exists():
            return Response({
                'total_tests': 0,
                'average_score': 0,
                'average_percentile': 0,
                'best_rank': None,
                'tests': []
            })
        
        stats = attempts.aggregate(
            total=Count('id'),
            avg_score=Avg('score'),
            avg_percentile=Avg('percentile'),
            best_rank=Min('rank')
        )
        
        recent_tests = attempts.order_by('-submitted_at')[:10]
        test_data = []
        for attempt in recent_tests:
            test_data.append({
                'test_id': attempt.test.id,
                'test_title': attempt.test.title,
                'subject': attempt.test.subject.name if attempt.test.subject else 'Mixed',
                'score': attempt.score,
                'rank': attempt.rank,
                'percentile': attempt.percentile,
                'date': attempt.submitted_at
            })
        
        return Response({
            'total_tests': stats['total'],
            'average_score': round(stats['avg_score'] or 0, 2),
            'average_percentile': round(stats['avg_percentile'] or 0, 2),
            'best_rank': stats['best_rank'],
            'tests': test_data
        })
    
    @action(detail=False, methods=['get'])
    def subject_wise(self, request):
        from padhoplus.assessments.models import TestAttempt
        
        user = request.user
        subject_stats = TestAttempt.objects.filter(
            student=user,
            status='submitted',
            test__subject__isnull=False
        ).values(
            'test__subject__name', 'test__subject__slug'
        ).annotate(
            total_tests=Count('id'),
            avg_score=Avg('score'),
            avg_percentile=Avg('percentile')
        )
        
        return Response(list(subject_stats))


class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def student(self, request):
        user = request.user
        today = timezone.now().date()
        
        from padhoplus.batches.models import Enrollment
        from padhoplus.content.models import WatchHistory, Lecture
        from padhoplus.assessments.models import Test, TestAttempt
        from padhoplus.doubts.models import Doubt
        
        enrolled_batches = Enrollment.objects.filter(
            student=user, status='active'
        ).count()
        
        continue_watching = WatchHistory.objects.filter(
            user=user, is_completed=False
        ).select_related('lecture', 'lecture__subject')[:5]
        
        upcoming_tests = Test.objects.filter(
            batch__enrollments__student=user,
            status='scheduled',
            start_datetime__gt=timezone.now()
        ).order_by('start_datetime')[:5]
        
        recent_test_attempts = TestAttempt.objects.filter(
            student=user, status='submitted'
        ).order_by('-submitted_at')[:3]
        
        my_doubts = Doubt.objects.filter(student=user).order_by('-created_at')[:5]
        
        streak, _ = Streak.objects.get_or_create(user=user)
        
        today_activity, _ = DailyActivity.objects.get_or_create(
            user=user, date=today
        )
        
        return Response({
            'enrolled_batches': enrolled_batches,
            'continue_watching': [
                {
                    'lecture_id': h.lecture.id,
                    'lecture_title': h.lecture.title,
                    'subject': h.lecture.subject.name,
                    'progress': h.last_position,
                    'duration': h.lecture.duration_minutes
                }
                for h in continue_watching
            ],
            'upcoming_tests': [
                {
                    'id': t.id,
                    'title': t.title,
                    'start_datetime': t.start_datetime,
                    'duration_minutes': t.duration_minutes
                }
                for t in upcoming_tests
            ],
            'recent_tests': [
                {
                    'test_title': a.test.title,
                    'score': a.score,
                    'rank': a.rank,
                    'date': a.submitted_at
                }
                for a in recent_test_attempts
            ],
            'my_doubts': [
                {
                    'id': d.id,
                    'title': d.title,
                    'status': d.status,
                    'created_at': d.created_at
                }
                for d in my_doubts
            ],
            'streak': {
                'current': streak.current_streak,
                'longest': streak.longest_streak,
                'points': streak.total_points
            },
            'today_activity': {
                'time_spent': today_activity.time_spent_minutes,
                'lectures_watched': today_activity.lectures_watched,
                'questions_practiced': today_activity.questions_practiced
            }
        })
    
    @action(detail=False, methods=['get'])
    def teacher(self, request):
        user = request.user
        
        if not user.is_teacher():
            return Response(
                {'error': 'Only teachers can access this dashboard'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        from padhoplus.batches.models import Batch, Enrollment
        from padhoplus.doubts.models import Doubt
        from padhoplus.content.models import Lecture
        
        my_batches = Batch.objects.filter(faculty=user, is_active=True)
        total_students = Enrollment.objects.filter(
            batch__faculty=user, status='active'
        ).count()
        
        pending_doubts = Doubt.objects.filter(
            Q(assigned_to=user) | Q(assigned_to__isnull=True),
            is_resolved=False
        ).count()
        
        my_lectures = Lecture.objects.filter(teacher=user).count()
        
        recent_doubts = Doubt.objects.filter(
            Q(assigned_to=user) | Q(assigned_to__isnull=True),
            is_resolved=False
        ).order_by('-created_at')[:10]
        
        return Response({
            'my_batches': [
                {
                    'id': b.id,
                    'name': b.name,
                    'slug': b.slug,
                    'enrolled_count': b.enrolled_count
                }
                for b in my_batches
            ],
            'total_students': total_students,
            'pending_doubts': pending_doubts,
            'my_lectures': my_lectures,
            'recent_doubts': [
                {
                    'id': d.id,
                    'title': d.title,
                    'student': d.student.full_name,
                    'subject': d.subject.name,
                    'created_at': d.created_at
                }
                for d in recent_doubts
            ]
        })
    
    @action(detail=False, methods=['get'])
    def admin(self, request):
        user = request.user
        
        if not user.is_platform_admin():
            return Response(
                {'error': 'Only admins can access this dashboard'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        from padhoplus.users.models import User
        from padhoplus.batches.models import Batch, Enrollment
        from padhoplus.doubts.models import Doubt
        from padhoplus.content.models import Lecture
        from padhoplus.assessments.models import Test
        
        total_students = User.objects.filter(role='student').count()
        total_teachers = User.objects.filter(role='teacher').count()
        total_batches = Batch.objects.filter(is_active=True).count()
        total_enrollments = Enrollment.objects.filter(status='active').count()
        total_lectures = Lecture.objects.filter(is_active=True).count()
        total_tests = Test.objects.filter(is_active=True).count()
        pending_doubts = Doubt.objects.filter(is_resolved=False).count()
        
        return Response({
            'total_students': total_students,
            'total_teachers': total_teachers,
            'total_batches': total_batches,
            'total_enrollments': total_enrollments,
            'total_lectures': total_lectures,
            'total_tests': total_tests,
            'pending_doubts': pending_doubts
        })
