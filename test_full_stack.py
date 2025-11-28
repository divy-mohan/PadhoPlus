#!/usr/bin/env python3
import requests
import time

def test_backend():
    """Test backend API"""
    print("🔧 Testing Backend...")
    try:
        response = requests.get("http://localhost:8000/api/batches/jee-rankers-mathematics-2026-advanced-prep-batch/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend API: {data['name']}")
            return True
        else:
            print(f"❌ Backend failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend error: {e}")
        return False

def test_frontend():
    """Test frontend server"""
    print("🌐 Testing Frontend...")
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend server running")
            return True
        else:
            print(f"❌ Frontend failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Frontend error: {e}")
        return False

def main():
    print("🧪 Full Stack Test\n")
    
    backend_ok = test_backend()
    frontend_ok = test_frontend()
    
    print(f"\n📊 Results:")
    print(f"Backend: {'✅ PASS' if backend_ok else '❌ FAIL'}")
    print(f"Frontend: {'✅ PASS' if frontend_ok else '❌ FAIL'}")
    
    if not frontend_ok:
        print("\n💡 To start frontend:")
        print("cd frontend && npm run dev")
    
    if backend_ok and frontend_ok:
        print("\n🎉 Full stack is working!")
        print("🌐 Visit: http://localhost:3000/batch/jee-rankers-mathematics-2026-advanced-prep-batch")

if __name__ == "__main__":
    main()