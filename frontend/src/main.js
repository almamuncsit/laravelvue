import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(axios, VueAxios)
axios.defaults.headers.common["Authorization"] = "Bearer " + "lasjdf452345345";
Vue.prototype.$axios = axios;
Vue.prototype.$api =  function( endpoint ) {
  return 'http://127.0.0.1:8000/' + endpoint;
}


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
