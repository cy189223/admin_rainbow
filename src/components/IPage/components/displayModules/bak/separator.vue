<template>
  <div class="separator" :style="'background:'+data.style.background+';height:'+data.style.height+'px'">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'separator',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
