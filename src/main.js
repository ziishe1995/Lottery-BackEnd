import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import MyPlugin from './plugin'
// eslint-disable-next-line import/order
import { JacPlugin } from 'jactools'
import './css/my.styl'

sync(store, router)

Vue.use(JacPlugin, {
  _, moment
})
Vue.use(MyPlugin, {})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
