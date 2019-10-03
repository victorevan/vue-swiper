<template>
  <li
    class="swiper-slide"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </li>
</template>

<script>
export default {
  name: 'VueSwiperSlide',
};
</script>
