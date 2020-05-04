require('dotenv').config()

export default {
  server: {
    port: 3000,
    host: 'localhost'
  },
  analyze: false,
  mode: 'spa', // universal || spa
  buildDir: '.nuxt',

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js'
      }
    ]
  },

  // Customize the progress-bar color
  loading: false,

  pageTransition: {},

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
    // '@nuxtjs/pwa',
    // Doc : https://firebase.nuxtjs.org/
    '@nuxtjs/firebase',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
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

  // firebase module configuration
  firebase: {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    },
    onFirebaseHosting: true,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChanged'
        }
      },
      firestore: true
    }
  },

  // Axios module configuration
  // See https://axios.nuxtjs.org/options
  axios: {},

  // Build configuration
  build: {
    splitChunks: {
      layouts: true
    },
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
