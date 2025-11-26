#!/usr/bin/env python
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
sys.path.insert(0, '/home/runner/workspace')
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

print("=" * 60)
print("TESTING AUTHENTICATION FLOW")
print("=" * 60)

# Create API client with session support
client = APIClient(enforce_csrf_checks=False)

# Test 1: Check if user exists or create one
print("\n1. Creating/Getting test user...")
try:
    user = User.objects.get(email='test@example.com')
    print(f"   User found: {user.email}")
except User.DoesNotExist:
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123',
        first_name='Test',
        last_name='User'
    )
    print(f"   User created: {user.email}")

# Test 2: Test login endpoint
print("\n2. Testing login endpoint...")
login_data = {
    'email': 'test@example.com',
    'password': 'testpass123'
}
response = client.post('/api/auth/login/', login_data, format='json')
print(f"   Status: {response.status_code}")
print(f"   Response: {response.json()}")

# Check if session is set
if hasattr(client, 'session') and client.session:
    print(f"   Session data after login: {dict(client.session)}")
    print(f"   Session key: {client.session.session_key}")
else:
    print("   No session data found")

# Test 3: Test check endpoint (should show authenticated)
print("\n3. Testing check endpoint (should be authenticated)...")
response = client.get('/api/auth/check/')
print(f"   Status: {response.status_code}")
response_data = response.json()
print(f"   Response: {response_data}")
print(f"   Authenticated: {response_data.get('authenticated')}")

if response_data.get('authenticated'):
    user_data = response_data.get('user', {})
    print(f"   User email: {user_data.get('email')}")
    print("   SUCCESS: Authentication working!")
else:
    print("   ERROR: Not authenticated after login!")

# Test 4: Test logout
print("\n4. Testing logout endpoint...")
response = client.post('/api/auth/logout/')
print(f"   Status: {response.status_code}")
print(f"   Response: {response.json()}")

# Test 5: Check endpoint after logout (should be unauthenticated)
print("\n5. Testing check endpoint after logout (should be unauthenticated)...")
response = client.get('/api/auth/check/')
print(f"   Status: {response.status_code}")
response_data = response.json()
print(f"   Response: {response_data}")
print(f"   Authenticated: {response_data.get('authenticated')}")

if not response_data.get('authenticated'):
    print("   SUCCESS: Properly logged out")
else:
    print("   ERROR: Still authenticated after logout!")

print("\n" + "=" * 60)
print("TESTING FRONTEND API ROUTES")
print("=" * 60)

# Now test what the frontend would see
print("\nThe frontend should:")
print("1. Call /api/auth/me to check authentication")
print("2. Get back {user: {...}} if authenticated or {error: '...'} if not")
print("3. Show navbar with user name + logout if authenticated")
print("4. Show login/signup if not authenticated")

print("\n" + "=" * 60)
