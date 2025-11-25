from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q, Avg, Count
from .models import Question, Test, TestAttempt, TestResponse, PracticeSession
from .serializers import (
    QuestionSerializer, QuestionPublicSerializer, TestSerializer,
    TestListSerializer, TestAttemptSerializer, TestResponseSerializer,
    PracticeSessionSerializer
)


class IsTeacherOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and (
            request.user.is_teacher() or request.user.is_platform_admin()
        )


class IsEnrolledStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.filter(is_active=True)
    permission_classes = [IsTeacherOrAdmin]
    
    def get_serializer_class(self):
        if self.request.user.is_authenticated and (
            self.request.user.is_teacher() or self.request.user.is_platform_admin()
        ):
            return QuestionSerializer
        return QuestionPublicSerializer
    
    def get_queryset(self):
        queryset = Question.objects.filter(is_active=True)
        
        subject = self.request.query_params.get('subject')
        topic = self.request.query_params.get('topic')
        difficulty = self.request.query_params.get('difficulty')
        question_type = self.request.query_params.get('type')
        
        if subject:
            queryset = queryset.filter(subject__slug=subject)
        if topic:
            queryset = queryset.filter(topic__slug=topic)
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        if question_type:
            queryset = queryset.filter(question_type=question_type)
        
        return queryset.select_related('subject', 'topic')
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def random(self, request):
        subject = request.query_params.get('subject')
        topic = request.query_params.get('topic')
        difficulty = request.query_params.get('difficulty')
        count = int(request.query_params.get('count', 10))
        
        queryset = self.get_queryset()
        if subject:
            queryset = queryset.filter(subject__slug=subject)
        if topic:
            queryset = queryset.filter(topic__slug=topic)
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        
        questions = queryset.order_by('?')[:count]
        serializer = QuestionPublicSerializer(questions, many=True)
        return Response(serializer.data)


