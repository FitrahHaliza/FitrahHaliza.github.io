document.addEventListener('DOMContentLoaded', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = percent + '%';
  }
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  function handleNavHide() {
    const currentScroll = window.scrollY;
    if (navbar) {
      if (currentScroll > lastScroll && currentScroll > 120) {
        navbar.classList.add('nav-hidden');
      } else {
        navbar.classList.remove('nav-hidden');
      }
    }
    lastScroll = currentScroll;
  }
  const sections = document.querySelectorAll('section[id]');
  const menuLinks = document.querySelectorAll('#menu > li > a');
  function updateActiveLink() {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 90;
      if (window.scrollY >= top) current = section.id;
    });
    menuLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  const backToTop = document.getElementById('back-to-top');
  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleNavHide();
    updateActiveLink();
    toggleBackToTop();
  });
  updateScrollProgress();
  updateActiveLink();
  toggleBackToTop();
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('show');
      menuToggle.classList.toggle('active');
      const isOpen = menu.classList.contains('show');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('show');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  const themeToggle = document.getElementById('theme-toggle');
  const themes = ['ungu', 'biru', 'sunset'];
  const savedTheme = localStorage.getItem('portofolio-theme');
  if (savedTheme && savedTheme !== 'ungu' && themes.includes(savedTheme)) {
    document.body.setAttribute('data-theme', savedTheme);
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') || 'ungu';
      const currentIndex = themes.indexOf(currentTheme);
      const nextTheme = themes[(currentIndex + 1) % themes.length];
      if (nextTheme === 'ungu') {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', nextTheme);
      }
      localStorage.setItem('portofolio-theme', nextTheme);
    });
  }
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }
  const typingOutput = document.getElementById('typing-output');
  const typingWords = ['Mahasiswa Teknik Komputer', 'Suka Belajar Web Development', 'Fitrah Haliza'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentWord = typingWords[wordIndex];

    if (!isDeleting) {
      typingOutput.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1500);
        return;
      }
    } else {
      typingOutput.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 60 : 100);
  }
  if (typingOutput) typeLoop();
  const sapaBtn = document.getElementById('sapa-btn');
  const sapaOutput = document.getElementById('sapa-output');
  const sapaMessages = [
    'Halo juga! Terima kasih sudah mampir 👋',
    'Senang bertemu denganmu di sini! 😊',
    'Semoga harimu menyenangkan! ✨',
  ];

  if (sapaBtn && sapaOutput) {
    sapaBtn.addEventListener('click', () => {
      sapaBtn.classList.add('sudah-ditekan', 'pressed');
      setTimeout(() => sapaBtn.classList.remove('pressed'), 350);
      const randomMsg = sapaMessages[Math.floor(Math.random() * sapaMessages.length)];
      sapaOutput.textContent = randomMsg;
      sapaOutput.classList.add('show');
    });
  }
});