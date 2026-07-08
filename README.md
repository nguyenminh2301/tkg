# Sổ tay PHCN sau thay khớp gối

Website tĩnh hỗ trợ người bệnh tập phục hồi chức năng sau thay khớp gối. Website dùng HTML/CSS/JavaScript thuần, chạy miễn phí trên GitHub Pages.

## Tính năng

- Cây nội dung dễ dùng cho người bệnh.
- Lộ trình theo giai đoạn hồi phục (0–2 tuần, 2–6 tuần, 6–12 tuần, sau 12 tuần).
- Thư viện bài tập theo mẫu thống nhất (mục tiêu, cách tập, số lần, khi cần dừng).
- Checklist hằng ngày và tính năng gợi ý giai đoạn theo ngày phẫu thuật.
- Nhật ký tập luyện lưu cục bộ trên trình duyệt của người bệnh, có xuất CSV.
- Mục kiến thức & video hỗ trợ người bệnh.

## Dữ liệu và bảo mật

Website không có máy chủ và không gửi dữ liệu đi đâu. Nhật ký dùng localStorage của trình duyệt, người bệnh chủ động lưu, xuất hoặc xóa.

## Cách triển khai GitHub Pages

1. Đẩy toàn bộ file trong thư mục này lên repository.
2. Vào Settings → Pages → Source: chọn **GitHub Actions**.
3. Workflow `.github/workflows/pages.yml` sẽ tự động deploy khi push lên `main`.
4. Website có dạng `https://<ten-github>.github.io/<ten-repo>/`.

## Cấu trúc file

```text
index.html
assets/style.css
assets/app.js
content/site-tree.md
content/review-checklist.md
.nojekyll
.github/workflows/pages.yml
```

## Trước khi triển khai chính thức

- Bác sĩ chấn thương chỉnh hình và kỹ thuật viên PHCN duyệt toàn bộ bài tập.
- Thay khung "Ảnh/video tự quay" bằng hình hoặc video thật do nhóm tự quay.
- Bổ sung logo, tên bệnh viện và số liên hệ trong phần footer.
- Tạo QR code cho trang chủ và trang bài tập nếu cần.
- Kiểm thử trên điện thoại Android/iPhone và cỡ chữ lớn.

