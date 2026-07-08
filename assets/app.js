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
    goal: 'Giúp tuần hoàn máu, giảm nguy cơ ứ trệ và hỗ trợ giảm sưng.',
    steps: ['Nằm hoặc ngồi, duỗi chân thoải mái.', 'Gập bàn chân lên về phía người, rồi đạp nhẹ xuống.', 'Làm chậm, đều, không nín thở.'],
    dose: '10–20 lần/lượt, nhiều lượt trong ngày nếu được cho phép.',
    stop: 'Dừng nếu đau bắp chân tăng rõ, khó thở, đau ngực hoặc chóng mặt.',
    tags: ['0–2 tuần', 'tuần hoàn', 'dễ tập']
  },
  {
    id: 'quad-set', phase: ['early','middle'], title: 'Co cơ đùi trước',
    goal: 'Đánh thức cơ đùi trước và hỗ trợ duỗi gối.',
    steps: ['Nằm hoặc ngồi duỗi chân.', 'Ấn nhẹ mặt sau gối xuống giường bằng cách siết cơ đùi.', 'Giữ 5 giây rồi thả lỏng.'],
    dose: '10 lần/lượt, 2–4 lượt/ngày theo hướng dẫn.',
    stop: 'Không cố ép nếu đau nhói ở gối hoặc vết mổ căng đau bất thường.',
    tags: ['0–2 tuần', 'sức cơ', 'duỗi gối']
  },
  {
    id: 'heel-slide', phase: ['early','middle'], title: 'Trượt gót để gập gối',
    goal: 'Tăng dần khả năng gập gối trong giới hạn an toàn.',
    steps: ['Nằm hoặc ngồi, đặt gót chân trên mặt giường.', 'Từ từ kéo gót về phía mông để gập gối.', 'Giữ ngắn rồi trượt chân duỗi ra lại.'],
    dose: '5–10 lần/lượt, tăng dần nếu đau/sưng không tăng.',
    stop: 'Dừng nếu đau sắc, co cứng nhiều hoặc sưng tăng rõ sau tập.',
    tags: ['0–2 tuần', 'tầm vận động', 'gập gối']
  },
  {
    id: 'knee-extension', phase: ['early','middle'], title: 'Tập duỗi gối nhẹ',
    goal: 'Giúp tránh tình trạng gối co gập kéo dài.',
    steps: ['Nằm hoặc ngồi, đặt khăn cuộn dưới cổ chân nếu được hướng dẫn.', 'Thả lỏng để gối duỗi dần.', 'Có thể kết hợp siết cơ đùi nhẹ.'],
    dose: 'Mỗi lần vài phút, theo mức chịu được.',
    stop: 'Không kê gối lâu dưới khoeo gối nếu bệnh viện không dặn.',
    tags: ['duỗi gối', '0–2 tuần', 'cẩn thận']
  },
  {
    id: 'straight-leg-raise', phase: ['middle','late'], title: 'Nâng chân thẳng',
    goal: 'Tăng sức cơ đùi trước và khả năng kiểm soát chân.',
    steps: ['Nằm ngửa, một chân co, chân tập duỗi thẳng.', 'Siết cơ đùi rồi nâng chân lên thấp.', 'Giữ 3–5 giây, hạ xuống chậm.'],
    dose: '5–10 lần/lượt, chỉ tập khi kiểm soát được gối.',
    stop: 'Dừng nếu không giữ được gối thẳng hoặc đau tăng rõ.',
    tags: ['2–6 tuần', 'sức cơ', 'kiểm soát']
  },
  {
    id: 'sit-stand', phase: ['middle','late','maintain'], title: 'Đứng lên – ngồi xuống',
    goal: 'Phục hồi hoạt động sinh hoạt hằng ngày.',
    steps: ['Ngồi trên ghế vững, chân đặt chắc trên sàn.', 'Nghiêng người nhẹ về trước, đứng lên chậm.', 'Ngồi xuống chậm, kiểm soát gối và thân người.'],
    dose: '5–10 lần/lượt, 1–3 lượt tùy sức.',
    stop: 'Dừng nếu chóng mặt, hụt chân hoặc đau tăng nhiều.',
    tags: ['2–6 tuần', 'sinh hoạt', 'sức cơ']
  },
  {
    id: 'calf-raise', phase: ['late','maintain'], title: 'Nhón gót có điểm tựa',
    goal: 'Tăng sức cơ cẳng chân và hỗ trợ thăng bằng.',
    steps: ['Đứng bám ghế hoặc tường chắc chắn.', 'Nhón hai gót lên chậm.', 'Hạ xuống chậm, giữ thân người thẳng.'],
    dose: '10 lần/lượt, 1–2 lượt nếu an toàn.',
    stop: 'Không tập nếu chóng mặt, mất thăng bằng hoặc đau tăng.',
    tags: ['6–12 tuần', 'thăng bằng', 'sức cơ']
  },
  {
    id: 'step-up', phase: ['late','maintain'], title: 'Bước lên bục thấp',
    goal: 'Chuẩn bị cho lên xuống bậc và hoạt động ngoài nhà.',
    steps: ['Dùng bục thấp chắc chắn, có tay vịn nếu cần.', 'Bước một chân lên, đưa chân còn lại lên theo.', 'Bước xuống chậm, kiểm soát gối.'],
    dose: '5–10 lần mỗi bên, chỉ tập khi đã được cho phép.',
    stop: 'Không tập nếu gối khuỵu, đau tăng hoặc không có điểm bám an toàn.',
    tags: ['6–12 tuần', 'cầu thang', 'chức năng']
  },
  {
    id: 'walking', phase: ['early','middle','late','maintain'], title: 'Tập đi bộ tăng dần',
    goal: 'Tăng tự tin khi đi lại, sức bền và chức năng hằng ngày.',
    steps: ['Dùng dụng cụ hỗ trợ theo chỉ định.', 'Đi quãng ngắn, mặt phẳng, đủ sáng.', 'Tăng thời gian từng ít một, ưu tiên dáng đi an toàn.'],
    dose: 'Bắt đầu ngắn, chia nhiều lượt trong ngày; tăng theo hướng dẫn.',
    stop: 'Dừng nếu hụt hơi, chóng mặt, đau/sưng tăng hoặc dáng đi xấu đi.',
    tags: ['mọi giai đoạn', 'đi lại', 'sức bền']
  }
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function setupMenu() {
  const toggle = $('.menu-toggle');
  const nav = $('.site-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('.site-nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
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
  if (days < 0) return {days, text: `Còn ${Math.abs(days)} ngày đến ngày phẫu thuật. Hãy chuẩn bị nhà cửa, dụng cụ hỗ trợ và hỏi bệnh viện về bài tập trước mổ.`};
  if (days <= 14) return {days, text: `Ngày thứ ${days} sau mổ: giai đoạn 0–2 tuần. Ưu tiên an toàn, giảm sưng, tập cổ chân, co cơ đùi, trượt gót và tập đi theo hướng dẫn.`};
  if (days <= 42) return {days, text: `Ngày thứ ${days} sau mổ: giai đoạn 2–6 tuần. Tăng dần tầm vận động, sức cơ, đi bộ và sinh hoạt cơ bản.`};
  if (days <= 84) return {days, text: `Ngày thứ ${days} sau mổ: giai đoạn 6–12 tuần. Tập chức năng, sức bền, thăng bằng và quay lại hoạt động hằng ngày.`};
  return {days, text: `Ngày thứ ${days} sau mổ: giai đoạn duy trì. Tiếp tục tập đều để bảo vệ sức cơ, tầm vận động và giảm nguy cơ té ngã.`};
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
      <div class="placeholder" aria-hidden="true">Ảnh/video tự quay</div>
      <div class="tag-row">${ex.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <h3>${ex.title}</h3>
      <p><strong>Mục tiêu:</strong> ${ex.goal}</p>
      <p><strong>Cách tập:</strong></p>
      <ul>${ex.steps.map(s => `<li>${s}</li>`).join('')}</ul>
      <p><strong>Số lần gợi ý:</strong> ${ex.dose}</p>
      <p><strong>Khi cần dừng:</strong> ${ex.stop}</p>
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
  renderExercises();
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
setupTabs();
setupPhase();
setupDailyChecklist();
setupExercises();
setupDiary();
updateProgress();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
