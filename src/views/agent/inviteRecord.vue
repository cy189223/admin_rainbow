<template>
  <div class="list">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">

        <div class="tab-list">
           <div class="item" @click="status = item.key" :class="{actived: status === item.key}"
             v-for="(item, index) in statusList">
             {{item.text}}
             ({{statusTotal[item.key]}})
           </div>
         </div>


        <a-input placeholder="用户名/手机号" style="width: 220px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" />
        <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

        <div style="flex-grow: 1;"></div>
        <span style="float: right; color: gray; font-size: 96%;">邀请佣金会有1-2分钟发放延时</span>
         <!-- <a href="https://www.yuque.com/u1307645/mwy3k3/hvtg6t" target="_blank">查看分销规则</a> -->

        <!-- <a-select style="width: 150px;margin-right:10px;" v-model="category_id" placeholder="分类" allowClear>
          <a-select-option :value="item.id" v-for="item in category" :key="item.id">{{ item.title }}</a-select-option>
        </a-select> -->

      </div>
      <!-- <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button> -->
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">
      <a-table-column title="邀请人" width="30px">
        <template slot-scope="row">
          <div class="user">
            <img :src="row.direct_inviter.headimg" alt="用户头像">
            <div>
              <div>{{ row.direct_inviter.name }}</div>
              <div>{{row.direct_inviter.phone}}</div>
            </div>
            <!-- <a-icon class="gender-man" v-if="row.gender==='男'" type="man" />
            <a-icon class="gender-woman" v-else type="woman" /> -->
          </div>
        </template>
      </a-table-column>

      <a-table-column title="被邀请人" width="30px">
        <template slot-scope="row">
          <div class="user">
            <img :src="row.user.headimg" alt="用户头像">
            <div>
              <div>{{ row.user.name }}</div>
              <div>{{row.user.phone}}</div>
            </div>
            <!-- <a-icon class="gender-man" v-if="row.gender==='男'" type="man" />
            <a-icon class="gender-woman" v-else type="woman" /> -->
          </div>
        </template>
      </a-table-column>

      <a-table-column title="间接邀请人" width="30px">
        <template slot-scope="row">
          <div class="user" v-if="row.indirect_inviter">
            <img :src="row.indirect_inviter.headimg" alt="用户头像">
            <div>
              <div>{{ row.indirect_inviter.name }}</div>
              <div>{{row.indirect_inviter.phone}}</div>
            </div>
            <!-- <a-icon class="gender-man" v-if="row.gender==='男'" type="man" />
            <a-icon class="gender-woman" v-else type="woman" /> -->
          </div>
          <div v-else>-</div>
        </template>
      </a-table-column>

      <a-table-column title="邀请序号" width="40px">
        <template slot-scope="row">
          <span>第{{row.invite_index}}个</span>
        </template>
      </a-table-column>

      <a-table-column title="基础奖励" width="100px">
        <template slot-scope="row">
          <div v-if="row.base_reward">
            <RewardDisplay :reward="row.base_reward"></RewardDisplay>
          </div>
          <div v-else>-</div>
        </template>
      </a-table-column>

      <a-table-column title="额外奖励" width="100px">
        <template slot-scope="row">
          <div v-if="row.added_reward">
            <RewardDisplay :reward="row.added_reward"></RewardDisplay>
          </div>
          <div v-else>-</div>
        </template>
      </a-table-column>

      <a-table-column title="邀请活动" width="60px">
        <template slot-scope="row">
          <a-tag>{{nodeTypeMap[row.invite_node_type] || '未知'}}</a-tag>
          <div>{{row.invite_node_title}}</div>
        </template>
      </a-table-column>

      <a-table-column title="奖励状态" width="60px">
        <template slot-scope="row">
          <a-tag v-if="row.status === 0">待发放</a-tag>
          <a-tag v-if="row.status === 1" color="green">已发放</a-tag>
        </template>
      </a-table-column>
      <!-- <a-table-column title="排序" width="60px" v-if="!selectMode">
        <template slot-scope="row">
          {{row.list_weight}}
          <span @click="handleEditListWeight(row)" style="margin-left: 10px;"><a href="javascript:;">
              <a-icon type="edit" /></a></span>
        </template>
      </a-table-column>
      <a-table-column title="推荐置顶" width="40px" v-if="!selectMode">
        <template slot-scope="row">
          <ISwitch :value="row.is_recommend" :active="1" :unactive="0" @change="recommendStatusChange($event, row)" />
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="是否上架" width="40px" v-if="!selectMode">
        <template slot-scope="row">
          <ISwitch :value="row.status" :active="1" :unactive="0" @change="listedStatusChange($event, row)" />
        </template>
      </a-table-column> -->
      <a-table-column title="邀请日期" dataIndex="invite_at" width="20px">
        <template slot-scope="invite_at">
          <span>{{ invite_at | onlyDay }}</span>
        </template>
      </a-table-column>
      <a-table-column title="操作" width="60px" v-if="!selectMode">
        <template slot-scope="row">
          <span>
            -
            <!-- <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" /> -->
            <!-- <a href="javascript:;" @click="handleDelete(row)">删除</a> -->
          </span>
        </template>
      </a-table-column>
    </a-table>

  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'
  import RewardDisplay from '@/components/RewardDisplay'

  const resourceType = 'agent/invite-records'
  const resourceTypeText = '帖子'

  export default {
    components: {
      ISwitch,
      RewardDisplay
    },
    props: {
      selectMode: {
        type: Boolean
      },
      params: {
        type: Object
      },
      size: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
        isEdit: false,
        editUuid: '',
        resourceTypeText,
        exportOptions: {
          status: 'all',
          startTime: '',
          endTime: '',
          type: 'normal'
        },
        list: [],
        page: 1,
        per_page: 10,
        total: 0,
        key: '',
        status: 'all',
        statusList: [
          {
            text: '全部',
            key: 'all'
          }
        ],
        statusTotal: {
          all: 0
        },
        nodeTypeMap: {
          rotate_lottery: '大转盘'
        }
      }
    },
    watch: {
      params() {
        this.refreshData()
      },
      category_id() {
        this.refreshData()
      },
      status() {
        this.refreshData()
      }
    },
    computed: {
      pagination() {
        return {
          defaultPageSize: this.per_page,
          defaultCurrent: this.page,
          total: this.total,
          onChange: (e) => {
            this.page = e
            this.fetchData()
          }
        }
      }
    },
    filters: {},
    created() {
      this.fetchData()
      // this.getCategoryList()
    },
    methods: {
      handleDelete(row) {
        this.$confirm({
          title: '提示',
          content: `确认删除吗？删除后无法撤消，请谨慎考虑后操作!`,
          onOk: () => {
            this.$http.delete(`/${resourceType}/${row.uuid}`).then(res => {
              this.fetchData()
            })
          }
        })
      },
      updateItem(row, data) {
        return this.$http.patch(`/${resourceType}/${row.uuid}`, {
          type: 'update',
          attributes: {
            ...data
          }
        })
      },
      listedStatusChange(e, row) {
        this.updateItem(row, {
          status: e
        }).then(res => {
          this.fetchData()
        })
      },
      handleEditListWeight(row) {
        this.$globalForm.show({
          title: '编辑排序',
          items: [{
            type: 'number',
            key: 'list_weight',
            title: '排序',
            default: row.list_weight,
            required: true
          }, ],
          success: (data) => {
            this.updateItem(row, {
              ...data
            }).then(res => {
              this.$message.success('保存成功');
              this.$globalForm.hide()
              this.fetchData()
            })
          }
        })
      },
      handleCreate() {
        this.editUuid = ""
        this.isEdit = true
      },
      handleEdit(row) {
        this.editUuid = row.uuid
        this.isEdit = true
      },
      refreshData() {
        this.page = 1
        this.key = ''
        this.fetchData()
      },
      onSearch(e) {
		  this.page = 1
        this.fetchData()
        // clearTimeout(this.timeout)
        // this.timeout = setTimeout(() => {
        //   this.fetchData()
        // }, 300)
      },
      fetchTotalData() {
        this.$http('/status-total/invite-record').then((res) => {
          this.statusTotal = res.data.total
        })
      },
      fetchData() {
        this.isEdit = false
        this.$http.get(`/${resourceType}`, {
          params: {
            ...this.params,
            page: this.page,
            per_page: this.per_page,
            key: this.key,
            status: this.status,
            category_id: this.category_id
          }
        }).then(res => {
          this.list = res.data.list
          this.total = res.data.item_total
        }).finally(() => {
          this.fetchTotalData()
          // this.loading = false
        })
      },
      getCategoryList() {
        this.$api.emit('category.list', 'article').then(res => {
          this.category = res.data.list
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .item-key {
    font-size: 86%;
    color: gray;
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

  .top-btn {
    background: #1890FF;
    color: white;
    cursor: pointer;
    font-size: 80%;
    border-radius: 4px;
    padding: 2px 6px;

    &.unset {
      border: 1px solid #D8D5D5;
      background: #D8D5D5;
      color: gray;
    }
  }

  .content-head {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .table {
    .thumb {
      height: 60px;
      border-radius: 6px;
    }

    .content-image {
      height: 60px;
      width: 60px;
      margin-right: 10px;
      margin-bottom: 10px;
      object-fit: cover;
      border-radius: 10px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

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

      .gender-man,
      .gender-woman {
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
