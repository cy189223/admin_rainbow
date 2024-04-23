<template>
  <div class="list">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">
        <a-input placeholder="用户名/手机号" style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" />
        <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

        <span>
          总存余:  <span class="value-font"> {{assetInfo.balance}} </span>
        </span>
        <span style="margin-left: 20px;">
          总收入:  <span class="value-font"> {{assetInfo.in}} </span>
        </span>
        <span style="margin-left: 20px;">
          总支出: <span class="value-font"> {{assetInfo.out}} </span>
        </span>
        <!-- <a-select style="width: 150px;margin-right:10px;" v-model="category_id" placeholder="分类" allowClear>
          <a-select-option :value="item.id" v-for="item in category" :key="item.id">{{ item.title }}</a-select-option>
        </a-select> -->

      </div>
      <!-- <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button> -->
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">
      <a-table-column title="用户" width="40px">
        <template slot-scope="row">
          <div class="user">
            <img :src="row.user.headimg" alt="用户头像">
            <span>{{ row.user.name }}</span>
            <a-icon class="gender-man" v-if="row.gender==='男'" type="man" />
            <a-icon class="gender-woman" v-else type="woman" />
            {{row.user.phone}}
          </div>
        </template>
      </a-table-column>
      <a-table-column title="变动数额" width="60px">
        <template slot-scope="row">
          <div v-if="row.type === 0" style="color: red;">
            - {{row.value}}
          </div>
          <div v-else style="color: #2BA246;">
             + {{row.value}}
          </div>
        </template>
      </a-table-column>
      <a-table-column title="操作人" width="80px">
        <template slot-scope="row">
          <div>
            {{row.admin && row.admin.name || '-'}}
          </div>
        </template>
      </a-table-column>
      <a-table-column title="变动描述" width="80px">
        <template slot-scope="row">
          <div>
            {{row.description }}
          </div>
          <div style="margin-top: 4px;">{{row.order_number}}</div>
        </template>
      </a-table-column>
      <a-table-column title="变动后余额" width="80px">
        <template slot-scope="row">
          <div>
            {{row.after}}
          </div>
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
      <a-table-column title="变动类型" width="80px">
        <template slot-scope="row">
          <span v-if="row.sub_type === 1">系统变动</span>
          <span v-else-if="row.sub_type === 2">后台单个修改</span>
          <span v-else-if="row.sub_type === 3">批量导入修改</span>
        </template>
      </a-table-column>
      <a-table-column title="变动日期" dataIndex="created_at" width="80px">
        <template slot-scope="created_at">
          <span>{{ created_at | onlyDay }}</span>
        </template>
      </a-table-column>
      <!-- <a-table-column title="操作" width="100px" v-if="!selectMode">
        <template slot-scope="row">
          <span>
            <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDelete(row)">删除</a>
          </span>
        </template>
      </a-table-column> -->
    </a-table>

    <a-modal
      :title="(editUuid ? '编辑' : '创建') + resourceTypeText"
      style="top: 100px;"
      :visible="isEdit"
      width="1000px"
      @cancel="isEdit = false"
      :footer="null"
    >
      <EditForm :uuid="editUuid" @cancel="isEdit = false" @success="fetchData"></EditForm>
    </a-modal>
  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'

  const resourceType = 'asset-records/score'
  const resourceTypeText = '积分操作记录'

  export default {
    components: {
      ISwitch,
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
        category_id: undefined,
        assetInfo: {

        }
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
      refreshData() {
        this.page = 1
        this.key = ''
        this.fetchData()
      },
      onSearch(e) {
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

        this.$http.get(`/assets/score`).then(res => {
          this.assetInfo = res.data.info
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
  .value-font {
    font-weight: 500;
    font-size: 110%;
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
