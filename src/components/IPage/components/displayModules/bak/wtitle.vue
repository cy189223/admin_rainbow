<template>
  <div class="title">
    <div class="left"><span v-if="!data.position || data.position === 'left'">{{data.title}}</span></div>
    <div class="right" v-if="data.is_show_more">
      <span>{{data.more_text}}</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="center" v-if="data.position && data.position === 'center'">{{data.title}}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'wtitle',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  padding: 0 2px;
  .left {
    font-size: 14px;
    font-weight: bold;
  }
  .right {
    display: flex;
    align-items: center;
    color: #a0a0a0;
    span {
      font-size: 12px;
    }
  }
  .center {
    position: absolute;
    height: 42px;
    width: 100%;
    text-align: center;
    line-height: 42px;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
