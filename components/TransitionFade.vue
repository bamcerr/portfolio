<template lang="html">
  <transition name="fade" v-bind="$attrs" v-on="$listeners">
    <slot>fade text</slot>
  </transition>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<style lang="css" scoped>
.fade-enter-active {
  transition: 0.3s;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-leave-active {
  transition: 0.3s;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>
