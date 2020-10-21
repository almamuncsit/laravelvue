import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Auth from '../packages/auth/Auth'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(axios, VueAxios)
Vue.use(Auth)

if (Vue.auth.isAutheticated()) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + Vue.auth.getToken();
}

Vue.prototype.$axios = axios;
Vue.prototype.$api =  function( endpoint ) {
  return 'http://127.0.0.1:8000/' + endpoint;
}


Vue.config.productionTip = false

// Check Authentication
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !Vue.auth.isAutheticated()) {
    return next('/login');
  }

  if (!authRequired && Vue.auth.isAutheticated()) {
    return next('/');
  }
  
  if (Vue.auth.isExpired()) {
    axios.post(Vue.prototype.$api("api/auth/refresh")).then((response) => {
      Vue.auth.setToken(response.data.access_token, Date.now() + response.data.expires_in)
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access_token;
    });
  }

  next();
})



// Create Vue Instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
