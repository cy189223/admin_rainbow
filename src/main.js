// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import {
  VueAxios
} from './utils/request'
import vcolorpicker from 'vcolorpicker'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import $tool from './utils/tool.js'
Vue.prototype.$tool = $tool

Vue.prototype.$defaultPageObject = {
  style: {},
  modules: []
}

Vue.prototype.$initForm = (frame) => {
  let form = {}

  for (var i = frame.length - 1; i >= 0; i--) {
    let key = frame[i].key

    // 设置默认值
    let defaultVal = frame[i].default

    if (defaultVal !== undefined) {
      form[key] = defaultVal
    }
  }

  return form
}

Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
        (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

import Tips from '@/components/Tips/Tips.vue';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay.vue'
import RewardAndBrokerage from '@/components/RewardAndBrokerage/Index.vue'
import NoData from '@/components/NoData/NoData.vue'
Vue.component('Tips', Tips)
Vue.component('PriceDisplay', PriceDisplay)
Vue.component('RewardAndBrokerage', RewardAndBrokerage)
Vue.component('NoData', NoData)

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import './directive' // global directive

// 即将弃用，请使用 iForm
import globalForm from '@/components/Form'
Vue.prototype.$globalForm = globalForm

import $iForm from '@/components/IForm/popup.js'
Vue.prototype.$iForm = $iForm

import $getPathPopup from '@/components/GetPathPopup'
Vue.prototype.$getPathPopup = $getPathPopup

import api from './newApi'
Vue.prototype.$api = api

import loading from '@/components/loading'
Vue.prototype.$loading = loading

Vue.config.productionTip = false
Vue.use(vcolorpicker)

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

Vue.prototype.$viewImage = (src) => {
  var newwin = window.open()
  newwin.document.write("<img src=" + src + " />")
}

Vue.prototype.$open = (src) => {
  window.open(src)
}


window.Vue = Vue

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
