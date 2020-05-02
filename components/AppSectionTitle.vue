<template lang="html" functional>
  <h1 class="appSubTitle">
    <slot></slot>
  </h1>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.appSubTitle {
  max-width: 1200px;
  margin: auto;
  padding: 88px 0 48px 0;
  border-bottom: 1px solid var(--color-base-7, #232427);
  color: var(--color-base-7, #232427);
  font-size: var(--font-size-base-3, 58px);
  font-weight: 300;
  text-align: center;
}
</style>