class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.filter(is_active=True)
    permission_classes = [IsTeacherOrAdmin]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return TestListSerializer
        return TestSerializer
    
    def get_queryset(self):
        queryset = Test.objects.filter(is_active=True)
        user = self.request.user
        
        if user.is_authenticated:
            if user.is_student():
                from padhoplus.batches.models import Enrollment
                enrolled_batches = Enrollment.objects.filter(
                    student=user, status='active'
                ).values_list('batch_id', flat=True)
                queryset = queryset.filter(batch_id__in=enrolled_batches)
            elif user.is_teacher():
                queryset = queryset.filter(Q(created_by=user) | Q(batch__faculty=user))
        
        batch = self.request.query_params.get('batch')
        subject = self.request.query_params.get('subject')
        test_type = self.request.query_params.get('type')
        status_param = self.request.query_params.get('status')
        
        if batch:
            queryset = queryset.filter(batch__slug=batch)
        if subject:
            queryset = queryset.filter(subject__slug=subject)
        if test_type:
            queryset = queryset.filter(test_type=test_type)
        if status_param:
            queryset = queryset.filter(status=status_param)
        
        return queryset.select_related('batch', 'subject')
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def upcoming(self, request):
        now = timezone.now()
        user = request.user
        
        queryset = Test.objects.filter(
            is_active=True,
            status='scheduled',
            start_datetime__gt=now
        )
        
        if user.is_student():
            from padhoplus.batches.models import Enrollment
            enrolled_batches = Enrollment.objects.filter(
                student=user, status='active'
            ).values_list('batch_id', flat=True)
            queryset = queryset.filter(batch_id__in=enrolled_batches)
        
        tests = queryset.select_related('batch', 'subject')[:10]
        serializer = TestListSerializer(tests, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def start(self, request, pk=None):
        test = self.get_object()
        user = request.user
        
        if user.is_student():
            from padhoplus.batches.models import Enrollment
            if not Enrollment.objects.filter(
                student=user, batch=test.batch, status='active'
            ).exists():
                return Response(
                    {'error': 'You must be enrolled in this batch to take this test'},
                    status=status.HTTP_403_FORBIDDEN
                )
        
        if TestAttempt.objects.filter(test=test, student=user).exists():
            attempt = TestAttempt.objects.get(test=test, student=user)
            if attempt.status == 'submitted':
                return Response(
                    {'error': 'You have already submitted this test'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializer = TestAttemptSerializer(attempt)
            return Response(serializer.data)
        
        attempt = TestAttempt.objects.create(
            test=test,
            student=user,
            status='started'
        )
        
        serializer = TestAttemptSerializer(attempt)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def leaderboard(self, request, pk=None):
        test = self.get_object()
        attempts = TestAttempt.objects.filter(
            test=test,
            status='submitted'
        ).order_by('-score', 'time_taken_seconds')[:50]
        
        leaderboard = []
        for i, attempt in enumerate(attempts, 1):
            leaderboard.append({
                'rank': i,
                'student_name': attempt.student.full_name,
                'score': attempt.score,
                'time_taken': attempt.time_taken_seconds,
                'correct_count': attempt.correct_count
            })
        
        return Response(leaderboard)


class TestAttemptViewSet(viewsets.ModelViewSet):
    serializer_class = TestAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_platform_admin():
            return TestAttempt.objects.all()
        elif user.is_teacher():
            return TestAttempt.objects.filter(
                Q(test__created_by=user) | Q(test__batch__faculty=user)
            )
        elif user.is_parent():
            children_ids = user.children.values_list('id', flat=True) if hasattr(user, 'children') else []
            return TestAttempt.objects.filter(student_id__in=children_ids)
        return TestAttempt.objects.filter(student=user)
    
    @action(detail=True, methods=['post'])
    def submit_response(self, request, pk=None):
        attempt = self.get_object()
        
        if attempt.student != request.user:
            return Response(
                {'error': 'You can only submit responses for your own attempts'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if attempt.status == 'submitted':
            return Response(
                {'error': 'Test already submitted'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        question_id = request.data.get('question_id')
        selected_answer = request.data.get('selected_answer')
        time_spent = request.data.get('time_spent_seconds', 0)
        
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response(
                {'error': 'Question not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        response, created = TestResponse.objects.update_or_create(
            attempt=attempt,
            question=question,
            defaults={
                'selected_answer': selected_answer,
                'time_spent_seconds': time_spent
            }
        )
        
        serializer = TestResponseSerializer(response)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        attempt = self.get_object()
        
        if attempt.student != request.user:
            return Response(
                {'error': 'You can only submit your own test attempts'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if attempt.status == 'submitted':
            return Response(
                {'error': 'Test already submitted'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        correct_count = 0
        incorrect_count = 0
        total_score = 0
        
        for response in attempt.responses.all():
            question = response.question
            if response.selected_answer:
                if response.selected_answer.upper() == question.correct_answer.upper():
                    response.is_correct = True
                    response.marks_obtained = question.marks
                    correct_count += 1
                    total_score += float(question.marks)
                else:
                    response.is_correct = False
                    response.marks_obtained = -float(question.negative_marks)
                    incorrect_count += 1
                    total_score -= float(question.negative_marks)
                response.save()
        
        unattempted = attempt.test.questions.count() - (correct_count + incorrect_count)
        
        attempt.status = 'submitted'
        attempt.score = max(0, total_score)
        attempt.correct_count = correct_count
        attempt.incorrect_count = incorrect_count
        attempt.unattempted_count = unattempted
        attempt.submitted_at = timezone.now()
        attempt.time_taken_seconds = request.data.get('time_taken_seconds', 0)
        attempt.save()
        
        all_attempts = TestAttempt.objects.filter(
            test=attempt.test,
            status='submitted'
        ).order_by('-score')
        
        for i, att in enumerate(all_attempts, 1):
            att.rank = i
            att.percentile = round((1 - (i / all_attempts.count())) * 100, 2)
            att.save()
        
        serializer = self.get_serializer(attempt)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def analysis(self, request, pk=None):
        attempt = self.get_object()
        
        if attempt.status != 'submitted':
            return Response(
                {'error': 'Test not submitted yet'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        responses = attempt.responses.all().select_related('question', 'question__topic')
        
        topic_analysis = {}
        for response in responses:
            topic_name = response.question.topic.name if response.question.topic else 'General'
            if topic_name not in topic_analysis:
                topic_analysis[topic_name] = {'correct': 0, 'incorrect': 0, 'unattempted': 0}
            
            if not response.selected_answer:
                topic_analysis[topic_name]['unattempted'] += 1
            elif response.is_correct:
                topic_analysis[topic_name]['correct'] += 1
            else:
                topic_analysis[topic_name]['incorrect'] += 1
        
        return Response({
            'score': attempt.score,
            'correct_count': attempt.correct_count,
            'incorrect_count': attempt.incorrect_count,
            'unattempted_count': attempt.unattempted_count,
            'time_taken_seconds': attempt.time_taken_seconds,
            'rank': attempt.rank,
            'percentile': attempt.percentile,
            'topic_analysis': topic_analysis
        })


class PracticeSessionViewSet(viewsets.ModelViewSet):
    serializer_class = PracticeSessionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_parent():
            children_ids = user.children.values_list('id', flat=True) if hasattr(user, 'children') else []
            return PracticeSession.objects.filter(student_id__in=children_ids)
        return PracticeSession.objects.filter(student=user)
    
    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
    
    @action(detail=False, methods=['post'])
    def start(self, request):
        subject_id = request.data.get('subject_id')
        topic_id = request.data.get('topic_id')
        mode = request.data.get('mode', 'practice')
        difficulty = request.data.get('difficulty')
        count = int(request.data.get('count', 10))
        
        queryset = Question.objects.filter(subject_id=subject_id, is_active=True)
        if topic_id:
            queryset = queryset.filter(topic_id=topic_id)
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        
        questions = queryset.order_by('?')[:count]
        
        session = PracticeSession.objects.create(
            student=request.user,
            subject_id=subject_id,
            topic_id=topic_id,
            mode=mode,
            difficulty=difficulty,
            total_questions=questions.count()
        )
        session.questions.set(questions)
        
        serializer = self.get_serializer(session)
        question_serializer = QuestionPublicSerializer(questions, many=True)
        
        return Response({
            'session': serializer.data,
            'questions': question_serializer.data
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        session = self.get_object()
        
        if session.student != request.user:
            return Response(
                {'error': 'You can only complete your own practice sessions'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        session.correct_count = request.data.get('correct_count', 0)
        session.incorrect_count = request.data.get('incorrect_count', 0)
        session.time_taken_seconds = request.data.get('time_taken_seconds', 0)
        session.is_completed = True
        session.completed_at = timezone.now()
        session.save()
        
        serializer = self.get_serializer(session)
        return Response(serializer.data)
