import Vue from 'vue'
import App from './examiner.vue'
import vuetify from '../common/plugins/vuetify';
import i18n from '../common/plugins/i18n'

Vue.config.productionTip = false

new Vue({
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
