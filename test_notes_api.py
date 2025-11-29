#!/usr/bin/env python3
import requests

def test_notes():
    """Test notes API endpoint"""
    try:
        response = requests.get("http://localhost:8000/api/notes/")
        
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            notes = data.get('results', data) if isinstance(data, dict) else data
            print(f"Notes Count: {len(notes) if isinstance(notes, list) else 'Not a list'}")
            
            if isinstance(notes, list) and notes:
                for note in notes[:3]:  # Show first 3
                    print(f"- {note.get('title', 'No title')}")
                    print(f"  Subject: {note.get('subject', 'No subject')}")
                    print(f"  Type: {note.get('file_type', 'No type')}")
                    print()
        else:
            print(f"Error: {response.text[:200]}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_notes()