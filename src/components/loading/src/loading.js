import Vue from 'vue'
import loadingVue from './loadingTemplate'

const MessageBoxConstructor = Vue.extend(loadingVue)
const instance = new MessageBoxConstructor({
  el: document.createElement('div')
})

instance.vm = instance.$mount()
document.body.appendChild(instance.vm.$el)

instance.show = function (tips) {
  instance.vm.$el.style.display = 'flex'
  if (tips) {
    instance.vm.tips = tips
  } else {
    instance.vm.tips = "加载中"
  }
}

instance.hide = function () {
  instance.vm.$el.style.display = 'none'
}

export default instance
