from rest_framework import serializers
from .models import Question, Test, TestAttempt, TestResponse, PracticeSession
from padhoplus.batches.serializers import SubjectSerializer, TopicSerializer


class QuestionSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.IntegerField(write_only=True)
    topic = TopicSerializer(read_only=True)
    topic_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    type_display = serializers.CharField(source='get_question_type_display', read_only=True)
    difficulty_display = serializers.CharField(source='get_difficulty_display', read_only=True)
    
    class Meta:
        model = Question
        fields = [
            'id', 'subject', 'subject_id', 'topic', 'topic_id',
            'question_text', 'question_image', 'question_type', 'type_display',
            'difficulty', 'difficulty_display', 'option_a', 'option_b',
            'option_c', 'option_d', 'correct_answer', 'solution', 'solution_image',
            'marks', 'negative_marks', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class QuestionPublicSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    topic_name = serializers.CharField(source='topic.name', read_only=True)
    
    class Meta:
        model = Question
        fields = [
            'id', 'subject_name', 'topic_name', 'question_text', 'question_image',
            'question_type', 'difficulty', 'option_a', 'option_b', 'option_c', 'option_d',
            'marks', 'negative_marks'
        ]


class TestSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    questions = QuestionSerializer(many=True, read_only=True)
    question_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    batch_name = serializers.CharField(source='batch.name', read_only=True)
    question_count = serializers.ReadOnlyField()
    type_display = serializers.CharField(source='get_test_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Test
        fields = [
            'id', 'batch', 'batch_name', 'subject', 'subject_id',
            'title', 'description', 'instructions', 'test_type', 'type_display',
            'status', 'status_display', 'questions', 'question_ids', 'question_count',
            'total_marks', 'passing_marks', 'duration_minutes',
            'start_datetime', 'end_datetime', 'is_proctored',
            'show_answers_after', 'allow_review', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        question_ids = validated_data.pop('question_ids', [])
        test = Test.objects.create(**validated_data)
        if question_ids:
            test.questions.set(question_ids)
        return test


class TestListSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    batch_name = serializers.CharField(source='batch.name', read_only=True)
    question_count = serializers.ReadOnlyField()
    type_display = serializers.CharField(source='get_test_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Test
        fields = [
            'id', 'batch', 'batch_name', 'subject_name', 'title',
            'test_type', 'type_display', 'status', 'status_display',
            'question_count', 'total_marks', 'duration_minutes',
            'start_datetime', 'end_datetime'
        ]


class TestResponseSerializer(serializers.ModelSerializer):
    question = QuestionPublicSerializer(read_only=True)
    question_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = TestResponse
        fields = [
            'id', 'attempt', 'question', 'question_id', 'selected_answer',
            'is_correct', 'marks_obtained', 'time_spent_seconds',
            'is_marked_for_review', 'created_at'
        ]
        read_only_fields = ['id', 'is_correct', 'marks_obtained', 'created_at']


class TestAttemptSerializer(serializers.ModelSerializer):
    test = TestListSerializer(read_only=True)
    test_id = serializers.IntegerField(write_only=True)
    responses = TestResponseSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = TestAttempt
        fields = [
            'id', 'test', 'test_id', 'student', 'status', 'status_display',
            'score', 'correct_count', 'incorrect_count', 'unattempted_count',
            'time_taken_seconds', 'rank', 'percentile', 'responses',
            'started_at', 'submitted_at'
        ]
        read_only_fields = [
            'id', 'student', 'score', 'correct_count', 'incorrect_count',
            'unattempted_count', 'rank', 'percentile', 'started_at', 'submitted_at'
        ]


class PracticeSessionSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.IntegerField(write_only=True)
    topic = TopicSerializer(read_only=True)
    topic_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    accuracy = serializers.ReadOnlyField()
    mode_display = serializers.CharField(source='get_mode_display', read_only=True)
    
    class Meta:
        model = PracticeSession
        fields = [
            'id', 'student', 'subject', 'subject_id', 'topic', 'topic_id',
            'mode', 'mode_display', 'difficulty', 'total_questions',
            'correct_count', 'incorrect_count', 'accuracy', 'time_taken_seconds',
            'is_completed', 'started_at', 'completed_at'
        ]
        read_only_fields = ['id', 'student', 'started_at', 'completed_at']
