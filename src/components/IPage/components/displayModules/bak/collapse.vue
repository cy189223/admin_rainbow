<template>
  <div class="collapse">
    <span class="title">{{data.title}}</span>
    <i class="el-icon-arrow-right" :style="{transform: data.style.is_collapse===1?'rotate(90deg)':'rotate(-90deg)'}"></i>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'collapse',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.collapse {
  padding: 0 8px 4px 8px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  position: relative;
  color: #666666;
  &::after {
    content: '';
    position: absolute;
    left: 6px;
    right: 6px;
    bottom: 4px;
    height: 1px;
    background-color: #E4E7ED;
  }
  i {
    transform: rotate(-90deg)
  }
}
</style>
