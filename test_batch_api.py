#!/usr/bin/env python3
import requests
import json
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# Configuration
BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:3000"
BATCH_SLUG = "jee-rankers-mathematics-2026-advanced-prep-batch"

def test_backend_api():
    """Test Django backend API"""
    print("🔧 Testing Backend API...")
    
    try:
        # Test batch list endpoint
        response = requests.get(f"{BACKEND_URL}/api/batches/")
        print(f"Batch List: {response.status_code}")
        
        # Test specific batch detail
        response = requests.get(f"{BACKEND_URL}/api/batches/{BATCH_SLUG}/")
        print(f"Batch Detail: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend API working - Batch: {data.get('name', 'Unknown')}")
            return True
        else:
            print(f"❌ Backend API failed: {response.status_code}")
            print(f"Response: {response.text[:200]}")
            return False
            
    except Exception as e:
        print(f"❌ Backend API error: {e}")
        return False

def test_frontend():
    """Test Next.js frontend"""
    print("🌐 Testing Frontend...")
    
    try:
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        
        driver = webdriver.Chrome(options=chrome_options)
        
        # Test batch detail page
        driver.get(f"{FRONTEND_URL}/batch/{BATCH_SLUG}")
        time.sleep(3)
        
        # Check if page loaded without error
        page_title = driver.title
        error_elements = driver.find_elements(By.XPATH, "//*[contains(text(), 'Error') or contains(text(), '500') or contains(text(), '404')]")
        
        driver.quit()
        
        if error_elements:
            print(f"❌ Frontend has errors on page")
            return False
        else:
            print(f"✅ Frontend working - Page title: {page_title}")
            return True
            
    except Exception as e:
        print(f"❌ Frontend error: {e}")
        return False

def main():
    print("🧪 Testing PadhoPlus Batch System\n")
    
    backend_ok = test_backend_api()
    frontend_ok = test_frontend()
    
    print("\n📊 Test Results:")
    print(f"Backend API: {'✅ PASS' if backend_ok else '❌ FAIL'}")
    print(f"Frontend: {'✅ PASS' if frontend_ok else '❌ FAIL'}")
    
    if backend_ok and frontend_ok:
        print("\n🎉 All tests passed!")
        sys.exit(0)
    else:
        print("\n💥 Some tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()