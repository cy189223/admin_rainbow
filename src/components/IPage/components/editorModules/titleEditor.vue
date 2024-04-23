<template>
  <div class="container-scope">
    <IForm :formFrame="frame" title="标题 配置" labelWidth="100rpx" class="form-container" :formData.sync="form"></IForm>
  </div>
</template>
<script>
  import IForm from "@/components/IForm"
  export default {
    name: 'titleEditor',
    components: {
      IForm
    },
    props: {
      value: {
        type: Object
      }
    },
    data() {
      return {
        frame: [{
            title: '样式',
            type: 'style_input',
            span: '24',
            newline: true,
            tips: '屏幕宽度为750',
            key: 'style',
          },
          {
            title: '左边图标',
            key: 'left_icon',
            type: 'image',
            span: 12,
            tips: '不上传则不显示',
            isShowImageTips: false,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '标题',
            key: 'title',
            span: 12,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '右侧按钮',
            key: 'is_show_more',
            type: 'boolean',
            span: 24,
            newline: true
          },
          {
            title: '按钮文字',
            key: 'more_text',
            placeholder: '默认为”更多"',
            span: 8,
            newline: true
          },
          {
            title: '按钮链接',
            key: 'more_link',
            type: 'link',
            span: 24,
            newline: true
          },
        ],
        form: {

        }
      }
    },
    computed: {},
    mounted() {
      this.form = this.value
    },
    watch: {
      form(val) {
        this.$emit('input', val)
      },
      value(val) {
        this.form = val
      }
    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>

</style>
