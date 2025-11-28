#!/usr/bin/env python3
import requests

def test_batch_data():
    """Test FAQ and overview with correct slug"""
    try:
        url = "http://localhost:8000/api/batches/jee-rankers-2026-advanced-prep-batch/"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            
            print("🔍 FAQ Section Test:")
            faqs = data.get('faqs', [])
            print(f"FAQ Count: {len(faqs)}")
            
            for i, faq in enumerate(faqs):
                print(f"FAQ {i+1}: {faq.get('question')}")
                print(f"Answer: {faq.get('answer')}")
                print()
            
            print("🔍 Overview Section Test:")
            print(f"Description: {data.get('description', 'No description')}")
            print(f"Features: {data.get('features', [])}")
            print(f"Includes: {data.get('includes', [])}")
            
            print("✅ Both FAQ and Overview data are working!")
            
        else:
            print(f"❌ Error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_batch_data()