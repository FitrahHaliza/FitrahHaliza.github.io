document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("show");
      menuToggle.classList.toggle("active");

      const isOpen = menu.classList.contains("show");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("show");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#menu a[href^='#']");

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  const typingOutput = document.getElementById("typing-output");

  const kalimatTyping = [
    "Beranda",
    "Tentang Saya",
    "Pendidikan",
    "Proyek",
    "Yang Saya Bisa",
    "Hubungi Saya"
  ];

  if (typingOutput) {
    let indexKalimat = 0;
    let indexHuruf = 0;
    let sedangMenghapus = false;

    function jalankanTyping() {
      const kalimatSekarang = kalimatTyping[indexKalimat];

      if (!sedangMenghapus) {
        indexHuruf++;
        typingOutput.textContent = kalimatSekarang.slice(0, indexHuruf);

        if (indexHuruf === kalimatSekarang.length) {
          sedangMenghapus = true;
          setTimeout(jalankanTyping, 1500);
          return;
        }
      } else {
        indexHuruf--;
        typingOutput.textContent = kalimatSekarang.slice(0, indexHuruf);

        if (indexHuruf === 0) {
          sedangMenghapus = false;
          indexKalimat = (indexKalimat + 1) % kalimatTyping.length;
        }
      }

      const kecepatan = sedangMenghapus ? 40 : 80;
      setTimeout(jalankanTyping, kecepatan);
    }

    jalankanTyping();
  }
  const sapaBtn = document.getElementById("sapa-btn");
  const sapaOutput = document.getElementById("sapa-output");

  const daftarSapaan = [
    "Selamat datang di portofolio saya!"
  ];

  if (sapaBtn && sapaOutput) {
    let jumlahDitekan = 0;

    sapaBtn.addEventListener("click", function () {
      const pesan = daftarSapaan[jumlahDitekan % daftarSapaan.length];
      jumlahDitekan++;

      sapaOutput.textContent = pesan;
      sapaOutput.classList.add("show");
      sapaBtn.classList.add("sudah-ditekan");

      sapaBtn.classList.remove("pressed");
      void sapaBtn.offsetWidth;
      sapaBtn.classList.add("pressed");
    });
  }
  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 350) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  const scrollProgress = document.getElementById("scroll-progress");

  function updateProgressBar() {
    const tinggiHalaman = document.documentElement.scrollHeight - window.innerHeight;
    const persen = tinggiHalaman > 0 ? (window.scrollY / tinggiHalaman) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = persen + "%";
    }
  }

  if (scrollProgress) {
    window.addEventListener("scroll", updateProgressBar);
    window.addEventListener("resize", updateProgressBar);
    updateProgressBar();
  }
  const navbar = document.getElementById("navbar");
  let posisiScrollTerakhir = window.scrollY;

  if (navbar) {
    window.addEventListener("scroll", function () {
      const posisiSekarang = window.scrollY;

      if (posisiSekarang > posisiScrollTerakhir && posisiSekarang > 120) {
        navbar.classList.add("nav-hidden");
      } else {
        // Scroll ke atas -> tampilkan navbar lagi
        navbar.classList.remove("nav-hidden");
      }

      posisiScrollTerakhir = posisiSekarang;
    });
  }
  const themeToggle = document.getElementById("theme-toggle");
  const KUNCI_TEMA = "portofolio-tema-warna";
  const daftarTema = ["ungu", "biru", "sunset"];

  function terapkanTemaWarna(tema) {
    if (tema === "ungu") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", tema);
    }
  }
  let temaSekarang = "ungu";
  try {
    const temaTersimpan = localStorage.getItem(KUNCI_TEMA);
    if (temaTersimpan && daftarTema.includes(temaTersimpan)) {
      temaSekarang = temaTersimpan;
      terapkanTemaWarna(temaSekarang);
    }
  } catch (e) {
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const indexSekarang = daftarTema.indexOf(temaSekarang);
      temaSekarang = daftarTema[(indexSekarang + 1) % daftarTema.length];

      terapkanTemaWarna(temaSekarang);

      try {
        localStorage.setItem(KUNCI_TEMA, temaSekarang);
      } catch (e) {
      }
    });
  }

});