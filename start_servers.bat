@echo off
echo Starting PadhoPlus Development Servers...

echo.
echo Starting Django Backend...
start "Django Backend" cmd /k "cd /d %~dp0 && python manage.py runserver"

echo.
echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo.
echo Starting Next.js Frontend...
start "Next.js Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause