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
  padding: 1rem;
  margin: 0.42rem 0.42rem 0.42rem;
  color: #ffffff;
  background: #44a4fc;
  font-size: var(--font-size-base-10, 1.17rem);

  &.warn {
    background: #ffb648;
  }

  &.error {
    background: var(--color-status-error, #e54d42);
  }

  &.success {
    background: var(--color-status-success, #68cd86);
  }
}
</style>
