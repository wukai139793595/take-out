import server from '@/util/request.js'

// function get(url, params) {
//   return new Promise((resolve, reject) => {
//     server({
//       method: 'GET',
//       params,
//       url: '/api' + url
//     }).then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

function ajax(url, data = {}, type = "GET") {
  let promise;
  type = type.toUpperCase();
  return new Promise((resolve, reject) => {
    if (type === "GET") {
      promise = server({
        url: url,
        method: "GET",
        params: data
      })
    } else if (type === "POST") {
      promise = server({
        url: url,
        method: "POST",
        data: data
      })
    }
    promise.then(res => {
      if (res.data) {
        resolve(res.data)
      } else {
        resolve(res)
      }

    }, err => {
      reject(err)
    })
  })
}
// 根据经纬度获取位置详情
export function reqPosition(params) {
  return ajax('/api' + `/position/${params.latitude},${params.longtitude}`, {})
}
// 获取食品分类列表
export function getCategory(params) {
  return ajax('/api' + '/index_category', params)
}
// 根据经纬度获取商铺列表
export function getShops(params) {
  return ajax('/api' + '/shops', params)
}
// 根据经纬度和关键字搜索商铺列表
export function reqSearchShop(params) {
  return ajax('/api' + '/search_shops', params)
}
// 获取一次性验证码

// 用户名密码登陆
export function reqLoginpwd(params) {
  return ajax('/api' + '/login_pwd', params, 'POST')
}
// 发送短信验证码
export function reqSendCode(params) {
  return ajax('/api' + '/sendcode', params)
}
// 手机号验证码登陆
export function reqLoginsms(params) {
  return ajax('/api' + '/login_sms', params, "POST")
}
// 根据会话获取用户信息
export function reqUserinfo(params) {
  return ajax('/api' + '/userinfo', params)
}
// 用户登出
export function reqLogout(params) {
  return ajax('/api' + '/logout', params)
}


// 获取商家信息
export function reqShopInfo() {
  return ajax('/info')
}
// 获取商家评价数组
export function reqShopRating() {
  return ajax('/ratings')
}
// 获取商家商品数组
export function reqShopGoods() {
  return ajax('/goods')
}
