from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import login, logout
from .models import User, Faculty, Testimonial, Result
from .serializers import (
    UserSerializer, UserCreateSerializer, LoginSerializer,
    FacultySerializer, TestimonialSerializer, ResultSerializer
)


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user or request.user.is_platform_admin()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
    
    def get_queryset(self):
        queryset = User.objects.all()
        role = self.request.query_params.get('role')
        if role:
            queryset = queryset.filter(role=role)
        return queryset
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['put', 'patch'], permission_classes=[permissions.IsAuthenticated])
    def update_profile(self, request):
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def faculty(self, request):
        faculty_members = Faculty.objects.filter(is_featured=True).select_related('user')
        serializer = FacultySerializer(faculty_members, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def testimonials(self, request):
        testimonials = Testimonial.objects.filter(is_active=True)
        featured = request.query_params.get('featured')
        if featured:
            testimonials = testimonials.filter(is_featured=True)
        serializer = TestimonialSerializer(testimonials, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def results(self, request):
        results = Result.objects.filter(is_active=True)
        exam = request.query_params.get('exam')
        year = request.query_params.get('year')
        featured = request.query_params.get('featured')
        
        if exam:
            results = results.filter(exam__icontains=exam)
        if year:
            results = results.filter(year=year)
        if featured:
            results = results.filter(is_featured=True)
        
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)


class AuthViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        return Response({
            'message': 'Registration successful',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response({
            'message': 'Login successful',
            'user': UserSerializer(user).data
        })
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def logout(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})
    
    @action(detail=False, methods=['get'])
    def check(self, request):
        if request.user.is_authenticated:
            return Response({
                'authenticated': True,
                'user': UserSerializer(request.user).data
            })
        return Response({'authenticated': False})
