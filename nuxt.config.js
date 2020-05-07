require('dotenv').config()

export default {
  mode: 'spa',

  // Headers of the page
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, viewport-fit=cover, minimal-ui, maximum-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Customize the progress-bar color
  loading: false,

  css: [
    '@/assets/style/font.css',
    '@/assets/style/reset.css',
    '@/assets/style/base.css'
  ],

  plugins: [
    { src: '~plugins/appComponents' },
    { src: '~plugins/vuelidate' },
    { src: '~plugins/vue-notification', mode: 'client' }
  ],

  // Nuxt.js dev-modules
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment'
  ],

  moment: {
    localse: ['ko']
  },

  // Nuxt.js modules
  modules: [
    // Doc: https://github.com/potato4d/nuxt-client-init-module
    'nuxt-client-init-module',
    // Doc: https://www.npmjs.com/package/nuxt-mq
    'nuxt-mq',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],

  // mq module configuration
  mq: {
    defaultBreakPoint: 'default',
    breakpoints: {
      __mq_xxl: 1660,
      __mq_xxxl: Infinity
    }
  },

  // Build configuration
  build: {
    babel: {
      presets: [
        [
          '@nuxt/babel-preset-app',
          {
            useBuiltIns: 'usage', // 'usage' || 'entry' || false
            corejs: { version: 3, proposals: true }
          }
        ]
      ]
    },
    postcss: {
      plugins: {
        'postcss-preset-env': {
          stage: 0
        }
      }
    },

    // You can extend webpack config here
    extend(config, ctx) {}
  },

  router: {
    middleware: ['pageSpacer']
  },

  generate: {
    routes: [
      '/portfolio/',
      '/portfolio/7rXpImBb07M0eWpU6bPl',
      '/portfolio/LEKgDceKjkVynh5HleYr'
    ]
  }
}
