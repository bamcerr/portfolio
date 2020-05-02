<template lang="html">
  <div class="filter">
    <ul class="filter__list">
      <li
        v-for="tag in tags"
        ref="tabItems"
        :key="tag.key"
        class="filter__item"
      >
        <nuxt-link
          class="filter__link"
          :to="`/portfolio/${tag.key}`"
          replace
          @click.native="triggerWave"
        >
          {{ tag.name.replace(/^./, tag.name[0].toUpperCase()) + '.' }}
        </nuxt-link>
      </li>
      <li ref="tabIndicator" class="filter__indicator"></li>
    </ul>
  </div>
</template>

<script>
import { ResizeObserver } from '@juggle/resize-observer'
import { mapState } from 'vuex'
import clickWaveMotion from '@/mixins/clickWaveMotion'

export default {
  mixins: [clickWaveMotion],
  data() {
    return {
      observer: null,
      target: null
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.work.tags,
      activeTag: (state) => state.work.activeTagsAtKey[0]
    })
  },
  watch: {
    activeTag: {
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          const newIndex = this.tags.findIndex((item) => item.key === newVal)
          const oldIndex = this.tags.findIndex((item) => item.key === oldVal)

          if (newIndex === -1) return

          const newEl = this.$refs.tabItems[newIndex]
          const oldEl = this.$refs.tabItems[oldIndex]

          oldEl && this.$refs.tabIndicator.classList.add('_transition_do')

          oldEl && this.observer.unobserve(oldEl)
          newEl && this.observer.observe(newEl)

          this.target = newEl
        })
      },
      immediate: true
    }
  },

  mounted() {
    this.observer = new ResizeObserver((entries) => {
      this.$refs.tabIndicator.style.width = entries[0].contentRect.width + 'px'
      this.$refs.tabIndicator.style.left = entries[0].target.offsetLeft + 'px'
    })

    window.onresize = () => {
      this.$refs.tabIndicator.style.left = this.target.offsetLeft + 'px'
    }

    this.$refs.tabIndicator.addEventListener('transitionend', (e) => {
      e.target.classList.remove('_transition_do')
    })
  },
  beforeDestroy() {
    this.observer.disconnect()
    window.onresize = null
  }
}
</script>

<style lang="postcss" scoped>
.filter {
  text-align: center;
  border-bottom: 1px solid var(--color-base-7, #232427);
  max-width: 1200px;
  margin: auto;
  font-size: var(--font-size-base-7, 24px);
  color: var(--color-base-7, #232427);
}

.filter__list {
  position: relative;
  display: flex;
  justify-content: center;
  height: 40px;
}

.filter__item {
  margin: 0 13px 0 13px;
}

.filter__indicator {
  position: absolute;
  height: 2px;
  background-color: var(--color-base-8, #111111);
  bottom: 0;
  width: 0;
  left: 0;

  &._transition_do {
    transition: all 0.4s;
  }
}
</style>
