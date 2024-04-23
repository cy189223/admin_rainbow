<template>
  <div class="list">
    <div class="content-head" style="margin-bottom: 20px;">

      <div class="sort-keys">

        <!-- <div class="tab-list">
          <div class="item" @click="status = item.key" :class="{actived: status === item.key}"
            v-for="(item, index) in statusList">
            {{item.text}}
            ({{statusTotal[item.key]}})
            ({{orderStat[item.key] || 0}})
          </div>
        </div> -->

        <a-input placeholder="输入关键字" style="width: 180px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" />
        <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

        <!-- <a-select style="width: 150px;margin-right:10px;" v-model="category_id" placeholder="分类" allowClear>
          <a-select-option :value="item.id" v-for="item in category" :key="item.id">{{ item.title }}</a-select-option>
        </a-select> -->

      </div>
      <a-button type="primary" icon="plus" @click="handleCreate" v-if="!selectMode">创建{{resourceTypeText}}</a-button>
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" :size="size">
      <a-table-column title="标题" width="130px">
        <template slot-scope="row">
          {{row.title}}
          <template>
            <a-tag style="margin-left: 4px;" color="blue" v-if="row.discount_type==0">现金券</a-tag>
            <a-tag style="margin-left: 4px;" color="orange" v-else-if="row.discount_type==1">打折券</a-tag>
            <a-tag style="margin-left: 4px;" color="green" v-else-if="row.discount_type==2">包邮券</a-tag>
            <a-tag style="margin-left: 4px;" color="green" v-else-if="row.discount_type==3">兑换券</a-tag>
          </template>
        </template>
      </a-table-column>
      <!-- <a-table-column
        title="优惠类型"
        width="80px"
      >
        <template slot-scope="row">
          <span v-if="row.discount_type==0">现金券</span>
          <span v-else>打折券</span>
        </template>
      </a-table-column> -->
      <a-table-column title="优惠内容" width="120px">
        <template slot-scope="row">
          <template v-if="row.discount_type == 0">
            <span>减{{ row.discount_money/100||0 }}</span>元
            <span style="color: red;" v-if="row.minimum_money">(满{{ row.minimum_money/100 }}可用)</span>
            <span v-else>(不限金额)</span>
          </template>
          <template v-else-if="row.discount_type == 1">
            <span>{{ row.discount_rate / 10 }}</span>折
            <span style="color: red;" v-if="row.minimum_money">(满{{ row.minimum_money/100 }}可用)</span>
            <span v-else>(不限金额)</span>
          </template>
          <template v-else-if="row.discount_type == 2">
            <span style="color: red;" v-if="row.minimum_money">(满{{ row.minimum_money/100 }}可用)</span>
            <span v-else>(不限金额)</span>
          </template>
          <template v-else-if="row.discount_type == 3">
            <span>兑换指定的</span>
            <span v-if="row.usable_range_type == 1">盲盒</span>
            <span v-else-if="row.usable_range_type == 2">商品</span>
            <span v-else-if="row.usable_range_type == 3">VIP套餐</span>
          </template>

          <!-- <template>
            <a-tag style="margin-left: 4px;" color="blue" v-if="row.discount_type==0">现金券</a-tag>
            <a-tag style="margin-left: 4px;" color="orange" v-else-if="row.discount_type==1">打折券</a-tag>
            <a-tag style="margin-left: 4px;" color="green" v-else-if="row.discount_type==2">包邮券</a-tag>
          </template> -->

        </template>
      </a-table-column>
      <a-table-column title="积分兑换" width="60px">
        <template slot-scope="row">
          <span v-if="row.score_price">{{row.score_price}}积分</span>
          <span v-else>-</span>
        </template>
      </a-table-column>
      <a-table-column title="库存数量" dataIndex="stock" key="stock" width="60px" />
      <a-table-column title="已领/已用" width="70px">
        <template slot-scope="row">
          <span>{{row.sales}}</span> / <span>{{row.used_total}}</span>
        </template>
      </a-table-column>
      <!-- <a-table-column
        title="已用数量"
        dataIndex="used_total"
        key="used_total"
        width="60px"
      /> -->
      <a-table-column title="适用范围" key="user-type" width="80px">
        <template slot-scope="row">
          <span v-if="row.usable_range_type == 0">全场通用</span>
          <span v-else-if="row.usable_range_type == 1">指定盲盒</span>
          <span v-else-if="row.usable_range_type == 2">指定商品</span>
          <span v-else-if="row.usable_range_type == 3">指定VIP套餐</span>
          <span v-else-if="row.usable_range_type == 4">指定活动</span>
        </template>
      </a-table-column>

      <a-table-column title="有效期" width="130px">
        <template slot-scope="row">
          <span v-if="row.time_limit_type == 0">
            {{$tool.formatDate(row.usable_start_at, 'yyyy-MM-dd hh:mm')}} 至
            {{$tool.formatDate(row.usable_end_at, 'yyyy-MM-dd hh:mm')}}
          </span>
          <span v-else>
            领取后 {{row.valid_time}} 小时
          </span>
        </template>
      </a-table-column>

      <a-table-column title="操作" width="150px" v-if="!selectMode">
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

    <a-modal :title="(editUuid ? '编辑' : '创建') + resourceTypeText" style="top: 100px;" :visible="isEdit" width="1000px"
      @cancel="isEdit = false" :footer="null">
      <EditForm :uuid="editUuid" @cancel="isEdit = false" @success="fetchData"></EditForm>
    </a-modal>
  </div>
</template>
<script>
  import moment from 'moment'
  import ISwitch from '@/components/ISwitch/ISwitch'

  import EditForm from "./EditCoupon.vue"
  const resourceType = 'coupons'
  const resourceTypeText = '优惠券'

  export default {
    components: {
      ISwitch,
      EditForm
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
        actived: 'on_stock',
        currentType: '',
        status: 'on_stock',
        statusTotal: {
          on_stock: 0,
          off_stock: 0,
          sell_out: 0,
          marked: 0
        },
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
      handleGetPath (row) {
        this.$getPathPopup.show({
          page: '/pages/couponDetail/index',
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
