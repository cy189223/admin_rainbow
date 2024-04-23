<template>
  <div class="container-scope">
    <IForm :formFrame="frame" :uuid="uuid" title="活动列表 配置" labelWidth="100rpx" class="form-container" :formData.sync="form"></IForm>
  </div>
</template>
<script>
  import IForm from "@/components/IForm"
  export default {
    name: 'activitiesEditor',
    components: {
      IForm
    },
    props: {
      value: {
        type: Object
      },
      uuid: {
        type: String
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
          // {
          //   title: '排版',
          //   type: 'radio',
          //   default: 'grid1',
          //   span: 24,
          //   options: [
          //     {
          //       title: '一行1个',
          //       value: 'grid1'
          //     },
          //     {
          //       title: '一行2个',
          //       value: 'grid2'
          //     }
          //   ],
          //   newline: true,
          //   key: 'grid',
          //   required: true
          // },
          {
            title: '活动类型',
            type: 'radio',
            default: 'box',
            span: 24,
            options: [
              {
                title: '盲盒',
                value: 'box'
              },
              {
                title: '一番赏',
                value: 'yifanshang'
              },
              {
                title: '抽奖活动',
                value: 'lottery'
              },
              {
                title: '秒杀活动',
                value: 'seckill'
              },
              {
                title: '扭蛋机',
                value: 'egg_lottery'
              },
              {
                title: '福袋',
                value: 'fudai'
              },
              {
                title: '大转盘',
                value: 'rotate_lottery'
              },
              {
                title: '集卡活动',
                value: 'jika'
              },
            ],
            newline: true,
            key: 'activity_type',
            required: true
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
            tips: '如果选择显示“所有上架活动”，需要把此组件作为页面的最后一个组件',
            span: 24,
            options: [
              {
                title: '所有上架活动',
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
            title: '盲盒列表',
            key: 'list',
            type: 'activity_list_input',
            activity_type: 'box',
            where: {
               activity_type: 'box',
               list_content: 'custom'
            },
            span: 24,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '一番赏列表',
            key: 'list',
            type: 'activity_list_input',
            activity_type: 'yifanshang',
            where: {
               activity_type: 'yifanshang',
               list_content: 'custom'
            },
            span: 24,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '抽奖列表',
            key: 'list',
            type: 'activity_list_input',
            activity_type: 'lottery',
            where: {
               activity_type: 'lottery',
               list_content: 'custom'
            },
            span: 24,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '秒杀列表',
            key: 'list',
            type: 'activity_list_input',
            activity_type: 'seckill',
            where: {
               activity_type: 'seckill',
               list_content: 'custom'
            },
            span: 24,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '扭蛋机列表',
            key: 'list',
            type: 'activity_list_input',
            activity_type: 'egg_lottery',
            where: {
               activity_type: 'egg_lottery',
               list_content: 'custom'
            },
            span: 24,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '福袋列表',
            key: 'list',
            type: 'activity_list_input',
            activity_type: 'fudai',
            where: {
               activity_type: 'fudai',
               list_content: 'custom'
            },
            span: 24,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '大转盘活动',
            key: 'list',
            type: 'activity_list_input',
            activity_type: 'rotate_lottery',
            where: {
               activity_type: 'rotate_lottery',
               list_content: 'custom'
            },
            span: 24,
            placeholder: '请输入',
            newline: true
          },
          {
            title: '集卡活动',
            key: 'list',
            type: 'activity_list_input',
            activity_type: 'jika',
            where: {
               activity_type: 'jika',
               list_content: 'custom'
            },
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
      },
      uuid(val) {

      }
    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>

</style>
