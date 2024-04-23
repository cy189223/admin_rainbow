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

        <a-input placeholder="输入关键字" style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" />
        <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

        <!-- <a-select style="width: 150px;margin-right:10px;" v-model="category_id" placeholder="分类" allowClear>
          <a-select-option :value="item.id" v-for="item in category" :key="item.id">{{ item.title }}</a-select-option>
        </a-select> -->
      </div>

      <div style="margin-top: 4px;">
        <a-button type="primary" style="margin-right:10px;"  @click="isExport = !isExport">导出Excel</a-button>
      </div>
      <!-- <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button> -->

    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">

      <a-table-column title="编号" width="10px">
        <template slot-scope="row">
          {{row.number}}
        </template>
      </a-table-column>

      <a-table-column title="用户" width="10px">
        <template slot-scope="row">
          <div class="user" v-if="row.user">
            <img :src="row.user.headimg" alt="用户头像">
            <div>
              <div>{{ row.user.name }}</div>
              <div>{{row.user.phone}}</div>
            </div>
            <!-- <a-icon class="gender-man" v-if="row.gender==='男'" type="man" />
            <a-icon class="gender-woman" v-else type="woman" /> -->
          </div>
          <div v-else>-</div>
        </template>
      </a-table-column>


      <a-table-column title="金额" width="60px">
        <template slot-scope="row">
          {{$tool.formatPrice(row.value)}}
        </template>
      </a-table-column>
      <a-table-column title="提现类型" width="100px">
        <template slot-scope="row">
          {{typeList[row.withdraw_type]}}
        </template>
      </a-table-column>
      <a-table-column title="收款码" width="80px">
        <template slot-scope="row">
          <a v-if="row.account_qrcode" target="_blank" :href="row.account_qrcode">
            <img class="account-qrcode" :src="row.account_qrcode" />
          </a>
        </template>
      </a-table-column>
      <a-table-column title="帐号" width="80px">
        <template slot-scope="row">
          {{row.account || '-'}}
        </template>
      </a-table-column>
      <a-table-column title="自动转帐状态" width="80px">
        <template slot-scope="row">
          <div class="status" :class="row.auto_pay_status">{{row.auto_pay_status_text}}</div>
          <a v-if="row.auto_pay_status === 2 || row.auto_pay_status === 3 || row.auto_pay_status === 4" href="javascript:;" @click="handleStartAutoPay(row)">立即转帐</a>
        </template>
      </a-table-column>
      <a-table-column title="状态" width="60px">
        <template slot-scope="row">
          <span class="status" :class="row.union_status">{{row.union_status_text}}</span>
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
      <a-table-column title="提交日期" dataIndex="created_at" width="80px">
        <template slot-scope="created_at">
          <span>{{ created_at | onlyDay }}</span>
        </template>
      </a-table-column>
      <a-table-column title="操作" width="100px" v-if="!selectMode">
        <template slot-scope="row">
          <span>
            <template v-if="row.union_status == 'pending'">
              <a href="javascript:;" @click="handleComplete(row)">已完成</a>
              <a-divider type="vertical" />
              <a href="javascript:;" @click="handleClose(row)">已取消</a>
              <br />
            </template>
            <template v-else>-</template>
            <!-- <a href="javascript:;" @click="handleDelete(row)">删除</a> -->
          </span>
        </template>
      </a-table-column>
    </a-table>

    <a-modal :title="(editUuid ? '编辑' : '创建') + resourceTypeText" style="top: 100px;" :visible="isEdit" width="1000px"
      @cancel="isEdit = false" :footer="null">
      <EditForm v-if="isEdit" :uuid="editUuid" @cancel="isEdit = false" @success="fetchData"></EditForm>
    </a-modal>

    <ExportPopup @hide="isExport=false" :isShow="isExport"></ExportPopup>

  </div>
</template>
<script>
  import ISwitch from '@/components/ISwitch/ISwitch'

  import ExportPopup from "./components/ExportPopup"

  // import EditForm from "./EditTopic.vue"
  const resourceType = 'assets/redpack/withdraw'
  const resourceTypeText = '提现记录'

  export default {
    components: {
      ISwitch,
      ExportPopup
      // EditForm
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
        typeList: {
          'alipay': '支付宝(手动)',
          'wechat_pay': '微信转帐(手动)',
          'wechat_pay_auto': '微信零钱(自动)',
          'bank': '银行卡(手动)',
          'bank_auto': '银行卡(自动)'
        },
        statusList: [
          {
            text: '待处理',
            key: 'pending'
          },
          {
            text: '已完成',
            key: 'completed'
          },
          {
            text: '已取消',
            key: 'closed'
          }
        ],
        status: 'pending',
        statusTotal: {
          pending: 0,
          completed: 0,
          closed: 0,
          // marked: 0
        },
        isExport: false
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
      handleStartAutoPay(row) {
        this.$confirm({
          title: '确认进行在线自动转帐吗?',
          content: '自动转帐将从微信商户平台帐号转帐给用户，请确保该商户平台内余额充足。',
          onOk: () => {
            this.$http.patch(`/${resourceType}/${row.uuid}`, {
              type: 'start_auto_pay'
            }).then(res => {
              this.$message.success('操作成功');
              this.fetchData()
            })
          }
        })
      },
      handleComplete(row) {
        this.$iForm.show({
          title: '填写备注',
          frame: [
            {
              type: 'textarea',
              title: '转帐备注',
              key: 'remark',
              placeholder: '如转帐时间、编号等',
              tips: '此备注仅后台显示, 限255字以内'
            }
          ],
          success: (data) => {
            this.$http.patch(`/${resourceType}/${row.uuid}`, {
              type: 'complete',
              ...data
            }).then(res => {
              this.$message.success('操作成功');
              this.$iForm.hide()
              this.fetchData()
            })
          },
        })
      },
      handleClose(row) {
        this.$confirm({
          title: '确认取消此提现吗',
          content: '取消提现后，将释放用户冻结的帐户余额',
          onOk: () => {
            this.$http.patch(`/${resourceType}/${row.uuid}`, {
              type: 'close'
            }).then(res => {
              this.$message.success('操作成功');
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
      fetchTotalData() {
        this.$http('/status-total/withdraw-record').then((res) => {
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
            category_id: this.category_id,
            status: this.status
          }
        }).then(res => {
          this.list = res.data.list
          this.total = res.data.item_total
        }).finally(() => {
          this.fetchTotalData()
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

  .account-qrcode {
    width: 40px;
    cursor: pointer;
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

  .status {
    &.completed {
      color: #2BA246;
    }
    &.closed {
      color: red;
    }
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
