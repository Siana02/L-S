// Notification close
document.getElementById('close-notification').onclick = function() {
  document.getElementById('sale-notification').style.display = 'none';
};

// Mobile nav open/close
const mobileNav = document.getElementById('mobile-nav');
const overlay = document.getElementById('mobile-nav-overlay');
document.getElementById('open-mobile-nav').onclick = function() {
  mobileNav.classList.add('open');
  overlay.style.display = 'block';
};
document.getElementById('close-mobile-nav').onclick = closeMobileNav;
overlay.onclick = closeMobileNav;
function closeMobileNav() {
  mobileNav.classList.remove('open');
  overlay.style.display = 'none';
}

/* Scroll navigation (smooth scrolling) */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth'});
    }
  });
});
