<template>
  <div class="hello">
    <div
      ref="hello"
      class="hello__inner"
      :class="{ _status_done: motion && motion.status === 'done' }"
    ></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getMotion: 'typing-motion/getMotionByName'
    }),

    motion() {
      return this.getMotion('intro')
    }
  },

  watch: {
    'motion.shot': {
      handler(val) {
        this.$nextTick(() => {
          this.$refs.hello.innerHTML = `${val}<span class="hello__cursor">|</span>`
        })
      },
      immediate: true
    }
  },

  mounted() {
    if (this.motion.status === 'ready') {
      setTimeout(() => {
        this.runMotion('intro')
        this.deactivateMotion('intro')
      }, 1000)
    }
  },

  methods: {
    ...mapActions({
      addMotion: 'typing-motion/add',
      runMotion: 'typing-motion/run',
      deactivateMotion: 'typing-motion/deactivate'
    })
  }
}
</script>

<style lang="postcss" scoped>
.hello {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  height: calc(100vh - 20px);
}

.hello__inner {
  color: var(--color-base-3, #71727a);
  font-size: var(--font-size-base-1, 82px);

  &._status_done {
    transition: color 1s;
    color: var(--color-base-4, #38393d);
  }

  &._status_done >>> span {
    color: var(--color-base-1, #bab8c2);
  }
}

.hello__inner >>> .hello__cursor {
  animation: blink 0.5s infinite;
}

.hello__inner._status_done >>> .hello__cursor {
  animation: initial;
  opacity: 0;
}

@keyframes blink {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
