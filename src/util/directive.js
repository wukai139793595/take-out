import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
export default {
  install(Vue) {
    BScroll.use(PullDown)
    BScroll.use(Pullup)
    Vue.prototype.$BScroll = BScroll;

    Vue.directive('mylazy', function (el, binding) {
      el.src = './static/images/loading.gif'
      let oImg = new Image();
      oImg.onload = function (e) {
        el.src = binding.value;
      }
      oImg.onerror = function (e) {
        el.src = './static/images/loading.gif'
      }
      oImg.src = binding.value;
    })
  }
}
