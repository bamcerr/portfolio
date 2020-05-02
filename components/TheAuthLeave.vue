<template lang="html">
  <div class="theAuthLeave" :class="$mq">
    <div class="theAuthLeave__inner">
      <AppTextHoverUnderlineReplace
        tag-name="button"
        underline-color="#ccc"
        class="theAuthLeave__btn"
        @click="signOut"
      >
        로그아웃
      </AppTextHoverUnderlineReplace>
      <AppTextHoverUnderlineReplace
        tag-name="button"
        underline-color="#ccc"
        class="theAuthLeave__btn"
        @click="deleteAccount"
      >
        계정삭제
      </AppTextHoverUnderlineReplace>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$store.dispatch('auth/signOut')
    },

    deleteAccount() {
      this.$store.dispatch('auth/delete')
    }
  }
}
</script>

<style lang="postcss" scoped>
.theAuthLeave {
  position: relative;
  height: 50px;
}

.theAuthLeave__inner {
  display: block;
  width: 126px;
  margin: auto;
  position: absolute;
  left: -50px;
  right: 0;
  bottom: 64px;
  color: var(--color-base-3, #71727a);
  transform: rotate(90deg);
  transform-origin: 50% 100%;
}

.theAuthLeave__btn {
  padding: 0;
  margin: 0 6px;
  padding-bottom: 2px;
  font-weight: 300;
  font-size: var(--font-size-auth-leave, 12px);
  background-color: transparent;
}

@media screen and (min-width: 1660px) {
  .theAuthLeave__inner {
    right: 0;
    left: -38px;
    bottom: 0;

    transform: initial;
  }

  .theAuthLeave__btn {
    margin: 0 8px;
  }
}

@media all and (-ms-high-contrast: none) and (min-width: 1660px) {
  *::-ms-backdrop,
  .theAuthLeave__inner {
    bottom: 10px;
  } /* IE11 */
}
</style>
