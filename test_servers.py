#!/usr/bin/env python3
import requests
import subprocess
import sys
import time

def check_backend():
    """Check if Django backend is running"""
    try:
        response = requests.get("http://localhost:8000/api/batches/", timeout=5)
        print(f"✅ Backend running - Status: {response.status_code}")
        return True
    except:
        print("❌ Backend not running")
        return False

def check_frontend():
    """Check if Next.js frontend is running"""
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        print(f"✅ Frontend running - Status: {response.status_code}")
        return True
    except:
        print("❌ Frontend not running")
        return False

def start_backend():
    """Start Django backend"""
    print("🚀 Starting Django backend...")
    try:
        subprocess.Popen(["python", "manage.py", "runserver"], cwd=".")
        time.sleep(3)
        return check_backend()
    except:
        print("❌ Failed to start backend")
        return False

def start_frontend():
    """Start Next.js frontend"""
    print("🚀 Starting Next.js frontend...")
    try:
        subprocess.Popen(["npm", "run", "dev"], cwd="frontend")
        time.sleep(5)
        return check_frontend()
    except:
        print("❌ Failed to start frontend")
        return False

def main():
    print("🔍 Checking servers...\n")
    
    backend_running = check_backend()
    frontend_running = check_frontend()
    
    if not backend_running:
        backend_running = start_backend()
    
    if not frontend_running:
        frontend_running = start_frontend()
    
    print(f"\n📊 Server Status:")
    print(f"Backend (Django): {'✅ Running' if backend_running else '❌ Not Running'}")
    print(f"Frontend (Next.js): {'✅ Running' if frontend_running else '❌ Not Running'}")
    
    if backend_running and frontend_running:
        print("\n🎉 Both servers are running!")
        print("🌐 Frontend: http://localhost:3000")
        print("🔧 Backend: http://localhost:8000")
    else:
        print("\n💥 Some servers failed to start!")

if __name__ == "__main__":
    main()