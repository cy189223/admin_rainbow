<template>
  <div class="list">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">

        <a-input-search placeholder="输入关键字" enter-button  style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" @search="onSearch" />

      </div>
      <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button>
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">
      <a-table-column title="开始时间" width="120px">
        <template slot-scope="row">
          <div class="title-c">
            <div class="right">
              <div class="time"> {{row.start_time}}</div>
            </div>
          </div>
        </template>
      </a-table-column>
	  <a-table-column title="结束时间" width="120px">
	    <template slot-scope="row">
	      <div class="title-c">
	        <div class="right">
	          <div class="time">{{row.end_time}}</div>
	        </div>
	      </div>
	    </template>
	  </a-table-column>
	  <a-table-column title="类型" width="100px">
	    <template slot-scope="row">
			<div class="time">{{row.type == 'fudai' ? '福袋（无限赏）' : 'PK'}}</div>
	    </template>
	  </a-table-column>
	  <a-table-column title="状态" width="60px">
	    <template slot-scope="row">
	      <a-tag color="blue">
	        {{row.union_status_text}}
	      </a-tag>
	    </template>
	  </a-table-column>

      <a-table-column title="奖品池" width="120px">
        <template slot-scope="row">
          <div>
            <a href="javascript:;" @click="handleEditSku(row)">
              {{row.skus_count}} 种奖品
            </a>
          </div>
        </template>
      </a-table-column>

      <a-table-column title="创建日期" width="100px">
        <template slot-scope="row">
          <span>{{$tool.showShortTime(row.created_at)}}</span>
        </template>
      </a-table-column>
      <a-table-column title="操作" width="180px" v-if="!selectMode">
        <template slot-scope="row">
          <span>
            <!-- <a href="javascript:;" @click="getPath(row)">预览/路径</a>
            <a-divider type="vertical" /> -->
            <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <!-- <a-divider type="vertical" />
            <a href="javascript:;" @click="handleCopy(row)">复制</a> -->
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDelete(row)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>

    <a-modal :maskClosable="false" :title="(editUuid ? '编辑' : '创建') + resourceTypeText" style="top: 100px;" :visible="isEdit" width="1000px"
      @cancel="isEdit = false" :footer="null">
      <Edit v-if="isEdit" :uuid="editUuid" @cancel="isEdit = false" @success="editSuccess" />
    </a-modal>

    <EditSku :info="current" v-if="isEditSku" @refresh="fetchData" @close="isEditSku = false"></EditSku>

    <UserList v-if="isShowUserList" :uuid="editUuid" @refresh="fetchData" @close="isShowUserList = false"></UserList>

  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'

  import Edit from "./Edit.vue"

  import EditSku from './components/EditSkuPopup.vue'
  // import EditGiftSku from './components/EditGiftSkuPopup.vue'
  // import EditRoom from './components/EditRoomPopup.vue'
  // import EditOdds from './components/EditOddsPopup.vue'
  // import  EditPackageSku from './components/EditPackageSkuPopup.vue'
  import UserList from './components/UserList'

  const resourceType = 'accounts'
  const resourceTypeText = '流水奖励'


  export default {
    components: {
      ISwitch,
      Edit,
      EditSku,
      UserList
      // EditNormalSku,
      // EditGiftSku,
      // EditRoom,
      // EditOdds,
      // EditPackageSku
      // LotteryUserList
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
      },
      type: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        isEdit: false,
        editUuid: '',
        current: {},
        isEditSku: false,
        resourceTypeText,
        exportOptions: {
          status: 'all',
          startTime: '',
          endTime: '',
          type: 'normal'
        },
        status: 'unexpired',
        list: [],
        page: 1,
        per_page: 10,
        total: 0,
        key: '',
        isShowUserList: false,
      }
    },
    watch: {
      params() {
        this.refreshData()
      },
      type() {
        this.refreshData()
      },
      status () {
        this.page = 1
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
            this.page = e.current
            this.per_page = e.pageSize
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
      editSuccess () {
        this.fetchData()
        if (!this.editUuid) {
          this.status = 'off_stock'
        }
      },
      getPath(row) {
        this.$getPathPopup.show({
          page: '/pages/lottery/detail',
          param: 'uuid=' + row.uuid
        })
      },
      handleCopy(row) {
        this.$confirm({
          title: '确认要复制吗?',
          content: `复制后将创建一个全新的未上架的活动，当前活动不爱影响`,
          onOk: () => {
            this.$http.patch(`/${resourceType}/${row.uuid}`, {
              type: 'copy'
            }).then(res => {
              this.$message.success('复制成功，请在“已下架”列表中编辑活动');
              this.status = 'off_stock'
              this.fetchData()
            })
          }
        })
      },
      handleDelete(row) {
        this.$confirm({
          title: '提示',
          content: `确认删除吗？`,
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
      showUserList (row) {
        this.editUuid = row.uuid
        this.isShowUserList = true
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
      // 编辑sku列表
      handleEditSku(row) {
        this.editUuid = row.uuid
        this.current = row
        this.isEditSku = true
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
      fetchData() {
        this.isEdit = false
        this.$http.get(`/${resourceType}`, {
          params: {
            // type: activityType,
            // status: this.status,
            ...this.params,
            page: this.page,
            per_page: this.per_page,
            // type: this.type,
            key: this.key,
          }
        }).then(res => {
          this.list = res.data.list
          this.total = res.data.item_total
        }).finally(() => {
          this.loading = false
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
  .content-head {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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

  .table {

    .title-c {
      display: flex;
      align-items: center;

      .thumb {
        margin-right: 10px;
        height: 60px;
        border-radius: 6px;
      }

      .title {
        font-weight: 500;
        min-height: 30px;
        font-size: 32rpx;
      }

      .time {
        color: gray;
        font-size: 80%;
      }
    }
  }
</style>
