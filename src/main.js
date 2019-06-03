// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index.js'
import mint from '@/mint/index.js'
import lazy from 'vue-lazyload'
import filter from '@/filters/index.js'
import directive from '@/util/directive'
import './mock/index.js'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(mint)
Vue.use(filter)
Vue.use(directive)
Vue.use(lazy, {
  preLoad: 1.3,
  error: './static/images/error.jpg',
  loading: './static/images/error.jpg',
  attempt: 1
})
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
