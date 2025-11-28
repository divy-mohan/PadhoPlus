#!/usr/bin/env python
"""
Admin Page Checker - Tests all admin pages and sub-pages for errors
Run with: python admin_page_checker.py
"""
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
django.setup()

from django.test import Client
from django.contrib.auth import get_user_model
from django.apps import apps
from django.urls import reverse
from django.contrib.admin.sites import AdminSite
import json
from datetime import datetime

User = get_user_model()

# Create admin client
client = Client()

# Create or get admin user
try:
    admin_user = User.objects.get(username='admin')
except User.DoesNotExist:
    print("Admin user not found. Creating one...")
    admin_user = User.objects.create_superuser('admin_test', 'test@admin.com', 'testpass123')

# Login
login_success = client.login(username='admin_test', password='testpass123')
if not login_success:
    login_success = client.login(username='admin', password='Admin@123')

if not login_success:
    print("Could not login to admin")
    sys.exit(1)

print("✅ Logged in successfully\n")

# List of admin models to test
ADMIN_MODELS = [
    ('users', 'user'),
    ('users', 'faculty'),
    ('users', 'testimonial'),
    ('users', 'result'),
    ('batches', 'subject'),
    ('batches', 'topic'),
    ('batches', 'batch'),
    ('batches', 'schedule'),
    ('batches', 'batchfaq'),
    ('batches', 'enrollment'),
    ('batches', 'announcement'),
    ('batches', 'batchreview'),
    ('content', 'lecture'),
    ('content', 'note'),
    ('content', 'resource'),
    ('content', 'watchhistory'),
    ('assessments', 'question'),
    ('assessments', 'test'),
    ('assessments', 'testattempt'),
    ('assessments', 'testresponse'),
    ('doubts', 'doubt'),
    ('doubts', 'doubtresponse'),
    ('payments', 'payment'),
    ('payments', 'enrollment'),
]

results = {
    'timestamp': datetime.now().isoformat(),
    'total_pages_tested': 0,
    'errors_found': 0,
    'error_details': [],
    'pages_tested': []
}

def test_admin_page(app_label, model_name, action='changelist'):
    """Test a single admin page"""
    try:
        url = reverse(f'admin:{app_label}_{model_name}_{action}')
    except:
        return None, f"Could not build URL for {app_label}.{model_name}.{action}"
    
    try:
        response = client.get(url)
        results['total_pages_tested'] += 1
        
        if response.status_code == 200:
            return url, None
        else:
            error = f"HTTP {response.status_code}"
            results['errors_found'] += 1
            return url, error
    except Exception as e:
        results['errors_found'] += 1
        return url, str(e)

print("=" * 70)
print("TESTING ADMIN PAGES".center(70))
print("=" * 70)

# Test each model's pages
for app_label, model_name in ADMIN_MODELS:
    print(f"\n📋 {app_label}.{model_name.upper()}")
    
    # Test changelist (list view)
    url, error = test_admin_page(app_label, model_name, 'changelist')
    if url:
        status = "✅" if error is None else "❌"
        print(f"  {status} Changelist: {url}")
        if error:
            results['error_details'].append({
                'page': f"{app_label}.{model_name} (changelist)",
                'url': url,
                'error': error
            })
    
    # Test add view
    url, error = test_admin_page(app_label, model_name, 'add')
    if url:
        status = "✅" if error is None else "❌"
        print(f"  {status} Add: {url}")
        if error:
            results['error_details'].append({
                'page': f"{app_label}.{model_name} (add)",
                'url': url,
                'error': error
            })

print("\n" + "=" * 70)
print(f"SUMMARY".center(70))
print("=" * 70)
print(f"Total pages tested: {results['total_pages_tested']}")
print(f"Errors found: {results['errors_found']}")

if results['error_details']:
    print("\n❌ ERRORS DETECTED:\n")
    for i, err_detail in enumerate(results['error_details'], 1):
        print(f"{i}. {err_detail['page']}")
        print(f"   URL: {err_detail['url']}")
        print(f"   Error: {err_detail['error']}\n")
else:
    print("\n✅ All admin pages working correctly!")

# Save results to file
with open('admin_checker_results.json', 'w') as f:
    json.dump(results, f, indent=2)

print(f"\nResults saved to: admin_checker_results.json")
