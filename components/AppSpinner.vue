<template lang="html">
  <div class="spinner" :class="[state]">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      required: false,
      type: String,
      default: 'progress'
    }
  },
  computed: {
    state() {
      return this.loading
    }
  }
}
</script>

<style lang="css" scoped>
.spinner {
  margin: 0 auto;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 9px;
  height: 9px;
  background-color: var(--color-status-normal, #c0c2c9);

  border-radius: 100%;
  display: inline-block;
  transform: scale(0.5);
}

.spinner.success > div {
  transform: scale(0.8);
  background-color: var(--color-status-success, #3cb371);
  transition: 0.4s;
}
.spinner.error > div {
  transform: scale(0.8);
  background-color: var(--color-status-error, #ff6347);
  transition: 0.4s;
}

.spinner.progress > div {
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner.progress .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner.progress .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
