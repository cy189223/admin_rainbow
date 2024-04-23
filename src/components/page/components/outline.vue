<template>
  <div class="outline">
    <div class="button-g">
      <div class="delete" @click="deleteClickHandle">删除</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Outline',
  methods: {
    deleteClickHandle () {
      this.$emit('delete-handle')
    }
  }
}
</script>
<style lang="less" scoped>
.outline {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px dashed #409EFF;
  .button-g {
    position: absolute;
    bottom: -1px;
    right: -1px;
    .delete {
      width: 40px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      font-size: 10px;
      background-color: #409EFF;
      color: #fff;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
