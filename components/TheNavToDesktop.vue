<template>
  <div class="deviceMode">
    <div v-if="$route.fullPath === '/m/'" class="deviceMode__inner">
      <nuxt-link class="deviceMode__link" to="/">
        <AppTextHoverUnderlineReplace underline-color="#ccc">
          데스크탑 보기
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
  position: fixed;
  position: sticky;
  width: 100%;
  height: 24px;
  top: 30px;
  z-index: 1000;
}

.deviceMode__inner {
  width: 100%;
  height: 24px;
  margin: auto;
  color: var(--color-base-3, #71727a);
  text-align: center;
  font-size: var(--font-size-base-11, 12px);
}
</style>
