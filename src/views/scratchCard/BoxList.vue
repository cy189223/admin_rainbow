<template>
  <div class="list">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">

       <div class="tab-list">
          <div class="item" @click="keys.status = item.key" :class="{actived: keys.status === item.key}"
            v-for="(item, index) in statusList">
            {{item.text}}
            ({{statusTotal[item.key]}})
          </div>
        </div>

        <!-- <a-input placeholder="输入关键字" style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" />
        <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button> -->

        <a-input-search placeholder="输入关键字" enter-button  style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" @search="onSearch" />

        <router-link to="/scratchCard/setting" style="margin: 0px 10px;">盲盒全局配置</router-link>

        <!-- <a-select style="width: 150px;margin-right:10px;" v-model="category_id" placeholder="分类" allowClear>
          <a-select-option :value="item.id" v-for="item in category" :key="item.id">{{ item.title }}</a-select-option>
        </a-select> -->

      </div>
      <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button>
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">
      <a-table-column title="标题" class="table-column" width="300px">
        <template slot-scope="row">
          <div class="thumb-c">
            <img class="thumb" :src="row.thumb  + '?x-oss-process=image/resize,w_400'">
            <div class="right">
              <div class="title">
                {{row.title}}
                <div>
                  <a-tag color="orange" class="small" v-if="row.is_presell">预售</a-tag>
                  <a-tag color="red" class="small" size="small" v-if="row.status == 0">下架</a-tag>
                </div>
                <!-- <a-tag color="orange" size="small" v-if="row.is_presell">预售</a-tag>
                <a-tag color="red" size="small" v-if="row.status == 0">下架</a-tag> -->
              </div>
              <div class="image-tag">
                <span class="marked-tag" @click="markBox(row)" :class="{actived: row.marked_at}">标记</span>
                <span>角标:</span>
                <span>{{row.image_tag && row.image_tag.title || '-'}}</span>
              </div>
              <div class="price">
                <PriceDisplay :info="row"></PriceDisplay>
              </div>
            </div>
          </div>
        </template>
      </a-table-column>
      
      <a-table-column title="箱子数" width="100px">
        <template slot-scope="row">
            <a href="javascript:;" @click="handleEditRoom(row)">
              <span>共{{row.room_total}}箱子</span>
            </a>
        </template>
      </a-table-column>
      <a-table-column title="SKU" width="280px">
        <template slot-scope="row">
          <div>
            <span style="font-weight: 500;">普通款: </span>
            <span>{{ row.normal_skus_count }}款</span>&nbsp;
            <span>{{ row.normal_sku_sales || 0 }}销量</span>&nbsp;
            <span>{{ row.normal_sku_stock || 0 }}库存</span>&nbsp;
            <a href="javascript:;" @click="handleEditNormalSku(row)">编辑</a>
          </div>
          <div style="margin-top: 4px;">
            <span style="font-weight: 500;">隐藏款: </span>
            <span>{{ row.hidden_skus_count }}款</span>&nbsp;
            <span>{{ row.hidden_sku_sales || 0 }}销量</span>&nbsp;
            <span>{{ row.hidden_sku_stock || 0 }}库存</span>&nbsp;
            <a href="javascript:;" @click="handleEditHiddenSku(row)">编辑</a>
          </div>
          <!-- <div style="margin-top: 4px;">
            <span style="font-weight: 500;">总&nbsp&nbsp&nbsp 计: </span>
            <span>{{ row.room_total }}房间</span>
            <span style="margin-left: 10px;">{{ row.sales }}销量</span>
            <span style="margin-left: 10px;">{{ row.return_total }}返售</span>
          </div> -->
        </template>
      </a-table-column>
      <!-- <a-table-column title="隐藏款" width="220px">
        <template slot-scope="row">
          <div>
            <span>隐藏款</span>
            <span>{{ row.hidden_skus_count }}款</span>&nbsp;
            <span>{{ row.hidden_sku_sales || 0 }}销量</span>&nbsp;
            <span>{{ row.hidden_sku_stock || 0 }}库存</span>&nbsp;
          </div>
          <a href="javascript:;" @click="handleEditHiddenSku(row)">编辑</a>
        </template>
      </a-table-column> -->

      <!-- <a-table-column title="兑换碎片" width="90px">
        <template slot-scope="row">
          <div>
          </div>
          <a href="javascript:;" @click="handleEditCoverChip(row)">编辑</a>
        </template>
      </a-table-column> -->

      <!-- <a-table-column title="隐藏款" width="140px">
        <template slot-scope="row">
          <template v-if="row.hidden_title">
            <img class="img" :src="row.hidden_thumb"><br />
            <span>{{ row.hidden_title }}</span>&nbsp;
          </template>
          <a href="javascript:;" @click="editHidden(row)">编辑</a>
        </template>
      </a-table-column> -->
      <a-table-column title="统计" width="120px">
        <template slot-scope="row">
          <div>{{ row.room_total }}房间</div>
          <div>{{ row.sales }}销量</div>
          <div>{{ row.return_total }}返售</div>
        </template>
      </a-table-column>
      <!-- <a-table-column title="总售出" width="100px">
        <template slot-scope="row">
          <span>{{ row.sales }}个</span>
        </template>
      </a-table-column>
      <a-table-column title="返售" width="100px">
        <template slot-scope="row">
          <span>{{ row.return_total }}个</span>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="隐藏款开关" width="100px">
        <template slot-scope="row">
          <ISwitch :value="row.is_has_hidden" :active="1" :unactive="0" @change="productStatusChange($event, row)" />
        </template>
      </a-table-column> -->
	 <!-- <a-table-column title="分销/下单奖励" width="140px">
	    <template slot-scope="row">
	      <RewardAndBrokerage :info="row" @update="updateRewardAndBrokerage(row, $event)"></RewardAndBrokerage>
	    </template>
	  </a-table-column> -->
      <a-table-column title="上下架" width="80px">
        <template slot-scope="row">
          <ISwitch :value="row.status" :active="1" :unactive="0" @change="statusChange($event, row)" />
        </template>
      </a-table-column>
      <!-- <a-table-column title="开盒次数" key="is_presell" width="120px">
        <template slot-scope="row">
          <div>
            普通款: <a href="javascript:;" @click="checkOpenCount(row)">{{ row.sales }}次</a>
          </div>
          <div>
            隐藏款: {{row.hidden_sku_sales}}次</a>
          </div>
        </template>
      </a-table-column> -->
      <a-table-column title="权重" width="120px">
        <template slot-scope="row">
          <span>{{ row.list_weight }}</span> &nbsp
          <a href="javascript:;" @click="handleEditListWeight(row)">编辑</a>
        </template>
      </a-table-column>
      <a-table-column title="操作" key="action" width="220px">
        <template slot-scope="row">
          <div>
            <a href="javascript:;" @click="getPath(row)">预览/路径</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleEdit(row)">编辑</a>
          </div>
          <div style="margin-top: 6px;">
            <a href="javascript:;" @click="handleCopy(row)">复制</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDelete(row)">删除</a>
          </div>
        </template>
      </a-table-column>
    </a-table>

    <EditNormalSku :uuid="editUuid" v-if="isEditNormalSku" @refresh="fetchData" @close="isEditNormalSku = false"></EditNormalSku>

    <a-modal :title="(editUuid ? '编辑' : '创建') + resourceTypeText" style="top: 100px;" :maskClosable="false" :visible="isEdit"
      width="1000px" @cancel="isEdit = false" :footer="null">
      <EditForm :uuid="editUuid" v-if="isEdit" @cancel="isEdit = false" @success="fetchData"></EditForm>
    </a-modal>

    <a-modal title="编辑隐藏款" width="1480px" :footer="null" @cancel="isEditHiddenSku = fetchData() || false" :visible="isEditHiddenSku">
      <div>
        <EditHiddenSku @close="isEditHiddenSku = false" @refresh="fetchData" :uuid="editUuid"></EditHiddenSku>
      </div>
    </a-modal>

    <EditRoom @editOdds="handleEditOdds" :info="current" v-if="isEditRoom" @refresh="fetchData" @close="isEditRoom = false"></EditRoom>
    <EditOdds :info="currentRoom" v-if="isEditOdds" @refresh="fetchData" @close="isEditOdds = false"></EditOdds>


    <!-- <a-modal title="编辑兑换碎片" width="1000px" :footer="null" @cancel="isEditCoverChip = fetchData() || false" :visible="isEditCoverChip">
      <div>
        <EditCoverChip @close="isEditCoverChip = false" @refresh="fetchData" :uuid="editUuid"></EditCoverChip>
      </div>
    </a-modal> -->

  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'
  import EditHiddenSku from './components/EditHiddenSku'
  import EditNormalSku from './components/EditNormalSku'
  import EditCoverChip from './components/EditCoverChip'
  import EditRoom from './components/EditRoomPopup.vue'
  import EditOdds from './components/EditOddsPopup.vue'

  import EditForm from "./EditBox.vue"
  const resourceType = 'boxes'
  const resourceTypeText = '盲盒'

  export default {
    components: {
      ISwitch,
      EditForm,
      EditHiddenSku,
      EditNormalSku,
      EditCoverChip,
      EditRoom,
      EditOdds
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
        list: [{activity_type
: 
"box",
activity_type_text
: 
"盲盒",
bg_color_mode
: 
1,
big_box_bottom
: 
null,
big_box_top
: 
null,
box_top_image
: 
null,
brokerage_money
: 
null,
brokerage_score
: 
null,
category_ids
: 
[37],
created_at
: 
"2023-12-20 16:30:33",
deleted_at
: 
null,
detail_images
: 
null,
discount_money_price
: 
null,
discount_score_price
: 
null,
display_type
: 
1,
free_tips_limit
: 
null,
hidden_sku_sales
: 
0,
hidden_sku_stock
: 
"20",
hidden_skus_count
: 
1,
id
: 
9,
image_tag
: 
null,
image_tag_id
: 
null,
is_exclude_box
: 
1,
is_free_carriage
: 
0,
is_hidden_sku_rank
: 
0,
is_need_address
: 
1,
is_newest
: 
0,
is_normal_sku_rank
: 
null,
is_offline_useable
: 
1,
is_presell
: 
0,
is_recommend
: 
0,
is_show_box
: 
1,
last_hidden_sales_index
: 
0,
list_weight
: 
99,
lottery_id
: 
null,
marked_at
: 
null,
money_price
: 
999900,
normal_sku_sales
: 
0,
normal_sku_stock
: 
"65",
normal_skus_count
: 
5,
open_box_strategy
: 
1,
open_index
: 
0,
open_mode
: 
1,
order_reward
: 
null,
presell_date
: 
null,
presell_mode
: 
0,
return_total
: 
0,
reward_money
: 
null,
reward_score
: 
null,
room_bg_image
: 
null,
room_total
: 
10,
sales
: 
0,
score_price
: 
null,
second_brokerage_money
: 
null,
second_brokerage_score
: 
null,
sku_3d_image
: 
null,
sku_ratio_type
: 
1,
sku_thumb
: 
null,
sku_total
: 
9,
small_box_image
: 
null,
status
: 
1,
stock
: 
65,
tags
: 
null,
theme_mode
: 
1,
thumb
: 
"https://watchrainbow.oss-cn-beijing.aliyuncs.com/box/img/other/yUKR8wshjQpUaLYlBY9UROBxqFd2lzZDk6nYEbqK.jpg",
tips
: 
null,
title
: 
"测试诬赖",
tmail_product_id
: 
null,
union_status
: 
"working",
union_status_text
: 
"进行中",
updated_at
: 
"2023-12-26 20:23:38",
uuid
: 
"6582a629c3121"}],
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
        isEditCoverChip: false,
        isEditRoom: false,
        isEditOdds:false
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
        //  this.$http.patch(`/boxes/${row.uuid}`, {
        //    type: 'mark'
        //  }).then((res) => {
        //    this.$message.success('保存成功')
        //    this.fetchData()
        //    this.fetchTotalData()
        //  })
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

      
      // 编辑箱子
      handleEditRoom(row) {
        this.editUuid = row.uuid
        this.current = row
        this.isEditRoom = true
      },
      
      handleEditOdds(row) {
        this.isEditOdds = true
        this.currentRoom = row
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
            // this.$http.delete(`/${resourceType}/${row.uuid}`).then(res => {
            //   this.fetchData()
            // })
          }
        })
      },
      handleCopy(row) {
        this.$confirm({
          title: '确定复制吗',
          content: `将复制一个新活动到已下架状态栏`,
          onOk: () => {
            // this.$http.post(`/${resourceType}/${row.uuid}/copy`).then(res => {
              this.$message.success('复制成功，请在“已下架”列表中编辑活动');
            //   this.keys.status = 'off_stock'
            //   this.fetchData()
            // })
          }
        })
      },
      updateRewardAndBrokerage(row, data) {
        // this.updateItem(row, data).then(res => {
          this.$message.success('保存成功');
        //   this.$iForm.hide()
        //   this.fetchData()
        // })
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
            // this.updateItem(row, {
            //   ...data
            // }).then(res => {
            //   this.$message.success('保存成功');
            //   this.$globalForm.hide()
            //   this.fetchData()
            // })
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

        this.fetchTotalData()
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
        // this.$http('/status-total/box').then((res) => {
        //   this.statusTotal = res.data.total
        // })
      },
      fetchData() {
        // this.isEdit = false
        // this.$http.get(`/${resourceType}`, {
        //   params: {
        //     ...this.params,
        //     page: this.page,
        //     per_page: this.per_page,
        //     key: this.key,
        //     status: this.keys.status,
        //     category_id: this.category_id
        //   }
        // }).then(res => {
        //   this.list = res.data.list
        //   this.total = res.data.item_total
        // }).finally(() => {
        //   this.loading = false
        // })

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

  .table-column {
    border: 1px solid red;
  }

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
    .img {
      width: 40px;
      height: 40px;
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
