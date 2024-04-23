<template>
  <div class="outline-c">
    <div class="menu-c">
      <span @click.capture="action('top')">上方添加</span>
      <span @click.capture="action('bottom')">下方添加</span>
      <span @click.capture="action('delete')">删除</span>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      action(tips) {
        this.$emit('action', tips)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .outline-c {
    // display: none;
    position: absolute;
    // top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 101;
    // border: 2px dashed red;

    // pointer-events: none;

    &:hover .menu {
      display: block;
    }

    .menu-c {
      position: absolute;
      bottom: 0;
      right: 0;
      // display: none;
      line-height: 20px;

      span {
        background-color: #bbbbbb;
        color: #ffffff;
        font-size: 10px;
        padding: 2px 4px;
        cursor: pointer;

        &:hover {
          background-color: #999999;
        }
      }
    }
  }
</style>
