<template>
  <div class="container-scope">
    <!-- {{form}} -->
    <IForm :formFrame="frame" title="富文本 配置" labelWidth="100rpx" class="form-container" :formData.sync="form"></IForm>
  </div>
</template>
<script>
  import IForm from "@/components/IForm"
  export default {
    name: 'htmlEditor',
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
            title: '内容',
            key: 'html',
            type: 'html',
            span: 23,
            tips: '图片请单独使用图片组件',
            isShowImageTips: false,
            placeholder: '请输入',
            newline: true
          }
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
