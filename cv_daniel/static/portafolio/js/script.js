/* =============================================
   DANIEL FELIPE GUEVARA · script.js
   ============================================= */

// ---- CUSTOM CURSOR (desktop only) ----
const cr  = document.getElementById('cur');
const cr2 = document.getElementById('cur2');
let mx = 0, my = 0, tx = 0, ty = 0;

const isTouch = window.matchMedia('(max-width: 900px)').matches || 'ontouchstart' in window;

if (!isTouch) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cr.style.left = mx - 6 + 'px';
    cr.style.top  = my - 6 + 'px';
  });

  (function loop() {
    tx += (mx - tx) * 0.1;
    ty += (my - ty) * 0.1;
    cr2.style.left = tx - 18 + 'px';
    cr2.style.top  = ty - 18 + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .tc, .st, .sv, .pj, .bcard').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cr.style.transform  = 'scale(2.2)';
      cr2.style.transform = 'scale(1.4)';
      cr2.style.opacity   = '1';
      cr2.style.borderColor = 'var(--c1)';
    });
    el.addEventListener('mouseleave', () => {
      cr.style.transform  = 'scale(1)';
      cr2.style.transform = 'scale(1)';
      cr2.style.opacity   = '.5';
    });
  });
}

// ---- PARTICLES ----
const pc  = document.getElementById('pcnv');
const ctx = pc.getContext('2d');
let W, H, ps = [];

function resize() {
  W = pc.width  = window.innerWidth;
  H = pc.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const cols = ['#ff3cac', '#784ba0', '#2b86c5', '#00f5d4', '#ffe600', '#ff6b35'];
for (let i = 0; i < 60; i++) {
  ps.push({
    x:  Math.random() * 1920,
    y:  Math.random() * 1080,
    vx: (Math.random() - .5) * 0.25,
    vy: (Math.random() - .5) * 0.25,
    r:  Math.random() * 1.4 + 0.4,
    c:  cols[Math.floor(Math.random() * cols.length)],
    o:  Math.random() * 0.35 + 0.08
  });
}

(function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  ps.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.globalAlpha = p.o;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  requestAnimationFrame(drawParticles);
})();

// ---- TYPED EFFECT ----
const phrases = [
  'Software Engineer Student',
  'Full-Stack Developer',
  'Java & Spring Boot Dev',
  'React / Next.js Builder',
  'GitFlow Practitioner'
];
let pi = 0, ci = 0, deleting = false;
const te = document.getElementById('typed');

function type() {
  const current = phrases[pi];
  te.textContent = deleting ? current.slice(0, --ci) : current.slice(0, ++ci);
  if (!deleting && ci === current.length) {
    deleting = true;
    setTimeout(type, 1800);
    return;
  }
  if (deleting && ci === 0) {
    deleting = false;
    pi = (pi + 1) % phrases.length;
  }
  setTimeout(type, deleting ? 42 : 78);
}
type();

// ---- REVEAL ON SCROLL ----
const rvEls = document.querySelectorAll('.rv');
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseInt(e.target.dataset.d || 0);
      setTimeout(() => e.target.classList.add('on'), delay);
      rvObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
rvEls.forEach(el => rvObs.observe(el));

// ---- SKILL BARS ----
const bars = document.querySelectorAll('.tfill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.style.width = e.target.dataset.p + '%'; }, 200);
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
bars.forEach(b => barObs.observe(b));

// ---- NAV DOTS ACTIVE ----
const sects = document.querySelectorAll('section[id]');
const dots  = document.querySelectorAll('.nd');

window.addEventListener('scroll', () => {
  let current = 'hero';
  sects.forEach(s => {
    if (window.scrollY >= s.offsetTop - 220) current = s.id;
  });
  dots.forEach(d => d.classList.toggle('a', d.getAttribute('href') === '#' + current));
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---- BIZ CARD 3D TILT ----
const bc = document.querySelector('.bcard');
if (bc) {
  bc.addEventListener('mousemove', e => {
    const r = bc.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    bc.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  });
  bc.addEventListener('mouseleave', () => { bc.style.transform = ''; });
}

// ---- PHOTO FALLBACK ----
const pf = document.getElementById('pfoto');
if (pf) {
  pf.onerror = () => {
    const fr = pf.parentElement;
    pf.style.display = 'none';
    const ph = document.createElement('div');
    ph.style.cssText = `
      width:100%; height:100%;
      background: linear-gradient(135deg, #0f1525, #1a2030);
      border-radius: 16px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 14px;
    `;
    ph.innerHTML = `
      <svg width="70" height="70" viewBox="0 0 24 24" fill="none"
           stroke="rgba(255,60,172,.4)" stroke-width="1">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(255,60,172,.5)">
        daniel.PNG
      </span>
    `;
    fr.insertBefore(ph, pf);
  };
}

// ---- CONSOLE SIGNATURE ----
console.log(
  '%c\nDaniel Felipe Guevara Rodríguez\nSoftware Engineering · UCC Pasto\nfeature/portafolio-dev1\n',
  'color:#ff3cac; font-size:14px; font-weight:bold;'
);