#!/usr/bin/env python3
import requests

def test_faculty_details():
    """Test faculty details including intro_video_url, achievements, teaching_style"""
    try:
        response = requests.get("http://localhost:8000/api/users/faculty/")
        
        if response.status_code == 200:
            data = response.json()
            
            for faculty in data:
                user = faculty.get('user', {})
                print(f"Faculty: {user.get('first_name')} {user.get('last_name')}")
                print(f"Intro Video: {faculty.get('intro_video_url', 'Not set')}")
                print(f"Achievements: {faculty.get('achievements', 'Not set')}")
                print(f"Teaching Style: {faculty.get('teaching_style', 'Not set')}")
                print(f"Bio: {user.get('bio', 'Not set')}")
                print("-" * 50)
                
        else:
            print(f"❌ Error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_faculty_details()