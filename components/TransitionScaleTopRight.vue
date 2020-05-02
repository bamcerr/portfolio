<template lang="html">
  <transition name="scaleTopRight" v-bind="$attrs" v-on="$listeners">
    <slot class="aa">fade text</slot>
  </transition>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<style lang="css" scoped>
.scaleTopRight-enter-active {
  will-change: opacity, transform;
  transform-origin: left bottom;
  transition: transform 1s 0.3s, opacity 0.1s;
}
.scaleTopRight-enter {
  opacity: 0;
  transform: scale(0.1);
}
.scaleTopRight-enter-to {
  opacity: 1;
  transform: scale(1);
}
.scaleTopRight-leave-active {
  will-change: opacity, transform;
  transform-origin: left bottom;
  transition: transform 0.3s linear, opacity 0.1s 0.4s;
}
.scaleTopRight-leave {
  opacity: 1;
  transform: scale(1);
}
.scaleTopRight-leave-to {
  opacity: 0;
  transform: scale(0.1);
}
</style>
