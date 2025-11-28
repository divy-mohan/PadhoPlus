#!/usr/bin/env python3
"""
Test database connection and faculty data
"""

import os
import sys
import django
import psycopg

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_direct_db_connection():
    """Test direct database connection"""
    print("=" * 60)
    print("TESTING DIRECT DATABASE CONNECTION")
    print("=" * 60)
    
    try:
        # Test direct connection
        conn = psycopg.connect(
            host='69.62.78.57',
            port=5432,
            dbname='padhoplus_test',
            user='padhoplus_user',
            password='Mohan123#',
            connect_timeout=30
        )
        
        print("✓ Direct database connection successful")
        
        # Test faculty query
        with conn.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM faculty WHERE is_featured = true")
            count = cursor.fetchone()[0]
            print(f"✓ Featured faculty count: {count}")
            
            if count > 0:
                cursor.execute("""
                    SELECT f.title, f.designation, u.first_name, u.last_name 
                    FROM faculty f 
                    JOIN users u ON f.user_id = u.id 
                    WHERE f.is_featured = true 
                    LIMIT 3
                """)
                faculty = cursor.fetchall()
                print("✓ Sample faculty:")
                for f in faculty:
                    print(f"  - {f[2]} {f[3]} ({f[0]})")
        
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_django_connection():
    """Test Django database connection"""
    print("\n" + "=" * 60)
    print("TESTING DJANGO DATABASE CONNECTION")
    print("=" * 60)
    
    try:
        django.setup()
        print("✓ Django setup successful")
        
        from django.db import connection
        from padhoplus.users.models import Faculty
        
        # Test Django connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            print("✓ Django database connection successful")
        
        # Test Faculty model
        faculty_count = Faculty.objects.filter(is_featured=True).count()
        print(f"✓ Featured faculty count via Django: {faculty_count}")
        
        if faculty_count > 0:
            sample_faculty = Faculty.objects.filter(is_featured=True).first()
            print(f"✓ Sample faculty: {sample_faculty.user.first_name} {sample_faculty.user.last_name}")
        
        return True
        
    except Exception as e:
        print(f"❌ Django connection failed: {e}")
        return False

def test_api_endpoint():
    """Test API endpoint"""
    print("\n" + "=" * 60)
    print("TESTING API ENDPOINT")
    print("=" * 60)
    
    try:
        from django.test import Client
        
        client = Client()
        response = client.get('/api/users/faculty/')
        
        print(f"✓ Faculty API status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Faculty data type: {type(data)}")
            print(f"✓ Faculty count: {len(data)}")
            
            if data:
                print(f"✓ Sample faculty data: {data[0].get('user', {}).get('first_name')} {data[0].get('user', {}).get('last_name')}")
        else:
            print(f"⚠ Response: {response.content.decode()}")
        
        return response.status_code == 200
        
    except Exception as e:
        print(f"❌ API test failed: {e}")
        return False

def main():
    """Main test function"""
    print("COMPREHENSIVE DATABASE AND API TEST")
    print("=" * 60)
    
    # Test direct connection first
    db_ok = test_direct_db_connection()
    
    if db_ok:
        # Test Django connection
        django_ok = test_django_connection()
        
        if django_ok:
            # Test API endpoint
            api_ok = test_api_endpoint()
            
            if api_ok:
                print("\n" + "=" * 60)
                print("✓ ALL TESTS PASSED - FACULTY API SHOULD WORK")
                print("=" * 60)
            else:
                print("\n" + "=" * 60)
                print("⚠ API ENDPOINT ISSUE")
                print("=" * 60)
        else:
            print("\n" + "=" * 60)
            print("⚠ DJANGO CONNECTION ISSUE")
            print("=" * 60)
    else:
        print("\n" + "=" * 60)
        print("❌ DATABASE CONNECTION ISSUE")
        print("=" * 60)

if __name__ == '__main__':
    main()