# Sổ tay PHCN sau thay khớp gối - Website GitHub Pages mức 2

Đây là website tĩnh hỗ trợ người bệnh tập phục hồi chức năng sau thay khớp gối. Website dùng HTML/CSS/JavaScript thuần, chạy miễn phí trên GitHub Pages.

## Mục tiêu mức 2

- Cung cấp cây nội dung dễ dùng cho người bệnh.
- Có lộ trình theo giai đoạn hồi phục.
- Có thư viện bài tập theo mẫu thống nhất.
- Có checklist hằng ngày.
- Có nhật ký tập luyện lưu cục bộ trên trình duyệt của người bệnh.
- Có xuất CSV để người bệnh tự gửi hoặc in cho nhân viên y tế khi cần.

## Dữ liệu và bảo mật

Phiên bản này không có máy chủ và không gửi dữ liệu đi đâu. Nhật ký dùng localStorage của trình duyệt. Không dùng phiên bản này để thu thập dữ liệu nghiên cứu định danh. Nếu cần thu thập dữ liệu nghiên cứu, cần hệ thống riêng có bảo mật, đồng thuận, phân quyền và phê duyệt đạo đức.

## Cách triển khai GitHub Pages miễn phí

1. Tạo repository mới trên GitHub, ví dụ `phcn-thay-khop-goi`.
2. Upload toàn bộ file trong thư mục này lên repository.
3. Vào Settings -> Pages.
4. Chọn Deploy from a branch.
5. Chọn branch `main`, thư mục `/root`, bấm Save.
6. Website sẽ có dạng `https://<ten-github>.github.io/phcn-thay-khop-goi/`.

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

## Việc cần làm trước khi phát chính thức

- Bác sĩ chấn thương chỉnh hình và kỹ thuật viên PHCN duyệt toàn bộ bài tập.
- Thay khung "Ảnh/video tự quay" bằng hình hoặc video thật do nhóm tự quay.
- Bổ sung logo bệnh viện/khoa nếu được phép.
- Bổ sung số điện thoại hoặc quy trình liên hệ nội bộ của bệnh viện.
- Tạo QR code cho trang chủ và trang bài tập.
- Kiểm thử trên điện thoại Android/iPhone, cỡ chữ lớn và mạng yếu.

## Không sao chép bản quyền

Website học cấu trúc trình bày từ các nguồn uy tín như NHS, AAOS OrthoInfo và Arthritis UK, nhưng không sao chép nguyên văn nội dung, hình ảnh hoặc video. Nội dung tiếng Việt cần được nhóm chuyên môn tự biên soạn và duyệt.
