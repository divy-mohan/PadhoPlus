from django.core.management.base import BaseCommand
from padhoplus.users.models import User, Faculty


class Command(BaseCommand):
    help = 'Create sample faculty data for testing'

    def handle(self, *args, **options):
        # Create Divy Mohan faculty
        user, created = User.objects.get_or_create(
            username='divy_mohan',
            defaults={
                'email': 'divy.mohan@padhoplus.com',
                'first_name': 'Divy',
                'last_name': 'Mohan',
                'role': 'teacher',
                'qualifications': 'B.Tech Physics, IIT Madras',
                'experience_years': 8,
                'specialization': 'Physics for JEE/NEET'
            }
        )
        
        if created:
            user.set_password('admin123')
            user.save()
            self.stdout.write(f'Created user: {user.username}')
        
        faculty, created = Faculty.objects.get_or_create(
            user=user,
            defaults={
                'title': 'Senior Physics Faculty',
                'designation': 'Physics Teacher',
                'subjects': ['Physics', 'Mechanics', 'Thermodynamics', 'Electromagnetism'],
                'achievements': 'IIT Madras Graduate, 5+ years teaching experience, 95% student success rate in JEE Physics',
                'teaching_style': 'Concept-based learning with real-world applications and problem-solving techniques',
                'intro_video_url': 'https://youtube.com/watch?v=divy-physics-intro',
                'is_featured': True,
                'order': 1
            }
        )
        
        if created:
            self.stdout.write(f'Created faculty: {faculty}')
        else:
            self.stdout.write(f'Faculty already exists: {faculty}')
        
        # Create additional sample faculty
        sample_faculty = [
            {
                'username': 'priya_sharma',
                'email': 'priya.sharma@padhoplus.com',
                'first_name': 'Priya',
                'last_name': 'Sharma',
                'role': 'teacher',
                'faculty_data': {
                    'title': 'Mathematics Expert',
                    'designation': 'Mathematics Teacher',
                    'subjects': ['Mathematics', 'Calculus', 'Algebra'],
                    'achievements': 'IIT Delhi Graduate, Mathematics Olympiad Winner',
                    'teaching_style': 'Step-by-step problem solving with visual explanations',
                    'is_featured': True,
                    'order': 2
                }
            },
            {
                'username': 'rahul_kumar',
                'email': 'rahul.kumar@padhoplus.com',
                'first_name': 'Rahul',
                'last_name': 'Kumar',
                'role': 'teacher',
                'faculty_data': {
                    'title': 'Chemistry Specialist',
                    'designation': 'Chemistry Teacher',
                    'subjects': ['Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'],
                    'achievements': 'IIT Bombay Graduate, Published researcher',
                    'teaching_style': 'Practical experiments and conceptual clarity',
                    'is_featured': True,
                    'order': 3
                }
            }
        ]
        
        for faculty_info in sample_faculty:
            user, created = User.objects.get_or_create(
                username=faculty_info['username'],
                defaults={
                    'email': faculty_info['email'],
                    'first_name': faculty_info['first_name'],
                    'last_name': faculty_info['last_name'],
                    'role': faculty_info['role']
                }
            )
            
            if created:
                user.set_password('admin123')
                user.save()
                self.stdout.write(f'Created user: {user.username}')
            
            faculty, created = Faculty.objects.get_or_create(
                user=user,
                defaults=faculty_info['faculty_data']
            )
            
            if created:
                self.stdout.write(f'Created faculty: {faculty}')
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created/verified {Faculty.objects.filter(is_featured=True).count()} featured faculty members'
            )
        )