import Vue from 'vue'
import template from './template.vue'

const TemplateConstructor = Vue.extend(template)
const instance = new TemplateConstructor({
  el: document.createElement('div')
})

instance.vm = instance.$mount()
document.body.appendChild(instance.vm.$el)

export default instance
