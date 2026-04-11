@echo off
chcp 65001 > nul
echo ==============================================
echo KỊCH BẢN ĐẨY MÃ NGUỒN BACKEND LÊN GITHUB
echo ==============================================
echo.
echo Kịch bản này sẽ:
echo 1. Khởi tạo Git cho thư mục BE_IELTS.
echo 2. Đặt nhánh mặc định là 'main'.
echo 3. Thêm mã nguồn, commit với thông điệp khởi tạo.
echo 4. Yêu cầu bạn nhập Link Github Repository (đã tạo trống) chuẩn bị sẵn.
echo 5. Tiến hành đẩy mã nguồn lên Github để an toàn!
echo.
pause

if not exist .git (
    echo [INFO] Đang khởi tạo Git...
    git init
    git branch -M main
) else (
    echo [INFO] Kho lưu trữ Git đã được khởi tạo trước đó.
)

echo [INFO] Thêm toàn bộ các file (ngoại trừ node_modules theo danh sách cấu hình)...
git add .
git commit -m "Initialize Backend project for IELTS Web"

echo.
set /p REPO_URL=">> Vui lòng nhập URL của Repository Backend mới trên Github (VD: https://github.com/ho-ten/ielts-backend.git): "
if "%REPO_URL%"=="" (
    echo [ERROR] Bạn chưa nhập link Github! Dừng quá trình thao tác.
    pause
    exit /b
)

git remote add origin %REPO_URL%
echo [INFO] Đang push lên %REPO_URL% ...
git push -u origin main

if %errorlevel% neq 0 (
    echo [ERROR] Push thất bại! Kiểm tra quyền truy cập truy cập Github hoặc URL Github vừa nhập.
) else (
    echo [SUCCESS] Đã khởi tạo và hoàn tất đẩy BE_IELTS lên kho lưu trữ Github thành công!
)
pause
