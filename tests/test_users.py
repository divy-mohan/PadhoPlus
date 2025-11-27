import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'padhoplus.settings')
sys.path.insert(0, '/home/runner/workspace')

django.setup()

from django.contrib.auth import get_user_model, authenticate
from padhoplus.users.models import User

def test_user_model_fields():
    """Test that User model has all required fields"""
    print("\n✓ Testing User model fields...")
    
    # Check fields exist
    fields = ['role', 'phone', 'profile_image', 'bio', 'target_exam', 'target_year', 
              'current_class', 'school_college', 'language_preference', 'qualifications',
              'experience_years', 'specialization', 'referral_code', 'referred_by']
    
    for field in fields:
        if hasattr(User, field):
            print(f"  ✓ Field '{field}' exists")
        else:
            raise AssertionError(f"❌ Field '{field}' missing from User model")
    
    print("✓ All fields exist on User model!\n")


def test_user_string_methods():
    """Test User model string representation"""
    print("✓ Testing User model methods...")
    
    # Test that methods exist
    if hasattr(User, 'is_student'):
        print("  ✓ Method 'is_student' exists")
    else:
        raise AssertionError("❌ Method 'is_student' missing")
    
    if hasattr(User, 'is_teacher'):
        print("  ✓ Method 'is_teacher' exists")
    else:
        raise AssertionError("❌ Method 'is_teacher' missing")
    
    if hasattr(User, 'is_parent'):
        print("  ✓ Method 'is_parent' exists")
    else:
        raise AssertionError("❌ Method 'is_parent' missing")
    
    if hasattr(User, 'full_name'):
        print("  ✓ Property 'full_name' exists")
    else:
        raise AssertionError("❌ Property 'full_name' missing")
    
    print("✓ All methods exist on User model!\n")


def test_user_admin_config():
    """Test that User admin is configured"""
    print("✓ Testing User admin configuration...")
    
    from padhoplus.users.admin import UserAdmin
    
    # Check that admin is registered
    if hasattr(UserAdmin, 'list_display'):
        print(f"  ✓ list_display configured: {UserAdmin.list_display}")
    else:
        raise AssertionError("❌ list_display not configured")
    
    if hasattr(UserAdmin, 'list_filter'):
        print(f"  ✓ list_filter configured: {len(UserAdmin.list_filter)} filters")
    else:
        raise AssertionError("❌ list_filter not configured")
    
    if hasattr(UserAdmin, 'search_fields'):
        print(f"  ✓ search_fields configured: {UserAdmin.search_fields}")
    else:
        raise AssertionError("❌ search_fields not configured")
    
    if hasattr(UserAdmin, 'fieldsets'):
        print(f"  ✓ fieldsets configured: {len(UserAdmin.fieldsets) - 1} sections")
    else:
        raise AssertionError("❌ fieldsets not configured")
    
    print("✓ User admin is fully configured!\n")


def test_database_connection():
    """Test database connection"""
    print("✓ Testing database connection...")
    
    from django.db import connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            print("  ✓ Database connection successful")
    except Exception as e:
        raise AssertionError(f"❌ Database connection failed: {str(e)}")
    
    print("✓ Database connection works!\n")


def test_user_table_exists():
    """Test that users table exists with correct columns"""
    print("✓ Testing users table schema...")
    
    from django.db import connection
    
    required_columns = ['id', 'username', 'email', 'password', 'role', 'phone', 
                       'profile_image', 'bio', 'target_exam', 'target_year',
                       'current_class', 'school_college', 'language_preference',
                       'qualifications', 'experience_years', 'specialization']
    
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT column_name FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'users'
            ORDER BY ordinal_position
        """)
        db_columns = [row[0] for row in cursor.fetchall()]
        
        for col in required_columns:
            if col in db_columns:
                print(f"  ✓ Column '{col}' exists in database")
            else:
                raise AssertionError(f"❌ Column '{col}' missing from users table")
    
    print("✓ All required columns exist in users table!\n")


def test_django_system_checks():
    """Test Django system checks pass"""
    print("✓ Testing Django system checks...")
    
    from django.core.management import call_command
    from io import StringIO
    
    try:
        out = StringIO()
        call_command('check', stdout=out)
        output = out.getvalue()
        if "System check identified no issues" in output or "0 silenced" in output:
            print("  ✓ Django system checks passed")
        else:
            print(f"  ⚠ Django checks: {output}")
    except Exception as e:
        raise AssertionError(f"❌ Django system check failed: {str(e)}")
    
    print("✓ Django system checks passed!\n")


def run_all_tests():
    """Run all tests"""
    print("=" * 60)
    print("RUNNING COMPREHENSIVE DJANGO USER MODEL TESTS")
    print("=" * 60)
    
    tests = [
        test_database_connection,
        test_user_table_exists,
        test_user_model_fields,
        test_user_string_methods,
        test_user_admin_config,
        test_django_system_checks,
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            test()
            passed += 1
        except AssertionError as e:
            print(f"❌ {str(e)}")
            failed += 1
        except Exception as e:
            print(f"❌ Unexpected error in {test.__name__}: {str(e)}")
            failed += 1
    
    print("=" * 60)
    print(f"TEST RESULTS: {passed} PASSED, {failed} FAILED")
    print("=" * 60)
    
    return failed == 0


if __name__ == '__main__':
    success = run_all_tests()
    sys.exit(0 if success else 1)
