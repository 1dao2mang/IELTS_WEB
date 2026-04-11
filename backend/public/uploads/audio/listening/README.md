# 🎵 Audio Files - Listening Tests

Thư mục này chứa file audio cho các bài Listening test.

## 📁 Cấu Trúc

```
listening/
├── test-1-section-1.mp3
├── test-1-section-2.mp3
├── test-2-section-1.mp3
└── ...
```

## 📝 Quy Tắc Đặt Tên File

**Format:** `test-[số]-section-[số].mp3`

**Ví dụ:**

- `test-1-section-1.mp3` - Test 1, Section 1
- `test-5-section-3.mp3` - Test 5, Section 3
- `conversation-hotel-booking.mp3` - Tên mô tả (cho dễ nhớ)

## 🎵 Định Dạng File

- **Format khuyến nghị:** MP3 (tương thích tốt nhất)
- **Bitrate:** 128kbps (đủ cho voice, giảm kích thước file)
- **Sample rate:** 44.1kHz hoặc 48kHz
- **Channels:** Mono hoặc Stereo
- **Kích thước:** < 50MB/file

## 💡 Cách Sử Dụng

### 1. Copy File Vào Thư Mục

```bash
copy your-audio.mp3 public\uploads\audio\listening\
```

### 2. Tham Chiếu Trong JSON

```json
{
  "type": "LISTENING",
  "audioFiles": [
    {
      "audioUrl": "/uploads/audio/listening/test-1-section-1.mp3",
      "duration": 300,
      "transcript": "Full transcript..."
    }
  ]
}
```

### 3. Truy Cập File

Sau khi server chạy:

```
http://localhost:5000/uploads/audio/listening/test-1-section-1.mp3
```

## 🔄 Chuyển Đổi Format

### Từ WAV sang MP3 (giảm kích thước):

**Dùng FFmpeg:**

```bash
ffmpeg -i input.wav -codec:a libmp3lame -b:a 128k output.mp3
```

**Dùng Audacity:**

1. File → Open → chọn file WAV
2. File → Export → Export as MP3
3. Quality: 128 kbps
4. Save

### Cắt/Chỉnh Sửa Audio:

**Dùng Audacity:**

1. Mở file audio
2. Selection Tool: Chọn đoạn cần giữ
3. Edit → Remove Audio or Labels → Trim Audio
4. Export as MP3

## 📊 Thông Tin File

### IELTS Listening Test Format:

- **Section 1:** Conversation (2 người) - 6-8 phút
- **Section 2:** Monologue (1 người) - 5-7 phút
- **Section 3:** Conversation (2-4 người) - 6-8 phút
- **Section 4:** Monologue academic (lecture) - 5-7 phút

**Total:** ~30 phút cho cả test

### Khuyến Nghị:

- Chia mỗi section thành 1 file riêng
- Hoặc 1 file cho cả test (30 phút)
- Kèm transcript đầy đủ trong JSON

## ⚠️ Lưu Ý

1. **Không upload file quá lớn:**

   - Nếu file > 50MB, giảm bitrate xuống 96kbps hoặc 128kbps

2. **Test file trước khi import:**

   - Mở file trong trình duyệt
   - Kiểm tra audio play được không
   - Kiểm tra thời lượng

3. **Backup file:**

   - Lưu file gốc ở nơi khác
   - `public/uploads/` không được commit vào Git

4. **Tên file:**
   - Không dùng khoảng trắng
   - Không dùng ký tự đặc biệt
   - Không dùng tiếng Việt có dấu

## 🎯 Checklist Upload Audio

- [ ] File đúng format (.mp3, .wav, .m4a)
- [ ] Kích thước < 50MB
- [ ] Tên file không có khoảng trắng
- [ ] File audio play được bình thường
- [ ] Đã copy vào `public/uploads/audio/listening/`
- [ ] Đã cập nhật đường dẫn trong JSON (`/uploads/audio/listening/file.mp3`)
- [ ] Có transcript (khuyến nghị)
- [ ] Đã ghi duration (giây) trong JSON

---

**Tài liệu liên quan:**

- [JSON_FORMAT_GUIDE.md](../../../JSON_FORMAT_GUIDE.md)
- [uploads/README.md](../README.md)
