<template>
  <div class="app">
    <div class="appSection">
      <nuxt />
    </div>
    <notifications group="contact" position="top center" classes="notify" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.appSection {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--color-base-5, #323338);
  z-index: 5;
}
</style>
<style lang="postcss">
.notify {
  border-left: 0;
}
</style>
