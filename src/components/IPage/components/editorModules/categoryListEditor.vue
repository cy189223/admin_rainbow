<template>
  <div class="container-scope">
    <IForm :formFrame="frame" title="盲盒列表 配置" labelWidth="100rpx" class="form-container" :formData.sync="form"></IForm>
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
        categoryList: [],
        form: {

        }
      }
    },
    computed: {
      categoryOptions () {
        return this.categoryList.map(text => {
          return {
            title: item.title,
            value: item.id
          }
        })
      },
      frame () {
          return [
            {
              title: '样式',
              type: 'style_input',
              span: '24',
              newline: true,
              tips: '屏幕宽度为750',
              key: 'style',
            },
            // {
            //   title: '排版',
            //   type: 'radio',
            //   default: 'default',
            //   options: [
            //     {
            //       title: '默认排版',
            //       value: 'default'
            //     },
            //   ],
            //   newline: true,
            //   required: true,
            //   key: 'theme',
            //   span: 24
            // },
            {
              title: '选择分类',
              key: 'list',
              type: 'select',
              span: 24,
              placeholder: '请输入',
              newline: true,
              options: this.categoryOptions
            },
          ]
      }
    },
    mounted () {
      this.form = this.value

      this.$http.get('/normal/categories').then(res => {
        this.categoryList = res.data.list
      })
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
