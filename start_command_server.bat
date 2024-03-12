@echo off
cd /d "C:\Users\user\git\node_car_controller\backend\src"
pm2 start command_server.js --name "command-server"
timeout /t 10 /nobreak >nul
exit