import {
  reqShopInfo,
  reqShopGoods,
  reqShopRating
} from "@/api/index.js"

export default {
  namespaced: true,
  state: {
    shopInfo: {},
    shopGoods: [],
    shopRatings: [],
    selectList: []
  },
  getters: {
    totalCount(state) {
      let count = state.selectList.reduce((pre, item, index) => {
        return pre + item.count
      }, 0)
      count = (count || 0)

      return count
    },
    totalPrice(state) {
      let price = state.selectList.reduce((pre, item, index) => {
        return pre + item.price * item.count
      }, 0)
      price = (price || 0)
      console.log("price", price)
      return price
    },
    positiveSize(state) {
      return state.shopRatings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
    }
  },
  mutations: {
    changeShopInfo: (state, value) => {
      state.shopInfo = value
    },
    changeShopGoods: (state, value) => {
      state.shopGoods = value
    },
    changeShopRatings: (state, value) => {
      state.shopRatings = value
    },
    changeSelectList: (state, value) => {
      state.selectList = value
    }
  },
  actions: {
    async receiveShopInfo({
      commit
    }, {
      shopId,
      callback
    }) {
      let result = await reqShopInfo()
      commit('changeShopInfo', result);
      callback && callback();
    },
    async receiveShopGoods({
      commit
    }, {
      shopId,
      callback
    }) {
      let result = await reqShopGoods();
      commit('changeShopGoods', result);
      callback && callback();
    },
    async receiveShopRatings({
      commit
    }, callback) {
      let result = await reqShopRating();
      commit('changeShopRatings', result);
      callback();
    }
  }
}
