const textSegments = document.querySelectorAll('.text-segment');
const visuals = document.querySelectorAll('.column-visual');

// Clear active states
function clearActiveStates() {
  textSegments.forEach(seg => seg.classList.remove('active'));
  visuals.forEach(vis => vis.classList.remove('active'));
}

// IntersectionObserver callback
function handleIntersect(entries) {
  let visibleSegment = null;

  for (const entry of entries) {
    if (entry.isIntersecting) {
      visibleSegment = entry.target;
      break; // only activate the first visible one (top-down)
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

// Observer options: trigger when top of element hits 100px from viewport top
const observerOptions = {
  root: null,
  rootMargin: '-100px 0px -80% 0px',
  threshold: 0
};

const observer = new IntersectionObserver(handleIntersect, observerOptions);

// Observe each text segment
textSegments.forEach(segment => observer.observe(segment));