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
  padding: 12px;
  margin: 5px 5px 5px;
  border-left: 0px solid #187fe7;
  color: #ffffff;
  background: #44a4fc;
  font-size: var(--font-size-base-10, 14px);

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: var(--color-status-error, #e54d42);
    border-left-color: #b82e24;
  }

  &.success {
    background: var(--color-status-success, #68cd86);
    border-left-color: #42a85f;
  }
}

.notify {
  border-left: 0;
}
</style>
