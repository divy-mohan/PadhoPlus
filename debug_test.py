#!/usr/bin/env python3
import requests
import time
import json

def debug_request(url, description):
    """Debug HTTP request with detailed info"""
    print(f"\n🔍 {description}")
    print(f"URL: {url}")
    
    try:
        start_time = time.time()
        response = requests.get(url, timeout=10)
        end_time = time.time()
        
        print(f"Status: {response.status_code}")
        print(f"Response Time: {(end_time - start_time):.2f}s")
        print(f"Content-Type: {response.headers.get('content-type', 'Unknown')}")
        print(f"Content-Length: {len(response.content)} bytes")
        
        if response.status_code == 200:
            if 'application/json' in response.headers.get('content-type', ''):
                data = response.json()
                print(f"JSON Keys: {list(data.keys()) if isinstance(data, dict) else 'Not a dict'}")
                return True, data
            else:
                print(f"Response Preview: {response.text[:200]}...")
                return True, response.text
        else:
            print(f"Error Response: {response.text[:500]}")
            return False, None
            
    except requests.exceptions.ConnectionError as e:
        print(f"❌ Connection Error: {e}")
        print("💡 Server might not be running")
        return False, None
    except Exception as e:
        print(f"❌ Error: {e}")
        return False, None

def test_backend():
    """Test backend with deep debugging"""
    print("🔧 Testing Backend API...")
    
    # Test API root
    success, data = debug_request("http://localhost:8000/", "API Root")
    if not success:
        return False
    
    # Test batch list
    success, data = debug_request("http://localhost:8000/api/batches/", "Batch List")
    if not success:
        return False
    
    # Test specific batch
    batch_url = "http://localhost:8000/api/batches/jee-rankers-mathematics-2026-advanced-prep-batch/"
    success, data = debug_request(batch_url, "Batch Detail")
    
    if success and isinstance(data, dict):
        print(f"\n📊 Batch Analysis:")
        print(f"Name: {data.get('name', 'N/A')}")
        print(f"Faculty: {len(data.get('faculty', []))}")
        print(f"FAQs: {len(data.get('faqs', []))}")
        print(f"Price: {data.get('price', 'N/A')}")
        return True
    
    return False

def test_frontend():
    """Test frontend with debugging"""
    print("\n🌐 Testing Frontend...")
    
    success, data = debug_request("http://localhost:5000", "Frontend Root")
    if not success:
        return False
    
    batch_url = "http://localhost:5000/batch/jee-rankers-mathematics-2026-advanced-prep-batch"
    success, data = debug_request(batch_url, "Batch Page")
    return success

def test_cors():
    """Test CORS"""
    print("\n🔒 Testing CORS...")
    
    try:
        response = requests.options("http://localhost:8000/api/batches/", headers={
            'Origin': 'http://localhost:5000',
            'Access-Control-Request-Method': 'GET'
        })
        
        print(f"CORS Status: {response.status_code}")
        print(f"Allow-Origin: {response.headers.get('Access-Control-Allow-Origin', 'Not Set')}")
        return response.status_code in [200, 204]
        
    except Exception as e:
        print(f"❌ CORS Error: {e}")
        return False

def main():
    print("🧪 Deep Debug Test\n")
    
    backend_ok = test_backend()
    frontend_ok = test_frontend()
    cors_ok = test_cors()
    
    print(f"\n📊 Results:")
    print(f"Backend: {'✅ PASS' if backend_ok else '❌ FAIL'}")
    print(f"Frontend: {'✅ PASS' if frontend_ok else '❌ FAIL'}")
    print(f"CORS: {'✅ PASS' if cors_ok else '❌ FAIL'}")
    
    if not frontend_ok:
        print("\n💡 Start frontend: cd frontend && npm run dev")

if __name__ == "__main__":
    main()