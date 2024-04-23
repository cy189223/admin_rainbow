<template>
  <div class="description">
    <div class="content" v-html="text"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'description',
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    text () {
      return this.data.text.replace(/\n/g, '<br/>')
    }
  }
}
</script>
<style lang="less" scoped>
.description {
  .content {
    padding: 20px 15px;
    background-color: #e6e6e6;
    color: #6a6a6a;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
