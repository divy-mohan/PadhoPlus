#!/usr/bin/env python3
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
django.setup()

from padhoplus.content.models import Note
from padhoplus.batches.models import Subject

def add_sample_notes():
    """Add sample notes for testing"""
    
    # Get or create subjects
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
        
        # Add sample notes for each subject
        notes_data = [
            (f"{name} - Chapter 1 Notes", "notes", "Comprehensive notes covering all important concepts"),
            (f"{name} - Formula Sheet", "formula", "Quick reference formula sheet"),
            (f"{name} - Previous Year Questions", "pyq", "Collection of previous year JEE questions"),
            (f"{name} - Practice Problems", "dpp", "Daily practice problems with solutions"),
        ]
        
        for title, file_type, description in notes_data:
            note, created = Note.objects.get_or_create(
                title=title,
                subject=subject,
                defaults={
                    'description': description,
                    'file_type': file_type,
                    'file': f'notes/sample_{file_type}.pdf',  # Dummy file path
                    'is_free': True,
                    'is_active': True
                }
            )
            if created:
                print(f"Added note: {title}")
    
    print(f"✅ Total notes in database: {Note.objects.count()}")

if __name__ == "__main__":
    add_sample_notes()