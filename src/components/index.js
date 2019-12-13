import Swiper from "./Swiper";
import SwiperSlide from "./SwiperSlide.vue";

export default {
  install(Vue) {
    Vue.component(Swiper);
    Vue.component(SwiperSlide);
  }
};

export { Swiper, SwiperSlide };
