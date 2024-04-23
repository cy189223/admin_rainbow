<template>
  <div class="container">
    <IForm :formFrame="frame" labelWidth="180px" class="form-container" :formData.sync="form"></IForm>
    <div slot="action">
      <!-- <a-button class="btn" @click="cancel">取消</a-button> -->
      <a-button class="btn" type="primary" @click="submit">保存</a-button>
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

  const resourceType = 'score'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        uuid: '',
        form: {
          banner: []
        },
        categoryList: []
      }
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
        return [
          {
            title: '积分别名',
            key: 'alias',
            placeholder: '例如“潮玩币”，建议使用2至3个字',
            tips: '例: 设置后，小程序中所有”积分“内容将显示为此别名',
            newline: true,
            required: true,
          },
          {
            type: "blank",
          },
          {
            title: '显示积分充值入口',
            key: 'is_buy_enabled',
            type: 'boolean',
            // placeholder: '例如“潮玩币”，建议使用2至3个字',
            tips: '开启后充值按钮会在显示在“我的积分“界面',
            newline: true,
            required: true,
          },
          {
            type: "blank",
          },
          {
            title: '允许订单抵扣',
            key: 'is_pay_enabled',
            type: 'boolean',
            // placeholder: '例如“潮玩币”，建议使用2至3个字',
            // tips: '例: 设置后，小程序中所有”积分“内容将显示为此别名',
            newline: true,
            required: true,
          },
          {
            title: '允许抵扣类型',
            key: 'payable_order_type',
            type: 'multi_check',
            options: [
              {
                title: '商城订单',
                value: 'product'
              },
              {
                title: '盲盒订单',
                value: 'box'
              },
              {
                title: '一番赏订单',
                value: 'yifanshang'
              },
              {
                title: '福袋订单',
                value: 'fudai'
              },
				{
				  title: 'PK订单',
				  value: 'pk'
				},
            ],
            required: true,
            where: {
              is_pay_enabled: 1
            },
            tips: '不勾选的类型将无法使用积分抵扣'
            // default: 1,
          },
          {
            title: '抵扣限制',
            key: 'max_pay_percent',
            type: 'number',
            prefix: '最多不能超出订单商品金额的',
            suffix: '%',
            placeholder: '小数或整数',
            // tips: '此汇率用于订单抵扣时计算汇率',
            newline: true,
            where: {
              is_pay_enabled: 1
            }
          },
          {
            title: '抵扣汇率',
            key: 'money_to_score_ratio',
            type: 'number',
            // prefix: '1元人民币兑换',
            suffix: '积分兑换1元人民币',
            placeholder: '小数或整数',
            tips: '此汇率用于订单抵扣时计算汇率',
            newline: true,
            where: {
              is_pay_enabled: 1
            }
          },
          {
            type: "blank",
          },
          {
            title: '注册赠送',
            key: 'register_reward',
            type: "number",
            suffix: '积分',
            placeholder: '不填写则没有赠送',
            tips: '注册是指用户第一次授权登陆小程序',

            newline: true,
          },
          {
            title: '绑手机号赠送',
            key: 'bind_phone_reward',
            type: "number",
            suffix: '积分',
            placeholder: '不填写则没有赠送',
            tips: '首次绑定手机成功后赠送',
            newline: true,
          },
          {
            title: '邀请新用户送积分',
            text: '请到"分销裂变"模块设置"',
            type: "text",
            newline: true,
          },
          {
            title: '下单送积分',
            text: '请在”商品列表“ -> "分销/下单奖励"设置',
            type: "text",
            newline: true,
          }
        ]
      }
    },
    created() {
      this.$http.get(`/setting/sys/${resourceType}`).then(res => {
        this.form = res.data.setting || {}
      })
    },
    mounted() {},
    watch: {},
    methods: {
      cancel() {
        this.$router.back(-1)
      },
      submit() {
        this.$http.post(`/setting/sys/${resourceType}`, {
          setting: this.form
        }).then(res => {
          this.$message.success('保存成功')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-container {
    // padding-bottom: 120px;
  }

  .container {
    .btn {
      margin-right: 30px;
    }
  }
</style>
