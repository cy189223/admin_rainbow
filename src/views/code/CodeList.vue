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
      <div>
        <a-button type="primary" @click="handleCreate" v-if="!selectMode">创建</a-button>
        <a-button type="primary" style="margin-left: 8px;" @click="handleBatchCreate" v-if="!selectMode">批量创建</a-button>

        <a-button type="primary" style="margin-left: 26px;" @click="isExport = true" v-if="!selectMode">导出</a-button>
      </div>
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">
      <a-table-column title="标题" width="100px">
        <template slot-scope="row">
          {{row.title}}
        </template>
      </a-table-column>
      <a-table-column title="批号" width="100px">
        <template slot-scope="row">
          {{row.batch_number}}
        </template>
      </a-table-column>
      <a-table-column title="兑换码" width="100px">
        <template slot-scope="row">
          {{row.code}}
        </template>
      </a-table-column>
      <a-table-column title="兑换类型" width="160px">
        <template slot-scope="row">
          <span v-if="row.code_type == 'coupon'">优惠券 - {{row.coupon && row.coupon.title}}</span>
          <span v-else-if="row.code_type == 'score'">积分 - {{row.score}}</span>
          <span v-else-if="row.code_type == 'redpack'">红包 - {{row.redpack / 100}}元</span>
          <span v-else-if="row.code_type == 'exclude_card'">排除卡 - {{row.prize_total}}张</span>
          <span v-else-if="row.code_type == 'show_card'">透视卡 - {{row.prize_total}}张</span>
          <!-- <span v-else-if="row.code_type == 'chip'">碎片 - {{row.prize_total}}块 - {{row.chip && row.chip.title}}</span> -->
        </template>
      </a-table-column>
      <a-table-column title="库存" width="60px">
        <template slot-scope="row">
          {{row.stock}}
        </template>
      </a-table-column>
      <a-table-column title="已兑换" width="60px">
        <template slot-scope="row">
          {{row.sales}}
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
      <a-table-column title="是否上架" width="40px" v-if="!selectMode">
        <template slot-scope="row">
          <ISwitch :value="row.status" :active="1" :unactive="0" @change="listedStatusChange($event, row)" />
        </template>
      </a-table-column>
      <a-table-column title="创建日期" dataIndex="created_at" width="100px">
        <template slot-scope="created_at">
          <span>{{ created_at | onlyDay }}</span>
        </template>
      </a-table-column>
      <a-table-column title="操作" width="140px" v-if="!selectMode">
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

    <a-modal
      :title="(editUuid ? '编辑' : '创建') + resourceTypeText"
      style="top: 100px;"
      :visible="isEdit"
      width="1000px"
      @cancel="isEdit = false"
      :footer="null"
    >
      <EditForm v-if="isEdit" :uuid="editUuid" @cancel="isEdit = false" @success="fetchData"></EditForm>
    </a-modal>

    <a-modal
      title="批量创建兑换码"
      style="top: 100px;"
      :visible="isBatchCreate"
      width="1000px"
      @cancel="isBatchCreate = false"
      :footer="null"
    >
      <BatchEditForm @cancel="isBatchCreate = false" @success="fetchData"></BatchEditForm>
    </a-modal>

    <ExportPopup @hide="isExport=false" :isShow="isExport"></ExportPopup>

  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'

  import EditForm from "./EditCode.vue"
  import BatchEditForm from "./BatchCreate.vue"
  const resourceType = 'codes'
  const resourceTypeText = '兑换码'

  import ExportPopup from "./components/ExportPopup"

  export default {
    components: {
      ISwitch,
      EditForm,
      BatchEditForm,
      ExportPopup
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
        isBatchCreate: false,
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
        category_id: undefined,
        isExport: false
      }
    },
    watch: {
      params() {
        this.refreshData()
      },
      category_id() {
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
            // this.page = e.current
            // this.per_page = e.pageSize
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
      handleGetPath (row) {
        this.$getPathPopup.show({
          page: '/pages/code/index',
          param: 'code=' + row.code
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
      recommendStatusChange(e, row) {
        this.updateItem(row, {
          is_recommend: e
        }).then(res => {
          this.fetchData()
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
      handleBatchCreate(row) {
        // this.editUuid = row.uuid
        this.isBatchCreate = true
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
        this.isBatchCreate = false
        this.$http.get(`/${resourceType}`, {
          params: {
            ...this.params,
            page: this.page,
            per_page: this.per_page,
            key: this.key,
            category_id: this.category_id
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
