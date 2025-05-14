import Swiper from 'swiper/bundle';

export function actualitesSwiper() {
  const swiperElement = document.querySelector('.swiper.is-actualites');

  if (!swiperElement) {
    return;
  }

  new Swiper('.swiper.is-actualites', {
    slidesPerView: 3,
    spaceBetween: 4 * 16,
    loop: false,
    mousewheel: {
      forceToAxis: true,
      sensitivity: 1,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}
