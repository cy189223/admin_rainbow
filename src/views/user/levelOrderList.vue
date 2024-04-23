<template>
  <div class="container">
    <div class="row" style="overflow: hidden;">

      <a-input allowClear placeholder="订单号/商品/用户名/手机号" style="width:210px; margin-right: 10px" v-model="key">
      </a-input>
      <a-button type="primary" @click="refresh">刷新</a-button>

      <!-- <a-radio-group v-model="orderType" buttonStyle="solid" style="margin-left: 20px;">
        <a-radio-button value="package">提货订单({{orderStat.package_all || 0}})</a-radio-button>
        <a-radio-button value="product">商城订单({{orderStat.product_all || 0}})</a-radio-button>
        <a-radio-button value="activity">活动订单({{orderStat.activity_all || 0}})</a-radio-button>
        <a-radio-button value="other">其它订单({{orderStat.other_all || 0}})</a-radio-button>
      </a-radio-group> -->

      <a href="javascript:;" style="margin-left: 10px;" @click="isFilter = !isFilter">高级筛选</a>
      <!-- <span>高级筛选</span> -->

      <a-button style="margin-left: 30px; float: right;" type="primary" @click="isExport = !isExport">
        <span>导出Excel</span>
      </a-button>

      <a-button style="margin-left: 10px; float: right;" type="primary" @click="isBatchDeliver = true">
        批量发货
      </a-button>
    </div>

    <div class="filter-c" v-if="isFilter">
      <div>
        <span class="key">下单时间: </span>
        <iDatePicker showTime style="margin-left: 10px;" v-model="filter.start_at"></iDatePicker>
        <span style="margin-left: 10px;">至</span>
        <iDatePicker showTime style="margin-left: 10px;" v-model="filter.end_at"></iDatePicker>
      </div>
      <div style="margin-left: 20px;">
        <span class="key">商品金额: </span>
        <a-input style="width: 80px;" placeholder="元" v-model="filter.money_price_min"></a-input>
        <span style="margin:0px 6px;">至</span>
        <a-input style="width: 80px;" placeholder="元" v-model="filter.money_price_max"></a-input>
      </div>
      <a-button style="margin-left: 10px; float: right;" type="primary" @click="refresh">
        筛选
      </a-button>
    </div>

    <div class="tab-list">
      <div class="item" @click="status = item.key" :class="{actived: status === item.key}"
        v-for="(item, index) in statusList">
        {{item.text}} ({{orderStat[item.key] || 0}})
      </div>
    </div>

    <div class="order-list">
      <OrderItem v-for="(item, idx) in list" :key="item.id" :info="item" @mark="handleMark(idx)"
        @set-remark="handleSetRemark(idx)" @set-address="handleSetAddress(idx)"
        @edit-deliver-info="handleEditDeliverInfo(idx)" @actions="handleActions($event, idx)">
      </OrderItem>
      <NoData v-if="!list.length"></NoData>

      <a-pagination v-if="list.length" :showSizeChanger="true" @showSizeChange="onShowSizeChange" :showTotal="total => `共 ${total} 条`" :defaultCurrent="page" v-model="page"
        :total="itemTotal" :pageSize="perPage" @change="pageChange" />
    </div>

    <BatchDeliver @success="batchDeliverSuccess" @hide="isBatchDeliver=false" :isShow="isBatchDeliver"></BatchDeliver>

    <ExportPopup @hide="isExport=false" :isShow="isExport"></ExportPopup>

    <AftersalePopup @refresh="fresh()" v-if="isAftersale" @hide="isAftersale=false" :order="current" :isShow="isAftersale" ></AftersalePopup>
  </div>
