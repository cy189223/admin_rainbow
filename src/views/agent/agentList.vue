<template>
  <div class="user-list">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">

        <div class="tab-list">
           <div class="item" @click="keys.type = item.key" :class="{actived: keys.type === item.key}"
             v-for="(item, index) in statusList">
             {{item.text}}
             ({{statusTotal[item.key]}})
           </div>
         </div>

        <!-- <a-radio-group v-model="sort" buttonStyle="solid" style="margin-right:10px;">
          <a-radio-button value="time">注册时间</a-radio-button>
          <a-radio-button value="score">幸运值</a-radio-button>
          <a-radio-button value="repack">红包</a-radio-button>
          <a-radio-button value="invitee">邀请数</a-radio-button>
        </a-radio-group> -->

        <!-- <a-input
          placeholder="输入关键字"
          style="width: 180px;margin-right:10px;"
          v-model="key"
          allowClear
          @input="onSearch"
        />
        <a-button type="primary" @click="refresh" style="margin-right:10px;">刷新</a-button> -->

        <a-select style="width: 150px;margin-right:10px;" v-model="keys.agent_level" placeholder="分销级别" allowClear>
          <template v-for="item in agentLevelList">
              <a-select-option :value="item.id" :key="item.id">{{ item.title }}</a-select-option>
            <!-- <a-select-option :value="item.id" :key="item.id">{{ item.title }}</a-select-option> -->
          </template>
        </a-select>

        <a-input-search placeholder="用户名/手机号" enter-button  style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" @search="onSearch" />

      </div>

      <div style="margin-top: 4px;">
        <a-button type="primary" style="margin-right:10px;"  @click="isExport = !isExport">导出Excel</a-button>
      </div>

    </div>
    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      @change="onPaginationChange"
    >
      <a-table-column
        title="姓名"
        key="name"
        width="180px"
      >
        <template slot-scope="row">
          <div class="user">
            <img class="headimg" :src="row.headimg" alt="用户头像">

            <div class='right'>
              <div class="top">
                <span>{{ row.name }}</span>
                <a-icon class="gender-man" v-if="row.gender==='男'" type="man" />
                <a-icon class="gender-woman" v-else-if="row.gender==='女'" type="woman" />
                <!-- <a-tag color="red" style="margin-left: 10px;" v-if="row.client_type === 'ali'">天猫用户</a-tag> -->
                <a href="javascript:;" style="margin-left: 10px;" @click="handleEdit(row)">编辑</a>

                <!-- <a-tag color="red" v-if="row.status === 2">已拉黑</a-tag> -->
              </div>
              <div class="bottom" style="margin-top: 4px;">

                <span class="marked-tag" @click="markItem(row)" :class="{actived: row.marked_at}">标记</span>
                <!-- <span>{{row.city}}</span> -->
                <span>{{row.phone}}</span>

                <a-tag color="red" style="margin-left:10px;" v-if="row.status === 2">已拉黑</a-tag>

              </div>
            </div>
          </div>
        </template>
      </a-table-column>
      <!-- <a-table-column
        title="会员等级"
        dataIndex="level_text"
        key="level_text"
        width="80px"
      /> -->
      <!-- <a-table-column
        title="手机号"
        dataIndex="phone"
        key="phone"
        width="80px"
      /> -->
     <!-- <a-table-column
        title="备注"
        width="80px"
      >
        <template slot-scope="row">
          <a href="javascript:;" @click="handleEdit(row)" v-if="row.remark">查看</a>
        </template>
      </a-table-column> -->
      <!-- <a-table-column
        title="地区"
        dataIndex="city"
        key="address"
        width="60px"
      /> -->

      <a-table-column
        title="邀请关系"
        width="160px"
      >
        <template slot-scope="row">
          <div>
            <div>
              上级:
              <template v-if="row.inviter">
                <img class="inviter-headimg" :src="row.inviter.headimg" alt="用户头像">
                {{row.inviter.name}}
              </template>
              <template v-else>-</template>
            </div>
            <div>直接粉丝: {{row.direct_invitees_count}}人</div>
            <div>间接粉丝: {{row.indirect_invitees_count}}人</div>
          </div>
        </template>
      </a-table-column>

      <!-- <a-table-column
        title="邀请数"
        width="70px"
      >
        <template slot-scope="row">
          <div>{{row.invitees_count}}人</div>
        </template>
      </a-table-column> -->
      <a-table-column
        title="分销等级"
        width="70px"
      >
        <template slot-scope="row">
          <span v-if="row.agent_level">{{row.agent_level.title}}</span>
          <span v-else>{{row.agent_level_index}}</span>
        </template>
      </a-table-column>

      <a-table-column
        title="资产"
        width="80px"
      >
        <template slot-scope="row">
          <div>积分: {{row.score}}</div>
          <div>红包: {{row.redpack / 100}}元</div>
        </template>
      </a-table-column>
      <a-table-column
        title="已结算佣金"
        width="100px"
      >
        <template slot-scope="row">
          <div>积分: {{row.completed_score_brokerage}}</div>
          <div>红包: {{row.completed_money_brokerage / 100}}元</div>
        </template>
      </a-table-column>
      <a-table-column
        title="待结算佣金"
        width="100px"
      >
        <template slot-scope="row">
          <div>积分: {{row.pending_score_brokerage}}</div>
          <div>红包: {{row.pending_money_brokerage / 100}}元</div>
        </template>
      </a-table-column>
      <!-- <a-table-column
        title="红包"
        key="redpack"
        width="80px"
      >
        <template slot-scope="row">
          <div>{{row.redpack / 100}}元</div>
        </template>
      </a-table-column> -->
      <a-table-column
        title="注册日期"
        dataIndex="created_at"
        key="created_at"
        width="80px"
      >
        <template slot-scope="created_at">
          <div>{{ created_at | formatDate2 }}</div>
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

      <a-table-column width="40px">
        <div slot="title">
          分销状态
          <tips>开启时为正常状态 <br/>  关闭后为禁用状态，禁用后无法获得佣金</tips>
        </div>
        <template slot-scope="row">
          <ISwitch :value="row.agent_status" :active="1" :unactive="0" @change="statusChange($event, row)" />
        </template>
      </a-table-column>

      <a-table-column
        title="操作"
        key="action"
        width="150px"
      >
        <template slot-scope="row">
          <span>
            <!-- <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" /> -->
            <a href="javascript:;" @click="handleEditAgentLevel(row)">修改分销级别</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleBlockUser(row)" v-if="row.status !== 2">拉黑</a>
            <a href="javascript:;" @click="handleUnblockUser(row)" v-else>取消拉黑</a>
          </span>
        </template>
      </a-table-column>
    </a-table>

    <ExportPopup @hide="isExport=false" :isShow="isExport"></ExportPopup>

  </div>

