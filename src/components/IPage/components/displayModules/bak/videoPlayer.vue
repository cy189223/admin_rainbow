<template>
  <div class="video-player">
    <div class="video-img">
      <img :src="data.img_src" v-img-auto>
    </div>
    <i class="play-btn iconfont">&#xe62e;</i>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'videoPlayer',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.video-player {
  height: 180px;
  background-color: #dddddd;
  .play-btn {
    position: absolute;
    left: 135px;
    top: 80px;
    font-size: 20px;
    color: #eee;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 3px 5px;
  }
}
.video-img {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
