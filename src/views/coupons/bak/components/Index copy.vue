<template>
  <div class="page-content">
    <div class="header-content">
      <a-input
        class="input"
        placeholder="输入关键字"
        allowClear
      />
      <a-button type="primary" icon="plus" @click="handleClick">添加优惠券</a-button>
    </div>
    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      bordered
      style="margin-top:15px;"
    >
      <a-table-column
        title="标题"
        dataIndex="title"
        key="title"
        width="130px"
      />
      <a-table-column
        title="优惠类型"
        width="80px"
      >
        <template slot-scope="row">
          <span v-if="row.discount_type==0">现金券</span>
          <span v-else>打折券</span>
        </template>
      </a-table-column>
      <a-table-column
        title="优惠内容"
        width="120px"
      >
        <template slot-scope="row">
          <template v-if="row.discount_type == 0">
            <span>减{{ row.discount_money/100||0 }}</span>元
            <span style="color: red;" v-if="row.minimum_money">(满{{ row.minimum_money/100 }}可用)</span>
            <span v-else>(不限金额)</span>
          </template>
          <template v-else>
            <span>{{ row.discount_rate / 10 }}</span>折
            <span style="color: red;" v-if="row.minimum_money">(满{{ row.minimum_money/100 }}可用)</span>
            <span v-else>(不限金额)</span>
          </template>
        </template>
      </a-table-column>
      <a-table-column
        title="发行数量"
        dataIndex="total"
        key="total"
        width="60px"
      />
      <a-table-column
        title="已领数量"
        dataIndex="transfered_total"
        key="transfered_total"
        width="60px"
      />
      <a-table-column
        title="已用数量"
        dataIndex="used_total"
        key="used_total"
        width="60px"
      />
      <a-table-column
        title="适用范围"
        key="user-type"
        width="100px"
      >
        <template slot-scope="row">
          <span>{{ row.usable_range_type===0?"指定盲盒":"指定商品" }}</span>
        </template>
      </a-table-column>


      <!-- <a-table-column
        title="兑换码"
        dataIndex="code"
        key="code"
        width="150px"
      >
      </a-table-column> -->
      <a-table-column
        title="操作"
        key="action"
        width="130px"
      >
        <template slot-scope="row">
          <span>
            <a href="javascript:;" @click="handleGetPath(row)">预览/路径</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDelete(row)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>
<script>
import { getCouponList, deleteCoupon } from '@/api/coupons'
export default {
  name: 'Coupon',
  data () {
    return {
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      list: [],
      page: 1,
      per_page: 10,
      total: 0,
      current: {},
      confirmLoading: false,
      loading: false,
      visible: false,
      small_boxes: []
    }
  },
  computed: {
    pagination () {
      return {
        defaultPageSize: this.per_page,
        defaultCurrent: this.page,
        total: this.total,
        pageSizeOptions: this.pageSizeOptions,
        showSizeChanger: true
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleDelete (row) {
      this.$confirm({
        title: '提示',
        content: `确认删除 “${row.title}” ？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            deleteCoupon(row.uuid).then(res => {
              this.fetchData()
              resolve()
            }).catch(err => {
              reject(err)
            })
          })
        }
      })
    },
    handleGetPath (row) {
      this.$getPathPopup.show({
        page: '/pages/couponDetail/index',
        param: 'uuid=' + row.uuid
      })
    },
    handleClick () {
      this.$router.push({
        name: 'CouponCreate'
      })
    },
    handleEdit (row) {
      this.$router.push({
        name: 'CouponEdit',
        params: {
          uuid: row.uuid
        }
      })
    },
    onPaginationChange (e) {
      this.page = e.current
      this.per_page = e.pageSize
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getCouponList({
        page: this.page,
        per_page: this.per_page
      }).then(res => {
        this.list = res.data.list
        this.total = res.data.item_total
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.page-content {
  padding: 8px;
  background-color: #fff;
}
.header-content {
  .input {
    margin-right: 15px;
    width: 200px;
  }
}
.table {
  .img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
}
</style>
