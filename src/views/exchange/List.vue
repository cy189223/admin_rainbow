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

        <a-input placeholder="标题/用户名/手机号" style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" />
        <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

        <!-- <a-select style="width: 150px;margin-right:10px;" v-model="category_id" placeholder="分类" allowClear>
          <a-select-option :value="item.id" v-for="item in category" :key="item.id">{{ item.title }}</a-select-option>
        </a-select> -->

      </div>


      <!-- <div style="margin-top: 4px;">

        <a-button type="primary" v-if="isAutoMatch" style="margin-right:30px;"  @click="batchBuy">一键购买</a-button>

        <a-button type="primary" style="margin-right:10px;"  @click="isExport = !isExport">导出Excel</a-button>
      </div> -->

      <!-- <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button> -->
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">

      <a-table-column title="ID" width="10px">
        <template slot-scope="row">
          <span>{{row.id}}</span>
        </template>
      </a-table-column>

      <a-table-column title="用户" width="10px">
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


      <a-table-column title="物品" width="100px">
        <template slot-scope="row">
          <div style="display: flex; align-items: center;"  v-for="(item, index) in row.package_skus">
            <img :src="item.thumb  + '?x-oss-process=image/resize,w_400'" class="thumb"  style="margin-right: 10px;" />
            <div>
              <div style="font-weight: 500; font-size: 110%;">
                {{item.title}} <a-tag v-if="item.sku_type_text === 'virtual_asset'" color='orange'>虚拟资产</a-tag>
              </div>
              <!-- <div>【{{row.sid}}】</div> -->
              <div>
                <PriceDisplay :info="item"></PriceDisplay>
              </div>
            </div>
          </div>
          <div style="margin-top: 10px;">
            <img @click="$viewImage(url)" v-for="(url, index) in row.images" :src="url" class="content-image"></img>
          </div>
        </template>
      </a-table-column>

      <a-table-column title="置换商品" width="100px">
        <template slot-scope="row">
          <div style="display: flex; align-items: center;">
            <img :src="row.product_sku.thumb  + '?x-oss-process=image/resize,w_400'" class="thumb"  style="margin-right: 10px;" />
            <div>
              <div style="font-weight: 500; font-size: 110%;">
                {{row.product_sku.title}}
              </div>
              <!-- <div>【{{row.sid}}】</div> -->
              <div>
                <PriceDisplay :info="row.product_sku"></PriceDisplay>
              </div>
            </div>
          </div>
        </template>
      </a-table-column>
      <!-- <a-table-column title="图片" width="200px">
        <template slot-scope="row">
          <img @click="$viewImage(url)" v-for="(url, index) in row.images" :src="url" class="content-image"></img>
        </template>
      </a-table-column> -->

      <!-- <a-table-column title="数量" width="40px">
        <template slot-scope="row">
          <span>共{{row.product_total}}件</span>
        </template>
      </a-table-column> -->

      <a-table-column title="置换抵扣" width="40px">
        <template slot-scope="row">
          <PriceDisplay :info="row" moneyKey="source_money_price" scoreKey="source_score_price"></PriceDisplay>
        </template>
      </a-table-column>

      <a-table-column title="订单编号" width="10px">
        <template slot-scope="row">
          {{row.order_number}}
        </template>
      </a-table-column>

      <a-table-column title="状态" width="60px">
        <template slot-scope="row">
          {{row.union_status_text}}
        </template>
      </a-table-column>

      <a-table-column title="发起日期" dataIndex="created_at" width="80px">
        <template slot-scope="created_at">
          <span>{{ created_at | onlyDay }}</span>
        </template>
      </a-table-column>
      <a-table-column title="操作" width="80px" v-if="!selectMode">
        <template slot-scope="row">
          <span>
            -
          </span>
        </template>
      </a-table-column>
    </a-table>

    <ExportPopup @hide="isExport=false" :isShow="isExport"></ExportPopup>

  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'

  import ExportPopup from "./components/ExportPopup"


  const resourceType = 'market/exchange/records'
  const resourceTypeText = '置换记录'

  export default {
    components: {
      ISwitch,
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
      },
      isAutoMatch: {
        type: Boolean
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
            text: '待支付',
            key: 'pending'
          },
          {
            text: '已置换',
            key: 'completed'
          },
          {
            text: '全部',
            key: 'all'
          }
        ],
        statusTotal: {
          pending: 0,
          completed: 0,
          all: 0
        },
        isExport: false,
        tenantList: []
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
      },
      isAutoMatch() {
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
      },
      tenantOptions () {
        return this.tenantList.map(item => {
          return {
            title: item.title,
            value: item.id
          }
        })
      },
      defaultTenant () {
        return this.tenantList && this.tenantList[0] || {}
      }
    },
    filters: {},
    created() {
      this.fetchData()
      // this.getCategoryList()

      this.$http('/market/tenants').then(res => {
        this.tenantList = res.data.list
      })
    },
    methods: {
      handleGetPath (row) {
        this.$getPathPopup.show({
          page: '/pages/resale/detail',
          param: 'uuid=' + row.uuid
        })
      },
      batchBuy (row) {
        this.$iForm.show({
          title: '批量购买所有使用建议价挂售中的商品',
          frame: [
            {
              title: '使用商户',
              key: 'tenant_id',
              type: 'select',
              options: this.tenantOptions,
              tips: '指定商户进行购买 <br/> 请确保商户绑定的用户有足够的积分或红包余额',
              required: true,
              default: this.defaultTenant.id
            }
          ],
          success: (data) => {
            this.$http.post('/market/batch-buy', {
              ...data
            }).then(res => {
              this.fetchData()
              this.$iForm.hide()
              this.$message.success('成功购买' + res.data.total + '个转售')
            })
          }
        })
      },
      handleBuy (row) {
        this.$iForm.show({
          title: '购买转售',
          frame: [
            {
              title: '使用商户',
              key: 'tenant_id',
              type: 'select',
              options: this.tenantOptions,
              tips: '指定商户进行购买 <br/> 请确保商户绑定的用户有足够的积分或红包余额',
              required: true,
              default: this.defaultTenant.id
            }
          ],
          success: (data) => {
            this.$http.post('/market/transactions', {
              resale_id: row.id,
              ...data
            }).then(res => {
              this.fetchData()
              this.$iForm.hide()
              this.$message.success('购买成功')
            })
          }
        })
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
        this.$http('/market/exchange/record/status', {
          params: {
            ...this.params,
            key: this.key,
            match_type: this.isAutoMatch ? 2 : 1
          }
        }).then((res) => {
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
            category_id: this.category_id,
            match_type: this.isAutoMatch ? 2 : 1
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
