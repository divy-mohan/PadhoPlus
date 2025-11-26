from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter


def api_root(request):
    return JsonResponse({
        'name': 'PadhoPlus API',
        'version': '1.0.0',
        'description': 'Comprehensive online education platform for JEE/NEET preparation',
        'documentation': '/api/',
        'admin': '/admin/',
        'endpoints': {
            'auth': '/api/auth/',
            'users': '/api/users/',
            'batches': '/api/batches/',
            'subjects': '/api/subjects/',
            'topics': '/api/topics/',
            'lectures': '/api/lectures/',
            'notes': '/api/notes/',
            'tests': '/api/tests/',
            'questions': '/api/questions/',
            'doubts': '/api/doubts/',
            'progress': '/api/progress/',
            'dashboard': '/api/dashboard/',
        }
    })

from padhoplus.users.views import UserViewSet, AuthViewSet
from padhoplus.batches.views import (
    BatchViewSet, SubjectViewSet, TopicViewSet, 
    EnrollmentViewSet, ScheduleViewSet, AnnouncementViewSet
)
from padhoplus.content.views import (
    LectureViewSet, NoteViewSet, ResourceViewSet,
    WatchHistoryViewSet, BookmarkViewSet
)
from padhoplus.assessments.views import (
    QuestionViewSet, TestViewSet, TestAttemptViewSet,
    PracticeSessionViewSet
)
from padhoplus.doubts.views import DoubtViewSet, DoubtResponseViewSet
from padhoplus.analytics.views import (
    ProgressViewSet, TestAnalyticsViewSet, DashboardViewSet
)

router = DefaultRouter()

router.register(r'users', UserViewSet, basename='user')
router.register(r'auth', AuthViewSet, basename='auth')

router.register(r'batches', BatchViewSet, basename='batch')
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'topics', TopicViewSet, basename='topic')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'schedules', ScheduleViewSet, basename='schedule')
router.register(r'announcements', AnnouncementViewSet, basename='announcement')

router.register(r'lectures', LectureViewSet, basename='lecture')
router.register(r'notes', NoteViewSet, basename='note')
router.register(r'resources', ResourceViewSet, basename='resource')
router.register(r'watch-history', WatchHistoryViewSet, basename='watch-history')
router.register(r'bookmarks', BookmarkViewSet, basename='bookmark')

router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'tests', TestViewSet, basename='test')
router.register(r'test-attempts', TestAttemptViewSet, basename='test-attempt')
router.register(r'practice-sessions', PracticeSessionViewSet, basename='practice-session')

router.register(r'doubts', DoubtViewSet, basename='doubt')
router.register(r'doubt-responses', DoubtResponseViewSet, basename='doubt-response')

router.register(r'progress', ProgressViewSet, basename='progress')
router.register(r'test-analytics', TestAnalyticsViewSet, basename='test-analytics')
router.register(r'dashboard', DashboardViewSet, basename='dashboard')

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/payments/', include('padhoplus.payments.urls')),
    path('api-auth/', include('rest_framework.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
