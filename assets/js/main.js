/**
 * FutureMe Landing Page - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNav();
  initGalleryCarousel();
  initFaqAccordion();
  initDownloadModal();
  initDownloadCounter();
  initScrollAnimations();
});

/* -------------------------------------------------------------------------- */
/* 1. Mobile Navigation Menu                                                   */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('mobile-menu-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !menu) return;

  function openMenu() {
    menu.classList.remove('translate-x-full');
    menuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    menuBackdrop.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.add('translate-x-full');
    menuBackdrop.classList.remove('opacity-100');
    menuBackdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Active Navigation Highlight on Scroll                                   */
/* -------------------------------------------------------------------------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const desktopNavItems = document.querySelectorAll('.desktop-nav-item');

  if (!sections.length || !desktopNavItems.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavItems.forEach(item => {
          const href = item.getAttribute('href');
          if (href === `#${id}`) {
            item.classList.add('bg-white', 'text-[#1E3A5F]', 'shadow-sm');
            item.classList.remove('text-[#5A7090]');
          } else {
            item.classList.remove('bg-white', 'text-[#1E3A5F]', 'shadow-sm');
            item.classList.add('text-[#5A7090]');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* -------------------------------------------------------------------------- */
/* 3. Screenshot Gallery Carousel                                             */
/* -------------------------------------------------------------------------- */
function initGalleryCarousel() {
  const track = document.getElementById('gallery-track');
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const dots = document.querySelectorAll('.gallery-dot');
  const captionTitle = document.getElementById('gallery-caption-title');
  const captionDesc = document.getElementById('gallery-caption-desc');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  const captions = [
    {
      title: "1. Beranda (Home & Sapaan)",
      desc: "Sapaan hangat dari versi masa depanmu, pohon pertumbuhan yang terus bersemi, dan kartu input cerita harian cepat."
    },
    {
      title: "2. Rencana & To-Do List",
      desc: "Jadwalkan langkah-langkah kecil hari ini dengan persentase progres, pengingat alarm fleksibel, dan motivasi AI."
    },
    {
      title: "3. Tanya Diri Masa Depan",
      desc: "Wadah aman bertanya ketika overthinking atau bimbang, dijawab dengan sudut pandang bijak dan menenangkan."
    },
    {
      title: "4. Cerita Perjalanan & Wrapped",
      desc: "Peta perjalanan heatmap konsistensi, montase kompilasi video 1 detik, serta kartu statistik estetik siap bagikan."
    },
    {
      title: "5. Ruang Pengenal (Aku)",
      desc: "Pantau jumlah cerita tertulis, hari streak berturut-turut, serta navigasi ke pengaturan aplikasi & bantuan."
    },
    {
      title: "6. Profil & Gaya Futures",
      desc: "Tuliskan nama panggilan, 3 impian besar, dan pilih persona sapaan si Futures: santai, teman akrab, atau tenang adem."
    }
  ];

  function updateCarousel(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    // Calculate translation percentage
    slides.forEach((slide, i) => {
      slide.classList.toggle('active-slide', i === currentIndex);
      if (i === currentIndex) {
        slide.classList.remove('scale-95', 'opacity-50');
        slide.classList.add('scale-100', 'opacity-100');
      } else {
        slide.classList.remove('scale-100', 'opacity-100');
        slide.classList.add('scale-95', 'opacity-50');
      }
    });

    // Scroll container
    const activeSlide = slides[currentIndex];
    if (activeSlide) {
      const containerWidth = track.parentElement.offsetWidth;
      const slideWidth = activeSlide.offsetWidth;
      const slideLeft = activeSlide.offsetLeft;
      const scrollTo = slideLeft - (containerWidth / 2) + (slideWidth / 2);
      
      track.parentElement.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }

    // Update dots
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('bg-[#1E3A5F]', 'w-8');
        dot.classList.remove('bg-[#D6E4F5]', 'w-2.5');
      } else {
        dot.classList.remove('bg-[#1E3A5F]', 'w-8');
        dot.classList.add('bg-[#D6E4F5]', 'w-2.5');
      }
    });

    // Update caption
    if (captionTitle && captionDesc && captions[currentIndex]) {
      captionTitle.textContent = captions[currentIndex].title;
      captionDesc.textContent = captions[currentIndex].desc;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateCarousel(index));
  });

  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => updateCarousel(index));
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      updateCarousel(currentIndex + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      updateCarousel(currentIndex - 1);
    }
  }

  // Keyboard navigation
  track.parentElement.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') updateCarousel(currentIndex - 1);
    if (e.key === 'ArrowRight') updateCarousel(currentIndex + 1);
  });

  // Initial update
  updateCarousel(0);
}

