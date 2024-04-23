<template>
  <div class="container-scope">
    <IForm :formFrame="frame" title="标题 配置" labelWidth="100rpx" class="form-container" :formData.sync="form"></IForm>
  </div>
</template>
<script>
  import IForm from "@/components/IForm"
  export default {
    name: 'searchBar',
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
          {
            title: '样式',
            type: 'style_input',
            span: '24',
            newline: true,
            tips: '屏幕宽度为750',
            key: 'style',
          },
          {
            title: '分栏',
            key: 'list',
            type: 'multi_list',
            span: 24,
            default: [],
            // placeholder: '不填写则使用默认',
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
