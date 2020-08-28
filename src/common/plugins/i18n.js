import Vue from 'vue'
import VueI18n from 'vue-i18n'
import config from '@/common/config'

import en from '../i18n/en.json'
import hy from '../i18n/hy.json'
import fr from '../i18n/fr.json'
import ru from '../i18n/ru.json'

Vue.use(VueI18n);

const i18n = new VueI18n({
    // get default dashboard language from localStorage, otherwise set English by default
    locale: localStorage.getItem('localLanguage') || config.defaultLanguage,
    messages: {
        en, hy, fr, ru
    }
});

// Same i18n for all components
Vue.mixin({
    i18n: i18n
});

export default i18n

// import Vue from 'vue'
// import VueI18n from 'vue-i18n'

// Vue.use(VueI18n)

// function loadLocaleMessages () {
//   const locales = require.context('@/common/i18n', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }

// export default new VueI18n({
//   locale: process.env.VUE_APP_I18N_LOCALE || 'en',
//   fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
//   messages: loadLocaleMessages()
// })

