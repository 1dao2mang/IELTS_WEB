# 📁 Thư Mục Upload - Media Files

Thư mục này chứa các file media (hình ảnh, âm thanh) cho các đề thi IELTS.

## 📂 Cấu Trúc Thư Mục

```
uploads/
├── audio/
│   └── listening/          # File audio cho Listening tests
│       ├── test-1-section-1.mp3
│       ├── test-1-section-2.mp3
│       └── ...
│
└── images/
    ├── reading/            # Hình ảnh cho Reading tests (diagrams, charts)
    │   ├── diagram-solar-panel.png
    │   ├── chart-population.jpg
    │   └── ...
    │
    └── writing/            # Hình ảnh cho Writing Task 1 (charts, graphs, maps)
        ├── bar-chart-sales.png
        ├── pie-chart-energy.jpg
        ├── line-graph-temperature.png
        └── ...
```

## 🎵 Audio Files (Listening)

**Định dạng hỗ trợ:** `.mp3`, `.wav`, `.m4a`, `.ogg`

**Kích thước khuyến nghị:** < 50MB/file

**Quy tắc đặt tên:**

- Sử dụng chữ thường
- Dùng dấu gạch ngang `-` thay vì khoảng trắng
- Đặt tên có ý nghĩa, dễ nhận biết

**Ví dụ tên file tốt:**

```
listening-test-1-section-1.mp3
conversation-hotel-booking.mp3
lecture-climate-change.wav
interview-job-application.mp3
```

**Ví dụ tên file KHÔNG nên dùng:**

```
❌ Audio File 1.mp3          (có khoảng trắng)
❌ TEST_AUDIO.MP3            (viết hoa)
❌ file (1).mp3              (ký tự đặc biệt)
❌ bài nghe 1.mp3            (có dấu tiếng Việt)
```

## 🖼️ Image Files

**Định dạng hỗ trợ:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`

**Kích thước khuyến nghị:** < 5MB/file

**Độ phân giải khuyến nghị:**

- Charts/Graphs: 800x600px hoặc 1200x800px
- Diagrams: 1000x700px
- Maps: 1200x900px

**Quy tắc đặt tên:** Giống như audio files

**Ví dụ tên file tốt:**

```
# Writing Task 1
bar-chart-population-2024.png
pie-chart-energy-sources.jpg
line-graph-temperature-trends.png
process-diagram-water-cycle.svg
map-city-development.png

# Reading passages
diagram-solar-panel-system.png
chart-internet-usage.jpg
illustration-brain-structure.png
```

## 📝 Cách Sử Dụng

### 1. Copy File Vào Thư Mục

```bash
# Copy audio file
copy your-audio.mp3 public\uploads\audio\listening\

# Copy image file
copy your-chart.png public\uploads\images\writing\
```

### 2. Tham Chiếu Trong JSON

**Đường dẫn bắt đầu từ `/uploads/`:**

```json
{
  "audioUrl": "/uploads/audio/listening/test-1-section-1.mp3"
}
```

```json
{
  "imageUrl": "/uploads/images/writing/bar-chart-sales.png"
}
```

### 3. Truy Cập Qua API

Sau khi server chạy, file có thể truy cập qua:

```
http://localhost:5000/uploads/audio/listening/test-1.mp3
http://localhost:5000/uploads/images/writing/chart.png
```

## ⚠️ Lưu Ý Quan Trọng

1. **Không commit file lớn vào Git:**

   - File `public/uploads/` đã được thêm vào `.gitignore`
   - Nên sử dụng CDN hoặc cloud storage cho production

2. **Kiểm tra file tồn tại trước khi import:**

   ```bash
   dir public\uploads\audio\listening\
   dir public\uploads\images\writing\
   ```

3. **Tối ưu hóa file:**

   - Nén ảnh trước khi upload (TinyPNG, ImageOptim)
   - Chuyển audio sang MP3 format để tiết kiệm dung lượng
   - Sử dụng độ phân giải phù hợp

4. **Bảo mật:**
   - Không upload file thực thi (.exe, .bat, .sh)
   - Kiểm tra file trước khi upload
   - Giới hạn kích thước file upload

## 🚀 Production Setup

Khi deploy lên production, nên:

1. **Sử dụng CDN:**

   ```json
   {
     "audioUrl": "https://cdn.example.com/audio/test-1.mp3",
     "imageUrl": "https://cdn.example.com/images/chart.png"
   }
   ```

2. **Upload lên Cloud Storage:**

   - AWS S3
   - Google Cloud Storage
   - Cloudinary
   - Azure Blob Storage

3. **Cấu hình CORS:**
   - Cho phép frontend domain truy cập media files

## 📊 File Size Limits

```javascript
// src/config/upload.config.ts
export const UPLOAD_LIMITS = {
  audio: {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: [".mp3", ".wav", ".m4a", ".ogg"],
  },
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
  },
};
```

## 🔍 Troubleshooting

### File không load được?

1. Kiểm tra file tồn tại:

   ```bash
   dir public\uploads\audio\listening\your-file.mp3
   ```

2. Kiểm tra tên file trong JSON có khớp không

3. Kiểm tra server đã serve static files chưa:

   ```typescript
   // src/app.ts
   app.use("/uploads", express.static("public/uploads"));
   ```

4. Kiểm tra CORS settings nếu frontend ở domain khác

### File quá lớn?

- Nén audio: Audacity, FFmpeg
- Nén ảnh: TinyPNG, ImageOptim, Squoosh
- Giảm bitrate audio: 128kbps là đủ cho voice
- Giảm resolution ảnh: Không cần quá 1200px width

---

**Tài liệu liên quan:**

- [JSON_FORMAT_GUIDE.md](../../JSON_FORMAT_GUIDE.md) - Format JSON cho đề thi
- [FRONTEND_INTEGRATION.md](../../FRONTEND_INTEGRATION.md) - Tích hợp FE
