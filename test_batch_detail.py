#!/usr/bin/env python3
import os
import sys
import django
from django.test import Client

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

def test_batch_detail():
    client = Client()
    slug = "jee-rankers-mathematics-2026-advanced-prep-batch"
    
    print(f"Testing batch detail for slug: {slug}")
    
    # Test the endpoint
    response = client.get(f'/api/batches/{slug}/')
    print(f"Status: {response.status_code}")
    print(f"Response: {response.content.decode()}")
    
    # Also check if batch exists in DB
    from padhoplus.batches.models import Batch
    try:
        batch = Batch.objects.get(slug=slug)
        print(f"\nBatch found in DB: {batch.name}")
        print(f"Batch ID: {batch.id}")
        print(f"Is Active: {batch.is_active}")
    except Batch.DoesNotExist:
        print(f"\nBatch with slug '{slug}' not found in database")
        # Show available batches
        batches = Batch.objects.all()
        print(f"Available batches: {[b.slug for b in batches]}")

if __name__ == '__main__':
    test_batch_detail()