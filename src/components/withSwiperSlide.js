import Vue from 'vue';

const withSwiperSlide = (component) => {
  return Vue.component('withSwiperSlide', {
    render(h) {
      return h('li', { class: 'swiper-slide' }, component);
    }
  });
}

export default withSwiperSlide;
