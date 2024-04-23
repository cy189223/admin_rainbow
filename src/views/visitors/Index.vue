<template>
  <div class="visitors">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">
        <a-input
          placeholder="输入关键字"
          style="width: 180px;margin-right:10px;"
          v-model="key"
          allowClear
        />
        <a-button type="primary" @click="refresh" style="margin-right:10px;">刷新</a-button>
      </div>
    </div>

    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      :loading="loading"
      @change="onPaginationChange"
    >
      <!-- <a-table-column
        title="微信"
        key="wechat"
      >
        <template slot-scope="row">
          <div class="head" v-if="row.wechat && row.wechat.headimgurl">
            <div class="head-url">
              <img :src="row.wechat.headimgurl">
            </div>
            <div class="name" style="margin:0 5px;">{{ row.wechat.nickname }}</div>
            <a-tag color="blue">{{ row.wechat.gender }}</a-tag>
          </div>
        </template>
      </a-table-column> -->
      <a-table-column
        title="登陆用户"
        key="name"
      >
        <template slot-scope="row">

          <span v-if="row.user">
            <img :src="row.user.headimg" class="headimg">
            {{ row.user.name }}
          </span>
        </template>
      </a-table-column>
      <a-table-column
        title="地区"
      >
        <template slot-scope="row">
          <span>{{ row.city || row.province }}</span>
        </template>
      </a-table-column>
      <a-table-column
        title="IP地址"
        key="IP"
      >
        <template slot-scope="row">
          <span>{{ row.ip }}</span>
        </template>
      </a-table-column>
      <a-table-column
        title="设备类型"
        key="device"
      >
        <template slot-scope="row">
          <p v-if="row.device.type">
            {{ row.platform.type }} {{ row.platform.version }}
            <a-tag v-if="row.device.is_wifi" color="blue">wifi</a-tag>
          </p>
        </template>
      </a-table-column>
      <a-table-column
        title="访问页面"
        key="page"
      >
        <template slot-scope="row">
          <div v-if="row.page" style="width: 260px;">【{{ row.page.type_text }}】{{row.page.title}}</div>
        </template>
      </a-table-column>
      <a-table-column
        title="访问日期"
        key="date"
      >
        <template slot-scope="row">
          <span>{{ row.visit_at|formatDate }}</span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>
<script>
import { getVisitorList } from '@/api/visitors'
import moment from 'moment'
export default {
  name: 'Visitors',
  data () {
    return {
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      loading: false,
      list: [],
      page: 1,
      per_page: 10,
      total: 0,
      key: ''
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
  watch: {
    key () {
      this.refresh()
    }
  },
  filters: {
    formatDate (value) {
      return value ? moment(value).fromNow() : ''
    },
    formatDate2 (value) {
      return value ? moment(value).format('YYYY-MM-DD') : ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    refresh () {
      this.page = 1
      this.fetchData()
    },
    onPaginationChange (e) {
      this.page = e.current
      this.per_page = e.pageSize
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getVisitorList({
        page: this.page,
        per_page: this.per_page,
        key: this.key
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
.visitors {
  background-color: #fff;
}

.headimg {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.head {
  display: flex;
  align-items: center;

  .head-url {
    width: 30px;
    height: 30px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%
    }
  }
}
</style>
