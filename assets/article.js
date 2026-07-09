import { findArticle } from './content.js';
import { setupFontSize } from './fontsize.js';

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

function pendingNotice(article) {
  return `
    <div class="notice warning">
      <p><strong>Bài viết đang được cập nhật.</strong></p>
      <p>Nội dung sẽ được nhóm chuyên môn biên soạn và bổ sung sau.${article.summary ? ` Bài viết này dự kiến sẽ nói về: ${escapeHtml(article.summary)}` : ''}</p>
    </div>
  `;
}

function errorNotice() {
  return `
    <div class="notice warning">
      <p><strong>Không tải được nội dung bài viết.</strong></p>
      <p>Vui lòng thử tải lại trang.</p>
    </div>
  `;
}

async function loadArticleHtml(slug) {
  const res = await fetch(`content/articles/${encodeURIComponent(slug)}.html`, { cache: 'no-store' });
  if (!res.ok) throw new Error('fetch failed: ' + res.status);
  return res.text();
}

function videoFacade(videoId) {
  return `
    <div class="video-embed" data-video-id="${escapeHtml(videoId)}">
      <button class="video-facade" type="button" aria-label="Xem video hướng dẫn">
        <svg class="icon" width="48" height="48" aria-hidden="true"><use href="#icon-play"/></svg>
        <span>Xem video hướng dẫn</span>
      </button>
    </div>
  `;
}

function setupVideoFacade(root) {
  const wrap = root.querySelector('.video-embed');
  const button = wrap?.querySelector('.video-facade');
  button?.addEventListener('click', () => {
    const videoId = wrap.dataset.videoId;
    wrap.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1" title="Video hướng dẫn" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }, { once: true });
}

async function renderArticle(root, category, article) {
  document.title = article.title + ' · Sổ tay PHCN sau thay khớp gối';
  root.innerHTML = `
    <p class="eyebrow">
      <svg class="icon icon-sm" width="24" height="24" aria-hidden="true"><use href="#icon-book"/></svg>
      <a href="index.html#knowledge">Kiến thức</a> · ${escapeHtml(category.title)}
    </p>
    <h1>${escapeHtml(article.title)}</h1>
    ${article.video ? videoFacade(article.video) : ''}
    <div class="article-body">${article.ready ? '' : pendingNotice(article)}</div>
  `;
  if (article.video) setupVideoFacade(root);

  if (!article.ready) return;
  const body = root.querySelector('.article-body');
  try {
    body.innerHTML = await loadArticleHtml(article.slug);
  } catch {
    body.innerHTML = errorNotice();
  }
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

setupFontSize();
render();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
