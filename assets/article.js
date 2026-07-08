import { findArticle } from './content.js';

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

function renderNotFound(root) {
  document.title = 'Không tìm thấy bài viết · Sổ tay PHCN sau thay khớp gối';
  root.innerHTML = `
    <p class="eyebrow"><svg class="icon icon-sm" width="24" height="24" aria-hidden="true"><use href="#icon-book"/></svg> Kiến thức</p>
    <h1>Không tìm thấy bài viết</h1>
    <p class="lead">Đường dẫn này có thể không còn đúng. Hãy quay lại trang chủ để chọn bài viết khác trong mục Kiến thức.</p>
  `;
}

function renderArticle(root, category, article) {
  document.title = article.title + ' · Sổ tay PHCN sau thay khớp gối';
  const bodyHtml = article.body && article.body.length
    ? article.body.join('')
    : `
      <div class="notice warning">
        <p><strong>Bài viết đang được cập nhật.</strong></p>
        <p>Nội dung sẽ được nhóm chuyên môn biên soạn và bổ sung sau.${article.summary ? ` Bài viết này dự kiến sẽ nói về: ${escapeHtml(article.summary)}` : ''}</p>
      </div>
    `;
  root.innerHTML = `
    <p class="eyebrow">
      <svg class="icon icon-sm" width="24" height="24" aria-hidden="true"><use href="#icon-book"/></svg>
      <a href="index.html#knowledge">Kiến thức</a> · ${escapeHtml(category.title)}
    </p>
    <h1>${escapeHtml(article.title)}</h1>
    <div class="article-body">${bodyHtml}</div>
  `;
}

function render() {
  const root = document.getElementById('article-root');
  const slug = new URLSearchParams(location.search).get('slug');
  const result = slug ? findArticle(slug) : null;
  if (!result) {
    renderNotFound(root);
    return;
  }
  renderArticle(root, result.category, result.article);
}

render();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
