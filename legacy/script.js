(function () {
  const root = document.documentElement;

  // Theme toggle
  const themeBtn = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const setLabel = () => (themeLabel.textContent = root.getAttribute('data-theme'));
  setLabel();
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setLabel();
  });

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );

  // Terminal typing animation
  const term = document.getElementById('terminal');
  const lines = [
    ['p', '❯ ', 'ship project-alpha'],
    ['ok', '✓ ', 'ios + android    ', 'dim', 'app store · play store'],
    ['ok', '✓ ', 'web              ', 'dim', 'marketplace for users'],
    ['arr', '→ ', 'live in production'],
    ['p', '❯ ', 'ship flagship'],
    ['ok', '✓ ', 'notifications    ', 'dim', 'node · 20+ events'],
    ['wip', '◐ ', 'next             ', 'dim', 'agentic workflows · evals'],
  ];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function span(cls, text) {
    const s = document.createElement('span');
    if (cls) s.className = cls;
    s.textContent = text;
    return s;
  }

  function renderLine(parts) {
    const frag = document.createDocumentFragment();
    frag.appendChild(span(parts[0], parts[1]));
    frag.appendChild(span('', parts[2]));
    if (parts[3]) frag.appendChild(span(parts[3], parts[4]));
    frag.appendChild(document.createTextNode('\n'));
    return frag;
  }

  const cursor = span('cursor', '');
  if (reduced) {
    lines.forEach((l) => term.appendChild(renderLine(l)));
    term.appendChild(span('p', '❯ '));
    term.appendChild(cursor);
  } else {
    let i = 0;
    const next = () => {
      if (i < lines.length) {
        term.appendChild(renderLine(lines[i++]));
        setTimeout(next, lines[i - 1][0] === 'p' ? 700 : 350);
      } else {
        term.appendChild(span('p', '❯ '));
        term.appendChild(cursor);
      }
    };
    setTimeout(next, 500);
  }

  // Reveal on scroll + stat counters
  const animateCount = (el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    if (reduced) return (el.textContent = target + suffix);
    let n = 0;
    const step = () => {
      n++;
      el.textContent = n + suffix;
      if (n < target) setTimeout(step, 900 / target);
    };
    step();
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        e.target.querySelectorAll('[data-count]').forEach(animateCount);
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Active nav link
  const sections = ['work', 'experience', 'writing', 'contact'].map((id) => document.getElementById(id));
  const navIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.querySelectorAll('a').forEach((a) =>
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
          );
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => s && navIo.observe(s));

  // Testimonials carousel
  const slides = document.getElementById('slides');
  const total = slides.children.length;
  const countEl = document.getElementById('slideCount');
  let idx = 0;
  let timer;
  const pad = (n) => String(n).padStart(2, '0');
  const go = (n) => {
    idx = (n + total) % total;
    slides.style.transform = `translateX(-${idx * 100}%)`;
    countEl.textContent = `${pad(idx + 1)} / ${pad(total)}`;
  };
  const auto = () => {
    clearInterval(timer);
    if (!reduced) timer = setInterval(() => go(idx + 1), 7000);
  };
  document.getElementById('prevSlide').addEventListener('click', () => { go(idx - 1); auto(); });
  document.getElementById('nextSlide').addEventListener('click', () => { go(idx + 1); auto(); });
  auto();

  // Local time (change timeZone to yours)
  const timeEl = document.getElementById('localTime');
  const tick = () => {
    timeEl.textContent =
      new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }) +
      ' · IST';
  };
  tick();
  setInterval(tick, 30000);

  // Contact form: opens the user's mail client (no backend required)
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    const subject = encodeURIComponent('Hello from ' + f.name.value.trim());
    const body = encodeURIComponent(f.message.value.trim() + '\n\n— ' + f.name.value.trim() + ' (' + f.email.value.trim() + ')');
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    document.getElementById('formNote').textContent = 'Opening your mail app…';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
