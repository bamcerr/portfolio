// import Vue from 'vue'
//
// import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
// import 'debug.addIndicators'
// import { gsap } from 'gsap'
// import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap'
// ScrollMagicPluginGsap(ScrollMagic, gsap, gsap.timeline)

// webpack config
// config.resolve.alias.TweenLite = path.resolve(
//   'node_modules',
//   'gsap/src/uncompressed/TweenLite.js'
// )
// config.resolve.alias.TweenMax = path.resolve(
//   'node_modules',
//   'gsap/src/uncompressed/TweenMax.js'
// )
// config.resolve.alias.TimelineLite = path.resolve(
//   'node_modules',
//   'gsap/src/uncompressed/TimelineLite.js'
// )
// config.resolve.alias.TimelineMax = path.resolve(
//   'node_modules',
//   'gsap/src/uncompressed/TimelineMax.js'
// )
// config.resolve.alias.ScrollMagic = path.resolve(
//   'node_modules',
//   'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
// )
// config.resolve.alias['animation.gsap'] = path.resolve(
//   'node_modules',
//   'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
// )
// config.resolve.alias['debug.addIndicators'] = path.resolve(
//   'node_modules',
//   'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
// )

// const VueScrollMagic = {
//   install(Vue, options = {}) {
//     Vue.prototype.$gsap = gsap
//
//     Vue.prototype.$scrollmagic = new Vue({
//       data() {
//         return {
//           controller: new ScrollMagic.Controller({ ...options })
//         }
//       },
//       methods: {
//         scene(options) {
//           return new ScrollMagic.Scene(options)
//         }
//       }
//     })
//   }
// }
//
// // export default VueScrollMagic
//
// Vue.use(VueScrollMagic)
