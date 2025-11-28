#!/usr/bin/env python3
"""
Test faculty API fix
"""

import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Force reload Django
if 'django' in sys.modules:
    del sys.modules['django']

django.setup()

from django.test import Client
from rest_framework.test import APIClient

def test_faculty_api():
    """Test faculty API with different clients"""
    print("=" * 60)
    print("TESTING FACULTY API FIX")
    print("=" * 60)
    
    # Test with Django test client
    print("Testing with Django Client:")
    client = Client()
    response = client.get('/api/users/faculty/')
    print(f"Status: {response.status_code}")
    if response.status_code != 200:
        print(f"Response: {response.content.decode()}")
    
    # Test with DRF API client
    print("\nTesting with DRF APIClient:")
    api_client = APIClient()
    response = api_client.get('/api/users/faculty/')
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Faculty count: {len(data)}")
        if data:
            print(f"Sample: {data[0].get('user', {}).get('first_name')} {data[0].get('user', {}).get('last_name')}")
    else:
        print(f"Response: {response.content.decode()}")
    
    # Test direct view import
    print("\nTesting direct view access:")
    try:
        from padhoplus.users.views import UserViewSet
        from rest_framework.request import Request
        from django.http import HttpRequest
        
        viewset = UserViewSet()
        
        # Check if faculty action exists and has correct permissions
        faculty_action = getattr(viewset, 'faculty', None)
        if faculty_action:
            print("✓ Faculty action exists")
            
            # Check permissions
            if hasattr(faculty_action, 'kwargs'):
                perms = faculty_action.kwargs.get('permission_classes', [])
                print(f"✓ Permission classes: {perms}")
            else:
                print("⚠ No permission classes found")
        else:
            print("❌ Faculty action not found")
            
    except Exception as e:
        print(f"❌ Error testing direct view: {e}")

if __name__ == '__main__':
    test_faculty_api()