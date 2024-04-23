<template>
  <div class="description">
    <p class="content-text" v-html="text"></p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Description',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
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
  .content-text {
    padding: 20px 15px;
    background-color: #e6e6e6;
    color: #6a6a6a;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
