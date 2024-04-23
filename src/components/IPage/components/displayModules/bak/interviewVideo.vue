<template>
  <div class="interview-video">
    <div class="thumb" :style="`background-image: url(${data.thumb})`">
      <span>视频</span>
    </div>
    <p class="text">{{data.text}}</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'interviewVideo',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.interview-video {
  .thumb {
    width: 100%;
    height: 150px;
    background-size: cover;
    background-position: center;
    color: #a0a0a0;
    text-align: center;
    line-height: 150px;
  }
  .text {
    font-size: 12px;
    text-align: center;
    padding: 8px 0;
  }
}
</style>
