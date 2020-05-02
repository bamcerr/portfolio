<script>
import clickWaveMotion from '@/mixins/clickWaveMotion'

export default {
  name: 'AppTextHoverUnderLine2',
  mixins: [clickWaveMotion],
  props: {
    tagName: {
      type: String,
      required: false,
      default: 'a'
    },
    underlineColor: {
      type: String,
      required: false,
      default: null
    }
  },
  render(h) {
    const self = this
    return h(
      this.tagName,
      {
        class: { underline: true },
        style: { '--underline-color': this.underlineColor },
        on: {
          click(event) {
            if (self.tagName !== 'a') event.preventDefault()
            self.$emit('click')
          }
        }
      },
      this.$slots.default
    )
  }
}
</script>

<style lang="postcss" scoped>
.underline {
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: inherit;
  vertical-align: top;

  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 1px;
    left: -100%;
    right: -100%;
    bottom: 0;
    margin: auto;
    width: 0;
    background-image: linear-gradient(
      90deg,
      transparent,
      var(--underline-color, currentColor),
      transparent
    );
    transition: 0.3s;
  }

  &:hover::after {
    width: 200%;
    transition: 1s;
  }
}
</style>
