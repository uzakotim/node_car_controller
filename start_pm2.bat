timeout /t 5 /nobreak >nul
cd C:\Users\user\git\node_car_controller\
pm2 start ecosystem.config.js
timeout /t 5 /nobreak >nul
exit
