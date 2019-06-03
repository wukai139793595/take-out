import moment from 'moment'
import format from 'date-fns/format'
import imgLazy from '@/components/imgLazy/imgLazy.vue'
export default {
  install(Vue) {
    Vue.component(imgLazy.name, imgLazy);
    Vue.filter('dateFormat', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
      // return moment(value).format(formatStr);
      return format(value, formatStr)
    })
  }
}
