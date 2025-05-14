import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Creates a counting animation for the home presentation card heading text
 * The animation is triggered when the user scrolls to the home presentation grid wrapper
 */
export function count(): void {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Select all target elements
  const countElements = document.querySelectorAll('.home_presentation_card-heading-text');

  // Only proceed if elements exist
  if (!countElements.length) return;

  // For each count element
  countElements.forEach((element) => {
    // Get the target number from the element's text content
    const targetNumber = parseInt(element.textContent?.replace(/\D/g, '') || '0', 10);

    // Skip if not a valid number
    if (isNaN(targetNumber) || targetNumber <= 0) return;

    // Store the original text format to preserve any prefix/suffix
    const originalText = element.textContent || '';
    const prefix = originalText.split(targetNumber.toString())[0] || '';
    const suffix = originalText.split(targetNumber.toString())[1] || '';

    // Set initial value to 0
    element.textContent = `${prefix}0${suffix}`;

    // Create the counting animation
    gsap.to(element, {
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.home_presentation_grid-wrapper',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        markers: false,
      },
      onUpdate: function () {
        const progress = this.progress();
        const currentValue = Math.round(progress * targetNumber);
        element.textContent = `${prefix}${currentValue}${suffix}`;
      },
      onComplete: function () {
        element.textContent = originalText;
      },
    });
  });
}
