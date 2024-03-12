@echo off
cd /d "C:\Users\user\git\node_car_controller\backend\src"
pm2 start command_server.js --name "command-server"
timeout /t 1 /nobreak >nul
cd /d "C:\Users\user\git\node_car_controller\controller\src"
pm2 start controller.js --name "controller-nodejs"
timeout /t 1 /nobreak >nul
exit