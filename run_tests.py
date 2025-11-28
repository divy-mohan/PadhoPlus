#!/usr/bin/env python3
"""
Quick test runner for faculty API
"""

import subprocess
import sys
import os

def run_test():
    """Run the API connection test"""
    try:
        # Change to project directory
        os.chdir(r'e:\Divy\Projects\GitHub\PadhoPlus')
        
        # Run the test
        result = subprocess.run([
            sys.executable, 'test_api_connection.py'
        ], capture_output=True, text=True)
        
        print("STDOUT:")
        print(result.stdout)
        
        if result.stderr:
            print("STDERR:")
            print(result.stderr)
        
        print(f"Return code: {result.returncode}")
        
    except Exception as e:
        print(f"Error running test: {e}")

if __name__ == '__main__':
    run_test()