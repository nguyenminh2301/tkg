import { findArticle } from './content.js';

const DISCLAIMER = 'Tài liệu tham khảo, không thay thế chỉ định của bác sĩ hoặc kỹ thuật viên phục hồi chức năng.';

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

function renderNotFound(root) {
  document.title = 'Không tìm thấy bài viết · Sổ tay PHCN sau thay khớp gối';
  root.innerHTML = `
    <p class="eyebrow"><svg class="icon icon-sm" width="24" height="24" aria-hidden="true"><use href="#icon-book"/></svg> Kiến thức</p>
    <h1>Không tìm thấy bài viết</h1>
    <p class="lead">Đường dẫn này không còn đúng. Quay lại mục Kiến thức để chọn bài khác.</p>
  `;
}

function pendingNotice(article) {
  return `
    <div class="notice warning">
      <p><strong>Đang cập nhật.</strong> Bài viết sẽ được bổ sung sau.${article.summary ? ` Dự kiến: ${escapeHtml(article.summary)}` : ''}</p>
    </div>
  `;
}

function errorNotice() {
  return `
    <div class="notice warning">
      <p><strong>Không tải được nội dung.</strong> Vui lòng thử tải lại trang.</p>
    </div>
  `;
}

function skeleton() {
  return `
    <div class="skeleton" aria-hidden="true">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
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
      <a href="kien-thuc.html">Kiến thức</a> · ${escapeHtml(category.title)}
    </p>
    <h1>${escapeHtml(article.title)}</h1>
    ${article.video ? videoFacade(article.video) : ''}
    <div class="article-body">${article.ready ? skeleton() : pendingNotice(article)}</div>
  `;
  if (article.video) setupVideoFacade(root);

  if (!article.ready) return;
  const body = root.querySelector('.article-body');
  try {
    const html = await loadArticleHtml(article.slug);
    body.innerHTML = html + `<p class="article-disclaimer">${DISCLAIMER}</p>`;
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

render();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
