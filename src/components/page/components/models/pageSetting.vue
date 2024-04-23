<template>
  <div class="page-setting">
    <img src="../../../../assets/nav-bar.jpg">
    <p class="page-title">页面标题</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'PageSetting'
}
</script>
<style lang="less" scoped>
.page-setting {
  position: relative;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  .page-title {
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 40px;
    font-size: 17px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    color: #eeeeee;
    letter-spacing: 1px;
  }
}
</style>
