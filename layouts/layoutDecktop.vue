<template>
  <div class="app">
    <header class="appHeader">
      <div class="appHeader__sticky">
        <keep-alive>
          <TheNav />
        </keep-alive>
        <TheAuth />
      </div>
    </header>

    <section class="appSection">
      <nuxt keep-alive :keep-alive-props="{ include: ['Index'] }" />
    </section>

    <notifications group="contact" position="top right" classes="notify" />
  </div>
</template>

<script>
import TheNav from '@/components/TheNav'
import TheAuth from '@/components/TheAuth'

export default {
  components: {
    TheNav,
    TheAuth
  }
}
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

.appHeader {
  position: relative;
  width: 60px;
  background-color: var(--color-base-6, #2e2e33);
  z-index: 10;
  flex-shrink: 0;
  transition: width 0.2s;
  will-change: width;
}

.appHeader__sticky {
  position: sticky;
  top: 0;
  width: 100%;
  height: calc(100vh - 20px);
}

.appSection {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--color-base-5, #323338);
  z-index: 5;
}

@media all and (-ms-high-contrast: none) {
  *::-ms-backdrop,
  .appSection {
    min-height: 100vh;
  }
}

@media screen and (min-width: 1660px) {
  .appHeader {
    width: 420px;
  }
}
</style>

<style lang="postcss">
.notify {
  padding: 12px;
  margin: 5px 5px 5px;
  border-left: 5px solid #187fe7;
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
</style>
