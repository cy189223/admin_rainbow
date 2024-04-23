<template>
  <div class="image-list">
    <p class="tips" v-if="!data.images.length">图片</p>
    <img class="image" v-for="item in data.images" :key="item" :src="item" :style="`margin-bottom:${data.margin}px`">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ImageList',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.image-list {
  .tips {
    text-align: center;
    height: 160px;
    line-height: 160px;
    font-size: 30px;
    color: #ccc;
    letter-spacing: 10px;
  }
  .image {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
