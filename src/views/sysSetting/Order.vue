<template>
  <div class="container">

    <!-- <div style="margin-bottom: 20px;">
      <a-radio-group v-model="subType" buttonStyle="solid" style="margin-right: 20px;">
        <a-radio-button value="return_sale">返售设置</a-radio-button>
        <a-radio-button value="box">盲盒房间(大盒)弹幕</a-radio-button>
        <a-radio-button value="small_box">盲盒开盒(小盒)页弹幕</a-radio-button>
      </a-radio-group>
    </div> -->


    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
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

  const resourceType = 'order'

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
        categoryList: [],
        subType: 'return_sale'
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
            title: '允许回收',
            key: 'is_return_sale_enable',
            type: 'boolean',
            default: 0,
            // span: 12,
            tips: '请在合法合规的回收场景下开启此功能。',
            newline: true,
            required: true,
          },
          {
            title: '回收/挂售折价率',
            key: 'return_ratio',
            type: 'number',
            placeholder: '默认为0.7',
            // span: 12,
            tips: '例: 7折请填写0.7。 返售原价为100元，则进行折价后的返售价为70元，积分支付同理',
            newline: true,
            required: true,
            // where: {
            //   is_return_sale_enable: 1
            // }
          },
          {
            title: '人民币部分退款方式',
            key: 'return_type',
            type: 'radio',
            placeholder: '默认为0.7',
            span: 24,
            options: [{
                title: '原路退回',
                value: 'money'
              },
              {
                title: '退回用户的平台余额(红包)',
                value: 'redpack'
              },
              {
                title: '兑换成积分退回积分余额',
                value: 'score'
              },
            ],
            tips: '注: 三种方式退回前都会按上面的返售折扣进行折价。',
            newline: true,
            required: true,
            // where: {
            //   is_return_sale_enable: 1
            // }
          },
          {
            title: '积分兑换比例',
            key: 'money_to_score_ratio',
            type: 'number',
            placeholder: '默认为1',
            span: 12,
            prefix: '折价后每1元兑换',
            suffix: '积分',
            tips: '此比例仅在返售退款时起作用。<br/> 如商品原价为100元，折价率0.7，积分兑换比例为1，则返售退70积分',
            newline: true,
            required: true,
            where: {
              return_type: 'score'
            }
          },
          {
            type: "blank",
          },
          // {
          //   title: '盲盒订单线下核销',
          //   key: 'is_offline_use',
          //   type: 'boolean',
          //   default: 0,
          //   // span: 12,
          //   tips: '开启此功能后，小程序端盒柜订单会显示核销码入口',
          //   newline: true,
          //   required: true,
          // },
          {
            title: '隐藏选择发货按钮',
            key: 'is_hide_deliver_btn',
            type: 'boolean',
            default: 0,
            // span: 12,
            tips: '开启此按钮后小程序端不再显示“选择发货按钮”',
            newline: true,
            required: true,
          },
          {
            title: '发货时提示语',
            key: 'deliver_tips',
            // type: 'boolean',
            default: 0,
            placeholder:  '不填则默认显示"商品一经寄出，非质量问题不支持退换“',
            span: 16,
            tips: '显示在确认发货的弹窗内',
            newline: true,
            // required: true,
          },
          // {
          //   type: "blank",
          // },
          // {
          //   title: '盲盒发货运费',
          //   key: 'box_carriage',
          //   placeholder: '默认为包邮',
          //   type: 'price',
          //   newline: true,
          //   required: true,
          // },
          // {
          //   title: '普通商品运费',
          //   key: 'product_carriage',
          //   placeholder: '默认为包邮',
          //   type: 'price',
          //   newline: true,
          //   required: true,
          // },
        ]
      }
    },
    created() {
      this.$http.get(`/setting/sys/${resourceType}`).then(res => {
        this.form = res.data.setting || {}
        this.$set(this.form, 'return_type', this.form.return_type || 'money')
        // this.form.return_type = this.form.return_type || 'money'
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
