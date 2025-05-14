/**
 * Handles navbar scroll behavior:
 * - When scrolling down, the navbar moves up (transform y -100%)
 * - When scrolling up, the navbar moves back into view (transform y 0%)
 * - Only applies after scrolling 50vh from the top
 */
export function navbarScroll() {
  const navbar = document.querySelector('.navbar_component') as HTMLElement;
  if (!navbar) return;

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const scrollThreshold = viewportHeight * 0.5; // 50vh

    // Only apply scroll behavior after 50vh scroll
    if (scrollTop > scrollThreshold) {
      // Determine scroll direction
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
      }
    } else {
      // Before threshold, keep navbar visible
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });
}
