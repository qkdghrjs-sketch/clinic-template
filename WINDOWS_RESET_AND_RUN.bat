@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo =========================================
echo  Clinic Template - Windows reset + run
echo =========================================
echo.
echo [1/5] Stop Node processes if any...
taskkill /F /IM node.exe /T 2>nul

echo [2/5] Remove old install folders...
if exist node_modules rmdir /s /q node_modules
if exist .next rmdir /s /q .next
if exist package-lock.json del /f /q package-lock.json
if exist pnpm-lock.yaml del /f /q pnpm-lock.yaml

echo [3/5] Install dependencies with Windows-safe pnpm settings...
corepack pnpm@11.10.0 install --node-linker=hoisted --package-import-method=copy
if errorlevel 1 (
  echo.
  echo 설치 중 에러가 발생했습니다. 이 창의 마지막 20줄을 복사해서 보내주세요.
  pause
  exit /b 1
)

echo [4/5] Start local website...
echo 브라우저에서 http://localhost:3000 을 여세요.
echo 끄려면 이 창에서 Ctrl + C 를 누릅니다.
echo.
corepack pnpm@11.10.0 dev

echo.
echo [5/5] Finished.
pause
