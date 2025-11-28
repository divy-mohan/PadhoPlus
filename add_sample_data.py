#!/usr/bin/env python3
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
django.setup()

from padhoplus.batches.models import Batch, BatchFAQ, Subject, Schedule

# Get the batch
try:
    batch = Batch.objects.get(slug='jee-rankers-mathematics-2026-advanced-prep-batch')
    print(f"Found batch: {batch.name}")
    
    # Add FAQs
    faqs = [
        ("What is the duration of this batch?", "This batch runs for 12 months with comprehensive coverage of JEE Advanced syllabus."),
        ("Are live classes included?", "Yes, we provide live interactive classes with doubt clearing sessions."),
        ("What study materials are provided?", "Complete study materials, practice tests, and previous year papers are included."),
        ("Is there any refund policy?", "Yes, we offer a 7-day money-back guarantee if you're not satisfied."),
    ]
    
    for i, (question, answer) in enumerate(faqs):
        faq, created = BatchFAQ.objects.get_or_create(
            batch=batch,
            question=question,
            defaults={'answer': answer, 'order': i}
        )
        if created:
            print(f"Added FAQ: {question[:50]}...")
    
    # Update batch features and includes
    batch.features = [
        "Live Interactive Classes",
        "Recorded Video Lectures", 
        "Practice Tests & Mock Exams",
        "Doubt Clearing Sessions",
        "Performance Analytics",
        "Study Materials & Notes"
    ]
    
    batch.includes = [
        "Complete JEE Advanced Syllabus Coverage",
        "1000+ Practice Questions",
        "50+ Mock Tests",
        "24/7 Doubt Support",
        "Mobile App Access",
        "Certificate of Completion"
    ]
    
    batch.save()
    print("Updated batch features and includes")
    
    # Add subjects and schedules if they don't exist
    subjects_data = [
        ("Mathematics", "Advanced mathematics for JEE"),
        ("Physics", "Comprehensive physics coverage"),
        ("Chemistry", "Organic, Inorganic & Physical Chemistry")
    ]
    
    for name, desc in subjects_data:
        subject, created = Subject.objects.get_or_create(
            name=name,
            defaults={'description': desc}
        )
        if created:
            print(f"Added subject: {name}")
            
        # Add schedule
        schedule, created = Schedule.objects.get_or_create(
            batch=batch,
            subject=subject,
            day='mon',
            defaults={
                'start_time': '10:00',
                'end_time': '12:00',
                'is_live': True
            }
        )
        if created:
            print(f"Added schedule for {name}")
    
    print("✅ Sample data added successfully!")
    
except Batch.DoesNotExist:
    print("❌ Batch not found!")