</template>
<script>
  import OrderItem from './components/OrderItem'
  import {
    // getOrderList,
    // getOrdersTotal,
    setOrderRemark,
    setOrderAddress,
    orderDeliver,
    getExpressList
  } from '@/api/orders'
  import BatchDeliver from "./components/BatchDeliver"
  import ExportPopup from "./components/ExportPopup"
  import AftersalePopup from "./components/AftersalePopup"
  import IDatePicker from "@/components/IDatePicker/IDatePicker.vue"

  export default {
    name: 'OrderList',
    components: {
      OrderItem,
      BatchDeliver,
      ExportPopup,
      AftersalePopup,
      IDatePicker
    },
    props: {},
    data() {
      return {
        // actived: 'on_stock',
        // statusTotal: {
        //   on_stock: 0,
        //   off_stock: 0,
        //   sell_out: 0,
        //   marked: 0
        // },
        isBatchDeliver: false,
        isAftersale: false,
        isFilter: false,
        isDownload: false,
        miniappType: '',
        orderType: 'package',
        isExport: false,
        filter: {
          start_at: '',
          end_at: ''
        },
        statusList: [
          // {
          //   text: '待处理',
          //   key: 'pending'
          // },
          {
            text: '待发货',
            key: 'deliver_pending'
          },
          {
            text: '已发货',
            key: 'delivered'
          },
          {
            text: '已完成',
            key: 'completed'
          },
          {
            text: '全部',
            key: 'all'
          }
        ],
        list: [],
        key: "",
        status: 'deliver_pending',
        orderStat: {},
        itemTotal: 0,
        page: 1,
        perPage: 6,
        current: {},
        expressList: []
      }
    },
    created() {
      this.refresh()

      // 快递
      getExpressList().then(res => {
        this.expressList = res.data.list
      })
    },
    watch: {
      status() {
        this.refresh()
      },
      orderType() {
        this.refresh()
      },
      key() {
        this.refresh()
      },
      page() {
        this.fetchData()
        this.fetchStatData()
      },
      perPage() {
        this.fetchData()
        this.fetchStatData()
      }
    },
    methods: {
      pageChange(e) {
        this.page = e
      },
      onShowSizeChange (current, pageSize) {
        // console.log(current, pageSize)
        this.page = 1
        this.perPage = pageSize
      },
      refresh() {
        this.page = 1
        this.fetchData()
        this.fetchStatData()
      },
      fresh() {
        this.fetchData()
        this.fetchStatData()
      },
      fetchStatData() {
        this.$http.get('/user-level-prizes-state/total', {
          params: {
            key: this.key,
            type: this.orderType,
            created_at_start: this.filter.start_at,
            created_at_end: this.filter.end_at,
            money_price_min: this.filter.money_price_min ? this.filter.money_price_min * 100 : '',
            money_price_max: this.filter.money_price_max ? this.filter.money_price_max * 100 : '',
          }
        }).then(res => {
          this.orderStat = res.data.info
        })
      },
      fetchData() {
        this.$http.get('/user-level-prizes', {
          params: {
            per_page: this.perPage,
            page: this.page,
            status: this.status,
            type: this.orderType,
            key: this.key,
            created_at_start: this.filter.start_at,
            created_at_end: this.filter.end_at,
            money_price_min: this.filter.money_price_min ? this.filter.money_price_min * 100 : '',
            money_price_max: this.filter.money_price_max ? this.filter.money_price_max * 100 : '',
          }
        }).then(res => {
          this.list = res.data.list
          this.itemTotal = res.data.item_total
		  console.log(this.list)
        })
      },
      deliver() {
        this.$iForm.show({
          frame: [{
              title: '发货方式',
              type: 'radio',
              key: 'express_type',
              span: 24,
              default: 'express',
              options: [{
                  title: '普通物流快递',
                  value: 'express'
                },
                {
                  title: '无需物流',
                  value: 'other',
                }
              ]
            },
            {
              title: '快递公司',
              type: 'select',
              key: 'express_name',
              newline: true,
              options: this.expressList,
              where: {
                express_type: 'express'
              }
            },
            {
              title: '快递单号',
              newline: true,
              key: 'express_number',
              placeholder: '快递单号',
              where: {
                express_type: 'express'
              }
            },
            // {
            //   title: '发货说明',
            //   newline: true,
            //   key: 'remark',
            //   placeholder: '说明(选填)',
            //   tips: '此说明会显示在用户前端'
            // },
          ],
          success: (data) => {
			  console.log(data)
            if (data.express_type == 'express') {
              if (!data.express_number) {
                this.$message.warn('请填写单号')
                return false
              }
              if (!data.express_name) {
                this.$message.warn('请选择快递公司')
                return false
              }
            }
			
			this.$http({
			  url: `/user-level-prizes/${this.current.uuid}`,
			  method: 'PATCH',
			  data: {
			    type: 'deliver',
			    ...data
			  }
			}).then(res => {
			  this.fetchData()
			  this.fetchStatData()
			  this.$message.success('发货成功')
			  this.$iForm.hide()
			})
			
            // orderDeliver(this.current.uuid, data).then(res => {
            //   // this.refresh()
            //   this.fetchData()
            //   this.fetchStatData()
            //   this.$message.success('发货成功')
            //   this.$iForm.hide()
            // })
          }
        })
      },
      batchDeliverSuccess() {
        this.refresh()
        this.isBatchDeliver = false
      },
      handleActions(type, idx) {
        this.current = this.list[idx]
        switch (type) {
          case '订单发货':
            this.deliver()
            // this.deliverInfo.express_number = ''
            // this.expressNumber = {}
            // this.visible3 = true
            break
          case '查看售后':
            this.isAftersale = 1
            // this.deliverInfo.express_number = ''
            // this.expressNumber = {}
            // this.visible3 = true
            break
          case '同意退款': {
            this.$iForm.show({
              title: '同意退款(请确认退款金额)',
              frame: [{
                  type: 'price',
                  key: 'money',
                  title: '退款金额(人民币)',
                  default: this.current.pay_money_price,
                  tips: '请不要超出' + (this.current.pay_money_price / 100) + '元，超出订单支付金额会造成退款失败',
                  // required: true
                },
                {
                  type: 'text',
                  text: this.current.pay_score_price,
                  title: '退款金额(积分)',
                  default: 1000
                },
              ],
              success: (data) => {
                this.$http({
                  url: `/orders/${this.current.uuid}`,
                  method: 'PATCH',
                  data: {
                    type: 'close_and_refund',
                    ...data
                  }
                }).then(res => {
                  this.$message.success('退款成功');
                  this.$iForm.hide()
                  this.fetchData()
                  this.fetchStatData()
                })
              }
            })
            break
          }
          case '部分退款': {
            this.$message.warn('部分退款功能维护中~')
            return false
            this.$globalForm.show({
              title: '为用户部分退款（款项将原路退回）',
              items: [{
                type: 'string',
                key: 'money',
                title: '退款金额',
                placeholder: '最多 ' + (this.current.pay_price / 100) + '元',
                required: true
              }, ],
              success: (data) => {
                this.$http({
                  url: `/orders/${this.current.uuid}`,
                  method: 'PATCH',
                  data: {
                    type: 'part_refund',
                    ...data
                  }
                }).then(res => {
                  this.$message.success('部分退款成功');
                  this.$globalForm.hide()
                  this.fetchData()
                  this.fetchStatData()
                })
              }
            })
          }
          case '退款并关闭': {
            this.$iForm.show({
              title: '退款并关闭订单',
              frame: [{
                  type: 'price',
                  key: 'refund_money',
                  title: '原路退款',
                  default: this.current.pay_money_price,
                  tips: '原路退回指退回用户银行卡或微信钱包 <br/>金额不能超出当前订单实付金额(' + (this.current.pay_money_price / 100) + '元)',
                  // required: true
                },
                {
                  type: 'price',
                  key: 'refund_balance',
                  title: '退回余额',
                  default: 0,
                  tips: '实时退回用户帐户余额, 可作为补偿部分填写',
                  // required: true
                },
                {
                  type: 'text',
                  text: this.current.redpack_discount / 100  + '元',
                  key: 'refund_score',
                  title: '红包抵扣退款',
                  tips: '此为用户使用的红包抵扣的退款',
                  default: 1000
                },
                {
                  type: 'text',
                  text: (this.current.pay_score_price + this.current.score_used),
                  key: 'refund_score',
                  title: '积分退款',
                  tips: '此为用户使用的支付或抵扣的积分的退款',
                  default: 1000
                },
              ],
              success: (data) => {
                if (data.refund_money > this.current.pay_money_price) {
                  this.$message.error('原路退回金额不能超订单实付人民币金额~')
                  return false
                }
                this.$http({
                  url: `/orders/${this.current.uuid}`,
                  method: 'PATCH',
                  data: {
                    type: 'close_and_refund',
                    ...data
                  }
                }).then(res => {
                  this.$message.success('退款成功');
                  this.$iForm.hide()
                  this.fetchData()
                  this.fetchStatData()
                })
              }
            })

            // this.$confirm({
            //   title: '提示',
            //   content: `确认关闭订单并退款吗？支付的人民币及积分将全额原路退回给客户`,
            //   onOk: () => {
            //     this.$http({
            //       url: `/orders/${this.current.uuid}`,
            //       method: 'PATCH',
            //       data: {
            //         type: 'close_and_refund'
            //       }
            //     }).then(res => {
            //       this.$message.success('退款成功')
            //       this.fetchData()
            //       this.fetchStatData()
            //     })
            //   }
            // })
            break
          }
          case '取消退款': {
            this.$confirm({
              title: '确认取消退款',
              content: `取消退款后订单将变为申请退款前的状态`,
              onOk: () => {
                this.$http({
                  url: `/orders/${this.current.uuid}`,
                  method: 'PATCH',
                  data: {
                    type: 'cancel_refund'
                  }
                }).then(res => {
                  this.$message.success('关闭成功')
                  this.fetchData()
                  this.fetchStatData()
                })
              }
            })
            break
          }
          case '撤回物品仓库': {
            this.$confirm({
              title: '确认撤回到物品仓库',
              content: `撤回后订单将关闭并退回运费（如果有）。订单内物品会回到用户仓库中待用户回收或再次发货, 请谨慎操作!`,
              onOk: () => {
                this.$http({
                  url: `/orders/${this.current.uuid}`,
                  method: 'PATCH',
                  data: {
                    type: 'reset_to_package'
                  }
                }).then(res => {
                  this.$message.success('撤回成功')
                  this.fetchData()
                  this.fetchStatData()
                })
              }
            })
            break
          }
        }
      },
      handleMark(idx) {
        this.current = this.list[idx]
        let type = this.current.marked_at ? 'unmark' : 'mark';
        this.$http({
          url: '/orders/' + this.current.uuid,
          method: 'PATCH',
          data: {
            type: type
          }
        }).then(res => {
          this.refresh()
          this.$message.success('操作成功')
        })
      },
      handleSetRemark(idx) {
        this.current = this.list[idx]
        this.$iForm.show({
          frame: [{
            title: '商家备注',
            type: 'textarea',
            tips: '此备注仅显示在管理后台，用户无法看到',
            key: 'remark',
            span: 24,
            default: this.current.seller_remark,
          }],
          success: (data) => {
            setOrderRemark(this.current.uuid, data.remark).then(res => {
              this.fetchData()
              this.$message.success('更新成功')
              this.$iForm.hide()
            })
          }
        })
      },
      handleSetAddress(idx) {
        this.current = this.list[idx]
        let address = this.current.address || {}
        this.$iForm.show({
          title: '更改收货地址',
          frame: [{
              title: '收件人',
              type: 'input',
              key: 'consignee',
              span: 24,
              default: address.consignee,
            },
            {
              title: '手机号',
              type: 'input',
              key: 'phone',
              span: 24,
              default: address.phone,
            },
            {
              title: '所在地区',
              type: 'address',
              key: 'area',
              span: 24,
              default: [address.province, address.city, address.district],
            },
            {
              title: '详细地址',
              type: 'textarea',
              key: 'address',
              span: 24,
              default: address.address,
            }
          ],
          success: (data) => {
            setOrderAddress(this.current.uuid, {
              province: data.area[0],
              city: data.area[1],
              district: data.area[2],
              address: data.address,
              consignee: data.consignee,
              phone: data.phone
            }).then(res => {
              this.refresh()
              this.$message.success('更新成功')
              this.$iForm.hide()
            })
          }
        })
      },
      handleEditDeliverInfo(idx) {
        this.current = this.list[idx]
        let form = this.current.deliver_record || {}
        this.$iForm.show({
          form: form,
          frame: [{
              title: '发货方式',
              type: 'radio',
              key: 'type',
              span: 24,
              default: 'express',
              options: [{
                  title: '普通物流快递',
                  value: 'express'
                },
                {
                  title: '无需物流',
                  value: 'other',
                }
              ]
            },
            {
              title: '快递公司',
              type: 'select',
              key: 'express_name',
              newline: true,
              options: this.expressList,
              where: {
                type: 'express'
              }
            },
            {
              title: '快递单号',
              newline: true,
              key: 'express_number',
              placeholder: '快递单号',
              where: {
                type: 'express'
              }
            },
            {
              title: '发货说明',
              newline: true,
              key: 'remark',
              placeholder: '说明(选填)',
              tips: '此说明会显示在用户前端'
            },
          ],
          success: (data) => {
            if (data.type == 'express') {
              if (!data.express_number) {
                this.$message.warn('请填写单号')
                return false
              }
              if (!data.express_name) {
                this.$message.warn('请选择快递公司')
                return false
              }
            }

            this.$http.put(`/orders/${this.current.uuid}`, {
              type: 'update_deliver_info',
              deliver_info: data,
            }).then(res => {
              // this.refresh()
              this.fetchData()
              this.fetchStatData()
              this.$message.success('发货成功')
              this.$iForm.hide()
            })
          }
        })
      },
    }
  }
</script>
<style lang="scss">
  .empty-tips {
    color: gray;
    margin-left: 100px;
    margin-top: 80px;
  }

  .filter-c {
    // margin: 20px 0px 0px 0px;
    margin-top: 10px;
    padding: 10px 10px 10px 10px;
    background: #F7F8FA;

    display: flex;

    .key {
      font-weight: 500;
    }
  }

  .orders-wrapper {
    padding: 0px;
    background-color: #fff;
  }


  .tab-list {
    display: flex;
    margin-top: 20px;
    border-bottom: 1px solid #e1e1e1;

    .item {
      margin-right: 30px;
      padding: 0px 10px 4px 10px;
      cursor: pointer;
      font-weight: 500;

      &.actived {
        color: #1890FF;
        border-bottom: 3px solid #1890FF;
      }

      &:hover {
        color: #1890FF;
      }
    }
  }

  .order-list {
    padding-bottom: 100px;
    margin-top: 20px;
  }
</style>
