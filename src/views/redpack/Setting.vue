<template>
  <div class="container">
    <IForm :formFrame="frame" labelWidth="200px" class="form-container" :formData.sync="form"></IForm>
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

  const resourceType = 'redpack'

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
            title: '单个订单最高抵扣比例',
            key: 'order_rate',
            type: 'number',
            placeholder: '默认为10',
            tips: '例: 10%表示100元的订单最多可使用10元红包',
            suffix: '%',
            span: 16,
            newline: true,
            required: true,
          },
          {
            type: "blank",
          },
          {
            title: '显示余额充值入口',
            key: 'is_buy_enabled',
            type: 'boolean',
            // placeholder: '例如“潮玩币”，建议使用2至3个字',
            tips: '开启后充值按钮会在显示在“我的余额“界面',
            newline: true,
            required: true,
          },
          {
            type: "blank",
          },
          {
            title: '是否允许余额提现',
            key: 'is_withdraw_enabled',
            type: 'boolean',
            // default: 1,
            tips: '不开启此处将无法提现'
          },
          {
            title: '注册时间限制',
            key: 'min_register_time',
            type: 'number',
            prefix: '注册时间超过',
            suffix: '小时后才能申请提现',
            default: 0,
            // required: true,
            tips: '填0或不填为不限制',
            where: {
              is_withdraw_enabled: 1
            },
          },
          {
            title: '提现方式',
            key: 'withdraw_gateway',
            type: 'multi_check',
            options: [
              {
                title: '微信付款(自动)',
                value: 'wechat_pay_auto'
              },
              {
                title: '微信转帐(手动)',
                value: 'wechat_pay'
              },
              {
                title: '银行卡(手动)',
                value: 'bank'
              },
              {
                title: '支付宝(手动)',
                value: 'alipay'
              },
            ],
            required: true,
            where: {
              is_withdraw_enabled: 1
            },
            tips: '开启“微信付款(自动)”需要先在微信商户平台中开通企业付款功能，<a target="_blank" href="https://www.yuque.com/u1307645/mwy3k3/cuapr2">点击查看如何开通</a>'
            // default: 1,
          },
          {
            title: '自动付款审核线',
            key: 'audit_line',
            type: 'price',
            prefix: '超过',
            suffix: '时需要人工审核',
            default: 200,
            required: true,
            where: {
              is_withdraw_enabled: 1
            },
          },
          {
            title: '最低提现金额',
            key: 'min_withdraw',
            type: 'price',
            // suffix: '元',
            tips: '不填或填0为不限制',
            where: {
              is_withdraw_enabled: 1
            },
          },
          {
            title: '最高提现金额',
            key: 'max_withdraw',
            type: 'price',
            // suffix: '元',
            tips: '不填或填0为不限制',
            where: {
              is_withdraw_enabled: 1
            },
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
    padding-bottom: 120px;
  }

  .container {
    .btn {
      margin-right: 30px;
    }
  }
</style>
