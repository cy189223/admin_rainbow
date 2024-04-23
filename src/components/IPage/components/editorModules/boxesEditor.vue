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
            title: '排版',
            type: 'radio',
            default: 'grid3',
            tips: '<a target="_blank" href="https://www.yuque.com/u1307645/mwy3k3/rghuol" style="color: red;">点击预览各个布局效果</a>',
            options: [
              {
                title: '一行1个 (长条状)',
                value: 'row1'
              },
              {
                title: '一行1个（方形状）',
                value: 'grid1'
              },
              {
                title: '一行2个',
                value: 'grid2'
              },
              {
                title: '一行3个',
                value: 'grid3'
              }
            ],
            newline: true,
            required: true,
            key: 'grid',
            span: 24
          },
          {
            title: '换行方式',
            type: 'radio',
            default: 'wrap',
            options: [
              {
                title: '换行平铺',
                value: 'wrap'
              },
              {
                title: '同一行左右滑动',
                value: 'scroll'
              }
            ],
            tips: '默认为多行平铺布局',
            newline: true,
            required: true,
            key: 'wrap_mode',
          },
          {
            title: '列表内容',
            type: 'radio',
            default: 'custom',
            tips: '如果选择显示“所有上架盲盒”，需要把此组件作为页面的最后一个组件',
            span: 24,
            options: [
              {
                title: '所有上架盲盒',
                value: 'all'
              },
              {
                title: '自定义筛选',
                value: 'custom'
              }
            ],
            newline: true,
            key: 'list_content',
            required: true
          },
          {
            title: '筛选列表',
            key: 'list',
            type: 'box_list_input',
            span: 24,
            placeholder: '请输入',
            newline: true,
            where: {
              list_content: "custom"
            }
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
