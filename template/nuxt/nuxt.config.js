module.exports = {
  mode: '<%= mode %>',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | ' + process.env.npm_package_name || '',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
    '@nuxtjs/axios',<% } %><% if (pwa === 'yes') { %>
    '@nuxtjs/pwa',<% } %><% if (eslint === 'yes') { %>
    '@nuxtjs/eslint-module',<% } %>
  ],
  <% if (axios === 'yes') { %>
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // See https://axios.nuxtjs.org/options
  },<% } %>

  /*
  ** PurgeCSS
  ** https://github.com/Developmint/nuxt-purgecss
  */
  purgeCSS: {
    mode: 'postcss'
  },

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
        'postcss-url': {},
        tailwindcss: './tailwind.config.js',
        'cssnano': {
          preset: 'default',
          discardComments: { removeAll: true },
          zIndex: false
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
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  }
}
