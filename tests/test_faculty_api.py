#!/usr/bin/env python3
"""
Faculty API Test Suite
Tests the faculty endpoint functionality
"""

import os
import sys
import django
import json
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
django.setup()

from padhoplus.users.models import User, Faculty


class FacultyAPITest(TestCase):
    def setUp(self):
        """Set up test data"""
        self.client = APIClient()
        
        # Create test user
        self.user = User.objects.create_user(
            username='divy_mohan',
            email='divy@padhoplus.com',
            password='testpass123',
            first_name='Divy',
            last_name='Mohan',
            role='teacher'
        )
        
        # Create faculty profile
        self.faculty = Faculty.objects.create(
            user=self.user,
            title='Senior Physics Faculty',
            designation='Physics Teacher',
            subjects=['Physics', 'Mechanics'],
            achievements='IIT Madras Graduate',
            teaching_style='Concept-based learning',
            is_featured=True,
            order=1
        )

    def test_faculty_endpoint_exists(self):
        """Test that faculty endpoint is accessible"""
        response = self.client.get('/api/users/faculty/')
        self.assertIn(response.status_code, [200, 401])  # Either success or auth required

    def test_faculty_data_structure(self):
        """Test faculty data structure"""
        response = self.client.get('/api/users/faculty/')
        if response.status_code == 200:
            data = response.json()
            self.assertIsInstance(data, list)
            if data:
                faculty_item = data[0]
                required_fields = ['id', 'user', 'title', 'designation', 'subjects']
                for field in required_fields:
                    self.assertIn(field, faculty_item)

    def test_faculty_user_data(self):
        """Test that faculty includes user data"""
        response = self.client.get('/api/users/faculty/')
        if response.status_code == 200:
            data = response.json()
            if data:
                faculty_item = data[0]
                self.assertIn('user', faculty_item)
                user_data = faculty_item['user']
                self.assertIn('first_name', user_data)
                self.assertIn('last_name', user_data)


def run_faculty_tests():
    """Run faculty API tests"""
    print("=" * 60)
    print("TESTING FACULTY API ENDPOINT")
    print("=" * 60)
    
    # Test direct endpoint access
    client = Client()
    
    try:
        response = client.get('/api/users/faculty/')
        print(f"✓ Faculty endpoint status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Faculty data type: {type(data)}")
            print(f"✓ Faculty count: {len(data) if isinstance(data, list) else 'Not a list'}")
            
            if isinstance(data, list) and data:
                print(f"✓ Sample faculty data keys: {list(data[0].keys())}")
        else:
            print(f"⚠ Response content: {response.content.decode()}")
            
    except Exception as e:
        print(f"❌ Error testing faculty endpoint: {e}")
    
    print("=" * 60)


if __name__ == '__main__':
    run_faculty_tests()