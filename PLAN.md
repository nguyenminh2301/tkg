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
  - ~~`content-visibility: auto` cho mọi section~~ — đã thử nhưng **bỏ** sau
    khi kiểm thử: chiều cao ước lượng (`contain-intrinsic-size`) lệch quá xa
    chiều cao thật của từng section khiến `scrollIntoView`/nhấp menu điều
    hướng có lúc dừng sai section (ví dụ bấm "An toàn" lại dừng ở "Nhật ký").
    Vì mọi section đều là đích điều hướng trong menu, ưu tiên điều hướng đúng
    hơn phần tối ưu paint nhỏ này.
- [x] **Giai đoạn 3 — Thiết kế lại CSS toàn bộ**
  - Áp bảng màu/token mới, thang chữ rõ ràng, bo góc/khoảng cách nhất quán,
    thẻ (card) có chiều sâu nhẹ, trạng thái hover/focus rõ ràng cho a11y.
  - Responsive lại cho mobile, giữ print stylesheet, thêm
    `prefers-reduced-motion`.
- [x] **Giai đoạn 4 — Hành vi JS mới**
  - Thanh tiến trình cuộn trang (scroll progress) ở đầu trang.
  - `IntersectionObserver` cho hiệu ứng reveal.
  - ~~Trì hoãn dựng danh sách bài tập tới khi cuộn tới~~ — cũng **bỏ** cùng
    lý do: dựng muộn 9 thẻ bài tập chèn thêm chiều cao ngay giữa lúc trang
    đang cuộn tới một mục phía sau (Nhật ký/An toàn/Kiến thức), làm lệch vị
    trí dừng. Chi phí dựng 9 thẻ nhỏ lúc tải trang là không đáng kể, nên giữ
    render ngay như bản gốc — ưu tiên điều hướng đúng hơn lợi ích tối ưu nhỏ.
  - `<script type="module">` để script tự động hoãn (defer) không chặn tải
    trang.
- [x] **Giai đoạn 5 — Kiểm thử**
  - Mở bằng trình duyệt thật (Chromium có sẵn), chụp ảnh màn hình desktop +
    mobile, kiểm tra: menu mobile, tab lộ trình, bật/tắt chi tiết bài tập,
    nhật ký lưu localStorage, xuất CSV, in trang.
  - Phát hiện và sửa 2 lỗi qua kiểm thử thật (xem phần bị gạch ngang ở Giai
    đoạn 2 và 4 phía trên): cả hai đều là trường hợp "tối ưu" làm hỏng việc
    nhấp menu điều hướng đến đúng section — đã gỡ bỏ, xác nhận lại bằng script
    tự động bấm qua cả 6 mục menu ngay từ lúc mới tải trang, tất cả đều dừng
    đúng vị trí.
  - Icon "sách" ở Kiến thức lúc đầu quá nhỏ (22px) trong khung ảnh lớn, nhìn
    trống trải — đã tăng lên 40px.
  - Thêm `print-color-adjust: exact` để màu nền (thẻ cảnh báo, khối "An toàn"
    tối màu...) in ra đúng màu thay vì bị trình duyệt bỏ nền khi in.
- [x] **Giai đoạn 6 — Cấu trúc mục Kiến thức thành bài viết riêng**
  - Chuyển "Kiến thức" từ 6 thẻ phẳng sang 6 chủ đề (đúng danh sách người
    dùng cung cấp), mỗi chủ đề là một nhóm liệt kê các bài viết con — tổng
    19 bài.
  - Mỗi bài viết là một đường dẫn riêng `article.html?slug=...` (không tạo
    19 file trang riêng — dùng 1 trang mẫu `article.html` +
    `assets/article.js` đọc `slug` từ URL, tra tiêu đề/chủ đề trong
    `assets/content.js`, rồi tải nội dung từ file HTML riêng của bài đó).
  - `article.html` có nút "← Trang chủ" ở header và nút lớn "← Quay lại
    trang chủ" ở cuối bài, đều trỏ về `index.html#knowledge`.
  - Đã kiểm thử: trang chủ hiện đúng 6 nhóm/19 link, bấm vào 1 bài chuyển
    đúng sang `article.html?slug=...`, nút quay lại về đúng
    `index.html#knowledge`, có xử lý trường hợp slug không tồn tại.
