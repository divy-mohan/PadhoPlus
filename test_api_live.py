#!/usr/bin/env python3
"""
Test live API endpoint
"""

import requests
import json

def test_batches_api():
    """Test batches API endpoint"""
    print("=" * 60)
    print("TESTING LIVE BATCHES API")
    print("=" * 60)
    
    url = "http://localhost:8000/api/batches/?is_active=true"
    
    try:
        print(f"Testing: {url}")
        response = requests.get(url, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            batches = data.get('results', data) if isinstance(data, dict) else data
            print(f"✓ Success! Batches count: {len(batches)}")
            
            if batches:
                print("\n✓ Sample Batch Data:")
                for i, batch in enumerate(batches[:3]):  # Show first 3
                    print(f"  {i+1}. {batch.get('name')}")
                    print(f"     Slug: {batch.get('slug')}")
                    print(f"     Target Exam: {batch.get('target_exam')}")
                    print(f"     Target Class: {batch.get('target_class')}")
                    print(f"     Is Featured: {batch.get('is_featured')}")
                    print(f"     Price: ₹{batch.get('price', 0)}")
                    print()
            else:
                print("⚠ No batch data returned")
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection failed. Is the Django server running?")
        print("Run: python manage.py runserver")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_faculty_api():
    """Test faculty API endpoint"""
    print("\n" + "=" * 60)
    print("TESTING LIVE FACULTY API")
    print("=" * 60)
    
    url = "http://localhost:8000/api/users/faculty/"
    
    try:
        print(f"Testing: {url}")
        response = requests.get(url, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Success! Faculty count: {len(data)}")
            
            if data:
                print("\n✓ Sample Faculty Data:")
                for i, faculty in enumerate(data[:2]):  # Show first 2
                    user = faculty.get('user', {})
                    print(f"  {i+1}. {user.get('first_name')} {user.get('last_name')}")
                    print(f"     Designation: {faculty.get('designation')}")
            else:
                print("⚠ No faculty data returned")
        else:
            print(f"❌ Error: {response.status_code}")
            
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
    test_batches_api()
    test_faculty_api()