<template slot-scope="row">
  <div>
    <div  class="left">
      <div>
        分销佣金:
        <span v-if="info.brokerage_money">
          {{info.brokerage_money / 100}}元
        </span>
        <span v-else>-</span>
      </div>
      <div>
        下单赠送:
        <span v-if="info.order_reward">
          已设置
        </span>
        <span v-else>-</span>
      </div>
    </div>
    <div class="right">
      <a href="javascript:;" @click="edit(row)">编辑</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      },
      updateFun: {
        type: Function
      }
    },
    filters: {},
    methods: {
      formatPrice(price) {
        return (price / 100).toFixed(2)
      },
      edit () {
        this.$iForm.show({
          title: '分销推广设置',
          frame: [
            {
              span: 24,
              title: '上级佣金',
              key: 'brokerage_money',
              default: this.info.brokerage_money,
              type: 'price',
              suffix: '元',
              tips: '选填: 订单完成后发放给直接上级的红包余额中',
              newline: true,
            },
            {
              span: 24,
              title: '上上级佣金',
              key: 'second_brokerage_money',
              default: this.info.second_brokerage_money,
              type: 'price',
              suffix: '元',
              tips: '选填: 订单完成后发放到上上级的红包余额中',
              newline: true,
            },
            {
              type: "blank",
              newline: true,
            },
            {
              title: '下单赠送',
              key: 'order_reward',
              span: 24,
              default: this.info.order_reward,
              type: 'assets',
              // suffix: '积分',
              tips: '赠送到下单用户的帐号上，每下单1个sku赠送一份，下单多sku多份叠加赠送<br/><br/>用户支付成功后立即赠送到用户的帐号上，订单退款时不会收回赠送的虚拟资产<br/><span style="color:red;">（设置后需谨慎审核此类商品的退款）</span>',
              newline: true,
            }
          ],
          success: (data) => {
            this.$emit('update', data)
          }
        })
      }
    },
    computed: {
    }
  }
</script>

<style lang="scss" scoped>
  .left {
    font-size: 86%;
  }
</style>