- [x] **Giai đoạn 7 — File nội dung sẵn sàng cho từng bài, nhận bài đầu tiên**
  - Tạo sẵn `content/articles/<slug>.html` cho toàn bộ 19 bài (rỗng, chỉ có
    ghi chú "sẽ cập nhật tại đây") để mỗi khi có bài mới chỉ cần thay đúng
    nội dung file đó.
  - Quy trình cập nhật 1 bài: (1) thay nội dung file
    `content/articles/<slug>.html` bằng HTML thật; (2) thêm `ready: true`
    vào đúng bài trong `assets/content.js`. Bài `ready: true` mới được
    `assets/article.js` tải file nội dung; bài chưa `ready` không tốn
    request mạng, hiện thẳng khối "Đang cập nhật".
  - Đã nhận và đưa vào bài đầu tiên: "Sau thay khớp gối: tôi cần biết gì?"
    (`content/articles/can-biet-gi.html`) — có mục lục nhảy neo trong bài,
    2 khối nhấn mạnh dùng class `.callout-info` / `.callout-highlight` (đổi
    từ màu xanh dương/cam gốc người dùng gửi sang đúng tông thương hiệu
    trang), và dòng miễn trừ trách nhiệm cuối bài `.article-disclaimer`.
  - 18 bài còn lại vẫn ở trạng thái "Đang cập nhật" như thiết kế.
