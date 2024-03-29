export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: true,
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Probeg',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '初学者にもわかりやすくをモットーにプログラミングの技術情報を発信しています。確実なスキルアップにつながるように丁寧に記事作成しています。' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Probeg' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://probeg-blog.com' },
      { hid: 'og:title', property: 'og:title', content: 'Probeg' },
      { hid: 'og:description', property: 'og:description', content: '初学者にもわかりやすくをモットーにプログラミングの技術情報を発信しています。確実なスキルアップにつながるように丁寧に記事作成しています。' },
      { hid: 'og:image', property: 'og:image', content: 'https://probeg-blog.com/img/Probeg.png' },
      { name: 'twitter:card', content: 'summary' }//　twitterの画像サイズ
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github-dark.min.css'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css' }
    ],
    script: [
      { type: 'module', src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' },
      { src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js' },
      { src: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js' },
      { src: 'https://unpkg.com/vue-slick-carousel' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/sass/style.scss"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/filter.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // `isDev` が true の場合、webpack を開発モードに設定します。
      if (isDev) {
        config.mode = 'development'
      }
    }
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY
  },

  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/errors/404.vue')
      })
    }
  },

  generate: {
    fallback: true,
  }
}
