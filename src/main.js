import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Lockr from 'lockr'
import Cookies from 'js-cookie'
import _ from 'lodash'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routes from './router/routes'
import VueRouter from 'vue-router'
import store from './vuex/store'
import filter from './assets/js/filter'
import _g from './assets/js/global'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'assets/css/global.css'
import 'assets/css/base.css'
import Icon from 'vue-svg-icon/Icon.vue'
// import VueSocketio from 'vue-socket.io'  需要构筑即时通讯系统  将该项注释打开 并在app.vue中编辑相应代码

axios.defaults.baseURL = 'http://qixingshangcheng.pstech360.com/php/public/'
// axios.defaults.baseURL = 'http://framework.com/'
axios.defaults.timeout = 1000 * 15
axios.defaults.headers.authKey = Lockr.get('authKey')
axios.defaults.headers.sessionId = Lockr.get('sessionId')
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  const hideLeft = to.meta.hideLeft
  store.dispatch('showLeftMenu', hideLeft)
  store.dispatch('showLoading', true)
  NProgress.start()
  next()
})

router.afterEach(transition => {
  NProgress.done()
})

Vue.use(ElementUI)
Vue.use(VueRouter)
// Vue.use(VueSocketio, 'http://szt.pstech360.com:2021')
Vue.component('icon', Icon)

//引入highcharts
// import Highcharts from 'highcharts/highstock';
// import HighchartsMore from 'highcharts/highcharts-more';
// import HighchartsDrilldown from 'highcharts/modules/drilldown';
// import Highcharts3D from 'highcharts/highcharts-3d';
// import Highmaps from 'highcharts/modules/map';

// HighchartsMore(Highcharts)
// HighchartsDrilldown(Highcharts);
// Highcharts3D(Highcharts);
// Highmaps(Highcharts);

window.router = router
window.store = store
window.HOST = HOST
window.ResourceBaseUrl = axios.defaults.baseURL
window.axios = axios
window._ = _
window.moment = moment
window.Lockr = Lockr
window.Cookies = Cookies
window._g = _g
window.pageSize = 15

const bus = new Vue()
window.bus = bus

new Vue({
  el: '#app',
  template: '<App/>',
  filters: filter,
  router,
  store,
  components: { App }
  // render: h => h(Login)
}).$mount('#app')
