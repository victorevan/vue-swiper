import Vue from "vue";

const withSwiperSlide = component => {
  return Vue.extend("withSwiperSlide", {
    render(h) {
      return h("li", { class: "swiper-slide" }, component);
    }
  });
};

export default withSwiperSlide;
