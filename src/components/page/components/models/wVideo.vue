<template>
  <div class="w-video">
    <slot></slot>
    <div class="img" v-if="data.img">
      <img :src="data.img">
    </div>
    <p v-else>视频</p>
  </div>
</template>
<script>
export default {
  name: 'WVideo',
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
.w-video {
  height: 180px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    line-height: 150px;
    text-align: center;
    color: #888888;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 4px;
  }
  .img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      display: block;
      margin: 0 auto;
      width: auto;
      height: 100%;
    }
  }
}
</style>
