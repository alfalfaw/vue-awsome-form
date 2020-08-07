import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/main.scss'

// Axios
import '@/plugins/axios'
// avue
import '@/plugins/avue'

// element
import './plugins/element'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
