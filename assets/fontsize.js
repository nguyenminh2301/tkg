const STEPS = ['normal', 'lg', 'xl'];
const CLASS_BY_STEP = { normal: '', lg: 'text-lg', xl: 'text-xl' };

function applyStep(step) {
  document.documentElement.classList.remove('text-lg', 'text-xl');
  if (CLASS_BY_STEP[step]) document.documentElement.classList.add(CLASS_BY_STEP[step]);
  const dec = document.getElementById('font-decrease');
  const inc = document.getElementById('font-increase');
  if (dec) dec.disabled = step === STEPS[0];
  if (inc) inc.disabled = step === STEPS[STEPS.length - 1];
}

export function setupFontSize() {
  let step = 'normal';
  try {
    const saved = localStorage.getItem('fontSize');
    if (STEPS.includes(saved)) step = saved;
  } catch {}
  applyStep(step);

  function move(delta) {
    const idx = Math.min(STEPS.length - 1, Math.max(0, STEPS.indexOf(step) + delta));
    step = STEPS[idx];
    try { localStorage.setItem('fontSize', step); } catch {}
    applyStep(step);
  }
  document.getElementById('font-decrease')?.addEventListener('click', () => move(-1));
  document.getElementById('font-increase')?.addEventListener('click', () => move(1));
}
