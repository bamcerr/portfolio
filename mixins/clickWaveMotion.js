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
    progress({ parent }) {
      parent.appendChild(this.waveElement)
      if (!this.waveRequestId) {
        new Promise((resolve, reject) => {
          this.waveFrame(resolve)
        }).then(() => {
          parent.removeChild(this.waveElement)
        })
      }
    },

    waveFrame(done) {
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
        cancelAnimationFrame(this.waveRequestId)
        this.f = 0
        this.waveRequestId = null
        done()
        return
      }

      this.waveRequestId = requestAnimationFrame(() => {
        this.waveFrame(done)
      })
    },

    runWaveMotion($event) {
      const el = $event.target
      const rect = el.getBoundingClientRect()
      const absoluteTop = window.pageYOffset + rect.top
      const absoluteLeft = window.pageXOffset + rect.left
      const absoluteBottom =
        document.body.scrollHeight - (absoluteTop + el.offsetHeight)
      const absoluteRight =
        document.body.scrollWidth - (absoluteTop + el.offsetWidth)

      this.waveStyle.setProperty('width', `${el.offsetWidth}px`)
      this.waveStyle.setProperty('height', `${el.offsetHeight}px`)
      this.waveStyle.setProperty('left', `${absoluteLeft}px`)
      this.waveStyle.setProperty('top', `${absoluteTop}px`)
      this.waveStyle.setProperty('bottom', `${absoluteBottom}px`)
      this.waveStyle.setProperty('right', `${absoluteRight}px`)
      this.waveStyle.setProperty('margin', 'initial')

      this.wavePoint.x = $event.offsetX
      this.wavePoint.y = $event.offsetY

      this.progress({ parent: document.body })
    },

    runWaveMotionInner($event) {
      const el = $event.target
      this.waveStyle.setProperty('left', '0')
      this.waveStyle.setProperty('right', '0')
      this.waveStyle.setProperty('top', '0')
      this.waveStyle.setProperty('bottom', '0')
      this.waveStyle.setProperty('margin', 'auto')

      this.wavePoint.x = $event.offsetX
      this.wavePoint.y = $event.offsetY

      this.progress({ parent: el })
    }
  }
}
