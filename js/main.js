document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // 3. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Only reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 4. Hero Section Initial Animation
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('active');
    }, 100);
  }

  // 5. Gallery Carousel Buttons
  const galleryTrack = document.querySelector('.gallery-track');
  const galleryPrev = document.querySelector('.gallery-btn.prev');
  const galleryNext = document.querySelector('.gallery-btn.next');

  if (galleryTrack && galleryPrev && galleryNext) {
    const scrollByAmount = () => galleryTrack.clientWidth * 0.8;
    galleryPrev.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
    });
    galleryNext.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
    });
  }

  // 6. Gallery Auto Scroll
  if (galleryTrack) {
    let autoScrollId;
    const startAutoScroll = () => {
      stopAutoScroll();
      autoScrollId = setInterval(() => {
        const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
        const nextLeft = galleryTrack.scrollLeft + galleryTrack.clientWidth * 0.6;
        galleryTrack.scrollTo({
          left: nextLeft >= maxScroll ? 0 : nextLeft,
          behavior: 'smooth'
        });
      }, 3500);
    };
    const stopAutoScroll = () => {
      if (autoScrollId) {
        clearInterval(autoScrollId);
        autoScrollId = null;
      }
    };

    startAutoScroll();
    galleryTrack.addEventListener('mouseenter', stopAutoScroll);
    galleryTrack.addEventListener('mouseleave', startAutoScroll);
    galleryTrack.addEventListener('touchstart', stopAutoScroll, { passive: true });
    galleryTrack.addEventListener('touchend', startAutoScroll);
  }
});
