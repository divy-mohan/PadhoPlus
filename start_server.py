#!/usr/bin/env python3
"""
Start Django development server
"""

import os
import sys
import subprocess

def start_server():
    """Start Django development server"""
    try:
        # Change to project directory
        os.chdir(r'e:\Divy\Projects\GitHub\PadhoPlus')
        
        print("Starting Django development server...")
        print("Faculty API will be available at: http://localhost:8000/api/users/faculty/")
        print("Press Ctrl+C to stop the server")
        print("=" * 60)
        
        # Start server
        subprocess.run([
            sys.executable, 'manage.py', 'runserver', '0.0.0.0:8000'
        ])
        
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except Exception as e:
        print(f"Error starting server: {e}")

if __name__ == '__main__':
    start_server()