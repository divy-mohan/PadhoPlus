from django.core.management.base import BaseCommand
from django.utils.text import slugify
from padhoplus.users.models import User, Faculty
from padhoplus.batches.models import Subject, Topic, Batch, Schedule, BatchFAQ
from padhoplus.content.models import Lecture, Note
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Seed database with sample data for testing'

    def handle(self, *args, **options):
        self.stdout.write('Starting data seeding...')
        
        # Create admin user
        admin_user, _ = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@padhoplus.com',
                'first_name': 'Admin',
                'last_name': 'User',
                'role': 'admin',
                'is_staff': True,
                'is_superuser': True,
            }
        )
        admin_user.set_password('admin123')
        admin_user.save()
        self.stdout.write(self.style.SUCCESS('Created admin user'))

        # Create teacher users
        teachers = []
        teacher_data = [
            {'name': 'Dr. Sharma', 'subject': 'Biology', 'exp': '12 years'},
            {'name': 'Prof. Verma', 'subject': 'Chemistry', 'exp': '10 years'},
            {'name': 'Mr. Patel', 'subject': 'Physics', 'exp': '15 years'},
        ]
        
        for data in teacher_data:
            parts = data['name'].split()
            teacher, _ = User.objects.get_or_create(
                username=parts[-1].lower(),
                defaults={
                    'email': f"{parts[-1].lower()}@padhoplus.com",
                    'first_name': parts[0],
                    'last_name': parts[-1] if len(parts) > 1 else 'Teacher',
                    'role': 'teacher',
                    'experience_years': int(data['exp'].split()[0]),
                    'specialization': data['subject'],
                }
            )
            teacher.set_password('teacher123')
            teacher.save()
            teachers.append(teacher)
        self.stdout.write(self.style.SUCCESS('Created teacher users'))

        # Create subjects
        subjects_data = [
            {'name': 'Physics', 'icon': 'physics'},
            {'name': 'Chemistry', 'icon': 'chemistry'},
            {'name': 'Biology', 'icon': 'biology'},
            {'name': 'Mathematics', 'icon': 'math'},
        ]
        
        subjects = []
        for data in subjects_data:
            subject, _ = Subject.objects.get_or_create(
                name=data['name'],
                defaults={
                    'slug': slugify(data['name']),
                    'description': f'{data["name"]} course content',
                    'icon': data['icon'],
                    'color': '#3b82f6',
                }
            )
            subjects.append(subject)
        self.stdout.write(self.style.SUCCESS('Created subjects'))

        # Create batches
        batches_data = [
            {
                'name': 'NEET 2025 - Lakshya',
                'exam': 'neet',
                'description': 'Comprehensive NEET preparation course with live classes, recorded lectures, daily practice problems, and 24/7 doubt support.',
                'price': 4999,
                'is_free': False,
            },
            {
                'name': 'JEE Mains 2025 - Express',
                'exam': 'jee_main',
                'description': 'Fast-track JEE Mains preparation focusing on problem-solving and shortcuts.',
                'price': 5999,
                'is_free': False,
            },
            {
                'name': 'Foundation - Class 9-10',
                'exam': 'foundation',
                'description': 'Strong foundation building for Class 9-10 students aiming for competitive exams.',
                'price': 2999,
                'is_free': False,
            },
            {
                'name': 'Board Exam Mastery',
                'exam': 'boards',
                'description': 'Complete preparation for board exams with focus on conceptual clarity.',
                'price': 1999,
                'is_free': True,
            },
        ]
        
        batches = []
        for i, data in enumerate(batches_data):
            batch, _ = Batch.objects.get_or_create(
                name=data['name'],
                defaults={
                    'slug': slugify(data['name']),
                    'description': data['description'],
                    'short_description': data['description'][:100],
                    'target_exam': data['exam'],
                    'target_class': 'Class 12',
                    'target_year': 2025,
                    'language': 'en',
                    'status': 'ongoing',
                    'price': data['price'],
                    'is_free': data['is_free'],
                    'emi_available': not data['is_free'],
                    'emi_months': 3,
                    'features': ['Live Classes', 'Doubt Support', 'Mock Tests'],
                    'includes': ['Video Lectures', 'Study Materials', 'Test Series', 'Performance Analytics'],
                    'start_date': datetime.now().date(),
                }
            )
            batch.subjects.set(subjects[:3])
            batch.faculty.set(teachers[:min(i+1, len(teachers))])
            batches.append(batch)
        self.stdout.write(self.style.SUCCESS('Created batches'))

        # Create schedules for each batch
        days = ['mon', 'tue', 'wed', 'thu', 'fri']
        for batch in batches:
            for idx, subject in enumerate(batch.subjects.all()[:3]):
                Schedule.objects.get_or_create(
                    batch=batch,
                    subject=subject,
                    day=days[idx % len(days)],
                    defaults={
                        'start_time': '06:00 PM',
                        'end_time': '07:30 PM',
                        'is_live': True,
                    }
                )
        self.stdout.write(self.style.SUCCESS('Created schedules'))

        # Create FAQs for each batch
        faq_templates = [
            {'question': 'What is the total duration of the course?', 'answer': 'The course is designed to be completed in 6-12 months depending on your pace and revision requirements.'},
            {'question': 'Are classes recorded?', 'answer': 'Yes, all live classes are recorded and available 24/7 for revision.'},
            {'question': 'What is the refund policy?', 'answer': 'We offer a 7-day money-back guarantee if you\'re not satisfied with the course.'},
            {'question': 'Is there doubt support?', 'answer': 'Yes, we have 24/7 doubt support available via chat, email, and forums.'},
        ]
        
        for batch in batches:
            for idx, faq in enumerate(faq_templates):
                BatchFAQ.objects.get_or_create(
                    batch=batch,
                    question=faq['question'],
                    defaults={
                        'answer': faq['answer'],
                        'order': idx,
                    }
                )
        self.stdout.write(self.style.SUCCESS('Created FAQs'))

        # Create lectures
        for batch in batches:
            for subject_idx, subject in enumerate(batch.subjects.all()[:3]):
                for i in range(3):
                    Lecture.objects.get_or_create(
                        batch=batch,
                        subject=subject,
                        title=f'{subject.name} Lecture {i+1}',
                        defaults={
                            'description': f'Learn {subject.name} concepts in this comprehensive lecture',
                            'video_url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                            'teacher': teachers[subject_idx % len(teachers)],
                            'duration_minutes': 45 + i*15,
                            'is_demo': i == 0,
                            'is_free': i == 0,
                            'order': i,
                        }
                    )
        self.stdout.write(self.style.SUCCESS('Created lectures'))

        # Create notes
        note_types = ['notes', 'pdf', 'pyq', 'formula', 'dpp']
        for batch in batches:
            for subject in batch.subjects.all()[:2]:
                for note_type in note_types:
                    Note.objects.get_or_create(
                        batch=batch,
                        subject=subject,
                        title=f'{subject.name} {note_type.upper()}',
                        defaults={
                            'description': f'Complete {subject.name} {note_type} material',
                            'file': f'notes/{subject.slug}/{note_type}.pdf',
                            'file_type': note_type,
                            'is_free': note_type in ['notes', 'formula'],
                        }
                    )
        self.stdout.write(self.style.SUCCESS('Created notes'))

        # Create Faculty profiles
        for teacher in teachers:
            Faculty.objects.get_or_create(
                user=teacher,
                defaults={
                    'title': f'{teacher.specialization} Expert',
                    'designation': 'Senior Educator',
                    'subjects': [teacher.specialization],
                    'achievements': f'{teacher.experience_years} years of teaching excellence',
                    'teaching_style': 'Interactive and student-centric approach',
                    'is_featured': True,
                }
            )
        self.stdout.write(self.style.SUCCESS('Created faculty profiles'))

        self.stdout.write(self.style.SUCCESS('Data seeding completed successfully!'))
