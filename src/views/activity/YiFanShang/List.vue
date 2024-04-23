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

        <a-input-search placeholder="输入关键字" enter-button  style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" @search="onSearch" />

        <router-link to="/activity/yifanshang/setting" style="margin: 0px 10px;">规则配置</router-link>
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
      <a-table-column title="标题" width="240px">
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
      <a-table-column title="分类" width="80px">
        <template slot-scope="row">
          <div>{{row.type == 'yfs' ? '一番赏' : '双随机'}}</div>
        </template>
      </a-table-column>
      <a-table-column title="箱子数" width="100px">
        <template slot-scope="row">
            <a href="javascript:;" @click="handleEditRoom(row)">
              <span>共{{row.room_total}}箱子</span>
            </a>
        </template>
      </a-table-column>
      <a-table-column title="已抽次数" width="100px">
        <template slot-scope="row">
            <a href="javascript:;" @click="handleShowPackageSku(row)">
              <span>已抽{{row.open_total}}次</span>
            </a>
        </template>
      </a-table-column>
      <a-table-column width="160px">
        <div slot="title">
          奖品池
          <tips>1、购买赏由用户支付后抽出<br/>2、赠送赏仅可以由系统抽奖送出</tips>
        </div>
        <template slot-scope="row">
          <div>
            <a href="javascript:;" @click="handleEditNormalSku(row)">
              {{row.normal_sku_total}} 种购买赏
            </a>
            {{row.normal_sku_stock}}库存
          </div>
          <div style="margin-top: 6px;" v-if="row.gift_sku_total > 0">
            <a href="javascript:;" @click="handleEditGiftSku(row)">
              {{row.gift_sku_total}} 种赠送赏
            </a>
            {{row.gift_sku_stock}}库存
          </div>
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
      <a-table-column title="是否上架" width="60px" v-if="!selectMode">
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
            <a href="javascript:;" @click="handleCopy(row)">复制</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDelete(row)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>

    <a-modal :maskClosable="false" :title="(editUuid ? '编辑' : '创建') + resourceTypeText" style="top: 100px;" :visible="isEdit" width="1000px"
      @cancel="isEdit = false" :footer="null">
      <Edit v-if="isEdit" :uuid="editUuid" @cancel="isEdit = false" @success="fetchData" />
    </a-modal>

    <EditNormalSku :info="current" v-if="isEditNormalSku" @refresh="fetchData" @close="isEditNormalSku = false"></EditNormalSku>
    <EditGiftSku :info="current" v-if="isEditGiftSku" @refresh="fetchData" @close="isEditGiftSku = false"></EditGiftSku>
    <EditRoom @editOdds="handleEditOdds" :info="current" v-if="isEditRoom" @refresh="fetchData" @close="isEditRoom = false"></EditRoom>
    <EditPackageSku :info="current" v-if="isEditPackageSku" @refresh="fetchData" @close="isEditPackageSku = false"></EditPackageSku>
    <EditOdds :info="currentRoom" v-if="isEditOdds" @refresh="fetchData" @close="isEditOdds = false"></EditOdds>

  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'

  import Edit from "./Edit.vue"

  import EditNormalSku from './components/EditNormalSkuPopup.vue'
  import EditGiftSku from './components/EditGiftSkuPopup.vue'
  import EditRoom from './components/EditRoomPopup.vue'
  import EditOdds from './components/EditOddsPopup.vue'
  import  EditPackageSku from './components/EditPackageSkuPopup.vue'
  // import LotteryUserList from './components/LotteryUserList'

  const resourceType = 'yi-fan-shangs'
  const resourceTypeText = '一番赏'


  export default {
    components: {
      ISwitch,
      Edit,
      EditNormalSku,
      EditGiftSku,
      EditRoom,
      EditOdds,
      EditPackageSku
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
        currentRoom: {},
        isEditNormalSku: false,
        isEditGiftSku: false,
        isEditRoom: false,
        isEditPackageSku: false,
        isShowLotteryUserList: false,
        isEditOdds: false,
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
      fetchTotalData() {
        this.$http('/status-total/activity/yifanshang').then((res) => {
          this.statusTotal = res.data.total
        })
      },
      handleEditOdds(row) {
        this.isEditOdds = true
        this.currentRoom = row
      },
      getPath(row) {
        this.$getPathPopup.show({
          page: '/pages/yifanshang/detail',
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
      // 编辑sku列表
      handleEditNormalSku(row) {
        this.editUuid = row.uuid
        this.current = row
        this.isEditNormalSku = true
      },
      // 编辑隐藏款
      handleEditGiftSku(row) {
        this.editUuid = row.uuid
        this.current = row
        this.isEditGiftSku = true
      },
      // 展示所有抽奖记录
      handleShowPackageSku(row) {
        this.editUuid = row.uuid
        this.current = row
        this.isEditPackageSku = true
      },
      // 编辑房间
      handleEditRoom(row) {
        this.editUuid = row.uuid
        this.current = row
        this.isEditRoom = true
      },
      showLotteryUserList (row) {
        this.editUuid = row.uuid
        this.isShowLotteryUserList = true
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
