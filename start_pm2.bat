@echo off
REM Change directory to your Node.js app directory
cd /d "C:\Users\user\git\node_car_controller\backend\src"

REM Start PM2 and your Node.js app
pm2 start command_server.js --name "command-server"

REM Change directory to your Node.js app directory
cd /d "C:\Users\user\git\node_car_controller\controller\src"

REM Start PM2 and your Node.js app
pm2 start conrtoller.js --name "controller"

REM Wait for a few seconds to ensure PM2 has started
timeout /t 5 /nobreak 62nul

exit
