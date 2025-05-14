import gsap from 'gsap';

export function textLoop() {
  const marquee = document.querySelector('[wb-data="marquee"]');
  if (!marquee) {
    return;
  }
  const duration = parseInt(marquee.getAttribute('duration') || '30', 10);

  // Create a wrapper for all elements
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'hysol_footer_loop-wrapper';
  wrapperDiv.style.display = 'flex';
  wrapperDiv.style.gap = '4rem';
  wrapperDiv.style.alignItems = 'center';
  wrapperDiv.style.whiteSpace = 'nowrap';

  // Move all children into the wrapper
  while (marquee.firstChild) {
    wrapperDiv.appendChild(marquee.firstChild);
  }

  // Add the wrapper to the marquee
  marquee.appendChild(wrapperDiv);

  // Ensure the marquee container has proper styles
  (marquee as HTMLElement).style.overflow = 'visible';
  (marquee as HTMLElement).style.width = '100%';

  // Use this wrapper as marqueeContent
  const marqueeContent = wrapperDiv;

  const marqueeContentClone = marqueeContent.cloneNode(true);
  marquee.appendChild(marqueeContentClone);

  let tween: gsap.core.Tween;

  const playMarquee = () => {
    const progress = tween ? tween.progress() : 0;
    if (tween) {
      tween.progress(0).kill();
    }

    const width = marqueeContent.offsetWidth;
    const gap = 4 * 16; // Gap between repeated elements
    const distanceToTranslate = -1 * (width + gap);

    // Apply gap between elements
    (marqueeContentClone as HTMLElement).style.marginLeft = `${gap}px`;

    tween = gsap.fromTo(
      marquee.children,
      { x: 0 },
      { x: distanceToTranslate, duration, ease: 'none', repeat: -1 }
    );
    tween.progress(progress);
  };
  playMarquee();

  function debounce(func: () => void) {
    let timer: number;
    return function (event: Event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(
        () => {
          func();
        },
        500,
        event
      ) as unknown as number;
    };
  }

  window.addEventListener('resize', debounce(playMarquee));
}
