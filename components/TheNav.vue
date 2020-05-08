<template lang="html">
  <nav class="appNav">
    <ul class="appNav__list">
      <li v-for="route in routes" :key="route.url" class="appNav__item">
        <nuxt-link :to="route.url" class="appNav__link">
          <AppTextHoverUnderline
            :underline-position="$mq === '__mq_xxl' ? 'left' : 'bottom'"
            @click="runWaveMotion"
          >
            {{ capitalizeFirstLetter(route.name) }}
          </AppTextHoverUnderline>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import clickWaveMotion from '@/mixins/clickWaveMotion'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'

export default {
  mixins: [clickWaveMotion],

  data() {
    return {
      routes: [
        { url: '/', name: 'hello' },
        { url: '/portfolio', name: 'portfolio' },
        { url: '/contact', name: 'contact' }
      ]
    }
  },

  methods: {
    capitalizeFirstLetter
  }
}
</script>

<style lang="postcss" scoped>
.appNav {
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: normal;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  color: var(--color-base-3, #71727a);
  display: flex;
  justify-content: center;
  align-items: center;
}

.appNav__list {
  font-size: 26px;
  margin-left: -8px;
  margin-top: -60px;
  font-weight: 300;
}

.appNav__item {
  margin: 18px 0;
  max-height: 100px;
}

@media screen and (max-width: 1659.98px) {
  .appNav__list {
    width: 34px;
  }

  .appNav__item {
    writing-mode: vertical-rl;
  }
}

@media screen and (min-width: 1660px) {
  .appNav__list {
    margin-left: -33px;
    margin-top: -30px;
    font-size: var(--font-size-base-4, 55px);
  }

  .appNav__item {
    writing-mode: initial !important;
    writing-mode: unset;
  }
}
</style>
