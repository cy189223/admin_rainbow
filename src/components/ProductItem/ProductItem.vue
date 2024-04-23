<template>
  <div class="product-item">
    <div class="aside-left">
      <div class="thumb" :style="`background-image:url(${info.thumb})`">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductItem',
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.product-item {
  padding: 10px;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.2);
  border-radius: 4px;
  background-color: #fafafa;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  .aside-left {
    display: flex;
    .thumb {
      width: 100px;
      height: 100px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
</style>
