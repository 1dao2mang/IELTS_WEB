# 🖼️ Images - Writing Task 1

Thư mục này chứa hình ảnh cho Writing Task 1 (charts, graphs, maps, diagrams, processes).

## 📁 Cấu Trúc

```
writing/
├── bar-chart-population.png
├── pie-chart-energy-sources.jpg
├── line-graph-temperature.png
├── process-diagram-water-cycle.svg
├── map-city-development.png
└── ...
```

## 📝 Quy Tắc Đặt Tên File

**Format:** `[type]-[description].png`

**Ví dụ:**

- `bar-chart-population-2024.png`
- `pie-chart-energy-sources.jpg`
- `line-graph-sales-trends.png`
- `table-university-ranking.png`
- `process-diagram-recycling.svg`
- `map-town-center.png`

## 🖼️ Định Dạng File

- **Format:** `.jpg`, `.png`, `.svg` (khuyến nghị PNG hoặc SVG)
- **Kích thước:** < 5MB/file
- **Độ phân giải:** 800x600px đến 1200x800px
- **DPI:** 72-96 DPI (cho web)

## 📊 Các Loại Hình Ảnh IELTS Writing Task 1

### 1. Charts (Biểu đồ)

- **Bar chart** (biểu đồ cột)
- **Pie chart** (biểu đồ tròn)
- **Line graph** (biểu đồ đường)

### 2. Tables (Bảng)

- Comparison tables
- Data tables

### 3. Diagrams (Sơ đồ)

- **Process diagram** (quy trình)
- **Cycle diagram** (chu trình)
- **Labeled diagram** (sơ đồ có nhãn)

### 4. Maps (Bản đồ)

- Town/City development
- Building layouts
- Before/After maps

### 5. Mixed Charts

- Combination of chart types

## 💡 Cách Sử Dụng

### 1. Copy File Vào Thư Mục

```bash
copy your-chart.png public\uploads\images\writing\
```

### 2. Tham Chiếu Trong JSON

```json
{
  "type": "WRITING",
  "writingTasks": [
    {
      "taskType": "TASK_1",
      "prompt": "The bar chart below shows population growth in five major cities from 2010 to 2020.",
      "imageUrl": "/uploads/images/writing/bar-chart-population-2024.png",
      "imageDescription": "Bar chart comparing population in millions across 5 cities"
    }
  ]
}
```

### 3. Truy Cập File

Sau khi server chạy:

```
http://localhost:5000/uploads/images/writing/bar-chart-population-2024.png
```

## 🎨 Tạo/Chỉnh Sửa Hình Ảnh

### Tạo Charts:

**Excel/Google Sheets:**

1. Tạo data table
2. Insert → Chart
3. Customize chart
4. Save as image (PNG/JPG)

**Online Tools:**

- [Canva](https://canva.com) - Charts, graphs
- [ChartBlocks](https://chartblocks.com) - Interactive charts
- [Draw.io](https://draw.io) - Diagrams, flowcharts
- [Lucidchart](https://lucidchart.com) - Professional diagrams

### Nén/Tối Ưu Hình Ảnh:

**Online:**

- [TinyPNG](https://tinypng.com) - Nén PNG/JPG
- [Squoosh](https://squoosh.app) - Google's image optimizer
- [Compressor.io](https://compressor.io)

**Desktop:**

- [ImageOptim](https://imageoptim.com) (Mac)
- [FileOptimizer](https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer) (Windows)

## 📐 Độ Phân Giải Khuyến Nghị

| Loại               | Kích thước | Lý do                          |
| ------------------ | ---------- | ------------------------------ |
| Bar/Pie/Line Chart | 1000x600px | Dễ đọc trên mobile & desktop   |
| Table              | 800x500px  | Vừa đủ cho text rõ ràng        |
| Process Diagram    | 1200x800px | Cần không gian cho nhiều steps |
| Map                | 1000x700px | Chi tiết đủ, không quá nặng    |

## ⚠️ Lưu Ý Quan Trọng

1. **Copyright:**

   - Chỉ sử dụng hình ảnh có quyền
   - Tự tạo charts từ data sample
   - Hoặc dùng hình ảnh free license

2. **Chất lượng:**

   - Text trong chart phải đọc được rõ ràng
   - Colors không quá chói hoặc quá nhạt
   - Legend/Labels phải hiển thị đầy đủ

3. **File Size:**

   - Nén hình ảnh trước khi upload
   - Mục tiêu: < 500KB/file
   - Dùng PNG cho charts (colors rõ nét)
   - Dùng JPG cho photos/complex images

4. **Tên File:**
   - Lowercase only
   - Dùng `-` thay vì space
   - Tên mô tả nội dung

## 🎯 Checklist Upload Image

- [ ] File đúng format (.png, .jpg, .svg)
- [ ] Kích thước < 5MB (khuyến nghị < 500KB)
- [ ] Độ phân giải 800-1200px width
- [ ] Text/Labels trong ảnh rõ ràng, đọc được
- [ ] Tên file lowercase, không space, không dấu
- [ ] Đã copy vào `public/uploads/images/writing/`
- [ ] Đã cập nhật đường dẫn trong JSON
- [ ] Có `imageDescription` trong JSON

## 📝 Template Mô Tả Hình Ảnh

Khi thêm `imageDescription` vào JSON, mô tả ngắn gọn:

```json
{
  "imageDescription": "Bar chart showing population in millions for 5 cities: Tokyo, Delhi, Shanghai, Mumbai, and Beijing from 2010-2020"
}
```

```json
{
  "imageDescription": "Pie chart illustrating household energy consumption by category: Heating (45%), Cooling (20%), Lighting (15%), Other (20%)"
}
```

```json
{
  "imageDescription": "Process diagram showing 6 steps of water treatment: Collection, Filtration, Chlorination, Storage, Distribution, Consumption"
}
```

```json
{
  "imageDescription": "Map comparing town center layout in 1990 and 2020, showing new shopping mall, expanded park, and removed factory"
}
```

## 🔍 Ví Dụ Writing Task 1 Với Hình Ảnh

```json
{
  "taskType": "TASK_1",
  "prompt": "The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  "imageUrl": "/uploads/images/writing/line-graph-housing-ownership.png",
  "imageDescription": "Line graph showing two trends: owned accommodation increasing from 25% (1918) to 70% (2011), and rented accommodation decreasing from 75% (1918) to 30% (2011)"
}
```

---

**Tài liệu liên quan:**

- [JSON_FORMAT_GUIDE.md](../../../JSON_FORMAT_GUIDE.md)
- [uploads/README.md](../README.md)
