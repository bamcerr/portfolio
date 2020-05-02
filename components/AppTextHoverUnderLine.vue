<template lang="html">
  <span :style="cssProps" class="underline" :class="$mq" @click="triggerWave">
    <slot>linked text</slot>
  </span>
</template>

<script>
import clickWaveMotion from '@/mixins/clickWaveMotion'

export default {
  mixins: [clickWaveMotion],
  props: {
    underlineColor: {
      required: false,
      type: String,
      default: null
    }
  },
  computed: {
    cssProps() {
      return {
        '--color': this.underlineColor
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.underline {
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: inherit;
  vertical-align: top;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 1px;

    position: absolute;
    left: -100%;
    right: -100%;
    bottom: 0;

    margin: auto;
    background-image: linear-gradient(
      90deg,
      transparent,
      var(--color, currentColor),
      transparent
    );
    transition: 0.3s;
  }

  &:hover::after {
    width: 200%;
    transition: 1s;
  }

  &._mq_xxl::after {
    width: 1px;
    height: 0;

    top: -100%;
    bottom: -100%;
    left: 0;
    right: initial;

    background: linear-gradient(
      180deg,
      transparent,
      var(--color, currentColor),
      transparent
    );
  }

  &._mq_xxl:hover::after {
    height: 200%;
  }
}
</style>
