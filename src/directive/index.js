import Vue from 'vue'
import previewImage from '@/components/previewImage/index'

Vue.directive('preview', {
  inserted: function (el, binding) {
    el.style.cursor = 'pointer'
    el.addEventListener('click', function () {
      previewImage.preview(binding.value)
    })
  }
})

Vue.directive('img-size-auto', {
  inserted: function (el, binding) {
    el.style.display = 'none'
    el.onload = function () {
      if (el.width > el.height) {
        el.style.display = 'block'
        el.style.height = 'auto'
      } else {
        el.style.display = 'block'
        el.style.width = 'auto'
      }
    }
  }
})
