#!/usr/bin/env python3
import requests

def test_faculty():
    """Test faculty endpoint"""
    try:
        response = requests.get("http://localhost:8000/api/users/faculty/")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Faculty Count: {len(data)}")
            
            for faculty in data:
                user = faculty.get('user', {})
                print(f"- {user.get('first_name')} {user.get('last_name')}")
                print(f"  Designation: {faculty.get('designation', 'N/A')}")
                print(f"  Featured: {faculty.get('is_featured')}")
                print()
                
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_faculty()