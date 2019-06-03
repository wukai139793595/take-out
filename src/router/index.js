import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home.vue'
import store from '@/store/index.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Home,
    meta: {
      showBar: true
    }
  }, {
    path: '/search',
    component: () => import('@/pages/search/search.vue'),
    meta: {
      showBar: true
    }
  }, {
    path: '/order',
    component: () => import('@/pages/order/order.vue'),
    meta: {
      showBar: true
    }
  }, {
    path: '/profile',
    component: () => import('@/pages/profile/profile.vue'),
    meta: {
      showBar: true,
      needLogin: true
    }
  }, {
    path: '/login',
    component: () => import('@/pages/login/login.vue')
  }, {
    path: '/shop',
    redirect: () => {
      return '/shop/goods'
    },
    component: () => import('@/pages/shop/shop.vue'),
    children: [{
        path: '/shop/goods',
        component: () => import('@/pages/shop/goods/goods.vue')
      }, {
        path: '/shop/ratings',
        component: () => import('@/pages/shop/ratings/ratings.vue')
      },
      {
        path: '/shop/info',
        component: () => import('@/pages/shop/info/info.vue')
      }
    ]
  }]
})

router.beforeEach((to, from, next) => {
  function callback(flag) {
    if (!flag && to.meta.needLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
  if (store.state.user.userInfo._id) {
    next();
  } else {
    store.dispatch("user/receiveUserInfo", callback)
  }
})


export default router
