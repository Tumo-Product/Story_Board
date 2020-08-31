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
      title: 'Index Page'
    },
    editor: {
      entry: 'src/editor/main.js',
      title: 'Editor Page',
    },
    viewer: {
      entry: 'src/viewer/main.js',
      title: 'Viewer Page',
    },
    examiner: {
      entry: 'src/examiner/main.js',
      title: 'Examiner Page',
    }
  }

}
