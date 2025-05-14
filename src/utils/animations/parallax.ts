import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Creates a parallax effect for the home description image
 * The image will move from y=4rem to y=-4rem as the user scrolls through the section
 */
export function parallaxHomeDescription(): void {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Select the target element
  const imageElement = document.querySelector('.home_description_image');

  // Only proceed if the element exists
  if (!imageElement) return;

  // Create the parallax animation
  gsap.fromTo(
    imageElement,
    { y: '4rem' },
    {
      y: '-4rem',
      ease: 'none',
      scrollTrigger: {
        trigger: '.section_home_description',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        markers: false,
      },
    }
  );
}

/**
 * Creates a parallax effect for the home hero asset
 * The image will move from y=4rem to y=-4rem as the user scrolls through the section
 */
export function parallaxHomeHero(): void {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Select the target element
  const heroAsset = document.querySelector('.home_hero_asset');

  // Only proceed if the element exists
  if (!heroAsset) return;

  // Create the parallax animation
  gsap.fromTo(
    heroAsset,
    { y: '-4rem' },
    {
      y: '4rem',
      ease: 'none',
      scrollTrigger: {
        trigger: '.section_home_hero',
        start: 'top 50%',
        end: 'bottom top',
        scrub: true,
        markers: false,
      },
    }
  );
}

/**
 * Creates a parallax effect for the expertise description image
 * The image will move horizontally as the user scrolls through the section
 */
export function parallaxExpertiseDescription(): void {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Select the target element
  const imageElement = document.querySelector('.expertises_description_image');

  // Only proceed if the element exists
  if (!imageElement) return;

  // Create the parallax animation
  gsap.fromTo(
    imageElement,
    { x: '4rem' },
    {
      x: '-4rem',
      ease: 'none',
      scrollTrigger: {
        trigger: '.section_expertises_honoraires',
        start: '-50% bottom',
        end: '50% top',
        scrub: true,
        markers: false,
      },
    }
  );
}
