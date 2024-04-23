<template>
  <div id="people">
    <div class="head">
      <div class="headimg"><div class="img"><img :src="data.headimg"></div></div>
      <div class="name">{{data.name}}</div>
    </div>
    <div class="describe" v-html="describe"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'people',
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    describe () {
      return (this.data.describe && this.data.describe.replace(/\n/g, '<br/>')) || ''
    }
  }
}
</script>
<style lang="less" scoped>
#people {
  .head {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &::after {
      position: absolute;
      left: 50%;
      top: 30px;
      content: '';
      height: 20px;
      border-right: 1px solid #a0a0a0;
    }
    .headimg {
      width: 50%;
      height: 50px;
    }
    .img {
      float: right;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      width: 50%;
      box-sizing: border-box;
      padding-left: 20px;
      color: #666;
      font-size: 14px;
    }
  }
  .describe {
    font-size: 13px;
    color: #666;
    line-height: 1.3em;
    padding-bottom: 10px;
  }
}
</style>
