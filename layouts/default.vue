<template>
  <div class="app">
    <div class="appSection">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.app {
  position: relative;
  width: 100%;
  min-width: 1280px;
  min-height: 100%;
  display: flex;
  flex-wrap: nowrap;
}

.appSection {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--color-base-5, #323338);
  z-index: 5;
}
</style>
