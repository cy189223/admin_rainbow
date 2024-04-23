<template>
  <div class="guest">
    <div class="title">
      <span class="left">{{data.title_left}}</span>
      <span>|</span>
      <span class="right">{{data.title_right}}</span>
    </div>
    <div class="thumb">
      <img :src="data.thumb" alt="">
      <div class="thumb-title">
        <span class="left">{{data.thumb_title_left}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="right">{{data.thumb_title_right}}</span>
      </div>
    </div>
    <p class="text">{{data.text}}</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'guest',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.guest {
  .title {
    padding: 20px 0;
    text-align: center;
    line-height: 24px;
  }
  .thumb {
    margin: 0 auto;
    width: 200px;
    box-shadow: 0 0 8px #cccccc;
    img {
      width: 100%;
      height: auto;
    }
    .thumb-title {
      font-size: 12px;
      padding: 10px 0;
      text-align: center;
      .right {
        color: #888888;
        letter-spacing: 1px;
      }
    }
  }
  .text {
    margin-top: 10px;
    padding: 10px 0;
    font-size: 12px;
    line-height: 20px;
    text-align: justify;
  }
}
</style>
