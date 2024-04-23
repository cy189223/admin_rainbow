<template>
  <div class="list">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">

        <!-- <div class="tab-list">
           <div class="item" @click="status = item.key" :class="{actived: status === item.key}"
             v-for="(item, index) in statusList">
             {{item.text}}
             ({{statusTotal[item.key]}})
           </div>
         </div> -->


        <!-- <a-input placeholder="订单编号/标题/用户名/手机号" style="width: 220px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" /> -->
        <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

        <div style="flex-grow: 1;"></div>
        <span style="float: right; color: gray; font-size: 96%;">所有用户授权登陆后默认成为等级1的分销员</span>
         <!-- <a href="https://www.yuque.com/u1307645/mwy3k3/hvtg6t" target="_blank">查看分销规则</a> -->

        <!-- <a-select style="width: 150px;margin-right:10px;" v-model="category_id" placeholder="分类" allowClear>
          <a-select-option :value="item.id" v-for="item in category" :key="item.id">{{ item.title }}</a-select-option>
        </a-select> -->

      </div>

      <!-- <div style="margin-top: 4px;">
        <a-button type="primary" style="margin-right:10px;"  @click="isExport = !isExport">导出Excel</a-button>
      </div> -->

      <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button>
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">

      <a-table-column title="分销等级" width="10px">
        <template slot-scope="row">
          <span>{{row.level}}</span>
        </template>
      </a-table-column>

      <a-table-column title="等级名称" width="40px">
        <template slot-scope="row">
          <span>{{row.title}}</span>
          <a-tag  v-if="row.is_preset" color="orange" style="margin-left: 10px;">系统预设</a-tag>
        </template>
      </a-table-column>

      <a-table-column title="等级描述" width="160px">
        <template slot-scope="row">
          <span>{{row.description}}</span>
        </template>
      </a-table-column>

      <!-- <a-table-column title="结算方式" width="10px">
        <template slot-scope="row">
          <span v-if="row.brokerage_type === 'online'">系统内结算</span>
          <span v-else-if="row.brokerage_type === 'offline'">系统外结算</span>
        </template>
      </a-table-column> -->

      <a-table-column title="成员数量" width="10px">
        <template slot-scope="row">
          <span>{{row.agents_count}}</span>
        </template>
      </a-table-column>

      <a-table-column title="佣金设置" width="10px">
        <template slot-scope="row">
          <a href="javascript:;" @click="handleEditBrokerage(row)">编辑</a>
        </template>
      </a-table-column>


      <a-table-column title="操作" width="30px" v-if="!selectMode">
        <template slot-scope="row">
          <span v-if="row.is_preset" >
            <span style="color: gray">-</span>
          </span>
          <span v-else>
            <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDelete(row)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>

     <!-- <ExportPopup @hide="isExport=false" :isShow="isExport"></ExportPopup> -->

     <a-modal :title="(editUuid ? '编辑' : '创建') + resourceTypeText" style="top: 100px;" :visible="isEdit" width="800px"
       @cancel="isEdit = false" :footer="null">
       <EditForm v-if="isEdit" :uuid="editUuid" @cancel="isEdit = false" @success="fetchData"></EditForm>
     </a-modal>

     <a-modal title="编辑佣金率" style="top: 100px;" :visible="isEditBrokerage" width="1200px"
       @cancel="isEditBrokerage = false" :footer="null">
       <EditBrokerage v-if="isEditBrokerage" :uuid="editUuid" @cancel="isEditBrokerage = false" @success="fetchData"></EditBrokerage>
     </a-modal>

  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'
  // import ExportPopup from "./components/ExportBrokeragePopup"

  import EditBrokerage from "./components/EditBrokerage.vue"

  import EditForm from "./components/EditAgentLevel.vue"

  const resourceType = 'agent-levels'
  const resourceTypeText = '分销等级'

  export default {
    components: {
      ISwitch,
      EditForm,
      EditBrokerage
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
        status: 'pending',
        statusList: [
          {
            text: '待确认',
            key: 'pending'
          },
          {
            text: '已发放',
            key: 'completed'
          },
          {
            text: '已取消',
            key: 'closed'
          }
        ],
        statusTotal: {
          pending: 0,
          picked: 0,
          return_saled: 0,
          resaled: 0,
          resale_pending: 0,
          all: 0
        },
        isExport: false,
        isEditBrokerage: false
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
      handleEditBrokerage(row) {
        this.editUuid = row.uuid
        this.isEditBrokerage = true
      },
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
        this.$http('/status-total/brokerage').then((res) => {
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
