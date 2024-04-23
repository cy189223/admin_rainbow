<template>
  <div class="grid" :class="{border: data.is_show_border}">
    <div class="content">
      <div
        :class="`item template${data.cols} ${data.is_show_border?'border':''}`"
        v-for="(item,index) in data.list"
        :style="`width:${100/data.cols}%;padding:0 ${data.style.padding}px;`"
        :key="index">
        <img :src="item.image">
        <p class="text">{{item.text}}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'grid',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.grid {
  &.border {
    border: 1px solid #eeeeee;
  }
  .content {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .item {
      box-sizing: border-box;
      position: relative;
      &.border {
        border-bottom: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;
      }
      img {
        width: 100%;
        height: auto;
      }
      .text {
        text-align: center;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        word-break: break-all;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
