// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store/store";
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);

//让请求携带上浏览器的cookie
axios.defaults.withCredentials=true
axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    next();
  } else {
    next(false)
  }
})

export default router
