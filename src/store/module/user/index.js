import {
  reqLoginpwd,
  reqLoginsms,
  reqUserinfo,
  reqLogout
} from '@/api/index.js'

const user = {
  namespaced: true,
  state: {
    userInfo: {
      _id: ''
    }
  },
  mutations: {
    changeUserInfo(state, value) {
      state.userInfo = value
    }
  },
  actions: {
    // 用户名密码登陆
    receiveLoginpwd({
      commit
    }, {
      name,
      pwd,
      captcha,
      callback
    }) {
      reqLoginpwd({
        name,
        pwd,
        captcha
      }).then(res => {
        commit('changeUserInfo', res)
        callback && callback('/profile')
      })
    },
    // 手机号验证码登陆
    receiveLoginsms({
      commit
    }, {
      phone,
      code,
      callback
    }) {
      reqLoginsms({
          phone,
          code
        })
        .then(res => {

          commit('changeUserInfo', res)
          callback && callback('/profile')
        })
    },
    // 根据会话获取用户信息
    receiveUserInfo({
        commit
      },
      callback
    ) {
      reqUserinfo().then(res => {
        if (res._id) {
          commit("changeUserInfo", res)
          callback && callback(true)

        } else {
          callback && callback(false)
        }
      }).catch(err => {
        console.log('error')
      })
    },
    // 用户登出
    receiveLogout({
      commit
    }, callback) {
      reqLogout().then(res => {
        if (res.code === 0) {
          commit('changeUserInfo', {})
          callback && callback()
        }
      })
    }
  }
}

export default user
