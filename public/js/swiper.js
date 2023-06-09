const swiper = new Swiper(".swiper", {
  lazy: true,
  slidesPerView: 5,
  spaceBetween: 10,
  slidesPerGroup: 2,
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    100: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
    1536: {
      slidesPerView: 8,
      spaceBetween: 10,
    },
  },
});
