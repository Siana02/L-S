// Popup notification close
document.getElementById('close-notification').onclick = function() {
  document.getElementById('sale-notification').style.display = 'none';
};

// ========== Expanding Search Bar ==========
// For desktop (search icon in nav)
const desktopSearchBtn = document.getElementById('desktop-search-btn');
const expandSearchBar = document.getElementById('expand-search-bar');
const closeExpandSearch = document.getElementById('close-expand-search');

// For mobile & tablet
const mobileSearchBtn = document.getElementById('mobile-search-btn');
function showExpandSearch() {
  expandSearchBar.style.display = 'flex';
  expandSearchBar.querySelector('input').focus();
}
function hideExpandSearch() {
  expandSearchBar.style.display = 'none';
}
if (desktopSearchBtn) desktopSearchBtn.onclick = showExpandSearch;
if (mobileSearchBtn) mobileSearchBtn.onclick = showExpandSearch;
if (closeExpandSearch) closeExpandSearch.onclick = hideExpandSearch;

// Clicking outside the expand search closes it
document.addEventListener('click', function(e) {
  if (
    expandSearchBar.style.display === 'flex' &&
    !expandSearchBar.contains(e.target) &&
    e.target !== desktopSearchBtn &&
    e.target !== mobileSearchBtn
  ) {
    hideExpandSearch();
  }
});

// ========== Mobile & Tablet Nav Drawer ==========
const mobileNav = document.getElementById('mobile-nav');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const closeMobileNavBtn = document.getElementById('close-mobile-nav');
const tabletHamburger = document.getElementById('tablet-hamburger');
const mobileHamburger = document.getElementById('mobile-hamburger');

function openMobileNav() {
  mobileNav.classList.add('open');
  mobileNavOverlay.style.display = 'block';
}
function closeMobileNav() {
  mobileNav.classList.remove('open');
  mobileNavOverlay.style.display = 'none';
}
if (tabletHamburger) tabletHamburger.onclick = openMobileNav;
if (mobileHamburger) mobileHamburger.onclick = openMobileNav;
if (closeMobileNavBtn) closeMobileNavBtn.onclick = closeMobileNav;
if (mobileNavOverlay) mobileNavOverlay.onclick = closeMobileNav;

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth'});
      closeMobileNav(); // also close nav on mobile/tablet after navigation
    }
  });
});
// Auto-rotating carousel for best sellers
(function() {
  const slides = document.querySelectorAll('.carousel-slide');
  let current = 0;
  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
  }
  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  showSlide(current);
  setInterval(nextSlide, 2000);
})();
// Interactive Size Bubbles
document.querySelectorAll('.collection-card').forEach(card => {
  const bubbles = card.querySelectorAll('.size-bubble');
  bubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
      bubbles.forEach(b => b.classList.remove('active'));
      bubble.classList.add('active');
    });
  });
});


(function () {
  const carousel = document.querySelector('.collections-carousel');
  if (!carousel) return;
  const cards = Array.from(carousel.children);
  let idx = 0;
  let cardsPerView = 2;
  let intervalId = null;

  function getCardWidthWithGap() {
    // Use getBoundingClientRect for accurate card width
    if (cards.length < 2) return cards[0].getBoundingClientRect().width;
    const cardWidth = cards[0].getBoundingClientRect().width;
    // Find gap (gap is set in px, fallback to 0)
    const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
    return cardWidth + gap;
  }

  function showSlide() {
    if (window.innerWidth > 768) {
      carousel.style.transform = 'translateX(0)';
      return;
    }
    cardsPerView = 2;
    let cardWidth = getCardWidthWithGap();
    if (idx > cards.length - cardsPerView) idx = 0;
    carousel.style.transform = `translateX(-${idx * cardWidth}px)`;
  }

  function nextSlide() {
    if (window.innerWidth > 768) return;
    idx += 2;
    if (idx > cards.length - cardsPerView) idx = 0;
    showSlide();
  }

  // Always reset interval on resize to avoid weird timing
  function setupInterval() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 3000);
  }

  window.addEventListener('resize', () => {
    showSlide();
    setupInterval();
  });

  showSlide();
  setupInterval();
})();
