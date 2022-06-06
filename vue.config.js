const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


   
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Index Page',
    },
    viewer: {
      entry: 'src/viewer/main.js',
      title: 'Viewer Page',
    }
  },
  publicPath: './'

}