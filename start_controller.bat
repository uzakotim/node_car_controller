@echo off
cd /d "C:\Users\user\git\node_car_controller\controller\src"
pm2 start controller.js --name "controller-nodejs"
timeout /t 5 /nobreak >nul
exit