export default {
  data() {
    return {
      waveElement: null,
      waveStyle: null,
      waveRequestId: null,
      wavePoint: {
        x: 0,
        y: 0
      },
      NF: 24,
      f: 0
    }
  },

  mounted() {
    this.waveElement = document.createElement('div')
    this.waveStyle = this.waveElement.style
    this.waveStyle.setProperty('position', 'absolute')
    this.waveStyle.setProperty('z-index', 100)
  },

  methods: {
    progressWave($event) {
      document.body.appendChild(this.waveElement)

      const k = ++this.f / this.NF
      this.waveStyle.setProperty(
        'background-image',
        `radial-gradient(circle at
        ${this.wavePoint.x}px
        ${this.wavePoint.y}px,
        transparent 3%,
        rgba(255, 255, 255, 0.2) ${+(k * 100).toFixed(2)}%,
        transparent ${+(k * 120).toFixed(2)}%)`
      )

      if (!(this.f % this.NF)) {
        document.body.removeChild(this.waveElement)
        cancelAnimationFrame(this.waveRequestId)
        this.f = 0
        this.waveRequestId = null
        return
      }

      this.waveRequestId = requestAnimationFrame(this.progressWave)
    },

    triggerWave($event) {
      const el = $event.target
      const absoluteTop = window.pageYOffset + el.getBoundingClientRect().top
      const absoluteLeft = window.pageXOffset + el.getBoundingClientRect().left

      this.waveStyle.setProperty('width', `${el.offsetWidth}px`)
      this.waveStyle.setProperty('height', `${el.offsetHeight}px`)
      this.waveStyle.setProperty('left', `${absoluteLeft}px`)
      this.waveStyle.setProperty('top', `${absoluteTop}px`)

      this.wavePoint.x = $event.offsetX
      this.wavePoint.y = $event.offsetY

      if (!this.waveRequestId) this.progressWave()
    }
  }
}
