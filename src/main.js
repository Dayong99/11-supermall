import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import objToast from 'components/common/toast'

import FastClick from 'fastclick'
// import VueLazyload from 'vue-lazyload'

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

Vue.use(objToast)

// 解决移动端300s延迟
FastClick.attach(document.body)

// 使用图片懒加载插件
// Vue.use(VueLazyload, {
//   loading: require('./assets/img/common/placeholder.png')
// })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

