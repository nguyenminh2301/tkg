# Kế hoạch thiết kế lại frontend — Sổ tay PHCN sau thay khớp gối

> File này là nguồn tham chiếu duy nhất cho việc thiết kế lại giao diện. Mỗi khi
> hoàn thành một giai đoạn, tick checkbox và ghi lại vào "Nhật ký checkpoint"
> phía dưới kèm commit. Có thể tạm dừng và tiếp tục từ đây bất cứ lúc nào.

## 1. Mục tiêu

1. Có **nhận diện thương hiệu riêng** thay vì trông giống mọi trang y tế teal
   chung chung khác.
2. **Bộc lộ nội dung dần dần** (progressive disclosure): người dùng lướt tới
   đâu, nội dung/hiệu ứng hiện ra tới đó; chi tiết (cách tập, các bước) ẩn sau
   một cú nhấp thay vì hiện hết một lượt.
3. **Tối ưu tốc độ tải trang đầu** — phần trên màn hình đầu tiên (hero + "Hôm
   nay tập gì") tải tức thì; các phần dưới được trì hoãn dựng/hiển thị.
4. Không dùng ảnh nặng. Toàn bộ icon/logo là SVG nội tuyến (vector, ~vài trăm
   byte, không cần tải ảnh, không cần font ngoài).
5. Vẫn miễn phí 100%, chạy trên GitHub Pages tĩnh, không thêm build step,
   không thêm dependency/npm package nào.

## 2. Tham khảo & định hướng thiết kế

Tham khảo tinh thần thiết kế của claude.com (không sao chép): nền màu ấm
(kem/giấy thay vì trắng lạnh), tiêu đề dùng serif tạo cảm giác biên tập/uy
tín, nhiều khoảng trắng, chuyển động tinh tế khi cuộn, hệ màu có 1 màu chủ đạo
+ 1 màu nhấn rõ ràng thay vì một màu trải khắp. Áp dụng vào ngữ cảnh y tế:
vẫn phải nghiêm túc, dễ đọc cho người lớn tuổi, không "màu mè kiểu startup".

### Bộ nhận diện thương hiệu mới

- **Bảng màu**: nền kem ấm `#FAF7EF` (thay vì trắng/xám lạnh), chữ
  `#172A24`, màu thương hiệu chính xanh rêu đậm `#146356` (giữ tinh thần y tế/
  yên tâm), màu nhấn hành động cam đất `#E07A47` (dùng cho CTA, tạo điểm nhấn
  thương hiệu dễ nhớ, tách bạch khỏi các trang teal-toàn-bộ).
- **Chữ**: giữ font hệ thống (system font) để **không tốn thêm request
  mạng nào** — tiêu đề dùng `ui-serif` (serif hệ thống) tạo cảm giác trang
  trọng/khác biệt, phần thân vẫn sans-serif hệ thống để dễ đọc và tải tức thì.
- **Logo/icon**: 1 biểu tượng SVG riêng — 4 thanh cao dần (tượng trưng 4 giai
  đoạn hồi phục 0–2 / 2–6 / 6–12 / sau 12 tuần, thanh cuối tô màu nhấn) thay
  cho emoji 🦵. Toàn bộ icon chức năng (menu, đóng, in, tải, khiên an toàn,
  hỏi đáp, tài liệu) chuyển từ emoji sang 1 bộ SVG sprite nét mảnh đồng nhất.
- **Favicon** SVG riêng (`assets/favicon.svg`) dùng đúng logo trên.

## 3. Các giai đoạn triển khai

- [x] **Giai đoạn 0 — Kế hoạch**: viết file này.
- [x] **Giai đoạn 1 — Nền tảng thương hiệu & SEO nhẹ**
  - Thêm favicon SVG, theme-color, Open Graph/Twitter card, canonical,
    JSON-LD nhẹ (schema.org) để chia sẻ link đẹp và chuyên nghiệp hơn.
  - Thêm icon sprite SVG (menu, đóng, chevron, sách, khiên, in, tải).
- [x] **Giai đoạn 2 — Cấu trúc lại HTML cho "bộc lộ dần"**
  - Bọc các section dưới hero bằng class `.reveal` (hiệu ứng hiện khi cuộn
    tới).
  - Thẻ bài tập: ẩn "cách tập / liều lượng / khi cần dừng" trong `<details>`,
    chỉ hiện mục tiêu + tag ngay từ đầu — người dùng bấm "Xem cách tập" mới
    hiện chi tiết.
  - Thêm `content-visibility: auto` cho mọi section dưới hero để trình duyệt
    bỏ qua việc dựng layout/paint cho phần chưa cuộn tới.
- [x] **Giai đoạn 3 — Thiết kế lại CSS toàn bộ**
  - Áp bảng màu/token mới, thang chữ rõ ràng, bo góc/khoảng cách nhất quán,
    thẻ (card) có chiều sâu nhẹ, trạng thái hover/focus rõ ràng cho a11y.
  - Responsive lại cho mobile, giữ print stylesheet, thêm
    `prefers-reduced-motion`.
- [x] **Giai đoạn 4 — Hành vi JS mới**
  - Thanh tiến trình cuộn trang (scroll progress) ở đầu trang.
  - `IntersectionObserver` cho hiệu ứng reveal.
  - Trì hoãn dựng danh sách bài tập (chỉ render khi section Bài tập lọt vào
    khung nhìn lần đầu) để giảm việc dựng DOM lúc tải trang.
  - `<script type="module">` để script tự động hoãn (defer) không chặn tải
    trang.
- [x] **Giai đoạn 5 — Kiểm thử**
  - Mở bằng trình duyệt thật (Chromium có sẵn), chụp ảnh màn hình desktop +
    mobile, kiểm tra: menu mobile, tab lộ trình, bật/tắt chi tiết bài tập,
    nhật ký lưu localStorage, xuất CSV, in trang.
- [ ] **Giai đoạn 6 — Tuỳ chọn nâng cao sau này** (chưa làm, chỉ đề xuất)

## 4. Đề xuất tích hợp miễn phí thêm (tuỳ chọn, chưa triển khai)

Chỉ nên làm khi có ảnh/video thật hoặc khi cần đo lường, để tránh phá vỡ cam
kết "không thu thập dữ liệu" hiện tại của trang:

1. **Ảnh/video bài tập thật**: khi nhóm PHCN quay xong, nén bằng
   [Squoosh.app](https://squoosh.app) (free, chạy trong trình duyệt) xuất
   WebP/AVIF, gắn `loading="lazy" decoding="async" width height` — giữ
   nguyên tinh thần "không tải nội dung chưa cần tới".
2. **Thống kê truy cập tôn trọng quyền riêng tư (tuỳ chọn, không bắt buộc)**:
   nếu muốn biết trang nào được xem, có thể dùng
   [GoatCounter](https://www.goatcounter.com) (free, mã nguồn mở, không
   cookie) — nhưng cần nói rõ với người bệnh vì hiện tại trang cam kết không
   gửi dữ liệu đi đâu.
3. **PWA nhẹ**: thêm `manifest.json` + icon để người bệnh "Thêm vào màn hình
   chính" trên điện thoại, dùng lại được sổ tay như app, miễn phí, không cần
   máy chủ thêm.
4. **PDF tải về**: có thể tạo bản in PDF tĩnh từ mỗi giai đoạn bằng trình duyệt
   (Print → Save as PDF) dựa trên print stylesheet đã tối ưu ở Giai đoạn 3.
5. **QR code** cho từng trang: dùng thư viện tĩnh nhỏ tự lưu trong repo (không
   gọi API ngoài) nếu cần in tờ rơi tại bệnh viện.

## 5. Nhật ký checkpoint

| Ngày | Giai đoạn | Việc đã làm | Commit |
|---|---|---|---|
| 2026-07-08 | 0 | Viết kế hoạch (`PLAN.md`) | (xem lịch sử git) |
| 2026-07-08 | 1–5 | Thiết kế lại thương hiệu, cấu trúc bộc lộ dần, CSS, JS, kiểm thử trình duyệt | (xem lịch sử git) |
