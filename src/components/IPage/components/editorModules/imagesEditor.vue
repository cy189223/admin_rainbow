<template>
  <div class="container-scope">
        <!-- {{form}} -->
    <IForm :formFrame="frame" title="图片 配置" labelWidth="100rpx" class="form-container" :formData.sync="form"></IForm>
  </div>
</template>
<script>
  import IForm from "@/components/IForm"
  export default {
    name: 'imagesEditor',
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
            key: 'style',
            newline: true,
          },
          // {
          //   title: '图片圆角',
          //   type: 'number',
          //   key: 'radio',
          //   newline: true,
          // },
          {
            title: '图片间间距',
            type: 'slider',
            key: 'spacing',
            newline: true,
          },
          {
            title: '排列方式',
            type: 'radio',
            key: 'grid',
            default: 'grid1',
			      required: true,
            options: [{
                title: '1行1个',
                value: 'grid1'
              },
              {
                title: '1行2个',
                value: 'grid2'
              },
              {
                title: '1行3个',
                value: 'grid3'
              },
              {
                title: '1行4个',
                value: 'grid4'
              },
              {
                title: '1行5个',
                value: 'grid5'
              },
              // {
              //   title: '横向滚动',
              //   value: 'row-scoll'
              // }
            ],
            span: 24,
            tips: '',
            newline: true
          },
          {
            title: '图片列表',
            key: 'list',
            span: 24,
            type: 'banner_input',
            options: {
              title: true
            },
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
