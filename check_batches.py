#!/usr/bin/env python3
import requests

def check_batches():
    """Check what batches exist"""
    try:
        # Get batch list
        response = requests.get("http://localhost:8000/api/batches/")
        
        if response.status_code == 200:
            data = response.json()
            batches = data.get('results', [])
            
            print(f"Found {len(batches)} batches:")
            for batch in batches:
                print(f"- ID: {batch.get('id')}")
                print(f"  Name: {batch.get('name')}")
                print(f"  Slug: {batch.get('slug')}")
                print()
                
            if batches:
                # Test first batch
                first_batch = batches[0]
                slug = first_batch.get('slug')
                print(f"Testing batch with slug: {slug}")
                
                response = requests.get(f"http://localhost:8000/api/batches/{slug}/")
                if response.status_code == 200:
                    data = response.json()
                    print(f"✅ Batch detail works")
                    print(f"FAQs: {len(data.get('faqs', []))}")
                    print(f"Description: {bool(data.get('description'))}")
                else:
                    print(f"❌ Batch detail failed: {response.status_code}")
        else:
            print(f"❌ Failed to get batches: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_batches()