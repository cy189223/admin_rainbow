import Vue from 'vue'
import FormVue from './Popup.vue'

const creator = Vue.extend(FormVue)
const instance = new creator({
  el: document.createElement('div')
})

instance.vm = instance.$mount()
document.body.appendChild(instance.vm.$el)

instance.show = function (options) {
	instance.vm.visible = true
	instance.vm.parseOptions(options)
}

instance.hide = function () {
  instance.vm.visible = false
}

export default instance
