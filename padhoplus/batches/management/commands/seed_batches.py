from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from padhoplus.batches.models import Subject, Topic, Batch, BatchFAQ, Schedule
from padhoplus.users.models import User
from padhoplus.payments.models import BatchPricing


class Command(BaseCommand):
    help = 'Seeds database with realistic JEE/NEET batch data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting data population...'))

        # Create subjects
        subjects = {}
        subject_data = [
            {'name': 'Physics', 'icon': '⚛️', 'color': '#3B82F6'},
            {'name': 'Chemistry', 'icon': '🧪', 'color': '#8B5CF6'},
            {'name': 'Biology', 'icon': '🧬', 'color': '#10B981'},
            {'name': 'Mathematics', 'icon': '📐', 'color': '#F59E0B'},
        ]

        for subj_data in subject_data:
            subject, created = Subject.objects.get_or_create(
                name=subj_data['name'],
                defaults={
                    'slug': subj_data['name'].lower(),
                    'description': f'{subj_data["name"]} for JEE/NEET preparation',
                    'icon': subj_data['icon'],
                    'color': subj_data['color'],
                    'order': subject_data.index(subj_data),
                }
            )
            subjects[subj_data['name']] = subject
            if created:
                self.stdout.write(f'  ✓ Created subject: {subj_data["name"]}')

        # Create topics for each subject
        topics_data = {
            'Physics': ['Mechanics', 'Optics', 'Thermodynamics', 'Electromagnetism', 'Modern Physics'],
            'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
            'Biology': ['Botany', 'Zoology', 'Human Physiology', 'Molecular Biology'],
            'Mathematics': ['Algebra', 'Trigonometry', 'Calculus', 'Coordinate Geometry'],
        }

        for subject_name, topic_list in topics_data.items():
            for idx, topic_name in enumerate(topic_list):
                topic, created = Topic.objects.get_or_create(
                    subject=subjects[subject_name],
                    slug=f'{subject_name.lower()}-{topic_name.lower().replace(" ", "-")}',
                    defaults={
                        'name': topic_name,
                        'description': f'Complete {topic_name} preparation for JEE/NEET',
                        'chapter_number': idx + 1,
                        'order': idx,
                    }
                )
                if created:
                    self.stdout.write(f'  ✓ Created topic: {subject_name} - {topic_name}')

        # Get or create teachers
        teachers = []
        teacher_names = ['Dr. Sharma', 'Prof. Verma', 'Mr. Patel', 'Dr. Reddy']
        for teacher_name in teacher_names:
            user, created = User.objects.get_or_create(
                username=teacher_name.lower().replace(' ', '_').replace('.', ''),
                defaults={
                    'email': f'{teacher_name.lower().replace(" ", "")}@padhoplus.com',
                    'first_name': teacher_name.split()[0],
                    'last_name': teacher_name.split()[-1],
                    'role': 'teacher',
                }
            )
            teachers.append(user)
            if created:
                self.stdout.write(f'  ✓ Created teacher: {teacher_name}')

        # Create batches
        batch_data = [
            {
                'name': 'JEE Main 2025 - Intensive Batch',
                'slug': 'jee-main-2025-intensive',
                'description': 'Complete JEE Main preparation with expert faculty, daily practice problems, and mock tests',
                'short_description': 'Ace JEE Main with our intensive 6-month program',
                'target_exam': 'jee_main',
                'target_class': '12',
                'target_year': 2025,
                'price': 9999,
                'discounted_price': 6999,
                'is_free': False,
                'status': 'ongoing',
                'start_date': timezone.now().date(),
                'end_date': (timezone.now() + timedelta(days=180)).date(),
                'teachers': [teachers[0], teachers[1]],
                'subject_names': ['Physics', 'Chemistry', 'Mathematics'],
                'language': 'en',
                'features': ['Live Classes', 'Video Lectures', 'Practice Problems', 'Mock Tests', 'Doubt Support'],
                'includes': ['300+ Videos', 'Daily Practice', '50+ Mock Tests', 'Personal Mentoring'],
            },
            {
                'name': 'NEET 2025 Complete - Biology + Chemistry Focus',
                'slug': 'neet-2025-complete',
                'description': 'Comprehensive NEET preparation with emphasis on Biology and Chemistry with 360-hour content',
                'short_description': 'Master NEET Biology and Chemistry from basics to advanced',
                'target_exam': 'neet',
                'target_class': '12',
                'target_year': 2025,
                'price': 7999,
                'discounted_price': 4999,
                'is_free': False,
                'status': 'ongoing',
                'start_date': timezone.now().date(),
                'end_date': (timezone.now() + timedelta(days=120)).date(),
                'teachers': [teachers[2], teachers[3]],
                'subject_names': ['Biology', 'Chemistry', 'Physics'],
                'language': 'hi',
                'features': ['Video Lectures', 'Chapter-wise Tests', 'Full Length Mocks', 'Doubt Sessions', 'Study Material'],
                'includes': ['400+ Videos', 'Unlimited Quizzes', '100+ Practice Sets', 'Downloads Available'],
            },
            {
                'name': 'JEE Advanced Foundation - Class 11',
                'slug': 'jee-advanced-foundation-11',
                'description': 'Strong foundation course for Class 11 students aspiring for JEE Advanced. Start your journey early!',
                'short_description': 'Build JEE Advanced foundation from Class 11',
                'target_exam': 'jee_advanced',
                'target_class': '11',
                'target_year': 2026,
                'price': 5999,
                'discounted_price': 3999,
                'is_free': False,
                'status': 'upcoming',
                'start_date': (timezone.now() + timedelta(days=30)).date(),
                'end_date': (timezone.now() + timedelta(days=300)).date(),
                'teachers': [teachers[0], teachers[1], teachers[2]],
                'subject_names': ['Physics', 'Chemistry', 'Mathematics'],
                'language': 'hinglish',
                'features': ['Structured Learning', 'Concept Videos', 'Practice Problems', 'Weekly Tests', 'Live Doubt Support'],
                'includes': ['200+ Videos', 'Semester Exams', '30+ Topic Tests', 'Doubt Clearing Sessions'],
            },
            {
                'name': 'Board Exams Crash Course - Class 12',
                'slug': 'board-exams-crash-12',
                'description': 'Last-minute Board exam preparation with focus on important topics and exam patterns',
                'short_description': 'Secure 90%+ in Board exams with crash course',
                'target_exam': 'boards',
                'target_class': '12',
                'target_year': 2025,
                'price': 2999,
                'discounted_price': None,
                'is_free': False,
                'status': 'ongoing',
                'start_date': timezone.now().date(),
                'end_date': (timezone.now() + timedelta(days=60)).date(),
                'teachers': [teachers[1], teachers[3]],
                'subject_names': ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
                'language': 'en',
                'features': ['Quick Revision', 'Question Bank', 'Previous Year Papers', 'Model Tests'],
                'includes': ['100+ Revision Videos', '1000+ Questions', '10 Full Tests', 'Study Guides'],
            },
            {
                'name': 'Physics Mastery - JEE Advanced Level',
                'slug': 'physics-mastery-advanced',
                'description': 'Deep dive into Physics concepts for JEE Advanced with problem-solving strategies',
                'short_description': 'Master advanced Physics concepts and problem-solving',
                'target_exam': 'jee_advanced',
                'target_class': '12',
                'target_year': 2025,
                'price': 4999,
                'discounted_price': 3499,
                'is_free': False,
                'status': 'ongoing',
                'start_date': timezone.now().date(),
                'end_date': (timezone.now() + timedelta(days=150)).date(),
                'teachers': [teachers[0]],
                'subject_names': ['Physics'],
                'language': 'en',
                'features': ['Concept Mastery', 'Problem Solving', 'Advanced Tricks', 'Strategy Session'],
                'includes': ['250+ Concept Videos', '500+ Problems', '20 Concept Tests', 'Personalized Coaching'],
            },
            {
                'name': 'FREE - Mathematics for Beginners',
                'slug': 'free-math-beginners',
                'description': 'Free Mathematics foundation course for students starting their competitive exam preparation',
                'short_description': 'Master math fundamentals - completely FREE!',
                'target_exam': 'foundation',
                'target_class': '10',
                'target_year': 2025,
                'price': 0,
                'discounted_price': None,
                'is_free': True,
                'status': 'ongoing',
                'start_date': timezone.now().date(),
                'end_date': (timezone.now() + timedelta(days=90)).date(),
                'teachers': [teachers[1]],
                'subject_names': ['Mathematics'],
                'language': 'hi',
                'features': ['Video Lectures', 'Basic Concepts', 'Simple Examples', 'Community Support'],
                'includes': ['50+ Videos', '100+ Practice Questions', 'Assignments', 'Forum Access'],
            },
        ]

        for batch_info in batch_data:
            teachers_list = batch_info.pop('teachers')
            subject_names = batch_info.pop('subject_names')

            batch, created = Batch.objects.get_or_create(
                slug=batch_info['slug'],
                defaults=batch_info
            )

            if created:
                # Add teachers
                batch.faculty.set(teachers_list)
                
                # Add subjects
                for subject_name in subject_names:
                    batch.subjects.add(subjects[subject_name])
                
                # Create pricing
                BatchPricing.objects.get_or_create(
                    batch=batch,
                    defaults={
                        'pricing_type': 'one_time' if batch.price > 0 else 'one_time',
                        'regular_price': batch.price or 0,
                        'discounted_price': batch.discounted_price,
                        'is_active': True,
                    }
                )

                self.stdout.write(self.style.SUCCESS(f'✓ Created batch: {batch.name}'))

            # Create FAQs for batch
            faq_templates = [
                {'question': 'Who are the faculty members?', 'answer': 'Our batches are taught by experienced educators with 10+ years of teaching experience in competitive exam preparation.'},
                {'question': 'Is this batch suitable for beginners?', 'answer': 'Yes! This batch is designed for students at all levels. We cover basics to advanced topics systematically.'},
                {'question': 'What is the refund policy?', 'answer': 'We offer 7 days full money-back guarantee if you are not satisfied with the course.'},
                {'question': 'Can I download the videos?', 'answer': 'Yes, all videos are available for download on our mobile app for offline viewing.'},
                {'question': 'Is there doubt support?', 'answer': 'Absolutely! We provide 24/7 doubt support through our forum and live sessions.'},
            ]

            for idx, faq_template in enumerate(faq_templates):
                BatchFAQ.objects.get_or_create(
                    batch=batch,
                    question=faq_template['question'],
                    defaults={
                        'answer': faq_template['answer'],
                        'order': idx,
                    }
                )

        # Create schedules for batches
        day_choices = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        for batch in Batch.objects.all():
            for subject in batch.subjects.all():
                for day_idx, day in enumerate(day_choices[:3]):  # 3 days per subject
                    Schedule.objects.get_or_create(
                        batch=batch,
                        subject=subject,
                        day=day,
                        defaults={
                            'start_time': f'{9 + day_idx}:00',
                            'end_time': f'{10 + day_idx}:30',
                            'is_live': True,
                        }
                    )

        self.stdout.write(self.style.SUCCESS('\n✅ Database populated successfully!'))
        self.stdout.write(self.style.SUCCESS(f'Created {Batch.objects.count()} batches'))
        self.stdout.write(self.style.SUCCESS(f'Created {Subject.objects.count()} subjects'))
        self.stdout.write(self.style.SUCCESS(f'Created {Topic.objects.count()} topics'))
