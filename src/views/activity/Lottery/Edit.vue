<template>
  <div class="container">
    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
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

  const resourceType = 'lotteries'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        form: {},
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
      frame() {
        return [{
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
          {
            title: '参与码',
            key: 'join_codes',
            tips: '选填。参与码可设置多个，可在公众号或微信群中发放给用户',
            type: 'tags',
            newline: true,
          },
          {
            title: '封面',
            key: 'thumb',
            type: 'image',
            sizeLimit: 200,
            isShowImageTips: false,
            tips: '800*800',
            newline: true,
            required: true
          },
          {
            title: '详情图',
            key: 'images',
            isShowImageTips: false,
            tips: '宽度1000px，长图建议切成多张小图上传',
            type: 'images',
            newline: true,
          },
          {
            type: 'blank',
            newline: true,
          },
          {
            title: '开放参与时间',
            key: 'start_at',
            type: 'date',
            newline: true,
            required: true,
          },
          {
            title: '价格',
            type: 'mix_price',
            key_prefix: '',
            // placeholder: '整数',
            tips: '请尽量避免使用人民币抽奖，有违规的风险!',
            newline: true,
          },
          {
            type: 'blank',
            newline: true,
          },
          {
            title: '奖品设置',
            type: 'text',
            text: '创建后在列表中设置奖品',
          },
          {
            title: '开奖期数',
            key: 'session_total',
            type: 'number',
            default: 1,
            newline: true,
            required: true,
            tips: '默认为开1期，如设置多期，每期结束后会自动开启下一期抽奖'
          },
          {
            title: '总库存',
            key: 'stock',
            type: 'number',
            newline: true,
            required: true,
            tips: '整个活动允许参与的总人数库存'
          },
          {
            title: '开奖设置',
            key: 'emit_type',
            type: 'radio',
            default: 'time',
            options: [
              {
                title: '按时间开奖',
                value: 'time'
              },
              {
                title: '按参与人数开奖',
                value: 'user_total'
              },
              {
                title: '按抽奖码数量开奖',
                value: 'ticket_total'
              }
            ],
            newline: true,
            tips: '如设置为多期开奖，则此处不能选择“按固定时间开奖“'
          },
          {
            title: '按时间开奖',
            prefix: '达到',
            suffix: '自动开奖',
            key: 'emit_time',
            type: 'date',
            newline: true,
            required: true,
            where: {
              emit_type: 'time'
            }
          },
          {
            title: '按人数开奖',
            key: 'emit_user_total',
            type: 'number',
            prefix: '每期参与人数达到',
            suffix: '人自动开奖',
            tips: '每个用户参与抽奖后自动获得一个抽奖码，通过分享助力可获得更多抽奖码提高中奖概率',
            newline: true,
            required: true,
            where: {
              emit_type: 'user_total'
            }
          },
          {
            title: '按抽奖码数量开奖',
            key: 'emit_ticket_total',
            type: 'number',
            prefix: '每期抽奖码数量达到',
            suffix: '个自动开奖',
            tips: '每个用户参与抽奖后自动获得一个抽奖码，通过分享助力可获得更多抽奖码提高中奖概率',
            newline: true,
            required: true,
            where: {
              emit_type: 'ticket_total'
            }
          },
          {
            type: "blank"
          },
          {
            title: '绑定手机号',
            key: 'is_need_phone',
            type: 'boolean',
            tips: '开启后，用户参与活动前需要绑定手机号 （助力不受此限制）',
            newline: true,
            required: true,
          },
          {
            title: '新用户助力',
            key: 'new_user_reward_ticket',
            type: 'number',
            default: 2,
            prefix: '奖励',
            suffix: '个抽奖码',
            tips: '抽奖码是奖励给邀请人',
            newline: true,
            required: true,
          },
          {
            title: '老用户助力',
            key: 'old_user_reward_ticket',
            type: 'number',
            default: 1,
            prefix: '奖励',
            suffix: '个抽奖码',
            tips: '抽奖码是奖励给邀请人',
            newline: true,
            required: true,
          },
          {
            title: '规则文字',
            key: 'rule',
            type: 'textarea',
            placeholder: '一行一个说明',
            newline: true,
            tips: '不填则使用默认。 一行一个说明，不需要加序号。'
          },
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
          this.form = this.$initForm(this.frame)
        }
      },
      cancel() {
        this.uuid = ''
        this.$emit('cancel')
        // this.$router.back(-1)
      },
      create() {
        this.$http.post(`/${resourceType}`, {
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
