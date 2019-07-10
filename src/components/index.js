import Swiper from "./Swiper";
import SwiperSlide from "./SwiperSlide";

export default {
	install(Vue) {
    Vue.component(Swiper);
    Vue.component(SwiperSlide);
  }
};

export { Swiper, SwiperSlide }
