// ====== DEPLOYMENT DEBUGGING ======
console.log('🚀 [DEBUG] main.js loaded at:', new Date().toISOString());
console.log('🚀 [DEBUG] Document readyState:', document.readyState);
console.log('🚀 [DEBUG] Location:', window.location.href);
console.log('🚀 [DEBUG] User Agent:', navigator.userAgent);

// Check if styles loaded
const styles = document.querySelectorAll('link[rel="stylesheet"]');
console.log('🚀 [DEBUG] Stylesheets found:', styles.length);
styles.forEach((s, i) => console.log(`   - Style ${i}:`, s.href));

// Check if key elements exist
const checkElements = ['header', 'main', '.hero', '.hero-image'];
checkElements.forEach(sel => {
  const el = document.querySelector(sel);
  console.log(`🚀 [DEBUG] Element "${sel}":`, el ? '✅ Found' : '❌ Not found');
});

console.log('============================');

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Intersection Observer for Scroll Reveals
const observerOptions = {
  threshold: 0.15, // Increased slightly for better trigger point
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add a slight delay based on index if multiple items appear at once?
      // For now, simple reveal
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, entry.target.dataset.delay || 0);

      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Select elements to reveal
document.querySelectorAll('.cred-item, .reveal-text, .reveal-image, .testimonial-card, .footer-grid > div').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)'; // Increased distance for more drama
  el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'; // More luxurious ease

  // Stagger siblings in grid
  if (el.classList.contains('cred-item')) {
    el.style.transitionDelay = `${index * 100}ms`;
  }

  revealObserver.observe(el);
});

// Custom class for revealed state
const style = document.createElement('style');
style.textContent = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Smooth Parallax & Magnetic Effect
const heroImage = document.querySelector('.hero-image');
const cursor = { x: 0, y: 0 };
const target = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
  // Normalize mouse position -0.5 to 0.5
  target.x = (e.clientX / window.innerWidth - 0.5);
  target.y = (e.clientY / window.innerHeight - 0.5);
});

// Linear Interpolation
const lerp = (start, end, factor) => start + (end - start) * factor;

function animate() {
  // Smoothly interpolate current interaction values towards target
  cursor.x = lerp(cursor.x, target.x, 0.05); // 0.05 = very slow smooth ease
  cursor.y = lerp(cursor.y, target.y, 0.05);

  if (heroImage) {
    // Parallax movement
    const moveX = cursor.x * 30; // 30px max movement
    const moveY = cursor.y * 30;

    // Apply transform combined with the scale we defined in CSS
    heroImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
  }

  requestAnimationFrame(animate);
}

// Start animation loop
animate();

console.log('Arbor & Anchor: Human-First Real Estate Site Initialized (Premium Mode)');
