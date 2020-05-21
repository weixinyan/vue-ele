import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './common/fonts/iconfont.css'

import './common/stylus/index.styl'

import router from './router.js'

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
