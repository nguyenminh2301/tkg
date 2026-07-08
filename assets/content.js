// Nguồn dữ liệu duy nhất cho mục "Kiến thức" — dùng chung cho trang chủ
// (assets/app.js) và trang đọc bài (assets/article.js).
//
// Cách thêm nội dung một bài viết đã có bản duyệt:
// 1. Mở file content/articles/<slug>.html (đã tạo sẵn cho mọi slug bên dưới)
//    và thay bằng nội dung HTML thật của bài viết.
// 2. Thêm `ready: true` vào đúng bài trong danh sách bên dưới.
// Bài viết chưa có `ready: true` sẽ tự động hiện ghi chú "Đang cập nhật"
// trên cả trang chủ và trang đọc bài, và sẽ không tải file nội dung.

export const knowledgeCategories = [
  {
    id: 'moi-thay-khop',
    number: 1,
    title: 'Tôi vừa thay khớp gối',
    articles: [
      { slug: 'can-biet-gi', title: 'Sau thay khớp gối: tôi cần biết gì?', ready: true },
      { slug: 'truoc-khi-ve-nha', title: 'Trước khi về nhà: 10 điều cần kiểm tra', ready: true },
      { slug: 'dau-va-sung-sau-mo', title: 'Đau và sưng sau mổ: khi nào là bình thường?', ready: true },
    ],
  },
  {
    id: 'cham-soc-2-tuan-dau',
    number: 2,
    title: 'Chăm sóc tại nhà 2 tuần đầu',
    articles: [
      { slug: 'cham-soc-vet-mo', title: 'Chăm sóc vết mổ tại nhà', ready: true },
      { slug: 'dung-thuoc-dung-cach', title: 'Dùng thuốc đúng cách' },
      { slug: 'ghi-nhat-ky-hoi-phuc', title: 'Ghi nhật ký hồi phục' },
    ],
  },
  {
    id: 'tap-luyen-di-lai',
    number: 3,
    title: 'Tập luyện và đi lại',
    articles: [
      { slug: 'tap-ngay-1-7', title: 'Ngày 1–7 sau ra viện: tập thế nào cho an toàn?', ready: true },
      { slug: '5-bai-tap-co-ban', title: 'Năm bài tập cơ bản sau thay khớp gối', ready: true },
      { slug: 'di-lai-dung-cu-ho-tro', title: 'Đi lại với khung/nạng/gậy' },
      { slug: 'phong-te-nga', title: 'Phòng té ngã' },
    ],
  },
  {
    id: 'an-toan-bao-ngay',
    number: 4,
    title: 'An toàn: khi nào cần báo ngay?',
    articles: [
      {
        slug: '8-dau-hieu-bao-ngay',
        title: '8 dấu hiệu cần báo ngay',
        summary: 'Té ngã, đau bắp chân, khó thở, sốt, vết mổ chảy dịch...',
      },
    ],
  },
  {
    id: 'nguoi-cham-soc',
    number: 5,
    title: 'Dành cho người chăm sóc',
    articles: [
      { slug: 'chuan-bi-nha', title: 'Chuẩn bị nhà' },
      { slug: 'ho-tro-di-lai', title: 'Hỗ trợ đi lại' },
      { slug: 'ho-tro-tap-luyen', title: 'Hỗ trợ tập luyện' },
      { slug: 'theo-doi-dau-hieu-nguy-hiem', title: 'Theo dõi dấu hiệu nguy hiểm' },
      { slug: 'chuan-bi-tai-kham', title: 'Tái khám sau thay khớp gối: cần chuẩn bị gì?', ready: true },
    ],
  },
  {
    id: 'sau-2-tuan',
    number: 6,
    title: 'Sau 2 tuần',
    articles: [
      { slug: 'tuan-3-6', title: 'Tuần 3–6' },
      { slug: 'tuan-7-12', title: 'Tuần 7–12' },
      { slug: 'cham-soc-lau-dai', title: 'Chăm sóc khớp gối lâu dài' },
    ],
  },
];

export function findArticle(slug) {
  for (const category of knowledgeCategories) {
    const article = category.articles.find(a => a.slug === slug);
    if (article) return { category, article };
  }
  return null;
}
