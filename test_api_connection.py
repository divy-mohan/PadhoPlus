#!/usr/bin/env python3
"""
Test API Connection and Faculty Endpoint
"""

import os
import sys
import django
import json
from django.test import Client
from django.core.management import execute_from_command_line

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from padhoplus.users.models import User, Faculty


def test_faculty_endpoint():
    """Test the faculty API endpoint"""
    print("=" * 60)
    print("TESTING FACULTY API ENDPOINT")
    print("=" * 60)
    
    client = Client()
    
    # Test faculty endpoint
    try:
        response = client.get('/api/users/faculty/')
        print(f"✓ Faculty endpoint status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Response type: {type(data)}")
            print(f"✓ Faculty count: {len(data)}")
            
            if data:
                print(f"✓ Sample faculty keys: {list(data[0].keys())}")
                print(f"✓ Sample faculty: {data[0].get('user', {}).get('first_name')} {data[0].get('user', {}).get('last_name')}")
            else:
                print("⚠ No faculty data returned")
        else:
            print(f"❌ Error response: {response.content.decode()}")
            
    except Exception as e:
        print(f"❌ Error testing faculty endpoint: {e}")
    
    # Check database directly
    print("\n" + "=" * 60)
    print("CHECKING DATABASE DIRECTLY")
    print("=" * 60)
    
    try:
        faculty_count = Faculty.objects.count()
        featured_count = Faculty.objects.filter(is_featured=True).count()
        
        print(f"✓ Total faculty in DB: {faculty_count}")
        print(f"✓ Featured faculty in DB: {featured_count}")
        
        if featured_count > 0:
            sample_faculty = Faculty.objects.filter(is_featured=True).first()
            print(f"✓ Sample faculty: {sample_faculty.user.first_name} {sample_faculty.user.last_name}")
            print(f"✓ Designation: {sample_faculty.designation}")
            print(f"✓ Subjects: {sample_faculty.subjects}")
        
    except Exception as e:
        print(f"❌ Database error: {e}")


def create_sample_data():
    """Create sample faculty data"""
    print("\n" + "=" * 60)
    print("CREATING SAMPLE FACULTY DATA")
    print("=" * 60)
    
    try:
        execute_from_command_line(['manage.py', 'create_sample_faculty'])
        print("✓ Sample faculty data created successfully")
    except Exception as e:
        print(f"❌ Error creating sample data: {e}")


def main():
    """Main test function"""
    print("FACULTY API DIAGNOSTIC TEST")
    print("=" * 60)
    
    # First check current state
    test_faculty_endpoint()
    
    # Create sample data if needed
    if Faculty.objects.filter(is_featured=True).count() == 0:
        create_sample_data()
        print("\n" + "=" * 60)
        print("RETESTING AFTER CREATING SAMPLE DATA")
        test_faculty_endpoint()
    
    print("\n" + "=" * 60)
    print("DIAGNOSTIC COMPLETE")
    print("=" * 60)


if __name__ == '__main__':
    main()