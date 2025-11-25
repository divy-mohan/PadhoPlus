from django.contrib import admin
from .models import Question, Test, TestAttempt, TestResponse, PracticeSession


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'topic', 'question_type', 'difficulty', 'marks', 'is_active']
    list_filter = ['subject', 'question_type', 'difficulty', 'is_active']
    search_fields = ['question_text', 'subject__name', 'topic__name']
    autocomplete_fields = ['subject', 'topic', 'created_by']
    
    fieldsets = (
        (None, {
            'fields': ('subject', 'topic', 'question_type', 'difficulty')
        }),
        ('Question', {
            'fields': ('question_text', 'question_image')
        }),
        ('Options', {
            'fields': ('option_a', 'option_b', 'option_c', 'option_d')
        }),
        ('Answer', {
            'fields': ('correct_answer', 'solution', 'solution_image')
        }),
        ('Marks', {
            'fields': ('marks', 'negative_marks')
        }),
        ('Settings', {
            'fields': ('is_active', 'created_by')
        }),
    )


@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ['title', 'batch', 'subject', 'test_type', 'status', 'total_marks', 'duration_minutes', 'is_active']
    list_filter = ['test_type', 'status', 'is_active', 'batch']
    search_fields = ['title', 'description', 'batch__name']
    autocomplete_fields = ['batch', 'subject', 'created_by']
    filter_horizontal = ['questions']
    date_hierarchy = 'start_datetime'
    
    fieldsets = (
        (None, {
            'fields': ('batch', 'subject', 'title', 'description', 'instructions')
        }),
        ('Type & Status', {
            'fields': ('test_type', 'status')
        }),
        ('Questions', {
            'fields': ('questions',)
        }),
        ('Marks & Duration', {
            'fields': ('total_marks', 'passing_marks', 'duration_minutes')
        }),
        ('Schedule', {
            'fields': ('start_datetime', 'end_datetime')
        }),
        ('Settings', {
            'fields': ('is_proctored', 'show_answers_after', 'allow_review', 'is_active', 'created_by')
        }),
    )


@admin.register(TestAttempt)
class TestAttemptAdmin(admin.ModelAdmin):
    list_display = ['student', 'test', 'status', 'score', 'correct_count', 'rank', 'percentile', 'started_at']
    list_filter = ['status', 'test__batch', 'started_at']
    search_fields = ['student__username', 'test__title']
    autocomplete_fields = ['student', 'test']
    date_hierarchy = 'started_at'


@admin.register(TestResponse)
class TestResponseAdmin(admin.ModelAdmin):
    list_display = ['attempt', 'question', 'selected_answer', 'is_correct', 'marks_obtained']
    list_filter = ['is_correct', 'is_marked_for_review']
    search_fields = ['attempt__student__username', 'question__question_text']
    autocomplete_fields = ['attempt', 'question']


@admin.register(PracticeSession)
class PracticeSessionAdmin(admin.ModelAdmin):
    list_display = ['student', 'subject', 'topic', 'mode', 'total_questions', 'correct_count', 'is_completed']
    list_filter = ['mode', 'is_completed', 'subject']
    search_fields = ['student__username', 'subject__name']
    autocomplete_fields = ['student', 'subject', 'topic']
