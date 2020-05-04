<template lang="html">
  <button
    type="button"
    class="button button__point"
    v-bind="$attrs"
    v-on="$listeners"
    @click="runWaveMotionInner"
  >
    <slot></slot>
  </button>
</template>

<script>
import clickWaveMotion from '@/mixins/clickWaveMotion'

export default {
  mixins: [clickWaveMotion]
}
</script>

<style lang="postcss" scoped>
.button__point {
  position: relative;
  width: 210px;
  height: 50px;
  font-size: var(--font-size-base-9, 20px);
  background-color: var(--color-point-1, #4925ff);
  border: 1px solid var(--color-point-2, #4322e6);
  color: var(--color-point-3, #afb5ff);
  font-weight: 300;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 0 10px var(--color-point-2, #4322e6),
      0 0 20px var(--color-point-2, #4322e6),
      0 0 40px var(--color-point-3, #afb5ff);
  }
}
</style>
