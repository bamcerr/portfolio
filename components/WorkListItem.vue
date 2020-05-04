<template lang="html">
  <li>
    <div
      ref="item"
      class="work"
      :class="[order % 2 ? '_even' : '_odd', { _child_first: order === 0 }]"
    >
      <div
        ref="img"
        class="work__imgs"
        :class="[order % 2 ? '_position_right' : ' _position_left']"
      >
        <img
          v-if="img"
          class="work__img"
          :src="require(`@/assets/images/${img}`)"
          rel="preload"
        />
      </div>
      <div
        ref="desc"
        class="work__desc"
        :class="[order % 2 ? '_position_left' : '_position_right']"
      >
        <p class="work__text _name">{{ name }}</p>
        <p v-if="roles" class="work__text">{{ roles.join(', ') }}</p>
        <p v-if="skills" class="work__text">{{ skills.join(', ') }}</p>
        <p v-if="description" class="work__text">{{ description }}</p>

        <div class="work__text">
          <AppTextHoverUnderlineReplace v-if="url" :href="url" target="_blank">
            보러가기
          </AppTextHoverUnderlineReplace>
        </div>

        <div class="work__text">
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
  </li>
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
    keysOfTags: {
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
    this.bindScrollMotion()
  },

  methods: {
    bindScrollMotion() {
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
      this.timeline = gsap.timeline({ paused: true })
      // prettier-ignore
      if(this.order === 0){
      this.timeline.fromTo(name, 1, { scale: 2.3, x: -x, y: 100 }, { scale: 1, x: 0, y: 0, delay: 1 })
    }else{
      this.timeline.fromTo(name, 3, { opacity:0.2 }, { opacity:1 })
      this.timeline.fromTo(name, 1, { scale: 2.3, x: -x, y: 100 }, { scale: 1, x: 0, y: 0 })
    }
      // prettier-ignore
      this.timeline.fromTo(img, 1, { opacity: 0 }, { opacity: 1}, '-=0.5')
      // prettier-ignore
      this.timeline.fromTo(texts, 1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 1 })
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
          timeline: this.timeline
        }
      })
      this.scene.Scene.setPin(item, {
        pushFollowers: true,
        spacerClass: 'scrollmagic-pin-spacer'
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.work {
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  margin: 450px auto;
  overflow: hidden;

  &._child_first {
    margin-top: 150px;
  }
}

.work__imgs {
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

.work__text {
  margin-bottom: 18px;

  &._name {
    display: inline-block;
  }
}
</style>
