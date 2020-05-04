<template>
  <div class="deviceMode">
    <div v-if="true" class="deviceMode__inner">
      <nuxt-link class="deviceMode__link" to="/m/">
        <AppTextHoverUnderlineReplace underline-color="#ccc">
          모바일로 보기
        </AppTextHoverUnderlineReplace>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.deviceMode {
  width: 100%;
  height: 24px;
  position: absolute;
  bottom: 0px;
  z-index: 1000;
}

.deviceMode__inner {
  width: 80px;
  height: 24px;
  margin: auto;
  position: absolute;
  left: -38px;
  right: 0;
  bottom: 50px;
  color: var(--color-base-3, #71727a);
  transform: rotate(90deg);
  transform-origin: 50% 100%;
}

.deviceMode__link {
  padding: 0;
  margin: 0 6px;
  padding-bottom: 2px;
  font-weight: 300;
  font-size: var(--font-size-base-11, 12px);
  background-color: transparent;
}

@media screen and (min-width: 1660px) {
  .deviceMode__inner {
    right: 0;
    left: -46px;
    bottom: 0;
    transform: initial;
  }

  .deviceMode__link {
    margin: 0 8px;
  }
}
</style>
