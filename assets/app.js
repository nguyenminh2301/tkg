const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const storage = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};

const exercises = [
  {
    id: 'ankle-pump', phase: ['early'], title: 'Tập cổ chân',
    goal: 'Giúp tuần hoàn máu và giảm sưng.',
    steps: ['Nằm hoặc ngồi, duỗi chân thoải mái.', 'Gập bàn chân lên, rồi đạp nhẹ xuống.', 'Làm chậm, đều, không nín thở.'],
    dose: '10–20 lần/lượt, nhiều lượt trong ngày.',
    stop: 'Dừng nếu đau bắp chân tăng rõ, khó thở hoặc chóng mặt.',
    tags: ['0–2 tuần', 'tuần hoàn', 'dễ tập']
  },
  {
    id: 'quad-set', phase: ['early','middle'], title: 'Co cơ đùi trước',
    goal: 'Đánh thức cơ đùi trước, hỗ trợ duỗi gối.',
    steps: ['Nằm hoặc ngồi duỗi chân.', 'Ấn nhẹ mặt sau gối xuống giường.', 'Giữ 5 giây rồi thả lỏng.'],
    dose: '10 lần/lượt, 2–4 lượt/ngày.',
    stop: 'Không cố ép nếu đau nhói ở gối hoặc vết mổ căng.',
    tags: ['0–2 tuần', 'sức cơ', 'duỗi gối']
  },
  {
    id: 'heel-slide', phase: ['early','middle'], title: 'Trượt gót để gập gối',
    goal: 'Tăng dần khả năng gập gối.',
    steps: ['Nằm hoặc ngồi, đặt gót trên mặt giường.', 'Từ từ kéo gót về phía mông.', 'Giữ rồi trượt chân duỗi ra lại.'],
    dose: '5–10 lần/lượt, tăng dần nếu đau sưng không tăng.',
    stop: 'Dừng nếu đau sắc hoặc sưng tăng rõ sau tập.',
    tags: ['0–2 tuần', 'tầm vận động', 'gập gối']
  },
  {
    id: 'knee-extension', phase: ['early','middle'], title: 'Tập duỗi gối nhẹ',
    goal: 'Tránh gối co gập kéo dài.',
    steps: ['Nằm hoặc ngồi, kê khăn cuộn dưới cổ chân nếu được hướng dẫn.', 'Thả lỏng để gối duỗi dần.', 'Có thể siết cơ đùi nhẹ.'],
    dose: 'Mỗi lần vài phút, theo mức chịu được.',
    stop: 'Không kê gối lâu dưới khoeo gối nếu bệnh viện không dặn.',
    tags: ['duỗi gối', '0–2 tuần', 'cẩn thận']
  },
  {
    id: 'straight-leg-raise', phase: ['middle','late'], title: 'Nâng chân thẳng',
    goal: 'Tăng sức cơ đùi trước.',
    steps: ['Nằm ngửa, một chân co, chân tập duỗi thẳng.', 'Siết cơ đùi rồi nâng chân lên thấp.', 'Giữ 3–5 giây, hạ xuống chậm.'],
    dose: '5–10 lần/lượt, tập khi kiểm soát được gối.',
    stop: 'Dừng nếu không giữ được gối thẳng hoặc đau tăng rõ.',
    tags: ['2–6 tuần', 'sức cơ', 'kiểm soát']
  },
  {
    id: 'sit-stand', phase: ['middle','late','maintain'], title: 'Đứng lên – ngồi xuống',
    goal: 'Phục hồi sinh hoạt hằng ngày.',
    steps: ['Ngồi trên ghế vững, chân đặt chắc trên sàn.', 'Nghiêng người nhẹ về trước, đứng lên chậm.', 'Ngồi xuống chậm, kiểm soát gối.'],
    dose: '5–10 lần/lượt, 1–3 lượt tùy sức.',
    stop: 'Dừng nếu chóng mặt, hụt chân hoặc đau tăng nhiều.',
    tags: ['2–6 tuần', 'sinh hoạt', 'sức cơ']
  },
  {
    id: 'calf-raise', phase: ['late','maintain'], title: 'Nhón gót có điểm tựa',
    goal: 'Tăng sức cơ cẳng chân, hỗ trợ thăng bằng.',
    steps: ['Đứng bám ghế hoặc tường chắc chắn.', 'Nhón hai gót lên chậm.', 'Hạ xuống chậm, giữ người thẳng.'],
    dose: '10 lần/lượt, 1–2 lượt nếu an toàn.',
    stop: 'Không tập nếu chóng mặt, mất thăng bằng hoặc đau tăng.',
    tags: ['6–12 tuần', 'thăng bằng', 'sức cơ']
  },
  {
    id: 'step-up', phase: ['late','maintain'], title: 'Bước lên bục thấp',
    goal: 'Chuẩn bị lên xuống bậc.',
    steps: ['Dùng bục thấp chắc chắn, có tay vịn nếu cần.', 'Bước một chân lên, đưa chân kia theo.', 'Bước xuống chậm, kiểm soát gối.'],
    dose: '5–10 lần mỗi bên, tập khi đã được cho phép.',
    stop: 'Không tập nếu gối khuỵu, đau tăng hoặc thiếu điểm bám.',
    tags: ['6–12 tuần', 'cầu thang', 'chức năng']
  },
  {
    id: 'walking', phase: ['early','middle','late','maintain'], title: 'Tập đi bộ tăng dần',
    goal: 'Tăng tự tin đi lại và sức bền.',
    steps: ['Dùng dụng cụ hỗ trợ theo chỉ định.', 'Đi quãng ngắn, mặt phẳng, đủ sáng.', 'Tăng thời gian từng ít một.'],
    dose: 'Bắt đầu ngắn, chia nhiều lượt trong ngày.',
    stop: 'Dừng nếu hụt hơi, chóng mặt, đau sưng tăng hoặc dáng đi xấu.',
    tags: ['mọi giai đoạn', 'đi lại', 'sức bền']
  }
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function setupMenu() {
  const toggle = $('.menu-toggle');
  const nav = $('.site-nav');
  const icon = toggle?.querySelector('use');
  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    icon?.setAttribute('href', open ? '#icon-close' : '#icon-menu');
  }
  toggle?.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  $$('.site-nav a').forEach(a => a.addEventListener('click', () => setOpen(false)));
}

