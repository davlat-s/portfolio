/* Toggle dropdown on click for the navigation bar's toggle element */
document.querySelector('.dropdown-toggle').addEventListener('click', function(e) {
  e.preventDefault();
  const navbar = this.closest('.navbar');
  navbar.classList.toggle('open');
});

/* Dismiss dropdown when a menu item is clicked */
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', function() {
    const navbar = this.closest('.navbar');
    if (navbar) {
      navbar.classList.remove('open');
    }
  });
});

/* Global click: Dismiss dropdown if clicking outside of the nav */
document.addEventListener('click', function(e) {
  if (!e.target.closest('.navbar')) {
    document.querySelectorAll('.navbar').forEach(navbar => {
      navbar.classList.remove('open');
    });
  }
});

/* Intersection Observer for text segments and visuals */
const textSegments = document.querySelectorAll('.text-segment');
const visuals = document.querySelectorAll('.column-visual');

function clearActiveStates() {
  textSegments.forEach(seg => seg.classList.remove('active'));
  visuals.forEach(vis => vis.classList.remove('active'));
}

function handleIntersect(entries) {
  let visibleSegment = null;
  for (const entry of entries) {
    if (entry.isIntersecting) {
      visibleSegment = entry.target;
      break;
    }
  }
  if (visibleSegment) {
    const activeId = visibleSegment.dataset.id;
    clearActiveStates();
    visibleSegment.classList.add('active');
    const matchingVisual = document.querySelector(`.column-visual[data-id="${activeId}"]`);
    if (matchingVisual) {
      matchingVisual.classList.add('active');
    }
  }
}

const observerOptions = {
  root: null,
  rootMargin: '-100px 0px -80% 0px',
  threshold: 0
};

const observer = new IntersectionObserver(handleIntersect, observerOptions);
textSegments.forEach(segment => observer.observe(segment));

/* Pause/Play Videos on Tap */
const videos = document.querySelectorAll('video');
videos.forEach(video => {
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
});

/* Back-to-Top Button Functionality */
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}