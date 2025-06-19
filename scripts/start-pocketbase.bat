@echo off
echo Starting PocketBase server...
echo.
echo Admin UI will be available at: http://localhost:8090/_/
echo API will be available at: http://localhost:8090/api/
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0.."
pocketbase serve --http=0.0.0.0:8090 