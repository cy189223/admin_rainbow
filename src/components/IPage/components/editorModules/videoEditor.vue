<template>
  <div class="container-scope">
    <IForm :formFrame="frame" title="视频 配置" labelWidth="100rpx" class="form-container" :formData.sync="form"></IForm>
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
            title: '视频上传',
            key: 'video',
            type: 'file',
            span: 12,
            tips: '请上传30M以内视频',
            isShowImageTips: false,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '封面',
            key: 'thumb',
            type: 'image',
            span: 24,
            newline: true
          },
          {
            title: '是否自动播放',
            key: 'is_autoplay',
            type: 'boolean',
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
