#!/usr/bin/env python3
import requests
import json

def test_auth_endpoints():
    """Deep debug test for authentication system"""
    
    print("🔍 DEEP AUTH DEBUG TEST")
    print("=" * 50)
    
    base_url = "http://localhost:8000"
    session = requests.Session()
    
    # Test 1: Check auth endpoints exist
    print("\n1️⃣ Testing Auth Endpoints Availability:")
    endpoints = [
        "/api/auth/check/",
        "/api/auth/logout/", 
        "/api/auth/login/",
        "/api/auth/register/"
    ]
    
    for endpoint in endpoints:
        try:
            response = session.get(f"{base_url}{endpoint}")
            print(f"   {endpoint}: {response.status_code}")
        except Exception as e:
            print(f"   {endpoint}: ERROR - {e}")
    
    # Test 2: Check current auth status
    print("\n2️⃣ Testing Current Auth Status:")
    try:
        response = session.get(f"{base_url}/api/auth/check/")
        print(f"   Status: {response.status_code}")
        print(f"   Headers: {dict(response.headers)}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Response: {json.dumps(data, indent=2)}")
        else:
            print(f"   Error Response: {response.text[:200]}")
    except Exception as e:
        print(f"   ERROR: {e}")
    
    # Test 3: Test logout endpoint
    print("\n3️⃣ Testing Logout Endpoint:")
    try:
        response = session.post(f"{base_url}/api/auth/logout/")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text[:200]}")
    except Exception as e:
        print(f"   ERROR: {e}")
    
    # Test 4: Check CORS headers
    print("\n4️⃣ Testing CORS Configuration:")
    try:
        response = session.options(f"{base_url}/api/auth/check/", headers={
            'Origin': 'http://localhost:5000',
            'Access-Control-Request-Method': 'GET'
        })
        print(f"   CORS Status: {response.status_code}")
        cors_headers = {k: v for k, v in response.headers.items() if 'access-control' in k.lower()}
        print(f"   CORS Headers: {cors_headers}")
    except Exception as e:
        print(f"   CORS ERROR: {e}")
    
    # Test 5: Check session/cookies
    print("\n5️⃣ Testing Session/Cookies:")
    print(f"   Session Cookies: {dict(session.cookies)}")
    
    # Test 6: Test with credentials
    print("\n6️⃣ Testing with Credentials:")
    try:
        response = requests.get(f"{base_url}/api/auth/check/", 
                              headers={'Origin': 'http://localhost:5000'},
                              allow_redirects=False)
        print(f"   Status: {response.status_code}")
        print(f"   Set-Cookie: {response.headers.get('Set-Cookie', 'None')}")
    except Exception as e:
        print(f"   ERROR: {e}")
    
    print("\n" + "=" * 50)
    print("🏁 DEBUG TEST COMPLETE")

if __name__ == "__main__":
    test_auth_endpoints()