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

        <router-link to="/box/setting" @click="handleDelete(row)" style="margin: 0px 10px;">盲盒全局配置</router-link>

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
      <a-table-column title="上下架" width="40px">
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

  import EditForm from "./EditBox.vue"
  const resourceType = 'boxes'
  const resourceTypeText = '盲盒'

  export default {
    components: {
      ISwitch,
      EditForm,
      EditHiddenSku,
      EditNormalSku,
      EditCoverChip
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
      handleCopy(row) {
        this.$confirm({
          title: '确定复制吗',
          content: `将复制一个新活动到已下架状态栏`,
          onOk: () => {
            this.$http.post(`/${resourceType}/${row.uuid}/copy`).then(res => {
              this.$message.success('复制成功，请在“已下架”列表中编辑活动');
              this.keys.status = 'off_stock'
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
        this.$http('/status-total/box').then((res) => {
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
            status: this.keys.status,
            category_id: this.category_id
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
