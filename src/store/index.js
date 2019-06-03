import Vuex from 'vuex'
import Vue from 'vue'
import position from './module/position/index.js'
import user from './module/user/index.js'
import shop from './module/shop/index.js'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    position: position,
    user: user,
    shop: shop
  }
})

export default store
