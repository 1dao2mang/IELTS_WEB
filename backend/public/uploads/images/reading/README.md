# 🖼️ Images - Reading Passages

Thư mục này chứa hình ảnh cho Reading passages (diagrams, illustrations, charts).

## 📁 Cấu Trúc

```
reading/
├── diagram-solar-panel.png
├── chart-brain-structure.jpg
├── illustration-water-cycle.svg
├── map-ancient-city.png
└── ...
```

## 📝 Quy Tắc Đặt Tên File

**Format:** `[type]-[description].png`

**Ví dụ:**

- `diagram-solar-panel-system.png`
- `chart-internet-usage-trends.jpg`
- `illustration-cell-structure.png`
- `map-roman-empire.png`
- `photo-ancient-ruins.jpg`

## 🖼️ Định Dạng File

- **Format:** `.jpg`, `.png`, `.svg`
- **Kích thước:** < 5MB/file
- **Độ phân giải:** 800x600px đến 1200x900px
- **DPI:** 72-96 DPI

## 📊 Các Loại Hình Ảnh Trong Reading

### 1. Diagrams (Sơ đồ)

- Scientific diagrams (solar system, cell structure)
- Technical diagrams (machines, equipment)
- Labeled diagrams (anatomy, architecture)

### 2. Illustrations (Minh họa)

- Historical illustrations
- Educational illustrations
- Concept illustrations

### 3. Charts/Graphs (Biểu đồ)

- Supporting data for passages
- Statistical information
- Trends and patterns

### 4. Maps (Bản đồ)

- Historical maps
- Geographic maps
- Archaeological site maps

### 5. Photos (Ảnh)

- Historical photos
- Scientific photos
- Cultural photos

## 💡 Cách Sử Dụng

### 1. Copy File Vào Thư Mục

```bash
copy your-diagram.png public\uploads\images\reading\
```

### 2. Tham Chiếu Trong JSON

```json
{
  "type": "READING",
  "passages": [
    {
      "title": "How Solar Panels Work",
      "content": "Solar panels convert sunlight into electricity through photovoltaic cells...",
      "imageUrl": "/uploads/images/reading/diagram-solar-panel-system.png",
      "imageDescription": "Diagram showing components of a solar panel system: solar panels, inverter, battery, and electrical grid connection"
    }
  ]
}
```

### 3. Truy Cập File

Sau khi server chạy:

```
http://localhost:5000/uploads/images/reading/diagram-solar-panel-system.png
```

## 🎨 Nguồn Hình Ảnh

### Free Stock Photos:

- [Unsplash](https://unsplash.com) - High quality photos
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images & illustrations

### Free Diagrams/Illustrations:

- [Draw.io](https://draw.io) - Create diagrams
- [Canva](https://canva.com) - Templates
- [Vecteezy](https://vecteezy.com) - Free vectors
- [Flaticon](https://flaticon.com) - Icons & illustrations

### Educational Resources:

- [Wikimedia Commons](https://commons.wikimedia.org) - Free media repository
- [OpenStax](https://openstax.org) - Free educational resources
- [Khan Academy](https://khanacademy.org) - Educational content

## ⚠️ Lưu Ý

1. **Copyright:**

   - Sử dụng hình ảnh có license phù hợp
   - Ưu tiên: Creative Commons, Public Domain
   - Ghi nguồn nếu cần

2. **Chất lượng:**

   - Hình ảnh rõ nét, không mờ
   - Text/Labels đọc được
   - Phù hợp với nội dung passage

3. **Relevance:**
   - Hình ảnh phải liên quan trực tiếp đến passage
   - Hỗ trợ hiểu nội dung, không chỉ để trang trí
   - Có thể có câu hỏi liên quan đến hình ảnh

## 📐 Kích Thước Khuyến Nghị

| Loại        | Kích thước | Lý do                   |
| ----------- | ---------- | ----------------------- |
| Diagram     | 1000x700px | Cần chi tiết cho labels |
| Chart/Graph | 900x600px  | Dễ đọc data             |
| Map         | 1100x800px | Chi tiết địa lý         |
| Photo       | 800x600px  | Illustration only       |

## 🎯 Checklist Upload Image

- [ ] File đúng format (.png, .jpg, .svg)
- [ ] Kích thước < 5MB (khuyến nghị < 800KB)
- [ ] Độ phân giải 800-1200px width
- [ ] Hình ảnh rõ ràng, không mờ
- [ ] Liên quan trực tiếp đến nội dung passage
- [ ] Tên file lowercase, không space
- [ ] Đã copy vào `public/uploads/images/reading/`
- [ ] Đã cập nhật `imageUrl` trong JSON
- [ ] Có `imageDescription` trong JSON
- [ ] Kiểm tra license/copyright

## 📝 Template JSON Với Hình Ảnh

### Ví Dụ 1: Scientific Diagram

```json
{
  "title": "Passage: The Science of Solar Energy",
  "content": "Solar energy harnesses the power of the sun through photovoltaic technology. A typical solar panel system consists of several key components working together. The panels themselves contain photovoltaic cells that convert sunlight into direct current (DC) electricity. This DC power then flows to an inverter, which converts it to alternating current (AC) electricity suitable for home use. Excess energy can be stored in batteries or fed back into the electrical grid...",
  "imageUrl": "/uploads/images/reading/diagram-solar-panel-system.png",
  "imageDescription": "Technical diagram showing the complete solar energy system: solar panels on roof, inverter unit, battery storage, connection to electrical grid, and power flow directions indicated by arrows"
}
```

### Ví Dụ 2: Historical Map

```json
{
  "title": "Passage: The Roman Empire at Its Peak",
  "content": "At its greatest extent in 117 AD, the Roman Empire covered approximately 5 million square kilometers. The empire stretched from Britain in the north to Egypt in the south, and from Spain in the west to Mesopotamia in the east. This vast territory was connected by an extensive network of roads, allowing for efficient military movement and trade...",
  "imageUrl": "/uploads/images/reading/map-roman-empire-117ad.png",
  "imageDescription": "Historical map showing the territories of the Roman Empire in 117 AD, with modern country borders overlaid for reference, major cities marked, and the road network highlighted"
}
```

### Ví Dụ 3: Data Chart

```json
{
  "title": "Passage: Global Internet Growth",
  "content": "The growth of internet users worldwide has been exponential. In 1995, only 16 million people had internet access globally, representing less than 0.4% of the world population. By 2000, this number had grown to 361 million users (5.8% of population). The trend accelerated dramatically in the following decades...",
  "imageUrl": "/uploads/images/reading/chart-internet-growth-1995-2020.png",
  "imageDescription": "Line graph showing exponential growth of internet users from 16 million (1995) to 4.6 billion (2020), with percentage of global population on secondary y-axis"
}
```

## 🔍 Tối Ưu Hóa

### Nén Hình Ảnh:

```bash
# Dùng TinyPNG hoặc Squoosh để nén
# Mục tiêu: Giảm 50-70% file size mà vẫn giữ quality
```

### Resize:

```bash
# Nếu ảnh quá lớn, resize về kích thước phù hợp
# Không cần ảnh 4K cho web display
```

---

**Tài liệu liên quan:**

- [JSON_FORMAT_GUIDE.md](../../../JSON_FORMAT_GUIDE.md)
- [uploads/README.md](../README.md)
