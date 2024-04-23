<template>
  <div class="richtext ql-snow">
    <div class="content-text ql-editor" v-html="html" v-if="html">
    </div>
    <div class="content-text" v-else>
      <div class="tips">
        <p>此处编辑富文本内容 →</p>
        <p>
          你可以对字体<b>加粗</b>、<i>斜体</i>、<u>下划线</u>、<del>删除线</del>、文字
          <font color="red">颜色</font>、
          <span style="backgroup:#E6A23C">背景色</span>、以及字号<font size="4">大</font>小等排版
        </p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Html",
    props: {
      module: {
        type: Object
      }
    },
    components: {
    },
    data() {
      return {
        current: 0
      }
    },
    computed: {
      html() {
        return this.module.html || ''
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .richtext {
    box-sizing: content-box;
    .content-text {
      padding: 0;
      min-height: 30px;
      text-align: justify;
    }
  }
  .tips {
    padding: 10px;
    font-size: 14px;
    color: #333333;
  }
</style>
