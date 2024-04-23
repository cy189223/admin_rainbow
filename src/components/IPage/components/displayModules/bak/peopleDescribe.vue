<template>
  <div class="people-describe">
    <div class="title">{{data.title}}</div>
    <div class="image">
      <img :src="data.image">
    </div>
    <p class="text">{{data.text}}</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'peopleDescribe',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.people-describe {
  .title {
    padding-top: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 1px;
    font-size: 14px;
  }
  .image {
    margin-top: 30px;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .text {
    padding: 15px 10px;
    font-size: 12px;
    line-height: 18px;
    text-align: justify;
  }
}
</style>
