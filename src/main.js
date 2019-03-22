import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/assets/api/request'
import moment from 'moment'
import ElementUI from 'element-ui'
import Antd from 'ant-design-vue'

import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css'

Vue.use(ElementUI)
Vue.use(Antd)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.http = Vue.prototype.$http = Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pattern)
})
Vue.filter('genderFormat', function (dateStr) {
  return dateStr == 1 ? '男' : '女'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
