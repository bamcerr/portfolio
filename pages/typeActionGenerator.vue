<template lang="html">
  <div class="" style="color:black">
    <textarea ref="textarea" v-model="type"></textarea>
    <button @click="record">record</button>
    <button @click="stop">stop</button>
    <button @click="simulate">simulate</button>
    <p ref="text">
      {{ text }}
    </p>
    <pre>
      {{ texts }}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      type: '',
      texts: [],
      recorder: null
    }
  },
  methods: {
    stop() {
      clearInterval(this.recorder)
      this.texts = this.texts.map((text) => {
        return text.replace(/\n/g, '<br />')
      })
    },
    record($event) {
      this.texts = []
      this.recorder = setInterval(() => {
        this.texts.push(this.$refs.textarea.value)
      }, 70)
    },
    simulate() {
      let count = 0
      const simulator = setInterval(() => {
        if (count === this.texts.length - 1) clearInterval(simulator)
        this.$refs.text.innerHTML = this.texts[count]
        count++
      }, 70)
    }
  }
}
</script>

<style lang="css" scoped></style>
