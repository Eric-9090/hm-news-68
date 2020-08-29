import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Vant导入所有组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'
// 导入amfe-flexible库
import 'amfe-flexible'
// 导入
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
//
import axios from 'axios'
// 把axios挂载到vue的原型上
Vue.prototype.$axios = axios
// 全局的axios 配置baseURL 基准地址
axios.defaults.baseURL = 'http://localhost:3000'

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
