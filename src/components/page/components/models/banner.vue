<template>
  <div class="banner">
    <div class="title">点击下方图片可购买</div>
    <div class="img">
      <img :src="data.img || 'https://resource.weseeke.com/wx/0/images/other/WzRSkyvh5E5Z0QgcWjknuSwNsgucPOKPyhAxbrBW.png'">
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Banner',
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
.banner {
  padding: 15px 20px;
  .title {
    font-size: 17px;
    font-weight: 500;
    padding: 0 20px;
    padding-top: 15px;
  }
  .img {
    padding: 0 20px;
    padding-bottom: 15px;
    margin-top: 15px;
  }
}
</style>
