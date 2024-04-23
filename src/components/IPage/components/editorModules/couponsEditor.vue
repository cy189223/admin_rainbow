<template>
  <div class="container-scope">
    <IForm :formFrame="frame" title="优惠券列表 配置" labelWidth="100rpx" class="form-container" :formData.sync="form"></IForm>
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
        frame: [
          // {
          //   title: '样式',
          //   type: 'style_input',
          //   span: '24',
          //   newline: true,
          //   tips: '屏幕宽度为750',
          //   key: 'style',
          // },
          // {
          //   title: '排版',
          //   type: 'radio',
          //   default: 'grid3',
          //   options: [
          //     {
          //       title: '一行2个',
          //       value: 'grid2'
          //     },
          //     {
          //       title: '一行3个',
          //       value: 'grid3'
          //     }
          //   ],
          //   newline: true,
          //   key: 'grid',
          // },
          {
            title: '优惠券列表',
            key: 'list',
            type: 'coupon_ids',
            span: 24,
            placeholder: '请输入',
            newline: true
          },
        ],
        form: {

        }
      }
    },
    computed: {
    },
    mounted () {
      this.form = this.value
    },
    watch: {
      form (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.form = val
      }
    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>

</style>
