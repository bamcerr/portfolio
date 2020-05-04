<script>
import { throttle } from 'throttle-debounce'
// prettier-ignore
// eslint-disable-next-line
import { ScrollScene } from 'scrollscene'
import { gsap } from 'gsap'
/* eslint-disable */
import WorkListItem from '@/components/WorkListItem'

export default {
  extends: WorkListItem,

  mounted() {
    window.addEventListener('resize', this.initScrollMotion)
  },

  methods: {
    initScrollMotion() {
      const item = this.$refs.item
      this.scene.Scene.removePin(true)
      this.scene.Scene.setPin(item)
      this.scene.Scene.offset(item.clientHeight / 2)
    },

    bindScrollMotion() {
      const item = this.$refs.item
      const img = this.$refs.img
      const name = Array.prototype.slice.call(this.$refs.desc.children, 0, 1)[0]
      const texts = Array.prototype.slice.call(this.$refs.desc.children, 1)
      const rectItem = item.getBoundingClientRect()
      const rectName = name.getBoundingClientRect()

      const timeline = gsap.timeline({ paused: true })

      // // prettier-ignore
      timeline.fromTo(
        name,
        1,
        { scale: 2.3, y: 50 },
        { scale: 1, y: 0, delay: 1 }
      )
      // // prettier-ignore
      timeline.fromTo(img, 1, { opacity: 0 }, { opacity: 1 })
      // // prettier-ignore
      timeline.to(img, 3, { opacity: 0.2, delay: 1 })
      // // prettier-ignores
      timeline.fromTo(
        texts,
        1,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 1 }
      )
      this.scene = new ScrollScene({
        triggerElement: item,
        offset: item.clientHeight / 2,
        triggerHook: 0.5,
        duration: { 0: 800, 470: 1200, 768: 1600, 1200: 2000 },
        scene: {},
        controller: {},
        gsap: { timeline }
      })

      this.scene.Scene.setPin(item, {
        pushFollowers: true,
        spacerClass: 'scrollmagic-pin-spacer'
      })
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.initScrollMotion)
  }
}
</script>
<style lang="postcss" scoped>
.work {
  position: relative;
  box-sizing: border-box;
  margin-bottom: 12.5rem;
  width: 24.17rem;
  height: 13.57rem;
  margin: 12.5rem auto;

  &._child_first {
    margin-top: 1.67rem;
  }
}

.work__imgs {
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.83rem;
  box-shadow: 0.17rem 0.42rem 1.25rem 0.83rem rgba(0, 0, 0, 0.2);
  opacity: 0.2;
}

.work__img {
  width: 100%;
  height: 100%;
}

@supports (object-fit: cover) {
  .work__img {
    object-fit: cover;
  }
}

.work__desc {
  width: 100%;
  position: absolute;
  top: 0.83rem;
  bottom: 0.83rem;
  left: 0;
  right: 0;
  margin: auto;
  color: var(--color-base-1, #bab8c2);
  font-size: var(--font-size-base-5, 1.58rem);
  text-align: center;
}

.work__text {
  margin-bottom: 1.5rem;
  text-shadow: 0rem 0rem 0.08rem rgba(0, 0, 0, 0.2),
    0rem 0rem 0.25rem rgba(0, 0, 0, 0.2);
  &._name {
    display: inline-block;
  }
}
</style>
