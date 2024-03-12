echo off
REM Change directory to your Node.js app directory
cd /d "C:\"
REM Start PM2 and your Node.js app
pm2 start app.js --name "my-node-app"
REM Wait for a few seconds to ensure PM2 has started
timeout /t 5 /nobreak 62nul

exit
