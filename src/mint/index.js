import {
  MessageBox,
  Switch
} from 'mint-ui'
export default {
  install(Vue) {
    Vue.component(MessageBox.name, MessageBox);
    Vue.component(Switch.name, Switch);
    Vue.prototype.$messageBox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  }
}
