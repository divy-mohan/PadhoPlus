#!/usr/bin/env python3
import requests

def test_batch_api():
    """Quick test of batch API"""
    try:
        # Test batch detail that was failing
        url = "http://localhost:8000/api/batches/jee-rankers-mathematics-2026-advanced-prep-batch/"
        response = requests.get(url)
        
        print(f"Status: {response.status_code}")
        print(f"Content-Type: {response.headers.get('content-type', 'Unknown')}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success - Batch: {data.get('name', 'Unknown')}")
            print(f"Faculty count: {len(data.get('faculty', []))}")
            print(f"FAQs count: {len(data.get('faqs', []))}")
        else:
            print(f"❌ Error: {response.text[:200]}")
            
    except Exception as e:
        print(f"❌ Exception: {e}")

if __name__ == "__main__":
    test_batch_api()