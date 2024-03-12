@echo off
pm2 start ecosystem.config.js
timeout /t 1 /nobreak >nul
exit