function setupScrollProgress() {
  const bar = $('#scroll-progress-bar');
  if (!bar) return;
  let ticking = false;
  function update() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    bar.style.width = Math.min(100, Math.max(0, ratio * 100)) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function setupReveal() {
  const items = $$('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

function setupTabs() {
  $$('.tab').forEach(button => {
    button.addEventListener('click', () => {
      $$('.tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      $$('.tab-panel').forEach(p => p.classList.remove('active'));
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      document.getElementById(button.dataset.tab)?.classList.add('active');
    });
  });
}

function computePhase(dateString) {
  if (!dateString) return null;
  const surgery = new Date(dateString + 'T00:00:00');
  const now = new Date();
  const days = Math.floor((now - surgery) / (1000 * 60 * 60 * 24));
  if (Number.isNaN(days)) return null;
  if (days < 0) return {days, text: `Còn ${Math.abs(days)} ngày đến phẫu thuật. Hãy chuẩn bị nhà cửa, dụng cụ hỗ trợ và hỏi bệnh viện về bài tập được phép.`};
  if (days <= 14) return {days, text: `Ngày ${days} sau mổ: ưu tiên an toàn, giảm sưng, tập nhẹ và đi lại theo hướng dẫn.`};
  if (days <= 42) return {days, text: `Ngày ${days} sau mổ: tăng dần gập duỗi gối, sức cơ và đi bộ.`};
  if (days <= 84) return {days, text: `Ngày ${days} sau mổ: tập sinh hoạt, thăng bằng và sức bền.`};
  return {days, text: `Ngày ${days} sau mổ: duy trì tập đều và phòng té ngã.`};
}

function setupPhase() {
  const input = $('#surgery-date');
  const saved = storage.get('surgeryDate', '');
  if (saved) input.value = saved;
  function render() {
    const result = computePhase(input.value);
    $('#phase-output').textContent = result ? result.text : 'Chưa có ngày phẫu thuật. Hãy nhập ngày để website gợi ý giai đoạn tập.';
  }
  $('#save-date')?.addEventListener('click', () => {
    storage.set('surgeryDate', input.value);
    render();
  });
  render();
}

function renderExercises() {
  const search = ($('#exercise-search')?.value || '').toLowerCase().trim();
  const phase = $('#phase-filter')?.value || 'all';
  const done = storage.get('exerciseDone:' + todayKey(), []);
  const list = $('#exercise-list');
  const filtered = exercises.filter(ex => {
    const text = [ex.title, ex.goal, ex.tags.join(' ')].join(' ').toLowerCase();
    const phaseOk = phase === 'all' || ex.phase.includes(phase);
    const searchOk = !search || text.includes(search);
    return phaseOk && searchOk;
  });
  list.innerHTML = filtered.map(ex => `
    <article class="exercise-card">
      <div class="tag-row">${ex.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <h3>${ex.title}</h3>
      <p><strong>Mục tiêu:</strong> ${ex.goal}</p>
      <details>
        <summary>Xem cách tập <svg class="icon icon-sm chevron" aria-hidden="true"><use href="#icon-chevron"/></svg></summary>
        <div class="details-body">
          <p><strong>Cách tập:</strong></p>
          <ul>${ex.steps.map(s => `<li>${s}</li>`).join('')}</ul>
          <p><strong>Số lần gợi ý:</strong> ${ex.dose}</p>
          <p><strong>Khi cần dừng:</strong> ${ex.stop}</p>
        </div>
      </details>
      <label class="done-row"><input type="checkbox" data-exdone="${ex.id}" ${done.includes(ex.id) ? 'checked' : ''}> Tôi đã tập bài này hôm nay</label>
    </article>
  `).join('') || '<p>Không tìm thấy bài tập phù hợp.</p>';

  $$('[data-exdone]').forEach(box => {
    box.addEventListener('change', () => {
      const current = new Set(storage.get('exerciseDone:' + todayKey(), []));
      if (box.checked) current.add(box.dataset.exdone); else current.delete(box.dataset.exdone);
      storage.set('exerciseDone:' + todayKey(), Array.from(current));
      updateProgress();
    });
  });
}

function setupExercises() {
  $('#exercise-search')?.addEventListener('input', renderExercises);
  $('#phase-filter')?.addEventListener('change', renderExercises);

  const section = $('#exercises');
  if (!section || !('IntersectionObserver' in window)) {
    renderExercises();
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        renderExercises();
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px' });
  observer.observe(section);
}

function setupDailyChecklist() {
  const key = 'dailyChecklist:' + todayKey();
  const saved = storage.get(key, {});
  $$('[data-daily]').forEach(box => {
    box.checked = Boolean(saved[box.dataset.daily]);
    box.addEventListener('change', () => {
      const state = storage.get(key, {});
      state[box.dataset.daily] = box.checked;
      storage.set(key, state);
      updateProgress();
    });
  });
  $('#reset-daily')?.addEventListener('click', () => {
    localStorage.removeItem(key);
    $$('[data-daily]').forEach(box => box.checked = false);
    updateProgress();
  });
}

function updateProgress() {
  const dailyTotal = $$('[data-daily]').length;
  const dailyDone = $$('[data-daily]').filter(b => b.checked).length;
  const exDone = storage.get('exerciseDone:' + todayKey(), []).length > 0 ? 1 : 0;
  const total = dailyTotal + 1;
  const value = Math.round(((dailyDone + exDone) / total) * 100);
  $('#today-progress-text').textContent = value + '%';
  $('#today-progress-bar').style.width = value + '%';
}

function setupDiary() {
  const form = $('#diary-form');
  form.elements.date.value = todayKey();
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const rows = storage.get('diaryRows', []);
    rows.unshift(data);
    storage.set('diaryRows', rows.slice(0, 365));
    form.reset();
    form.elements.date.value = todayKey();
    renderDiary();
  });
  $('#clear-diary')?.addEventListener('click', () => {
    if (confirm('Xóa toàn bộ nhật ký lưu trên máy này?')) {
      storage.set('diaryRows', []);
      renderDiary();
    }
  });
  $('#export-csv')?.addEventListener('click', exportCsv);
  renderDiary();
}

function renderDiary() {
  const rows = storage.get('diaryRows', []);
  const tbody = $('#diary-table tbody');
  tbody.innerHTML = rows.map(row => `
    <tr>
      <td>${escapeHtml(row.date || '')}</td>
      <td>${escapeHtml(row.painRest || '')}</td>
      <td>${escapeHtml(row.painAfter || '')}</td>
      <td>${escapeHtml(row.swelling || '')}</td>
      <td>${escapeHtml(row.walkMinutes || '')}</td>
      <td>${escapeHtml(row.exerciseDone || '')}</td>
      <td>${escapeHtml(row.note || '')}</td>
    </tr>
  `).join('');
}

function exportCsv() {
  const rows = storage.get('diaryRows', []);
  if (!rows.length) { alert('Chưa có nhật ký để xuất.'); return; }
  const header = ['date','painRest','painAfter','swelling','walkMinutes','exerciseDone','note'];
  const csv = [header.join(',')].concat(rows.map(row => header.map(h => csvCell(row[h] || '')).join(','))).join('\n');
  const blob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'nhat-ky-phcn-thay-khop-goi.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

function csvCell(value) {
  const text = String(value).replaceAll('"', '""');
  return `"${text}"`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
}

setupMenu();
setupScrollProgress();
setupReveal();
setupTabs();
setupPhase();
setupDailyChecklist();
setupExercises();
setupDiary();
updateProgress();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
