<template lang="html">
  <nav class="appNav">
    <ul class="appNav__list">
      <li class="appNav__item">
        <nuxt-link to="/" class="appNav__link">
          <AppTextHoverUnderline
            :underline-position="$mq === '_mq_xxl' ? 'left' : 'bottom'"
          >
            Hello
          </AppTextHoverUnderline>
        </nuxt-link>
      </li>
      <li class="appNav__item">
        <nuxt-link to="/portfolio" class="appNav__link">
          <AppTextHoverUnderline
            :underline-position="$mq === '_mq_xxl' ? 'left' : 'bottom'"
          >
            Portfolio
          </AppTextHoverUnderline>
        </nuxt-link>
      </li>
      <li class="appNav__item">
        <nuxt-link to="/contact" class="appNav__link">
          <AppTextHoverUnderline
            :underline-position="$mq === '_mq_xxl' ? 'left' : 'bottom'"
          >
            Contact
          </AppTextHoverUnderline>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
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
