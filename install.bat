@echo off
echo Installing Expense Tracker MERN Application...
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
echo Backend dependencies installed successfully!
echo.

echo Installing Frontend Dependencies...
cd ..\frontend\expense-tracker
call npm install
echo Frontend dependencies installed successfully!
echo.

echo Setup completed!
echo.
echo To start the application:
echo 1. Start MongoDB service
echo 2. Run 'npm run dev' in the backend folder
echo 3. Run 'npm run dev' in the frontend/expense-tracker folder
echo.
pause