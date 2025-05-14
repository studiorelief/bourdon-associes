import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function headingSlide(): () => void {
  // Set up debounced resize handler to reposition triggers without restarting animations

  let resizeTimeout: number | undefined;
  let headingTriggers: ScrollTrigger[] = [];

  const debouncedResize = (): void => {
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout);
    }

    resizeTimeout = window.setTimeout(() => {
      // Kill existing ScrollTrigger instances
      headingTriggers.forEach((trigger) => trigger.kill());
      headingTriggers = [];

      // Recreate the triggers without playing animations
      const headingWrappers = document.querySelectorAll<HTMLElement>('.heading-wrapper');

      if (!headingWrappers.length) return;

      headingWrappers.forEach((wrapper) => {
        const headingTitle = wrapper.querySelector<HTMLElement>('.heading-title');

        if (!headingTitle) return;

        // Create animation but don't play it automatically
        const animation = gsap.fromTo(
          headingTitle,
          {
            x: '-100%',
            opacity: 0,
          },
          {
            x: '0%',
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            paused: true,
          }
        );

        // Determine if element is currently in view
        const rect = wrapper.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

        // Create the scroll trigger
        const trigger = ScrollTrigger.create({
          trigger: wrapper,
          start: '50% 95%',
          end: 'bottom 5%',
          onEnter: () => animation.play(),
          onEnterBack: () => animation.play(),
          onLeave: () => animation.reverse(),
          onLeaveBack: () => animation.reverse(),
          toggleActions: 'play none none reverse',
          markers: false,
        });

        // Only play animation if element was already in view
        if (isInView) {
          animation.progress(1);
        }

        headingTriggers.push(trigger);
      });
    }, 250);
  };

  // Set up resize observer
  const resizeObserver = new ResizeObserver(debouncedResize);

  // Start observing the document body
  resizeObserver.observe(document.body);

  // Return cleanup function
  return () => {
    // Clean up resize observer
    resizeObserver.disconnect();

    // Clear any pending timeout
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout);
    }

    // Destroy triggers
    headingTriggers.forEach((trigger) => trigger.kill());
  };
}
