<template>
  <div class="orders-wrapper">

    <div class="row" style="overflow: hidden;">
      <a-input allowClear placeholder="搜索订单号/用户名/手机号/收件人" style="width:260px; margin-right: 10px" v-model="key"></a-input>
      <a-button type="primary" @click="fetchAll">刷新列表</a-button>


      <a-radio-group v-model="orderType" buttonStyle="solid" style="margin-left: 20px;">
        <a-radio-button value="box">盲盒订单</a-radio-button>
        <a-radio-button value="product">商城订单</a-radio-button>
        <a-radio-button value="activity">活动订单</a-radio-button>
        <a-radio-button value="vip">VIP订单</a-radio-button>
      </a-radio-group>

      <!-- <a-radio-group v-model="miniapp_type" buttonStyle="solid" style="margin-left: 20px;">
        <a-radio-button value="">全部来源</a-radio-button>
        <a-radio-button value="wechat">微信</a-radio-button>
        <a-radio-button value="tmail">天猫</a-radio-button>
      </a-radio-group> -->

      <a-button style="margin-left: 30px; float: right;" type="primary" @click="isDownload = !isDownload">
        <span v-if="!isDownload">导出Excel</span>
        <span v-else>关闭导出</span>
      </a-button>

      <a-button style="margin-left: 10px; float: right;" type="primary" @click="batchDeliver">
        批量发货
      </a-button>
    </div>

    <div class="row" v-if="isDownload" style="margin-top: 10px;">
      <a-range-picker @change="onDateChange" />

      <a-select v-model="exportOptions.status" style="margin-left:15px;" placeholder="导出类型">
        <a-select-option :value="item.key" v-for="(item,index) in statusList" :key="index">导出类型: {{ item.text }}</a-select-option>
      </a-select>

      <a-button type="primary" icon="download" style="margin-left:15px;" @click="download">下载报表</a-button>
    </div>

    <a-tabs :defaultActiveKey="defaultActiveKey" @change="change">
      <a-tab-pane v-for="(item,index) in ordersData" :tab="`${item.status_text}(${ordersTotal[item.status] || 0})`"
        :key="index + ''">
        <div class="order-list">
          <OrderItem v-for="(order, idx) in item.list" :key="order.id" :info="order" @mark="handleMark(idx)"
            @set-remark="handleSetRemark(idx)" @set-address="handleSetAddress(idx)" @actions="handleActions($event, idx)">
          </OrderItem>
          <a-pagination v-if="item.list.length" showSizeChanger @showSizeChange="onShowSizeChange" @change="onShowSizeChange"
            :pageSizeOptions="pageSizeOptions" :showTotal="total => `共 ${total} 条`" :defaultCurrent="item.page" v-model="item.page"
            :total="item.total" :pageSize="item.per_page" />
        </div>
      </a-tab-pane>
    </a-tabs>

    <BatchDeliver @success="batchDeliverSuccess" @hide="isBatchDeliver=false" :isShow="isBatchDeliver"></BatchDeliver>

    <a-modal title="商家备注" style="top: 100px;" :visible.sync="visible" width="600px" @ok="handleSubmit" @cancel="visible = false"
      :confirmLoading="loading">
      <a-textarea placeholder="请输入" v-model="remark" :autosize="{ minRows: 4, maxRows: 8 }" />
    </a-modal>

    <a-modal title="用户收货地址" style="top: 100px;" :visible.sync="visible2" width="600px" @ok="handleSubmit2" @cancel="visible2 = false"
      :confirmLoading="loading2">
      <a-form class="form">
        <a-form-item label="姓名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="address.consignee" placeholder="请输入收货人姓名" />
        </a-form-item>
        <a-form-item label="手机" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="address.phone" placeholder="请输入收货人手机号" />
        </a-form-item>
        <a-form-item label="所在地区" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-cascader v-model="area" style="width: 100%;" :options="cityData" :fieldNames="fieldNames" placeholder="请选择" allowClear />
        </a-form-item>
        <a-form-item label="详细地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="address.address" placeholder="街道、楼牌号等" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal title="订单发货" style="top: 100px;" :visible.sync="visible3" width="600px" @ok="handleSubmit3" @cancel="visible3 = false"
      :confirmLoading="loading3">
      <a-form class="form">
        <a-form-item label="发货方式" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-radio-group name="radioGroup" v-model="deliverInfo.type">
            <a-radio value="express">普通物流快递</a-radio>
            <a-radio value="online" disabled>虚拟票据</a-radio>
            <a-radio value="offline_shop" disabled>到店自取</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="快递公司" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select v-model="deliverInfo.express_name" placeholder="请选择">
            <a-select-option :value="item" v-for="(item,index) in expressList" :key="index">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="快递单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" :validate-status="expressNumber.validateStatus"
          :help="expressNumber.errorMsg">
          <a-input v-model="deliverInfo.express_number" placeholder="请输入快递单号" />
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>
<script>
  import OrderItem from '@/components/OrderItem/OrderItem'
  import {
    createExport,
    getOrderList,
    getOrdersTotal,
    setOrderRemark,
    setOrderAddress,
    orderDeliver,
    getExpressList
  } from '@/api/orders'
  import cityData from '@/utils/data.city'
  import BatchDeliver from "./components/BatchDeliver"

  export default {
    name: 'Orders',
    components: {
      OrderItem,
      BatchDeliver
    },
    props: {
      type: {
        type: String
      }
    },
    data() {
      return {
        isBatchDeliver: false,
        isDownload: false,
        exportOptions: {
          status: 'all',
          startTime: '',
          endTime: ''
        },
        miniappType: '',
        orderType: 'box',
        pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
        defaultActiveKey: '0',
        ordersData: [],
        ordersTotal: {},
        statusList: [{
            text: '待处理',
            key: 'pending'
          },
          {
            text: '待发货',
            key: 'deliver_pending'
          },
          {
            text: '已发货',
            key: 'delivered'
          },
          {
            text: '已返售',
            key: 'backed'
          },
          {
            text: '全部',
            key: 'all'
          },
          {
            text: '退款中',
            key: 'close_pending'
          },
          {
            text: '标记的',
            key: 'marked'
          }
        ],
        current: {},
        remark: '',
        key: '',
        visible: false,
        loading: false,
        visible2: false,
        loading2: false,
        address: {},
        area: [],
        cityData: cityData,
        fieldNames: {
          label: 'text',
          value: 'text',
          children: 'children'
        },
        visible3: false,
        loading3: false,
        expressList: [],
        deliverInfo: {
          type: 'express',
          express_name: '顺丰快递',
          express_number: ''
        },
        expressNumber: {
          validateStatus: '',
          errorMsg: ''
        }
      }
    },
    created() {
      this.statusList.forEach(item => {
        this.ordersData.push({
          list: [],
          status: item.key,
          status_text: item.text,
          total: 0,
          page: 1,
          per_page: 10,
          loading: false,
          init: false
        })
      })

      this.fetchData()
      this.getOrdersTotal()
      this.getExpressList()
    },
    watch: {
      key(val) {
        this.ordersData.forEach(item => {
          item.init = false
        })

        this.fetchData()
        this.getOrdersTotal()
      },
      miniappType(val) {
        this.ordersData.forEach(item => {
          item.init = false
        })

        this.fetchData()
        this.getOrdersTotal()
      },
      orderType(val) {
        this.ordersData.forEach(item => {
          item.init = false
        })
      
        this.fetchData()
        this.getOrdersTotal()
      }
    },
    methods: {
      fetchAll() {
        this.fetchData()
        this.getOrdersTotal()
      },
      batchDeliverSuccess() {
        this.getOrdersTotal()
        this.fetchData()
        this.isBatchDeliver = false
      },
      onDateChange(date, dateString) {
        this.exportOptions.startTime = dateString[0]
        this.exportOptions.endTime = dateString[1]
      },
      download() {
        createExport({
          ...this.exportOptions
        }).then(res => {
          const tempwindow = window.open()
          tempwindow.location = process.env.VUE_APP_BASE_URL + `/${res.data.url}`
          // window.open(process.env.VUE_APP_BASE_URL + `/${res.data.url}`, '_blank')
        }).finally(() => {})
      },
      getExpressList() {
        getExpressList().then(res => {
          this.expressList = res.data.list
        })
      },
      getOrdersTotal() {
        getOrdersTotal({
          key: this.key,
          type: current.orderType
        }).then(res => {
          this.ordersTotal = res.data.stat
        })
      },
      handleActions(type, idx) {
        this.current = this.ordersData[this.defaultActiveKey].list[idx]
        switch (type) {
          case '订单发货':
            this.deliverInfo.express_number = ''
            this.expressNumber = {}
            this.visible3 = true
            break
          case '同意退款':
            {
              this.$confirm({
                title: '提示',
                content: `取消订单并同意退款吗？退款将全额原路退回给客户`,
                onOk: () => {
                  this.$http({
                    url: `/orders/${this.current.uuid}`,
                    method: 'PATCH',
                    data: {
                      type: 'close_and_refund'
                    }
                  }).then(res => {
                    this.$message.success('退款成功')
                    this.fetchData()
                    this.getOrdersTotal()
                  })
                }
              })
              break
            }
          case '部分退款':
            {
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
                  })
                }
              })
            }
        }
      },
      handleSubmit3() {
        if (!this.deliverInfo.express_number) {
          this.expressNumber = {
            validateStatus: 'error',
            errorMsg: '请输入快递单号'
          }
          return
        }
        this.loading3 = true
        orderDeliver(this.current.uuid, this.deliverInfo).then(res => {
          this.loading3 = false
          this.visible3 = false
          this.ordersData.forEach(item => {
            item.init = false
          })
          this.fetchData()
          this.getOrdersTotal()
        })
      },
      handleSubmit() {
        if (!this.remark) return
        this.loading = true
        setOrderRemark(this.current.uuid, this.remark).then(res => {
          this.loading = false
          this.visible = false
          this.fetchData()
        })
      },
      batchDeliver() {
        this.isBatchDeliver = true
      },
      handleMark(idx) {
        this.current = this.ordersData[this.defaultActiveKey].list[idx]

        let type = this.current.marked_at ? 'unmark' : 'mark';
        this.$http({
          url: '/orders/' + this.current.uuid,
          method: 'PATCH',
          data: {
            type: type
          }
        }).then(res => {
          this.getOrdersTotal()
          this.fetchData()
          this.$message.success('操作成功')
        })
      },
      handleSetRemark(idx) {
        this.visible = true
        this.current = this.ordersData[this.defaultActiveKey].list[idx]
        this.remark = this.current.seller_remark || ''
      },
      handleSubmit2() {
        this.loading2 = true
        setOrderAddress(this.current.uuid, {
          province: this.area[0],
          city: this.area[1],
          district: this.area[2],
          address: this.address.address,
          consignee: this.address.consignee,
          phone: this.address.phone
        }).then(res => {
          this.loading2 = false
          this.visible2 = false
          this.fetchData()
        })
      },
      handleSetAddress(idx) {
        this.visible2 = true
        this.current = this.ordersData[this.defaultActiveKey].list[idx]
        this.address = this.current.address
        this.area = [this.address.province, this.address.city, this.address.district]
      },
      change(e) {
        this.defaultActiveKey = e
        if (!this.ordersData[this.defaultActiveKey].init) {
          this.fetchData()
        }
      },
      onShowSizeChange(e, size) {
        const current = this.ordersData[this.defaultActiveKey]
        current.page = e
        current.per_page = size
        this.fetchData()
      },
      fetchData() {
        const current = this.ordersData[this.defaultActiveKey]
        const sendData = {
          key: this.key,
          page: current.page,
          per_page: current.per_page,
          status: current.status,
          type: current.orderType
        }
        current.loading = true
        getOrderList(sendData).then(res => {
          current.list = res.data.list
          current.total = res.data.item_total
          current.init = true
        }).finally(() => {
          current.loading = false
        })
      }
    }
  }
</script>
<style lang="scss">
  .orders-wrapper {
    padding: 0px;
    background-color: #fff;
  }

  .order-list {
    padding-bottom: 100px;
  }
</style>
