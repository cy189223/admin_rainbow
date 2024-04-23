<template>
  <div class="container">

    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="基础设置">
        <IForm :formFrame="frameBase" class="form-container" :formData.sync="form"></IForm>
      </a-tab-pane>
      <a-tab-pane key="2" tab="页面装修" force-render>
        <IForm :formFrame="frameUI" class="form-container" :formData.sync="form"></IForm>
      </a-tab-pane>
    </a-tabs>

    <!-- <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm> -->
    <div slot="action" style="display: flex; justify-content: flex-end;">
      <a-button class="btn" @click="cancel">取消</a-button>
      <a-button class="btn" type="primary" @click="submit">提交</a-button>
    </div>
    <!-- <AttrEditor :form.sync="form">
			<div slot="action">
				<a-button class="btn" @click="cancel">取消</a-button>
				<a-button class="btn" type="primary" @click="submit">提交</a-button>
			</div>
		</AttrEditor> -->

  </div>
</template>

<script>
  // import AttrEditor from "./components/AttrEditor"
  import IForm from "@/components/IForm"

  const resourceType = 'rotate-lotteries'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        form: {},
        // type: 'lottery_egg',
        categoryList: []
      }
    },
    props: {
      uuid: {
        type: String
      },
    },
    computed: {
      categoryOptions() {
        return this.categoryList.map(item => {
          return {
            title: item.title,
            value: item.id
          }
        })
      },
      frameBase() {
        return [
          {
            title: '活动标题',
            key: 'title',
            newline: true,
            required: true
          },
          {
            title: '副标题',
            key: 'sub_title',
            placeholder: '例如: 直播中随机抽取10位幸运儿',
            newline: true,
            // required: true
          },
          // {
          //   title: '参与码',
          //   key: 'join_codes',
          //   tips: '选填。参与码可设置多个，可在公众号或微信群中发放给用户',
          //   type: 'tags',
          //   newline: true,
          // },
          {
            title: '封面',
            key: 'thumb',
            type: 'image',
            tips: '800*800',
            sizeLimit: 200,
            isShowImageTips: false,
            newline: true,
            required: true
          },
          // {
          //   title: '开奖时3D蛋图/盒图',
          //   key: 'image_3d',
          //   type: 'image',
          //   isShowImageTips: false,
          //   tips: '600*900 png',
          //   newline: true,
          // },
          {
            type: 'blank',
            newline: true,
          },
          // {
          //   title: '开放参与时间',
          //   key: 'start_at',
          //   type: 'date',
          //   newline: true,
          //   required: true,
          // },
          // {
          //   title: '是否需要支付',
          //   key: 'is_need_pay',
          //   type: 'radio',
          //   default: 0,
          //   options: [
          //     {
          //       title: '免费参与',
          //       value: 0
          //     },
          //     {
          //       title: '需要支付',
          //       value: 1
          //     }
          //   ],
          //   newline: true,
          // },
          // {
          //   title: '价格',
          //   type: 'mix_price',
          //   key_prefix: '',
          //   tips: '请尽量避免使用人民币抽奖',
          //   newline: true,
          // },
          {
            title: '价格',
            key: 'score_price',
            type: 'number',
            placeholder: '整数',
            tips: '大转盘仅支持积分支付',
            suffix: '积分',
            newline: true,
          },
          {
            title: '次数库存',
            type: 'number',
            key: 'stock',
            // placeholder: '整数',
            tips: '此处库存指剩余可转总次数',
            newline: true,
            required: true
          },
          // {
          //   title: '价格(人民币)',
          //   key: 'money_price',
          //   type: 'price',
          //   newline: true,
          //   where: {
          //     is_need_pay: 1
          //   }
          // },
          // {
          //   title: '价格(积分)',
          //   key: 'score_price',
          //   type: 'number',
          //   placeholder: '整数',
          //   newline: true,
          //   where: {
          //     is_need_pay: 1
          //   }
          // },
          {
            title: '奖品设置',
            type: 'text',
            text: '创建后在列表中设置奖品',
          },
          {
            title: '每个用户限制次数',
            key: 'per_user_limit',
            type: 'number',
            tips: '0或不填写为不限制。 例如2代表每个用户仅可转2次',
          },
          {
            type: 'blank',
            newline: true,
          },
          {
            title: '规则文字',
            key: 'rule',
            type: 'textarea',
            placeholder: '一行一个说明',
            newline: true,
            tips: '不填则使用默认。 一行一个说明，不需要加序号。'
          },
          {
            title: '开启邀请送次数',
            key: 'is_invite_enabled',
            type: 'boolean',
            newline: true,
            tips: '开启后下方邀请规则才会生效'
          },
          {
            title: '邀请规则',
            key: 'invite_rule',
            type: 'invite_rule_input',
            newline: true,
            tips: '邀请新用户注册为一次有效邀请，一次奖励为赠送一次抽奖机会',
            where: {
              // is_invite_enable: 1
            }
          },
          // {
          //   title: '详情图',
          //   key: 'detail_images',
          //   type: 'images',
          //   isShowImageTips: false,
          //   tips: '1000px宽度，高度不限，长图请切成多张小图上传',
          //   newline: true,
          // }
        ]
      },
      frameUI() {
        return [
          {
            title: '页面背景图',
            key: 'bg',
            tips: '不上传则使用默认图',
            isShowImageTips: false,
            tips: '750*2000  不上传则使用默认图',
            type: 'image',
            newline: true,
          },
          {
            title: '积分按钮背景图',
            key: 'score_bg',
            tips: '参考图片规范包中对应图片, 不上传则使用默认',
            isShowImageTips: false,
            type: 'image',
            newline: true,
          },
          {
            title: '转盘外环图',
            key: 'outer_bg',
            tips: '560*560, 参考图片规范包中图片, 不上传则使用默认',
            isShowImageTips: false,
            type: 'image',
            newline: true,
          },
          {
            title: '转盘中间指针图',
            key: 'center_bg',
            tips: '220*220 参考图片规范包中对应图片, 不上传则使用默认',
            isShowImageTips: false,
            type: 'image',
            newline: true,
          }
        ]
      }
    },
    created() {},
    mounted() {
      this.uuid = this.uuid || this.$route.params.uuid

      // this.$http.get('/article/categories').then(res => {
      // 	this.categoryList = res.data.list
      // })

      this.initForm()
    },
    watch: {
      uuid() {
        this.initForm()
      }
    },
    methods: {
      initForm() {
        if (this.uuid) {
          this.$http(`/${resourceType}/${this.uuid}`).then(res => {
            this.form = res.data.info
          })
        } else {
          this.form = {
            ...this.$initForm(this.frameBase),
            ...this.$initForm(this.frameUI)
          }
        }
      },
      cancel() {
        this.uuid = ''
        this.$emit('cancel')
        // this.$router.back(-1)
      },
      create() {
        this.$http.post(`/${resourceType}`, {
          type: this.type,
          ...this.form
        }).then(res => {
          this.$message.success('创建成功')
          this.$emit('success')
          // this.$router.push({
          // 	path: './list'
          // })
        })
      },
      update() {
        this.$http.patch(`/${resourceType}/${this.uuid}`, {
          type: 'update',
          attributes: this.form
        }).then(res => {
          this.$message.success('更新成功')
          this.$emit('success')
          // this.uuid = ''
          // this.form = {}

          // this.$router.push({
          // 	path: '../list'
          // })
        })
      },
      submit() {
        if (this.uuid)
          this.update()
        else
          this.create()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-container {
    padding-bottom: 120px;
  }

  .container {
    .btn {
      margin-right: 30px;
    }
  }
</style>