/* -------------------------------------------------------------------------- */
/* 4. FAQ Accordion & Category Filter                                         */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const tabButtons = document.querySelectorAll('.faq-tab-btn');
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  // Accordion Toggle
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Collapse all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const content = otherItem.querySelector('.faq-content');
        if (content) {
          content.style.maxHeight = null;
          content.style.opacity = '0';
        }
      });

      // If clicked item wasn't active, expand it
      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.faq-content');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 32 + 'px';
          content.style.opacity = '1';
        }
      }
    });
  });

  // Default first item open
  if (faqItems[0]) {
    faqItems[0].classList.add('active');
    const firstContent = faqItems[0].querySelector('.faq-content');
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + 32 + 'px';
      firstContent.style.opacity = '1';
    }
  }

  // Filter Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update active button styling
      tabButtons.forEach(b => {
        b.classList.remove('bg-[#1E3A5F]', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-[#5A7090]', 'border-[#D6E4F5]');
      });
      btn.classList.add('bg-[#1E3A5F]', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-[#5A7090]', 'border-[#D6E4F5]');

      // Filter FAQ items
      faqItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
          item.classList.remove('active');
          const content = item.querySelector('.faq-content');
          if (content) {
            content.style.maxHeight = null;
            content.style.opacity = '0';
          }
        }
      });

      // Reopen first visible item in this category
      const firstVisible = Array.from(faqItems).find(i => !i.classList.contains('hidden'));
      if (firstVisible) {
        firstVisible.classList.add('active');
        const content = firstVisible.querySelector('.faq-content');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 32 + 'px';
          content.style.opacity = '1';
        }
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Download Modal                                                          */
/* -------------------------------------------------------------------------- */
function initDownloadModal() {
  const modal = document.getElementById('download-modal');
  const triggerBtns = document.querySelectorAll('.download-trigger');
  const closeBtns = document.querySelectorAll('.modal-close');
  const backdrop = document.getElementById('modal-backdrop');

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    const dialog = modal.querySelector('.modal-dialog');
    if (dialog) {
      dialog.classList.remove('scale-95');
      dialog.classList.add('scale-100');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
    const dialog = modal.querySelector('.modal-dialog');
    if (dialog) {
      dialog.classList.remove('scale-100');
      dialog.classList.add('scale-95');
    }
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Scroll Reveal Animations                                                */
/* -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
    revealObserver.observe(el);
  });
}

/* -------------------------------------------------------------------------- */
/* 7. Download Counter                                                        */
/* -------------------------------------------------------------------------- */
function initDownloadCounter() {
  const baseCount = 0;
  const storageKey = 'futureme_download_count_v1';

  // Clear legacy storage key if present
  if (localStorage.getItem('futureme_download_count')) {
    localStorage.removeItem('futureme_download_count');
  }

  let currentCount = parseInt(localStorage.getItem(storageKey), 10);
  if (isNaN(currentCount) || currentCount < baseCount) {
    currentCount = baseCount;
    localStorage.setItem(storageKey, currentCount);
  }

  function formatNumber(num) {
    return num.toLocaleString('id-ID');
  }

  function updateCounterDisplay() {
    const counterElements = document.querySelectorAll('.download-counter');
    counterElements.forEach(el => {
      el.textContent = formatNumber(currentCount);
      el.classList.add('transition-transform', 'duration-200', 'scale-110');
      setTimeout(() => {
        el.classList.remove('scale-110');
      }, 200);
    });
  }

  // Initial update
  updateCounterDisplay();

  // Listen to download action clicks
  const downloadActionButtons = document.querySelectorAll('.download-trigger-action');
  downloadActionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCount += 1;
      localStorage.setItem(storageKey, currentCount);
      updateCounterDisplay();
    });
  });
}
