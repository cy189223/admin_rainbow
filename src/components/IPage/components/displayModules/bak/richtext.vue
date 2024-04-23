<template>
  <div class="richtext">
    <div class="content" style="padding:10px;" v-if="data.content==='' || data.content===null">
      <p>此处编辑富文本内容 →</p>
      <p>
        你可以对字体<b>加粗</b>、<i>斜体</i>、<u>下划线</u>、<del>删除线</del>、文字
        <font color="red">颜色</font>、
        <span style="backgroup:#E6A23C">背景色</span>、以及字号<font size="4">大</font>小等排版
      </p>
    </div>
    <div class="content" v-else v-html="data.content" style="padding:5px;"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'richtext',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.richtext {
  color:#333333;
  .content {
    word-wrap:break-word;
  }
}
</style>
