#!/usr/bin/env python3
"""
Quick test for faculty API without database dependency
"""

import os
import sys
import django
from django.test import Client
from django.http import JsonResponse

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    django.setup()
    print("✓ Django setup successful")
    
    # Test basic Django functionality
    from django.conf import settings
    print(f"✓ DEBUG mode: {settings.DEBUG}")
    print(f"✓ Database engine: {settings.DATABASES['default']['ENGINE']}")
    
    # Test URL routing
    client = Client()
    
    # Test API root
    try:
        response = client.get('/')
        print(f"✓ API root status: {response.status_code}")
    except Exception as e:
        print(f"⚠ API root error: {e}")
    
    # Test faculty endpoint (without database)
    try:
        response = client.get('/api/users/faculty/')
        print(f"✓ Faculty endpoint status: {response.status_code}")
        if response.status_code != 500:
            print("✓ Faculty endpoint is accessible")
        else:
            print("⚠ Faculty endpoint has server error (likely database)")
    except Exception as e:
        print(f"⚠ Faculty endpoint error: {e}")
    
    print("\n" + "="*50)
    print("QUICK TEST COMPLETE")
    print("="*50)
    
except Exception as e:
    print(f"❌ Django setup failed: {e}")
    sys.exit(1)