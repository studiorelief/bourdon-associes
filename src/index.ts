import './index.css';

import { count } from '$utils/animations/count';
import {
  parallaxExpertiseDescription,
  parallaxHomeDescription,
  parallaxHomeHero,
} from '$utils/animations/parallax';
import { teamFilters } from '$utils/attributes/filters';
import { navbarScroll } from '$utils/component/navbar';
import { headingSlide } from '$utils/global/headingSlide';
import loadScript from '$utils/global/loadScript';
import { initMarker } from '$utils/global/marker';
import { textLoop } from '$utils/global/marquee';
import { actualitesSwiper } from '$utils/global/swiper';
import { filterScrollTop, frDate, hideEmpty, svgComponent } from '$utils/global/tricks';

window.Webflow ||= [];
window.Webflow.push(() => {
  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-selectcustom@1/selectcustom.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-inputactive@1/inputactive.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsstatic@1/cmsstatic.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsselect@1/cmsselect.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js'),
  ]);

  // recettage
  initMarker();

  // global & components
  navbarScroll();
  svgComponent();
  filterScrollTop();
  frDate();
  textLoop();
  hideEmpty();

  // swiper home

  // Check if we're on the home page (root path)
  if (window.location.pathname === '/') {
    actualitesSwiper();
  }

  // equipe filters
  teamFilters();

  // animations
  headingSlide();
  parallaxHomeDescription();
  parallaxHomeHero();
  parallaxExpertiseDescription();
  count();
});