</template>
<script>
import { getUserList, updateUser } from '@/api/users'
import moment from 'moment'
import ExportPopup from "./components/ExportPopup"
import ISwitch from '@/components/ISwitch/ISwitch'

export default {
  name: 'UserList',
  components: {
    ExportPopup,
    ISwitch
  },
  data () {
    return {
      statusList: [
        {
          text: '全部',
          key: 'level1'
        },
        {
          text: '拉黑的',
          key: 'blocked'
        }
      ],
      // actived: 'wechat',
      keys: {
        type: 'level1',
        agent_level: undefined
      },
      statusTotal: {
        level1: 0,
        blocked: 0
      },
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
      timeout: null,
      isExport: false,
      agentLevelList: []
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
    this.fetchTotalData()

    this.fetchLevelList()
  },
  watch: {
    sort(val) {
      this.fetchData()
    },
    keys: {
      handler(value) {
        // this.page = 1
        this.refresh()
        // clearTimeout(this.timeout)
        // this.timeout = setTimeout(() => {
        //   this.fetchData()
        // }, 300)
      },
      deep: true
    }
  },
  methods: {
    statusChange(e, row) {
      this.$http.patch(`/agents/${row.uuid}`, {
        type: 'update_agent_status',
        agent_status: e
      }).then(res => {
        this.fetchData()
        this.fetchTotalData()
      })
    },
    handleBlockUser(row) {
      this.$confirm({
        title: '确认要拉黑用户吗',
        content: `拉黑后用户能正常浏览页面，但不能进行需要登录的操作，如下单、加购物车，同时不结算佣金。`,
        onOk: () => {
          this.$http.patch(`/users/${row.uuid}`, {
            type: 'block',
          }).then(res => {
            this.fetchData()
            this.fetchTotalData()
          })
        }
      })
    },
    handleUnblockUser(row) {
      this.$confirm({
        title: '提示',
        content: `确认要取消拉黑用户吗？`,
        onOk: () => {
          this.$http.patch(`/users/${row.uuid}`, {
            type: 'unblock'
          }).then(res => {
            this.fetchData()
            this.fetchTotalData()
          })
        }
      })
    },
    // 标记
    markItem(row) {
       this.$http.patch(`/users/${row.uuid}`, {
         type: 'mark'
       }).then((res) => {
         this.$message.success('保存成功')
         this.fetchData()
         this.fetchTotalData()
       })
    },
    onPaginationChange (e) {
      this.page = e.current
      this.per_page = e.pageSize
      this.fetchData()
    },
    refresh () {
      this.page = 1
      this.key = ''
      this.fetchData()
      this.fetchTotalData()
    },
    onSearch (e) {
		this.page = 1
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.fetchData()
      }, 300)
    },
    handleEditAgentLevel (row) {
      let agentLevelOptions = this.agentLevelList.map(item =>  {
        return {
          title: item.title,
          value:  item.level
        }
      })
      this.$iForm.show({
        title: '修改分销级别',
        frame: [
          {
            type: 'select',
            key: 'agent_level',
            options: agentLevelOptions,
            title: '分销级别',
            required: true,
            default: row.agent_level_index
          },
        ],
        success: (data) => {
          this.$http({
            url: `/agents/${row.uuid}`,
            method: 'PATCH',
            data: {
              type: 'update_agent_level',
              ...data
            }
          }).then(res => {
            this.$message.success('操作成功');
            this.$iForm.hide()
            this.fetchData()
          })
        }
      })
    },
    handleAddScore (row) {
      this.$iForm.show({
        title: '修改用户积分',
        frame: [
          {
            type: 'radio',
            key: 'type',
            options: [
              {
                title: '增加',
                value: 'in'
              },
              {
                title: '减少',
                value: 'out'
              }
            ],
            title: '变动类型',
            required: true
          },
          {
            type: 'number',
            key: 'score',
            title: '变动数量',
            required: true
          },
          {
            type: 'textarea',
            key: 'description',
            title: '变动原因',
            tips: '变动原因会显示在用户的积分流水记录中',
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
            this.$iForm.hide()
            this.fetchData()
          })
        }
      })
    },
    handleEdit (row) {
      this.$iForm.show({
        title: '修改用户信息',
        frame: [
          {
            type: 'input',
            key: 'name',
            title: '用户名',
            default: row.name,
            required: true
          },
          {
            type: 'input',
            key: 'phone',
            title: '手机号',
            default: row.phone
          },
          {
            type: 'input',
            key: 'city',
            title: '地区',
            default: row.city
          },
          {
            type: 'textarea',
            key: 'remark',
            title: '备注',
            default: row.remark
          },
        ],
        success: (data) => {
          this.$http({
            url: `/users/${row.uuid}`,
            method: 'PATCH',
            data: {
              type: 'update',
              attributes: data
            }
          }).then(res => {
            this.$message.success('更新成功');
            this.$iForm.hide()
            this.fetchData()
          })
        }
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
    fetchLevelList() {
      this.$http('/agent-levels').then((res) => {
        this.agentLevelList = res.data.list
      })
    },
    fetchTotalData() {
      this.$http.get('/status-total/agent', {
        'params': {
          key: this.key,
          sort: this.sort,
          type: this.keys.type,
          agent_level: this.keys.agent_level
        }
      }).then((res) => {
        this.statusTotal = res.data.total
      })
    },
    fetchData () {
      this.loading = true
      this.$http.get('/agents', {
        'params': {
          page: this.page,
          per_page: this.per_page,
          key: this.key,
          sort: this.sort,
          type: this.keys.type,
          agent_level: this.keys.agent_level
        }
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

  .marked-tag {
    border-radius: 50px;
    border: 1px solid #666;
    font-size: 10px;
    padding: 1px 6px;
    color: #666;
    cursor: pointer;
    margin-right: 6px;

    &.actived {
      background: #666;
      color: white;
    }
  }


  .sort-keys {
    display: flex;
    align-items: center;

    .tab-list {
      display: flex;
      margin-top: 6px;
      border-bottom: 1px solid #e1e1e1;
      margin-right: 50px;

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

  }

.inviter-headimg {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

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
      width: 38px;
      height: 38px;
      flex: 0 0 38px;
      border: 1px solid #e1e1e1;
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
