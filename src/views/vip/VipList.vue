<template>
  <div class="user-list">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">
        <a-input
          placeholder="输入关键字"
          style="width: 180px;margin-right:10px;"
          v-model="key"
          allowClear
          @input="onSearch"
        />
        <a-button type="primary" @click="refresh" style="margin-right:10px;">刷新</a-button>
      </div>

      <!-- <div>
        排序：
        <a-radio-group v-model="sort" buttonStyle="solid" style="margin-right:10px;">
          <a-radio-button value="time">注册时间</a-radio-button>
          <a-radio-button value="score">幸运值</a-radio-button>
          <a-radio-button value="repack">红包</a-radio-button>
          <a-radio-button value="invitee">邀请数</a-radio-button>
        </a-radio-group>
      </div> -->
    </div>
    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      :loading="loading"
      @change="onPaginationChange"
    >
      <a-table-column
        title="姓名"
        key="name"
        width="150px"
      >
        <template slot-scope="row">
          <div class="user">
            <img :src="row.headimg" alt="用户头像">
            <span>{{ row.name }}</span>
            <a-icon class="gender-man" v-if="row.gender==='男'" type="man" />
            <a-icon class="gender-woman" v-else type="woman" />

            <a-tag color="red" style="margin-left: 10px;" v-if="row.client_type === 'ali'">天猫用户</a-tag>
          </div>
        </template>
      </a-table-column>
      <a-table-column
        title="VIP期限"
        width="120px"
      >
        <template slot-scope="row">
          <div>{{$tool.formatDate(row.vip_start_at, 'yyyy-MM-dd')}}</div>
          <div>{{$tool.formatDate(row.vip_end_at, 'yyyy-MM-dd')}}</div>
        </template>
      </a-table-column>

      <a-table-column
        title="手机号"
        dataIndex="phone"
        key="phone"
        width="80px"
      />

      <a-table-column
        title="地区"
        dataIndex="city"
        key="address"
        width="60px"
      />

      <a-table-column
        title="邀请人"
        key="name"
        width="150px"
      >
        <template slot-scope="row">
          <div class="user">
            <div v-if="row.inviter">
              <img :src="row.inviter.headimg" alt="用户头像">
              {{row.inviter.name}}
            </div>
            <div v-else>-</div>
          </div>
        </template>
      </a-table-column>

      <a-table-column
        title="邀请数"
        key="name"
        width="70px"
      >
        <template slot-scope="row">
          <div>{{row.invitees_count}}人</div>
        </template>
      </a-table-column>

      <a-table-column
        title="积分"
        dataIndex="score"
        key="score"
        width="70px"
      />
      <a-table-column
        title="红包"
        key="redpack"
        width="80px"
      >
        <template slot-scope="row">
          <div>{{row.redpack / 100}}元</div>
        </template>
      </a-table-column>
      <a-table-column
        title="注册日期"
        dataIndex="created_at"
        key="created_at"
        width="100px"
      >
        <template slot-scope="created_at">
          <span>{{ created_at | formatDate2 }}</span>
        </template>
      </a-table-column>
      <a-table-column
        title="最后活跃"
        dataIndex="last_active_at"
        key="last_active_at"
        width="80px"
      >
        <template slot-scope="last_active_at">
          <span>{{ last_active_at | formatDate }}</span>
        </template>
      </a-table-column>
      <a-table-column
        title="操作"
        key="action"
        width="60px"
      >
        <template slot-scope="row">
          <span>
			  -
            <!-- <a href="javascript:;" @click="handleAddScore(row)">增加积分</a> -->
          </span>
        </template>
      </a-table-column>
    </a-table>
    <a-modal
      title="编辑用户信息"
      style="top: 100px;"
      :visible="visible"
      width="600px"
      @ok="handleOk"
      @cancel="visible = false"
      :confirmLoading="confirmLoading"
    >
      <a-form
        :form="form"
      >
        <a-form-item
          label="用户名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入用户名' }]}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'phone',
              {rules: [{ pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}
            ]"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="地区"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'city'
            ]"
            placeholder="请输入"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import {updateUser } from '@/api/users'
import moment from 'moment'
export default {
  name: 'UserList',
  data () {
    return {
      loading: false,
      list: [],
      page: 1,
      per_page: 10,
      total: 0,
      key: '',
      sort: 'time',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      timeout: null
    }
  },
  computed: {
    pagination () {
      return {
        defaultPageSize: this.per_page,
        defaultCurrent: this.page,
        total: this.total,
        showTotal: total => `共 ${total} 条`
      }
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
  watch: {
    sort(val) {
      this.fetchData()
    }
  },
  methods: {
    onPaginationChange (e) {
      this.page = e.current
      this.per_page = e.pageSize
      this.fetchData()
    },
    refresh () {
      this.page = 1
      this.key = ''
      this.fetchData()
    },
    onSearch (e) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.fetchData()
      }, 300)
    },
    handleAddScore (row) {
      this.$globalForm.show({
        title: '为用户添加积分',
        items: [
          {
            type: 'number',
            key: 'score',
            title: '增加数量',
            required: true
          },
          {
            type: 'text',
            key: 'description',
            title: '描述',
            required: true
          },
        ],
        success: (data) => {
          this.$http({
            url: `/users/${row.uuid}/score`,
            method: 'PATCH',
            data: {
              type: 'add',
              ...data
            }
          }).then(res => {
            this.$message.success('操作成功');
            this.$globalForm.hide()
            this.fetchData()
          })
        }
      })
    },
    handleEdit (row) {
      this.current = row
      this.visible = true
      this.$nextTick(() => {
        this.form.setFields({
          name: {
            value: row.name
          },
          phone: {
            value: row.phone
          },
          city: {
            value: row.city
          }
        })
      })
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          updateUser(values, this.current.uuid).then(res => {
            this.visible = false
            this.fetchData()
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    fetchData () {
      this.loading = true
      this.$http('/vip-users', 'GET', {
        page: this.page,
        per_page: this.per_page,
        key: this.key,
        sort: this.sort
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
.content-head {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.table {
  background-color: #fff;
  .user {
    display: flex;
    // flex-wrap: wrap;
    align-items: center;
    img {
      width: 26px;
      height: 26px;
      margin-right: 6px;
      border-radius: 50%;
      overflow: hidden;
    }
    .gender-man, .gender-woman {
      margin-left: 5px;
      font-size: 12px;
    }
    .gender-man {
      color: #409EFF;
    }
    .gender-woman {
      color: #F56C6C;
    }
  }
}
</style>
