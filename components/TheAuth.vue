<template lang="html">
  <section class="theAuth">
    <h2 class="theAuth__title">Sign</h2>

    <TransitionFade>
      <div v-if="!authUser" class="theAuth__dimm"></div>
    </TransitionFade>

    <TransitionScaleTopRight mode="out-in" @leave="clearAuthentication">
      <TheAuthJoin v-if="!authUser" key="join" ref="theAuthJoin" />
    </TransitionScaleTopRight>

    <TransitionFade>
      <TheAuthLeave v-if="!!authUser" key="leave" />
    </TransitionFade>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import TransitionFade from '@/components/TransitionFade'
import TransitionScaleTopRight from '@/components/TransitionScaleTopRight'
import TheAuthJoin from '@/components/TheAuthJoin'
import TheAuthLeave from '@/components/TheAuthLeave'

export default {
  components: {
    TransitionFade,
    TransitionScaleTopRight,
    TheAuthJoin,
    TheAuthLeave
  },
  computed: {
    ...mapState('auth', {
      authUser: (state) => state.authUser
    })
  },
  methods: {
    clearAuthentication() {
      this.$refs.theAuthJoin.clearAuthentication()
    }
  }
}
</script>

<style lang="postcss" scoped>
.theAuth {
  position: absolute;
  width: 100%;
  bottom: 0px;
  z-index: 1000;
}

.theAuth__title {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  font-size: 0;
  line-height: 0;
}
.theAuth__dimm {
  display: block;
  content: '';
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-base-5, #323338);
  z-index: 999;
}

@supports (
  (-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))
) {
  .theAuth__dimm {
    backdrop-filter: blur(18px);
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.theAuth >>> .theAuthJoin {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  overscroll-behavior: none;
  z-index: 1000;
}
</style>
