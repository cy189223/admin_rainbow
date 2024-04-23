<template>
<a-modal title="盒柜转移" style="top: 100px;" :visible="isShow" width="1000px" @ok="handleCancel" @cancel="handleCancel"
    okText="">
  <div class="user-list">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">

        <!-- <div class="tab-list">
           <div class="item" @click="keys.type = item.key" :class="{actived: keys.type === item.key}"
             v-for="(item, index) in statusList">
             {{item.text}}
             ({{statusTotal[item.key]}})
           </div>
         </div> -->

        <!-- <a-radio-group v-model="sort" buttonStyle="solid" style="margin-right:10px;">
          <a-radio-button value="time">注册时间</a-radio-button>
          <a-radio-button value="score">幸运值</a-radio-button>
          <a-radio-button value="repack">红包</a-radio-button>
          <a-radio-button value="invitee">邀请数</a-radio-button>
        </a-radio-group> -->

        <a-input
          placeholder="输入关键字"
          style="width: 180px;margin-right:10px;"
          v-model="key"
          allowClear
          @input="onSearch"
        />
        <a-button type="primary" @click="refresh" style="margin-right:10px;">刷新</a-button>
      </div>

      <!-- <div style="margin-top: 4px;">
        <a-button type="primary" style="margin-right:10px;"  @click="isExport = !isExport">导出Excel</a-button>
      </div> -->

    </div>
    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      @change="onPaginationChange"
    >
		<a-table-column
		  title="ID"
		  dataIndex="id"
		  key="id"
		  width="70px"
		/>
      <a-table-column
        title="姓名"
        key="name"
        width="230px"
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
                

                <!-- <a-tag color="red" v-if="row.status === 2">已拉黑</a-tag> -->
              </div>
              <div class="bottom" style="margin-top: 4px;">

                <!-- <span class="marked-tag" @click="markItem(row)" :class="{actived: row.marked_at}">标记</span> -->
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

      <a-table-column
        title="操作"
        key="action"
        width="80px"
      >
        <template slot-scope="row">
          <span>
            <!-- <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" /> -->
           <div>
             <a href="javascript:;" @click="handleSelect(row)">转移</a>
             <!-- <a-divider type="vertical" /> -->
           </div>

          </span>
        </template>
      </a-table-column>
    </a-table>

    <!-- <ExportPopup @hide="isExport=false" :isShow="isExport"></ExportPopup> -->

  </div>
  </a-modal>

</template>
<script>
import { getUserList, updateUser } from '@/api/users'
import moment from 'moment'
// import ExportPopup from "./components/ExportPopup"

export default {
  name: 'UserList',
  components: {
    // ExportPopup
  },
  props:{
    isShow:{
        type: Boolean
    }
  },
  data () {
    return {
      statusList: [
        // {
        //   text: '微信',
        //   key: 'wechat'
        // },
        // {
        //   text: '快手',
        //   key: 'kuaishou'
        // },
        // {
        //   text: '支付宝',
        //   key: 'alipay'
        // },
        // // {
        // //   text: '抖音系',
        // //   key: 'byte_dance'
        // // },
        // {
        //   text: 'App',
        //   key: 'app'
        // },
        // {
        //   text: '标记的',
        //   key: 'marked'
        // },
        // {
        //   text: '拉黑的',
        //   key: 'blocked'
        // }
      ],
      // actived: 'wechat',
      keys: {
        type: 'wechat'
      },
      statusTotal: {
        wechat: 0,
        byte_dance: 0,
        marked: 0,
        blocked: 0,
        alipay: 0
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
      isExport: false
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

    handleCancel(){
      this.isShow = false
      this.$emit('hide')
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
    
    handleOk () {
    },
    fetchTotalData() {
      this.$http('/status-total/user').then((res) => {
        this.statusTotal = res.data.total
      })
    },
    fetchData () {
      this.loading = true
      getUserList({
        page: this.page,
        per_page: this.per_page,
        key: this.key,
        sort: this.sort,
        type: this.keys.type
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
