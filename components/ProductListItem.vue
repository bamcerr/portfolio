<template lang="html">
  <div ref="item" class="product" :class="[order % 2 ? '_even' : '_odd']">
    <div
      ref="img"
      class="product__imgs"
      :class="[order % 2 ? '_position_right' : ' _position_left']"
    >
      <img
        v-if="img"
        class="product__img"
        :src="require(`@/assets/images/${img}`)"
        rel="preload"
      />
    </div>
    <div
      ref="desc"
      class="product__desc"
      :class="[order % 2 ? '_position_left' : '_position_right']"
    >
      <p class="product__text _name">{{ name }}</p>
      <p v-if="roles" class="product__text">{{ roles.join(', ') }}</p>
      <p v-if="skills" class="product__text">{{ skills.join(', ') }}</p>
      <p v-if="description" class="product__text">{{ description }}</p>

      <div class="product__text">
        <AppTextHoverUnderlineReplace v-if="url" :href="url" target="_blank">
          보러가기
        </AppTextHoverUnderlineReplace>
      </div>

      <div class="product__text">
        <AppTextHoverUnderlineReplace
          v-if="sourceUrl"
          :href="sourceUrl"
          target="_blank"
        >
          소스 보러가기
        </AppTextHoverUnderlineReplace>
      </div>
    </div>
  </div>
</template>

<script>
// prettier-ignore
// eslint-disable-next-line
import { ScrollScene, ScrollObserver, ScrollMagic, addIndicators } from 'scrollscene'
import { gsap } from 'gsap'

export default {
  props: {
    order: {
      type: Number,
      required: true,
      default: -1
    },
    name: {
      type: [String, null],
      default: 'some title'
    },
    img: {
      type: [String, null],
      default: null
    },
    url: {
      type: [String, null],
      default: null
    },
    sourceUrl: {
      type: String,
      default: ''
    },
    tag: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      default: ''
    },
    roles: {
      type: Array,
      default: () => []
    },
    skills: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      timeline: null,
      scene: null
    }
  },
  mounted() {
    const item = this.$refs.item
    const img = this.$refs.img
    const name = Array.prototype.slice.call(this.$refs.desc.children, 0, 1)[0]
    const texts = Array.prototype.slice.call(this.$refs.desc.children, 1)
    const rectItem = item.getBoundingClientRect()
    const rectName = name.getBoundingClientRect()
    const x =
      (rectName.x || rectName.left) -
      (rectItem.x || rectItem.left) -
      rectItem.width / 2 +
      rectName.width / 2
    const timeline = gsap.timeline({ paused: true })
    // prettier-ignore
    if(this.order === 0){
      timeline.fromTo(name, 1, { scale: 2.3, x: -x, y: 100 }, { scale: 1, x: 0, y: 0, delay: 1 })
    }else{
      timeline.fromTo(name, 3, { opacity:0 }, { opacity:1 })
      timeline.fromTo(name, 1, { scale: 2.3, x: -x, y: 100 }, { scale: 1, x: 0, y: 0 })
    }
    // prettier-ignore
    timeline.fromTo(img, 1, { opacity: 0 }, { opacity: 1}, '-=0.5')
    // prettier-ignore
    timeline.fromTo(texts, 1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 1 })
    this.scene = new ScrollScene({
      triggerElement: item,
      offset: 100,
      triggerHook: 0.4,
      duration: 2600,
      scene: {
        // scene options
      },
      controller: {
        // addIndicators: true
        // controller options
      },
      gsap: {
        timeline
      }
    })
    this.scene.Scene.setPin(item, {
      pushFollowers: true,
      spacerClass: 'scrollmagic-pin-spacer'
    })

    // const scrollObserver = new ScrollObserver({
    //   triggerElement: item,
    //   // toggle: {
    //   //   element: desc,
    //   //   className: 'turn-blue'
    //   // },
    //   gsap: {
    //     timeline,
    //     yoyo: true,
    //     delay: 0
    //   },
    //   // useDuration: true,
    //   // whenVisible: '50%',
    //   // thresholds: 50,
    //   observer: {
    //     rootMargin: '0% 0% 0% 0%',
    //     threshold: 1
    //   }
    // })
  },
  beforeDestroy() {
    this.scene.destroy()
  }
}
</script>

<style lang="postcss" scoped>
.product {
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  margin: 50px 15px 0;

  &._odd {
    /* flex-flow: row-reverse; */
  }
  &._even {
    /* flex-flow: row; */
  }
}

.product__imgs {
  overflow: hidden;
  width: 710px;
  height: 395px;
  box-sizing: border-box;
  margin-bottom: 10px;
  box-shadow: 2px 5px 15px 10px rgba(0, 0, 0, 0.2);

  &._position_left {
    order: 1;
  }
  &._position_right {
    order: 2;
  }
}

.product__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .product__img {
    object-fit: none;
  }
}

.product__desc {
  padding: 0 25px 0;
  margin-top: -11px;
  color: var(--color-base-1, #bab8c2);
  font-size: var(--font-size-base-5, 38px);

  &._position_left {
    order: 1;
    text-align: right;
  }
  &._position_right {
    order: 2;
  }
}

.product__text {
  margin-bottom: 18px;

  &._name {
    display: inline-block;
    /* position: absolute; */

    /* left: 50%;
    transform: translateX(-50%); */
    /* position: absolute;
    top: 0; */

    /* right: 25px; */
    /* left: 0;
    right: 0;
    margin: auto; */
  }
}
</style>
