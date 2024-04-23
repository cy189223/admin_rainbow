<template>
  <div class="list">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">

        <a-input placeholder="输入关键字" style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" />
        <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

        <!-- <a-select style="width: 150px;margin-right:10px;" v-model="category_id" placeholder="分类" allowClear>
          <a-select-option :value="item.id" v-for="item in category" :key="item.id">{{ item.title }}</a-select-option>
        </a-select> -->

      </div>
      <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">上传数据</a-button>
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">
      <a-table-column title="标题" width="330px">
        <template slot-scope="row">
          <img :src="row.headimg" class="headimg"></img>
          <span>{{row.name}}</span>
        </template>
      </a-table-column>
      <a-table-column title="所属sku" width="330px">
        <template slot-scope="row">
          <span>{{row.sku.title}}</span>
        </template>
      </a-table-column>
      <a-table-column title="开盒时间" width="330px">
        <template slot-scope="row">
          <span>{{row.time}}</span>
        </template>
      </a-table-column>
      <!-- <a-table-column title="权重" width="120px">
        <template slot-scope="row">
          <span>{{ row.list_weight }}</span> &nbsp
          <a href="javascript:;" @click="handleEditListWeight(row)">编辑</a>
        </template>
      </a-table-column> -->
      <a-table-column title="操作" key="action" width="220px">
        <template slot-scope="row">
          <span>
            <!-- <a href="javascript:;" @click="getPath(row)">预览/路径</a>
            <a-divider type="vertical" /> -->
            <!-- <a href="javascript:;" @click="handleEdit(row)">编辑</a> -->
            <!-- <a-divider type="vertical" /> -->
            <a href="javascript:;" @click="handleDelete(row)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>

  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'

  const resourceType = 'box-rank'
  const resourceTypeText = '盲盒'

  export default {
    components: {
      ISwitch
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
        statusList: [
          {
            text: '上架中',
            key: 'on_stock'
          },
          {
            text: '已下架',
            key: 'off_stock'
          },
          {
            text: '已售罄',
            key: 'sell_out'
          },
          {
            text: '标记的',
            key: 'marked'
          },
        ],
        actived: 'on_stock',
        statusTotal: {
          on_stock: 0,
          off_stock: 0,
          sell_out: 0,
          marked: 0
        },
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
        keys: {
           status: 'on_stock'
        },
        categoryList: [],
        category_id: undefined,
        isEditHiddenSku: false,
        isEditNormalSku: false,
        isEditCoverChip: false
      }
    },
    watch: {
      params() {
        this.refreshData()
      },
      category_id() {
        this.refreshData()
      },
      keys: {
        handler(value) {
          // this.page = 1
          this.refreshData()
          // clearTimeout(this.timeout)
          // this.timeout = setTimeout(() => {
          //   this.fetchData()
          // }, 300)
        },
        deep: true
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
      this.fetchTotalData()
      // this.getCategoryList()
    },
    methods: {
      // 标记
      markBox(row) {
         this.$http.patch(`/boxes/${row.uuid}`, {
           type: 'mark'
         }).then((res) => {
           this.$message.success('保存成功')
           this.fetchData()
           this.fetchTotalData()
         })
      },
      // 编辑碎片
      handleEditCoverChip(row) {
        this.editUuid = row.uuid
        this.isEditCoverChip = true
      },
      // 编辑隐藏款
      handleEditHiddenSku(row) {
        this.editUuid = row.uuid
        this.isEditHiddenSku = true
      },
      // 编辑普通款
      handleEditNormalSku(row) {
        this.editUuid = row.uuid
        this.isEditNormalSku = true
      },
      getPath(row) {
        this.$getPathPopup.show({
          page: '/pages/boxDetail/index',
          param: 'uuid=' + row.uuid
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
      updateRewardAndBrokerage(row, data) {
        this.updateItem(row, data).then(res => {
          this.$message.success('保存成功');
          this.$iForm.hide()
          this.fetchData()
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
      statusChange(e, row) {
        this.updateItem(row, {
          status: e
        }).then(res => {
          this.fetchData()

          this.fetchTotalData()
        })
      },
      listedStatusChange(e, row) {
        this.updateItem(row, {
          status: e
        }).then(res => {
          this.fetchData()

          this.fetchTotalData()
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
        this.$router.push({
          path: '/rank/edit'
        })
      },
      handleEdit(row) {
        this.editUuid = row.uuid
        this.isEdit = true
      },
      refreshData() {
        this.page = 1
        this.key = ''
        this.fetchData()

        this.fetchTotalData()
      },
      onSearch(e) {
        this.fetchData()
        // clearTimeout(this.timeout)
        // this.timeout = setTimeout(() => {
        //   this.fetchData()
        // }, 300)
      },
      fetchTotalData() {
        this.$http('/status-total/box').then((res) => {
          this.statusTotal = res.data.total
        })
      },
      fetchData() {
        this.isEdit = false
        this.$http.get('/box-rank', {
          params: {
            ...this.params,
            page: this.page,
            per_page: this.per_page,
          }
        }).then(res => {
          this.list = res.data.list
          this.total = res.data.item_total
        }).finally(() => {
          this.loading = false
        })

        // this.fetchTotalData()
      },
      getCategoryList() {
        this.$api.emit('category.list', 'article').then(res => {
          this.categoryList = res.data.list
        })
      },
    }
  }
</script>
<style lang="scss" scoped>

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

  .content-head {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .table {
    .thumb {
      height: 60px;
      width: 60px;
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

  }


  .box {
    // padding: 20px;
    background-color: #fff;
  }

  .header-content {
    .input {
      margin-right: 15px;
      width: 200px;
    }
  }

  .table {
    .headimg-c {
      display: flex;
    }
    .headimg {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      object-fit: contain;
    }

    .thumb-c {
      display: flex;
      align-items: center;
      .right {
        margin-left: 10px;
      }
      .title {
        // min-height: 30px;
        min-width: 100px;
        font-weight: 500;
      }
    }

    .image-tag {
      color: rgba(0, 0, 0, 0.45);
      font-size: 13px;
      line-height: 22px;
    }
  }
</style>
