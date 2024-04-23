<template>
  <a-modal title="导出订单" style="top: 100px;" :visible="isShow" width="600px" @ok="handleOk" @cancel="handleCancel"
    okText="确认导出">
    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
    共查询到 {{itemTotal}} 条订单
  </a-modal>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import IForm from "@/components/IForm"

  import {
    createExport
  } from '@/api/orders'

  export default {
    components: {
      IForm
    },
    props: {
      isShow: {
        type: Boolean
      }
    },
    computed: {
      ...mapGetters(['baseUrl']),
      uploadUrl() {
        return `${this.baseUrl}/admin-api/batch-deliver`
      },
      frame() {
        return [{
            title: '订单类型',
            key: 'type',
            type: 'select',
            newline: true,
            required: true,
            options: this.orderTypeList
          },
          {
            title: '订单状态',
            key: 'status',
            type: 'select',
            newline: true,
            required: true,
            options: this.statusList
          },
          {
            title: '包含SKU',
            key: 'sku_number',
            newline: true,
            placeholder: '输入SKU编号'
          },
          {
            title: '创建时间(始)',
            key: 'created_at_start',
            type: 'date',
            newline: true,
          },
          {
            title: '创建时间(未)',
            key: 'created_at_end',
            type: 'date',
            newline: true,
          },
          {
            title: '支付时间(始)',
            key: 'paid_at_start',
            type: 'date',
            newline: true,
          },
          {
            title: '支付时间(未)',
            key: 'paid_at_end',
            type: 'date',
            newline: true,
          }
        ]
      }
    },
    data() {
      return {
        form: {
          type: 'all',
          status: 'all',
          start_at: '',
          end_at: ''
        },
        itemTotal: 0,
        orderTypeList: [{
            title: '全部类型',
            value: 'all'
          },
          {
            title: '提货订单',
            value: 'package'
          },
          {
            title: '商城订单',
            value: 'product'
          },
          {
            title: '活动订单',
            value: 'activity'
          },
          {
            title: 'VIP订单',
            value: 'vip'
          },
          {
            title: '充值订单',
            value: 'asset'
          }
        ],
        statusList: [{
            title: '全部状态',
            value: 'all'
          },
          {
            title: '待发货',
            value: 'deliver_pending'
          },
          {
            title: '已发货',
            value: 'delivered'
          },
          {
            title: '已核销',
            value: 'offline_used'
          },
          {
            title: '退款中',
            value: 'close_pending'
          },
          {
            title: '标记的',
            value: 'marked'
          }
        ],
      }
    },
    watch: {
      form: {
        handler(new_value, old_value) {
          this.$http.post('/export/order-total', this.form).then(res => {
            this.itemTotal = res.data.total
          })
        },
        deep: true
      }
    },
    mounted () {
      this.$http.post('/export/order-total', this.form).then(res => {
        this.itemTotal = res.data.total
      })
    },
    methods: {
      handleChange({
        file,
        fileList
      }) {},
      handleOk() {
        createExport({
          ...this.form
        }).then(res => {
          const tempwindow = window.open()
          tempwindow.location = process.env.VUE_APP_BASE_URL + `${res.data.url}`
          // window.open(process.env.VUE_APP_BASE_URL + `/${res.data.url}`, '_blank')
        }).finally(() => {})
      },
      handleCancel() {
        this.$emit('hide')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tips {
    color: gray;
    font-size: 80%;
  }
</style>
