@echo off
echo ===================================================
echo   KHOI DONG HE THONG SMART WAREHOUSE
echo ===================================================

echo [1/2] Dang khoi dong Backend Server (Spring Boot)...
start "Smart Warehouse - Backend" cmd /k "cd warehouse-service && mvnw spring-boot:run"

echo [2/2] Dang khoi dong Frontend (React Vite)...
start "Smart Warehouse - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Hoan tat! 
echo - Backend se chay o cong 8080.
echo - Frontend se chay o cong 5173.
echo Vui long cho vai giay de server khoi dong hoan toan truoc khi dang nhap.
echo ===================================================

