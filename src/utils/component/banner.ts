const MOBILE_QUERY = '(max-width: 767px)';
const LOOP_SPEED = 50; // px per second

/**
 * Handles the sticky banner (cc-- global | banner):
 * - Exposes its height as --banner-height so the sticky navbar sits right below it
 * - On mobile, duplicates the content so the text loops (animation in banner.css)
 */
export function banner() {
  const component = document.querySelector<HTMLElement>('[data-banner="component"]');
  if (!component) return;

  const track = component.querySelector<HTMLElement>('[data-banner="track"]');
  const content = component.querySelector<HTMLElement>('[data-banner="content"]');

  const update = () => {
    document.documentElement.style.setProperty('--banner-height', `${component.offsetHeight}px`);

    if (!track || !content || !window.matchMedia(MOBILE_QUERY).matches) return;

    const distance = content.offsetWidth;
    if (!distance) return;

    // Enough copies to always cover the banner while the track shifts by one content width
    const copiesNeeded = Math.ceil(component.offsetWidth / distance) + 1;
    while (track.children.length < copiesNeeded) {
      const clone = content.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      clone.inert = true;
      track.appendChild(clone);
    }

    track.style.setProperty('--banner-loop-distance', `${distance}px`);
    track.style.setProperty('--banner-loop-duration', `${distance / LOOP_SPEED}s`);
  };

  update();
  new ResizeObserver(update).observe(component);
}
