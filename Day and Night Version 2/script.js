(function () {
  /* ── Build stars ── */
  const starsEl = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      animation-delay:${Math.random() * 3}s;
      animation-duration:${1.5 + Math.random() * 2}s;
    `;
    starsEl.appendChild(s);
  }

  /* ── Build clouds ── */
  const cloudsEl = document.getElementById('clouds');
  const cloudData = [
    { top: '10%', w: 120, h: 40, dur: 28, delay: 0 },
    { top: '22%', w: 90,  h: 30, dur: 22, delay: -8 },
    { top: '15%', w: 160, h: 50, dur: 35, delay: -15 },
    { top: '35%', w: 100, h: 35, dur: 30, delay: -5 },
    { top: '8%',  w: 70,  h: 25, dur: 20, delay: -12 },
  ];
  cloudData.forEach(d => {
    const c = document.createElement('div');
    c.className = 'cloud';
    c.style.cssText = `
      top:${d.top}; width:${d.w}px; height:${d.h}px;
      animation-duration:${d.dur}s;
      animation-delay:${d.delay}s;
    `;
    // bumps
    const b1 = document.createElement('div');
    b1.style.cssText = `
      position:absolute; background:rgba(255,255,255,0.85);
      border-radius:50%;
      width:${d.h * 1.4}px; height:${d.h * 1.4}px;
      top:${-d.h * 0.5}px; left:${d.w * 0.2}px;
    `;
    const b2 = document.createElement('div');
    b2.style.cssText = `
      position:absolute; background:rgba(255,255,255,0.85);
      border-radius:50%;
      width:${d.h * 1.0}px; height:${d.h * 1.0}px;
      top:${-d.h * 0.3}px; left:${d.w * 0.5}px;
    `;
    c.appendChild(b1);
    c.appendChild(b2);
    cloudsEl.appendChild(c);
  });

  /* ── Build sun rays ── */
  const raysEl = document.getElementById('rays');
  const RAY_COUNT = 12;
  for (let i = 0; i < RAY_COUNT; i++) {
    const r = document.createElement('div');
    r.className = 'ray';
    const angle = (360 / RAY_COUNT) * i;
    const len = i % 2 === 0 ? 14 : 10;
    r.style.cssText = `
      height:${len}px;
      transform: rotate(${angle}deg) translateY(-28px);
      top: 50%; left: 50%;
      margin-top: -${len}px;
      margin-left: -2px;
      transform-origin: center ${len + 28}px;
      transform: rotate(${angle}deg);
    `;
    raysEl.appendChild(r);
  }

  /* ── Build moon craters ── */
  const cratersEl = document.getElementById('craters');
  const craterData = [
    { top: '20%', left: '55%', size: 10 },
    { top: '55%', left: '65%', size: 7  },
    { top: '65%', left: '40%', size: 5  },
    { top: '30%', left: '70%', size: 6  },
  ];
  craterData.forEach(d => {
    const cr = document.createElement('div');
    cr.className = 'crater';
    cr.style.cssText = `
      top:${d.top}; left:${d.left};
      width:${d.size}px; height:${d.size}px;
      margin-top:-${d.size / 2}px; margin-left:-${d.size / 2}px;
    `;
    cratersEl.appendChild(cr);
  });

  /* ── Toggle logic ── */
  const toggle = document.getElementById('toggle');
  const label  = document.getElementById('label');
  let isNight  = false;

  function switchMode() {
    isNight = !isNight;
    document.body.classList.toggle('night', isNight);
    toggle.setAttribute('aria-checked', String(isNight));
    label.textContent = isNight ? 'Night Mode' : 'Day Mode';
  }

  toggle.addEventListener('click', switchMode);
  toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      switchMode();
    }
  });
})();
