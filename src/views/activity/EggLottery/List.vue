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

<!--        <a-input-search placeholder="input search text" enter-button @search="onSearch" />
            <br /><br /> -->
        <a-input-search placeholder="输入关键字" enter-button  style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" @search="onSearch" />

        <router-link to="/activity/egg-lottery/setting" @click="handleDelete(row)" style="margin: 0px 10px;">扭蛋机配置</router-link>

        <!-- <a href="javascript:;" @click="handleDelete(row)">规则配置</a> -->
        <!-- <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button> -->

        <!-- <a-select style="width: 150px;margin-right:10px;" v-model="category_id" placeholder="分类" allowClear>
          <a-select-option :value="item.id" v-for="item in category" :key="item.id">{{ item.title }}</a-select-option>
        </a-select> -->

       <!-- <a-radio-group v-model="status" buttonStyle="solid" style="margin-right:10px;">
          <a-radio-button value="unexpired">未结束</a-radio-button>
          <a-radio-button value="expired">已结束</a-radio-button>
        </a-radio-group> -->

      </div>
      <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button>
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">
      <a-table-column title="标题" width="180px">
        <template slot-scope="row">
          <div class="title-c">
            <img class="thumb" :src="row.thumb" />
            <div class="right">
              <div class="title">{{row.title}}</div>

              <PriceDisplay :info="row"></PriceDisplay>
              <!-- <div class="time"> {{$tool.formatDate(row.start_at, 'MM-dd hh:mm')}}</div>
              <div class="time" v-if="">{{$tool.formatDate(row.end_at, 'MM-dd hh:mm')}}</div> -->
            </div>
          </div>
        </template>
      </a-table-column>
      <!-- <a-table-column title="价格" width="120px">
        <template slot-scope="row">
          <PriceDisplay :info="row" v-if="row.is_need_pay"></PriceDisplay>
          <div v-else>免费</div>
        </template>
      </a-table-column> -->
      <a-table-column title="库存/销量" width="110px">
        <template slot-scope="row">
           <div class="stock">库存: {{row.stock}}</div>
           <div class="stock">销量: {{row.sales}}</div>
        </template>
      </a-table-column>
      <!-- <a-table-column title="奖品等级" width="130px">
        <template slot-scope="row">
           {{row.sku_level.filter(i => {return i.status === 1}).length}}等级
            <a href="javascript:;" @click="handleEditSkuLevel(row)">
              编辑
            </a>
        </template>
      </a-table-column> -->
      <a-table-column title="奖品池" width="120px">
        <template slot-scope="row">
          <div>
            <a href="javascript:;" @click="handleEditSku(row)">
              {{row.skus_count}} 种奖品
            </a>
          </div>
          <div>{{row.sku_stock}}件库存</div>
        </template>
      </a-table-column>
      <!-- <a-table-column title="签号" width="120px">
        <template slot-scope="row">
          <div>
            <a href="javascript:;" @click="showLotteryUserList(row)">{{row.records_count}}人参与</a>
          </div>
          <div>{{row.lottery_tickets_count}}张签号</div>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="阅读量" width="80px">
        <template slot-scope="row">
          {{row.visit_total}}
        </template>
      </a-table-column> -->
      <a-table-column title="排序" width="100px" v-if="!selectMode">
        <template slot-scope="row">
          {{row.list_weight}}
          <span @click="handleEditListWeight(row)" style="margin-left: 10px;"><a href="javascript:;">
              <a-icon type="edit" />
            </a></span>
        </template>
      </a-table-column>
      <!-- <a-table-column title="状态" width="60px">
        <template slot-scope="row">
          <a-tag color="blue">
            {{row.union_status_text}}
          </a-tag>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="推荐置顶" width="40px" v-if="!selectMode">
        <template slot-scope="row">
          <ISwitch :value="row.is_recommend" :active="1" :unactive="0" @change="recommendStatusChange($event, row)" />
        </template>
      </a-table-column> -->
      <a-table-column title="上/下架" width="60px" v-if="!selectMode">
        <template slot-scope="row">
          <ISwitch :value="row.status" :active="1" :unactive="0" @change="listedStatusChange($event, row)" />
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
            <a href="javascript:;" @click="getPath(row)">预览/路径</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDelete(row)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>

    <a-modal :title="(editUuid ? '编辑' : '创建') + resourceTypeText" style="top: 100px;" :visible="isEdit" width="1000px"
      @cancel="isEdit = false" :footer="null">
      <Edit v-if="isEdit" :uuid="editUuid" @cancel="isEdit = false" @success="fetchData" />
    </a-modal>

    <EditSkuList :info="current"  v-if="isEditSkuList" @refresh="fetchData" @close="isEditSkuList = false"></EditSkuList>

    <!-- <EditSkuLevel :info="current" v-if="isEditSkuLevel" @refresh="fetchData" @close="isEditSkuLevel = false"></EditSkuLevel> -->


  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'

  import Edit from "./Edit.vue"

  import EditSkuList from './components/EditSkuListPopup.vue'
  // import EditSkuLevel from './components/EditSkuLevelPopup.vue'

  const resourceType = 'egg-lotteries'
  const resourceTypeText = '扭蛋机'

  export default {
    components: {
      ISwitch,
      Edit,
      EditSkuList,
      // EditSkuLevel
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
        isEditSkuLevel: false,
        isEditSkuList: false,
        currentSkuLevel: 1,
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
        category_id: undefined,
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
            text: '售罄',
            key: 'sell_out'
          }
        ],
        status: 'on_stock',
        statusTotal: {
          on_stock: 0,
          off_stock: 0,
          sell_out: 0,
          marked: 0
        },
      }
    },
    watch: {
      params() {
        this.refreshData()
      },
      category_id() {
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
      fetchTotalData() {
        this.$http('/status-total/activity/egg-lottery').then((res) => {
          this.statusTotal = res.data.total
        })
      },
      handleEditSku(row) {
        this.current = row
        // this.currentSkuLevel = level
        this.isEditSkuList = true
      },
      getPath(row) {
        this.$getPathPopup.show({
          page: '/pages/eggLottery/detail',
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
      handleEditSkuLevel (row) {
        this.current =  row
        this.isEditSkuLevel = true
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
      fetchData() {
        this.isEdit = false
        this.$http.get(`/${resourceType}`, {
          params: {
            // type: activityType,
            status: this.status,
            ...this.params,
            page: this.page,
            per_page: this.per_page,
            // type: this.type,
            key: this.key,
            category_id: this.category_id
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

  .level-title {
    // font-size: 100%;
    font-weight: 500;
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
      }

      .time {
        color: gray;
        font-size: 80%;
      }
    }
  }
</style>
