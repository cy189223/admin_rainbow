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


        <a-input placeholder="订单编号/标题/用户名/手机号" style="width: 220px;margin-right:10px;" v-model="key" allowClear :size="size"
          @input="onSearch" />
        <a-button :size="size" type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

        <div style="flex-grow: 1;"></div>
        <span style="float: right; color: gray; font-size: 96%;">订单支付或取消后1-2分钟内佣金记录才会更新</span>
         <a href="https://www.yuque.com/u1307645/mwy3k3/hvtg6t" target="_blank">查看分销规则</a>

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
      <a-table-column title="订单/商品" width="100px">
        <template slot-scope="row">
          <div style="display: flex; align-items: center;">
            <img :src="row.order_sku.thumb  + '?x-oss-process=image/resize,w_400'" class="thumb"  style="margin-right: 10px;" />
            <div>
              <div style="font-weight: 500; margin-bottom: 6px;">
                {{row.order_number}}
                <a-tag>{{row.order_sku.node_type_text}}</a-tag>
              </div>
              <div style="font-weight: 500; font-size: 110%;">{{row.order_sku.title}}</div>
              <!-- <div>【{{row.sid}}】</div> -->
              <div>
                <PriceDisplay :info="row.order_sku"></PriceDisplay>
              </div>
            </div>
          </div>
        </template>
      </a-table-column>

      <!-- <a-table-column title="订单编号" width="40px">
        <template slot-scope="row">
          <span>{{row.order_number}}</span>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="图片" width="200px">
        <template slot-scope="row">
          <img @click="$viewImage(url)" v-for="(url, index) in row.images" :src="url" class="content-image"></img>
        </template>
      </a-table-column> -->

      <a-table-column title="数量" width="40px">
        <template slot-scope="row">
          <span>x{{row.order_sku.total}}件</span>
        </template>
      </a-table-column>

      <a-table-column title="佣金" width="20px">
        <template slot-scope="row">
          <div v-if="row.money">
             {{row.money / 100}}元
          </div>
          <div v-if="row.score">
             {{row.score}}积分
          </div>
          <div v-if="!row.money && !row.score">-</div>
        </template>
      </a-table-column>

      <a-table-column title="佣金率" width="60px">
        <template slot-scope="row">
          <div>
             人民币: {{row.money_ratio}}%
          </div>
          <div>
             积分: {{row.score_ratio}}%
          </div>
          <div v-if="!row.money && !row.score">-</div>
        </template>
      </a-table-column>

      <a-table-column title="分销员" width="10px">
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

      <a-table-column title="佣金类型" width="70px">
        <template slot-scope="row">
          <span v-if="row.brokerage_type === 'direct'">直接邀请</span>
          <span v-else-if="row.brokerage_type === 'indirect'">间接邀请</span>
          <span v-else-if="row.brokerage_type === 'leader'">团队长业绩</span>
          <!-- <span v-if="row.invite_level === 0">直接邀请</span>
          <span v-else>隔{{row.invite_level}}级邀请</span> -->

        </template>
      </a-table-column>

      <a-table-column title="下单用户" width="10px">
        <template slot-scope="row">
          <div class="user">
            <img :src="row.order_user.headimg" alt="用户头像">
            <div>
              <div>{{ row.order_user.name }}</div>
              <div>{{row.order_user.phone}}</div>
            </div>
            <!-- <a-icon class="gender-man" v-if="row.gender==='男'" type="man" />
            <a-icon class="gender-woman" v-else type="woman" /> -->
          </div>
        </template>
      </a-table-column>

      <a-table-column title="状态" width="60px">
        <template slot-scope="row">
          {{row.union_status_text}}
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
      <a-table-column title="获得日期" dataIndex="created_at" width="80px">
        <template slot-scope="created_at">
          <span>{{ created_at | onlyDay }}</span>
        </template>
      </a-table-column>
      <a-table-column title="操作" width="60px" v-if="!selectMode">
        <template slot-scope="row">
          <span>
            -
            <!-- <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" /> -->
            <!-- <a href="javascript:;" @click="handleDelete(row)">删除</a> -->
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
  import ExportPopup from "./components/ExportBrokeragePopup"

  const resourceType = 'agent/brokerages'
  const resourceTypeText = '帖子'

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
            text: '待确认',
            key: 'pending'
          },
          {
            text: '已发放',
            key: 'completed'
          },
          {
            text: '已取消',
            key: 'closed'
          }
        ],
        statusTotal: {
          pending: 0,
          picked: 0,
          return_saled: 0,
          resaled: 0,
          resale_pending: 0,
          all: 0
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
        this.$http('/status-total/brokerage').then((res) => {
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
            category_id: this.category_id
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
