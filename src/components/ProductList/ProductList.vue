<template>
  <a-modal
    width="1000px"
    title="商品列表"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <div class="header-action" style="margin-bottom: 15px;">
      <a-input-search
        placeholder="输入关键字"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      size="small"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: type}"
      @change="currentChange"
    >
      <a-table-column
        title="商品"
        key="product_info"
      >
        <template slot-scope="row">
          <div class="product-info">
            <div class="thumb" :style="`background-image:url(${row.thumb})`"></div>
            <div class="info-meta">
              <div class="title">
                <span>{{ row.title }}</span>&nbsp;
              </div>
            </div>
          </div>
        </template>
      </a-table-column>
      <a-table-column
        key="price"
        width="120px"
        dataIndex="price"
      >
        <div slot="title">
          <span>显示价格&nbsp;</span>
          <a-tooltip placement="topLeft" >
            <template slot="title">
              <span>商品显示价格为所有SKU最低价格，修改价格请直接修改SKU价格</span>
            </template>
            <a-icon type="question-circle"/>
          </a-tooltip>
        </div>
        <template slot-scope="price">
          <div><span>¥{{ price | priceToFixed }}</span></div>
        </template>
      </a-table-column>
      <a-table-column
        title="SKU库存"
        key="skus"
        width="180px"
      >
        <template slot-scope="row">
          <span>{{ row.skus_count }}&nbsp;SKU</span>&nbsp;
        </template>
      </a-table-column>
      <a-table-column
        title="库存"
        key="stock"
        width="100px"
      >
        <template slot-scope="row">
          <span>{{ row.stock || 0 }}&nbsp;件</span>
        </template>
      </a-table-column>
    </a-table>
  </a-modal>
</template>
<script>
import { getProductList } from '@/api/products'
import moment from 'moment'
export default {
  name: 'ProductList',
  props: {
    type: {
      type: String,
      default: 'radio'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedRowKeys: [],
      confirmLoading: false,
      list: [],
      page: 1,
      per_page: 10,
      total: 0
    }
  },
  computed: {
    pagination () {
      return {
        defaultPageSize: this.per_page,
        defaultCurrent: this.page,
        total: this.total
      }
    }
  },
  filters: {
    priceToFixed (value) {
      return value ? (value / 100).toFixed(2) : '0.00'
    },
    formatDate (value) {
      return value ? moment(value).format('YYYY-MM-DD hh:mm') : ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    currentChange (pagination) {
      this.page = pagination.current
      this.fetchData()
    },
    onSearch () {},
    onSelectChange (e) {
      this.selectedRowKeys = e
    },
    handleCancel () {
      this.$emit('cancel')
    },
    handleOk () {
      const arr = []
      this.list.forEach(item => {
        if (this.selectedRowKeys.indexOf(item.uuid) > -1) {
          arr.push(item)
        }
      })
      this.$emit('ok', arr)
    },
    fetchData () {
      this.confirmLoading = true
      getProductList({
        page: this.page,
        per_page: this.per_page
      }).then(res => {
        this.list = res.data.list
      }).finally(() => {
        this.confirmLoading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.table {
  .product-info {
    display: flex;
    .thumb {
      width: 50px;
      height: 50px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-right: 10px;
      border-radius: 4px;
    }
    .title {
      font-weight: 500;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      margin-bottom: 4px;
    }
    .brand {
      color: rgba(0, 0, 0, 0.45);
      font-size: 13px;
      line-height: 22px;
    }
  }
}
</style>
