const pkg = require('./package')
const path = require('path')

module.exports = {
  mode: '<%= mode %>',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | ' + pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['@/assets/css/tailwind.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-purgecss',
    <% if (axios === 'yes') { %>
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    <% } %><% if (pwa === 'yes') { %>
    '@nuxtjs/pwa',<% } %>
  ],<% if (axios === 'yes') { %>

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://axios.nuxtjs.org/options
  },<% } %>

  /*
  ** PurgeCSS
  ** https://github.com/Developmint/nuxt-purgecss
  */
  purgeCSS: {},

  /*
  ** This option is given directly to the vue-router Router constructor
  */
  router: {
    base: '',
    linkActiveClass: 'is-active'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** PostCSS setup
    */
    postcss: {
      // Add plugin names as key and arguments as value
      // Disable a plugin by passing false as value
      plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'tailwindcss': path.resolve(__dirname, './tailwind.config.js'),
        'cssnano': {
          preset: 'default',
          discardComments: { removeAll: true },
          zindex: false
        }
      },
      // Change the postcss-preset-env settings
      preset: {
        stage: 0,
        autoprefixer: {
          cascade: false,
          grid: true
        }
      }
    },
    /*
    ** Extract CSS
    */
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {<% if (eslint === 'yes') { %>
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }<% } %>
    }
  }
}
