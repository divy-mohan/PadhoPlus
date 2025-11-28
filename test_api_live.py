#!/usr/bin/env python3
"""
Test live API endpoint
"""

import requests
import json

def test_faculty_api():
    """Test faculty API endpoint"""
    print("=" * 60)
    print("TESTING LIVE FACULTY API")
    print("=" * 60)
    
    url = "http://localhost:8000/api/users/faculty/"
    
    try:
        print(f"Testing: {url}")
        response = requests.get(url, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Success! Faculty count: {len(data)}")
            
            if data:
                print("\n✓ Sample Faculty Data:")
                for i, faculty in enumerate(data[:3]):  # Show first 3
                    user = faculty.get('user', {})
                    print(f"  {i+1}. {user.get('first_name')} {user.get('last_name')}")
                    print(f"     Title: {faculty.get('title')}")
                    print(f"     Designation: {faculty.get('designation')}")
                    print(f"     Subjects: {faculty.get('subjects', [])}")
                    print()
            else:
                print("⚠ No faculty data returned")
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection failed. Is the Django server running?")
        print("Run: python manage.py runserver")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_api_root():
    """Test API root endpoint"""
    print("\n" + "=" * 60)
    print("TESTING API ROOT")
    print("=" * 60)
    
    url = "http://localhost:8000/"
    
    try:
        response = requests.get(url, timeout=10)
        print(f"API Root Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ API Name: {data.get('name')}")
            print(f"✓ Version: {data.get('version')}")
            
    except Exception as e:
        print(f"❌ API Root Error: {e}")

if __name__ == '__main__':
    test_api_root()
    test_faculty_api()