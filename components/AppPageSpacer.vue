<template lang="html">
  <div class="pageSpacer">
    <div class="pageSpacer__inner">
      {{ name }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['pageSpacerName']),
    name() {
      return this.pageSpacerName.replace(
        /^./,
        this.pageSpacerName[0].toUpperCase()
      )
    }
  }
}
</script>

<style lang="css">
.pageSpacer {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: var(--color-base-4, #38393d);
  font-size: var(--font-size-base-0, 167px);
  z-index: -1;
}

.pageSpacer__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  height: calc(100vh - 20px);
}

/*  */
.page-enter-active {
  transition: 0.4s;
}
.page-leave-active {
  transition: 0.4s;
}

/*  */
.page-enter-active > *:not(.pageSpacer) {
  transition: 0.2s;
}
.page-enter > *:not(.pageSpacer) {
  opacity: 0;
}
.page-enter-to > *:not(.pageSpacer) {
  opacity: 1;
}

/*  */
.page-leave-active > *:not(.pageSpacer) {
  transition: 0.2s !important;
}
.page-leave > *:not(.pageSpacer) {
  opacity: 0.2 !important;
}
.page-leave-to > *:not(.pageSpacer) {
  opacity: 0 !important;
}

/*  */
.page-enter-active > .pageSpacer {
  display: block;
}
.page-enter > .pageSpacer {
  /* display: flex; */
}
.page-enter-to > .pageSpacer {
  display: none;
}

/*  */
.page-leave-active > .pageSpacer {
  display: block;
}
.page-leave > .pageSpacer {
  /* display: none; */
}
.page-leave-to > .pageSpacer {
  /* display: flex; */
}
</style>