- [x] **Giai đoạn 8 — Nâng "chất" giao diện theo khung đánh giá taste-skill**
      (kế hoạch chi tiết ở mục 5; mục 8.1–8.5 đã triển khai, 8.6 để sau)
  - [x] 8.1 Giảm eyebrow (nhãn in hoa nhỏ phía trên tiêu đề) đang lặp lại máy
        móc ở gần như mọi section — bỏ ở 6 section không thật cần nhãn phân
        loại ("Người bệnh cần gì", Checklist hằng ngày, Bài tập, Nhật ký, Công
        cụ, FAQ); giữ lại ở hero, Lộ trình, An toàn, Kiến thức (4/10 section,
        đúng tinh thần "eyebrow không lặp lại máy móc" thay vì cứng nhắc theo
        đúng số 2–3 nêu ban đầu).
  - [x] 8.2 Phân cấp lại khối "Báo ngay" trong mục An toàn: tách khỏi lưới 3
        cột đều, cho chiếm full-width phía trên, viền dày hơn, tiêu đề lớn hơn
        màu đỏ cảnh báo; 2 thẻ còn lại xếp thành hàng `.safety-secondary`
        riêng bên dưới.
  - [x] 8.3 Thêm trạng thái rỗng cho bảng nhật ký ("Chưa có nhật ký nào được
        lưu trên thiết bị này.") trong `renderDiary()` — kiểm tra lại thì tìm
        kiếm bài tập **đã có sẵn** thông báo "Không tìm thấy bài tập phù hợp."
        từ trước, chỉ ghi nhận nhầm ở bản audit đầu (mục 5.3 phía trên), không
        cần sửa thêm.
  - [x] 8.4 Đồng nhất `stroke-width` bộ icon sprite trong `index.html` về 1.6
        (trước đó lẫn 1.6 / 1.75 / 2).
  - [x] 8.5 Đo tương phản màu bằng công thức WCAG (script Python, xem nhật ký
        checkpoint): phát hiện chữ trắng trên `.button.primary` nền `--accent`
        (`#E07A47`) chỉ đạt **2.98:1** — dưới ngưỡng AA 4.5:1. Đã đổi nền mặc
        định của `.button.primary` sang `--accent-dark` (4.63:1, đạt AA) và
        thêm biến `--accent-darker` (6.59:1) cho trạng thái hover, tương phản
        rõ hơn cả lúc bấm. `--warning-ink`/`--warning-bg` (7.22:1) và chữ trắng
        trên `.emergency` (12.44:1) đo lại đều đã đạt, không cần sửa.
  - [x] 8.6 Nút tăng/giảm cỡ chữ (A−/A+) cho người lớn tuổi, đặt ở header cả
        `index.html` lẫn `article.html`. 3 mức (thường/lớn/rất lớn) đổi
        `font-size` gốc `<html>` (112.5% / 125%) qua class `.text-lg`/
        `.text-xl`, lưu lựa chọn ở `localStorage`. Chuyển toàn bộ `font-size`
        cố định trong `assets/style.css` từ `px` sang `rem` để nút thực sự có
        tác dụng (giữ nguyên `px` cho icon/khoảng cách/bo góc — không phải cỡ
        chữ đọc). Logic dùng chung qua module mới `assets/fontsize.js`, import
        ở cả `assets/app.js` và `assets/article.js` — vẫn 100% tĩnh, không
        thêm dependency.

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

## 5. Đối chiếu với khung `taste-skill` (Leonxlnx/taste-skill) cho Giai đoạn 8

### 5.1 taste-skill là gì

[`Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) là bộ "Agent
Skill" (SKILL.md) giúp AI code frontend bớt "slop" — bớt trông rập khuôn kiểu
AI tự sinh (gradient tím-xanh, hero 3 thẻ đều nhau, glassmorphism sáo mòn...).
Bộ này gồm 3 "núm chỉnh" `DESIGN_VARIANCE` / `MOTION_INTENSITY` /
`VISUAL_DENSITY` (thang 1–10), một checklist quy tắc typography/màu/layout/
motion, và một skill `redesign-skill` riêng cho việc audit + nâng cấp code
frontend **có sẵn** (quy trình: Scan → Diagnose → Fix, không viết lại từ đầu,
ưu tiên sửa theo thứ tự: font → màu → trạng thái tương tác → layout/khoảng
cách → component → trạng thái rỗng/lỗi → hoàn thiện typography).

### 5.2 Phần không áp dụng được — và vì sao

taste-skill mặc định cho stack React/Next.js + Tailwind + thư viện icon npm
(Phosphor/Radix/Tabler) + font `next/font`. Trang này có **ràng buộc cứng**
ở mục tiêu 5 (100% tĩnh, không build step, không npm) nên **không** đổi
sang stack đó — chỉ mượn phần tư duy "gu thẩm mỹ", dịch sang HTML/CSS/JS
thuần đã có.

Một số quy tắc mặc định của taste-skill cũng **sai ngữ cảnh** cho trang y tế
cho người lớn tuổi và bị loại có chủ đích:

- Dial mặc định `VARIANCE 8 / MOTION 6` (bất đối xứng mạnh, hiệu ứng
  scroll-hijack) — **không phù hợp**: người bệnh lớn tuổi cần điều hướng dễ
  đoán, không hiệu ứng gây rối mắt/chóng mặt. Trang này nên giữ dial thấp:
  `VARIANCE ~2 / MOTION ~2 / DENSITY ~3–4` (đã gần đúng ở bản hiện tại: fade
  nhẹ khi cuộn, không hiệu ứng cuộn phức tạp).
- Cấm dùng serif mặc định — trang này **cố tình** dùng `ui-serif` cho tiêu đề
  để tạo cảm giác biên tập/uy tín y khoa (mục 2 ở trên); bản thân taste-skill
  cũng có ngoại lệ "trừ khi bối cảnh thực sự editorial/uy tín", nên giữ
  nguyên, không đổi.
- Bắt buộc icon từ thư viện npm (Phosphor/Radix...) — trang này dùng sprite
  SVG tự vẽ để **không tốn thêm request mạng**, đúng mục tiêu 4/5. Giữ
  nguyên cách làm, chỉ cần đồng nhất chi tiết vẽ (xem 5.3).
- Yêu cầu ảnh thật/font ngoài qua `next/font` — không áp dụng, trang chưa có
  ảnh thật (xem mục 4.1) và cố tình dùng font hệ thống để tải tức thì.

### 5.3 Phần áp dụng được — audit cụ thể vào code hiện tại

| Vấn đề (theo checklist taste-skill) | Vị trí trong code | Đề xuất |
|---|---|---|
| Eyebrow lặp lại cơ học (`taste-skill` giới hạn ~1 eyebrow / 3 section) | `<p class="eyebrow">` xuất hiện ở gần như mọi section trong `index.html` (hero, cấu trúc nội dung, lộ trình, checklist, bài tập, nhật ký, công cụ, an toàn, FAQ, kiến thức — 10 lần) | Chỉ giữ eyebrow ở hero + 2 section thực sự cần nhãn phân loại (Lộ trình, Kiến thức); các section còn lại để `h2` đứng một mình |
| 3 mức khẩn cấp bị trình bày ngang hàng như 3 thẻ đều nhau | `.safety-grid` 3 cột đều (`assets/style.css` dòng 166–168), "Báo ngay" chỉ khác màu nền, không khác kích thước/độ nổi | Cho thẻ "Báo ngay" chiếm rộng hơn (vd. full-width phía trên, 2 thẻ còn lại xếp dưới) để đúng mức độ khẩn cấp thật |
| Thiếu trạng thái rỗng/không kết quả | `renderExercises()` và `renderDiary()` trong `assets/app.js` — mảng rỗng chỉ render thành lưới/bảng trống, không có thông báo | Thêm dòng thông báo khi `filtered.length === 0` / `rows.length === 0` |
| Stroke-width icon không đồng nhất | Sprite trong `index.html` dòng 38–44: lẫn `stroke-width` 1.6, 1.75, 2 | Chọn 1 giá trị chung (đề xuất 1.6) cho toàn bộ icon |
| Tương phản màu cần kiểm lại cho người lớn tuổi | `--warning-ink` (`#6d4711`) trên `--warning-bg` (`#fcefd9`); chữ trên `.emergency` nền `--brand-dark` | Đo bằng công cụ contrast checker, đảm bảo ≥ 4.5:1 cho chữ thường |
| Một accent màu / trang | Đã đúng: `--brand` #146356 + `--accent` #E07A47 dùng nhất quán | Không cần sửa |
| Không hiệu ứng `scroll` thủ công, không scroll-hijack | `.reveal` dùng `IntersectionObserver` (không thấy `addEventListener('scroll')` trong `app.js`) | Không cần sửa |
| Fake nội dung / lorem ipsum | Không có — toàn bộ nội dung là hướng dẫn y khoa thật | Không cần sửa |

### 5.4 Thứ tự triển khai khi vào code (theo đúng "Fix Priority" của redesign-skill)

1. Đồng nhất icon (nhanh, rủi ro thấp) — mục 8.4.
2. Kiểm & sửa tương phản màu — mục 8.5 (ảnh hưởng a11y, ưu tiên cao vì đối
   tượng người lớn tuổi).
3. Trạng thái rỗng cho tìm kiếm/nhật ký — mục 8.3 (trạng thái tương tác còn
   thiếu).
4. Phân cấp lại khối An toàn — mục 8.2 (layout).
5. Giảm eyebrow dư thừa — mục 8.1 (polish cuối, đụng nhiều section nên làm
   sau khi các phần trên ổn định để tránh review đi review lại toàn trang).
6. Nút cỡ chữ (tuỳ chọn) — mục 8.6, chỉ làm nếu còn dư địa, không bắt buộc.

Mỗi mục sửa xong nên kiểm bằng trình duyệt thật (theo đúng cách Giai đoạn 5 đã
làm) trước khi tick — đặc biệt bước 4 và 5 vì có thể ảnh hưởng vị trí cuộn tới
section, từng gây lỗi ở Giai đoạn 2 và 4.

## 6. Nhật ký checkpoint

| Ngày | Giai đoạn | Việc đã làm | Commit |
|---|---|---|---|
| 2026-07-08 | 0 | Viết kế hoạch (`PLAN.md`) | `dcaf8f1` |
| 2026-07-08 | 1 | Brand mark, favicon, meta SEO/OG/JSON-LD, icon sprite, khung `.reveal` | `c7cc681` |
| 2026-07-08 | 3 | Thiết kế lại toàn bộ `assets/style.css` (bảng màu, serif, disclosure UI) | `56a2d05` |
| 2026-07-08 | 4 | Scroll progress, reveal-on-scroll, disclosure `<details>` cho bài tập | `ba6669b` |
| 2026-07-08 | 5 | Kiểm thử trình duyệt thật, gỡ `content-visibility`/lazy-render (phá điều hướng), tăng icon Kiến thức, print-color-adjust | `d5361eb` (PR #1, merge `4832e25`) |
| 2026-07-08 | 5 | Sửa icon to bất thường trên Chrome Android thật (thêm `width`/`height` trực tiếp trên mọi `<svg class="icon">`, không chỉ dựa CSS) — phát hiện qua ảnh chụp màn hình thật từ người dùng | `cabb505` (PR #2, merge `2d5c6b1`) |
| 2026-07-09 | 8 (kế hoạch) | Đối chiếu trang với khung `taste-skill` (Leonxlnx/taste-skill), audit cụ thể và chia nhỏ Giai đoạn 8 thành 8.1–8.6 kèm thứ tự triển khai (mục 5) | — (chỉ cập nhật `PLAN.md`, chưa sửa code) |
| 2026-07-09 | 8.1–8.5 | Triển khai icon đồng nhất, sửa tương phản nút chính (đo bằng công thức WCAG qua script Python, xác nhận 2.98:1 → 4.63:1), trạng thái rỗng cho nhật ký, phân cấp khối An toàn, giảm eyebrow còn 4/10 section. Kiểm bằng Chromium thật (Playwright): chụp desktop/mobile, xác nhận màu nút đổi đúng `rgb(184,90,46)`, stroke-width icon đồng nhất `1.6`, đếm eyebrow còn 4, trạng thái rỗng nhật ký/tìm bài tập hiển thị đúng, không có lỗi console, điều hướng menu di động tới cả 7 mục vẫn dừng đúng section (test riêng vì bước đầu chờ chưa đủ animation `scroll-behavior: smooth`, không phải lỗi thật) | — |
| 2026-07-09 | 8.6 | Thêm nút cỡ chữ A−/A+ (`assets/fontsize.js`, dùng chung `index.html`/`article.html`), chuyển font-size sang `rem`. Kiểm bằng Chromium thật: body 16→18→20px theo 2 lần bấm, lưu `localStorage` qua reload, khôi phục về mặc định đúng, hoạt động trên trang bài viết (`.article-body` 17→21.25px), nút disable đúng ở 2 đầu mức. Phát hiện lỗi qua kiểm thử thật: ở cỡ chữ lớn nhất, nhãn menu 2 từ bị ngắt dòng giữa chừng ("Trang" / "chủ") do `.site-nav a` không có `white-space:nowrap` — đã sửa thêm `white-space:nowrap` cho link và `flex-wrap:wrap` cho `.site-nav`/`.header-actions` để cả cụm chữ xuống hàng nguyên vẹn thay vì vỡ giữa từ. Xác nhận lại không còn lỗi console, không hồi quy các mục 8.1–8.5 | — |
