#!/usr/bin/env python3
import requests
import json

def test_batch_data():
    """Test if FAQ and overview data is returned by API"""
    try:
        url = "http://localhost:8000/api/batches/jee-rankers-mathematics-2026-advanced-prep-batch/"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            
            print("🔍 Testing FAQ Section:")
            faqs = data.get('faqs', [])
            print(f"FAQ Count: {len(faqs)}")
            
            if faqs:
                for i, faq in enumerate(faqs):
                    print(f"FAQ {i+1}: {faq.get('question', 'No question')}")
                    print(f"Answer: {faq.get('answer', 'No answer')[:50]}...")
                    print()
                print("✅ FAQs are available in API")
            else:
                print("❌ No FAQs found in API response")
            
            print("\n🔍 Testing Overview Section:")
            description = data.get('description', '')
            features = data.get('features', [])
            includes = data.get('includes', [])
            
            print(f"Description: {description[:100] if description else 'No description'}...")
            print(f"Features Count: {len(features)}")
            print(f"Includes Count: {len(includes)}")
            
            if description or features or includes:
                print("✅ Overview data is available in API")
            else:
                print("❌ No overview data found in API response")
                
            print(f"\n📊 Full API Response Keys: {list(data.keys())}")
            
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"Response: {response.text[:200]}")
            
    except Exception as e:
        print(f"❌ Test Error: {e}")

if __name__ == "__main__":
    test_batch_data()