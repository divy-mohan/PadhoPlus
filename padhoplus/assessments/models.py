from django.db import models
from padhoplus.users.models import User
from padhoplus.batches.models import Batch, Subject, Topic


class Question(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    
    TYPE_CHOICES = [
        ('mcq', 'Multiple Choice'),
        ('msq', 'Multiple Select'),
        ('numerical', 'Numerical'),
        ('subjective', 'Subjective'),
    ]
    
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='questions')
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, blank=True, related_name='questions')
    
    question_text = models.TextField()
    question_image = models.ImageField(upload_to='questions/', blank=True, null=True)
    question_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='mcq')
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='medium')
    
    option_a = models.TextField(blank=True, null=True)
    option_b = models.TextField(blank=True, null=True)
    option_c = models.TextField(blank=True, null=True)
    option_d = models.TextField(blank=True, null=True)
    
    correct_answer = models.CharField(max_length=100)
    solution = models.TextField(blank=True, null=True)
    solution_image = models.ImageField(upload_to='solutions/', blank=True, null=True)
    
    marks = models.DecimalField(max_digits=5, decimal_places=2, default=4)
    negative_marks = models.DecimalField(max_digits=5, decimal_places=2, default=1)
    
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_questions')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'questions'
        ordering = ['subject', 'topic', '-created_at']
    
    def __str__(self):
        return f"{self.subject.name} - {self.question_text[:50]}"


class Test(models.Model):
    TYPE_CHOICES = [
        ('chapter', 'Chapter-wise Test'),
        ('subject', 'Subject Test'),
        ('full', 'Full Syllabus Test'),
        ('mock', 'Mock Test'),
        ('daily', 'Daily Practice Test'),
    ]
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('live', 'Live'),
        ('completed', 'Completed'),
    ]
    
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='tests')
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True, blank=True, related_name='tests')
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    instructions = models.TextField(blank=True, null=True)
    
    test_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='chapter')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    questions = models.ManyToManyField(Question, related_name='tests')
    
    total_marks = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    passing_marks = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    duration_minutes = models.IntegerField(default=60)
    
    start_datetime = models.DateTimeField(blank=True, null=True)
    end_datetime = models.DateTimeField(blank=True, null=True)
    
    is_proctored = models.BooleanField(default=False)
    show_answers_after = models.BooleanField(default=True)
    allow_review = models.BooleanField(default=True)
    
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_tests')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'tests'
        ordering = ['-start_datetime', '-created_at']
    
    def __str__(self):
        return f"{self.batch.name} - {self.title}"
    
    @property
    def question_count(self):
        return self.questions.count()


class TestAttempt(models.Model):
    STATUS_CHOICES = [
        ('started', 'Started'),
        ('submitted', 'Submitted'),
        ('abandoned', 'Abandoned'),
    ]
    
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='attempts')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='test_attempts')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='started')
    
    score = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    correct_count = models.IntegerField(default=0)
    incorrect_count = models.IntegerField(default=0)
    unattempted_count = models.IntegerField(default=0)
    
    time_taken_seconds = models.IntegerField(default=0)
    
    rank = models.IntegerField(blank=True, null=True)
    percentile = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    
    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'test_attempts'
        unique_together = ['test', 'student']
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.student.username} - {self.test.title}"


class TestResponse(models.Model):
    attempt = models.ForeignKey(TestAttempt, on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='responses')
    
    selected_answer = models.CharField(max_length=100, blank=True, null=True)
    is_correct = models.BooleanField(default=False)
    marks_obtained = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    time_spent_seconds = models.IntegerField(default=0)
    
    is_marked_for_review = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'test_responses'
        unique_together = ['attempt', 'question']
    
    def __str__(self):
        return f"{self.attempt.student.username} - Q{self.question.id}"


class PracticeSession(models.Model):
    MODE_CHOICES = [
        ('practice', 'Practice (Untimed)'),
        ('quiz', 'Quiz (Timed)'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='practice_sessions')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, blank=True)
    
    mode = models.CharField(max_length=20, choices=MODE_CHOICES, default='practice')
    difficulty = models.CharField(max_length=10, blank=True, null=True)
    
    questions = models.ManyToManyField(Question, related_name='practice_sessions')
    
    total_questions = models.IntegerField(default=0)
    correct_count = models.IntegerField(default=0)
    incorrect_count = models.IntegerField(default=0)
    
    time_taken_seconds = models.IntegerField(default=0)
    
    is_completed = models.BooleanField(default=False)
    
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'practice_sessions'
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.student.username} - {self.subject.name} Practice"
    
    @property
    def accuracy(self):
        attempted = self.correct_count + self.incorrect_count
        if attempted == 0:
            return 0
        return round((self.correct_count / attempted) * 100, 2)
