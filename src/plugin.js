import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationObserver } from 'vee-validate'
import './validation'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import API from 'lib/API'
import VueBus from 'vue-bus'
import numFormat from 'vue-filter-number-format'
import 'vue-search-select/dist/VueSearchSelect.css'
import { JacLib } from 'jactools'
import Const from 'constants/Const'

const install = (Vue, options) => {
  Vue.use(BootstrapVue)
  Vue.use(VueBus)
  Vue.filter('numFormat', numFormat)
  const moneyFormat = val => isNaN(parseFloat(val))
    ? val
    : numFormat(val, '0,0.000')
  Vue.filter('money', moneyFormat)

  Vue.component('Validation', ValidationObserver)
  // Vue.component('ValidationProvider', ValidationProvider)
  Vue.component('Validate', require('@/Validate').default)

  Vue.use(VueSweetalert2)

  const api = new API()
  Vue.prototype.$api = api
  Vue.prototype.$jaclib = JacLib
  Vue.prototype.$s3Host = () => { return '' }
  (async () => {
    Vue.prototype.$s3Host = (await api.site.host.getS3Host()).data
  })()

  Vue.component('JButton', require('@/Form/Button').default)
  Vue.component('JRadio', require('@/Form/Radio').default)
  Vue.component('JSelect', require('@/Form/Select').default)

  Vue.component('Alert', require('@/Alert').default)

  Vue.prototype.Const = Const
  // Vue.prototype.console = console

  Vue.prototype.$translate = function (key, value) {
    return _.getVal(this.translate, `${key}.${value}`)
  }
  Vue.prototype.$alert = {
    success: message => Vue.bus.emit('alert.success', message),
    danger: message => Vue.bus.emit('alert.danger', message),
    warning: message => Vue.bus.emit('alert.warning', message)
  }
  Vue.prototype.$modal = {
    hide: () => { Vue.bus.emit('modal.hide') }
  }
}

export default {
  install
}
