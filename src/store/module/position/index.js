import {
  getPosition
} from '@/util/position.js'

const position = {
  namespaced: true,
  state: {
    pos: {
      latitude: 40.10038,
      longtitude: 116.36867
    },
    local: {
      "address": "北京市昌平区337省道",
      "city": "北京市",
      "geohash": "40.10038,116.36867",
      "latitude": "40.10038",
      "longitude": "116.36867",
      "name": "昌平区北七家宏福科技园(337省道北)"
    }
  },
  mutations: {
    posChange(state, val) {
      state.pos = val;
    },
    localChange(state, val) {
      state.local = val
    }
  },
  actions: {
    posChange({
      commit
    }, val) {
      getPosition().then(res => {
        commit('posChange', val)
      })
    },
    localChange({
      commit
    }, val) {
      commit('localChange', val)
    }
  }
}

export default position
