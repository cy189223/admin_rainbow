<template>
  <a-modal :zIndex="2000" :title="title" style="top: 100px;" :visible.sync="isShow" width="1200px" @ok="handleSubmit"
    @cancel="handleCancel">
    <div>
      <div class="content-head" style="margin-bottom: 20px;">
        <div class="sort-keys">
          <a-input placeholder="搜索标题/编号" style="width: 180px;margin-right:10px;" v-model="key" allowClear/>
          <a-button type="primary" @click="refreshData" style="margin-right:10px;">刷新</a-button>

         <a-radio-group v-model="type" buttonStyle="solid" style="margin-right:10px;">
           <a-radio-button value="all">全部({{total}})</a-radio-button>
           <a-radio-button value="selected">已选({{ids.length}})</a-radio-button>
         </a-radio-group>

        </div>
      </div>
      <!-- {{ids}} -->
      <a-table class="table" :row-selection="selection" borded :rowKey="row => row.id" :dataSource="list"
        :pagination="pagination" size="small">
        <a-table-column
           title="姓名"
           key="name"
           width="230px"
         >
           <template slot-scope="row">
             <div class="user">
               <img class="headimg" :src="row.headimg" alt="用户头像">

               <div class='right'>
                 <div class="top">
                   <span>{{ row.name }}</span>
                   <a-icon class="gender-man" v-if="row.gender==='男'" type="man" />
                   <a-icon class="gender-woman" v-else-if="row.gender==='女'" type="woman" />
                   <!-- <a-tag color="red" style="margin-left: 10px;" v-if="row.client_type === 'ali'">天猫用户</a-tag> -->
                   <!-- <a href="javascript:;" style="margin-left: 10px;" @click="handleEdit(row)">编辑</a> -->

                   <!-- <a-tag color="red" v-if="row.status === 2">已拉黑</a-tag> -->
                 </div>
                 <div class="bottom" style="margin-top: 4px;">

                   <span class="marked-tag" @click="markItem(row)" :class="{actived: row.marked_at}">标记</span>
                   <!-- <span>{{row.city}}</span> -->
                   <span>{{row.phone}}</span>

                   <a-tag color="red" style="margin-left:10px;" v-if="row.status === 2">已拉黑</a-tag>

                 </div>
               </div>
             </div>
           </template>
         </a-table-column>
         <!-- <a-table-column
           title="会员等级"
           dataIndex="level_text"
           key="level_text"
           width="80px"
         /> -->
         <!-- <a-table-column
           title="手机号"
           dataIndex="phone"
           key="phone"
           width="80px"
         /> -->
        <!-- <a-table-column
           title="备注"
           width="80px"
         >
           <template slot-scope="row">
             <a href="javascript:;" @click="handleEdit(row)" v-if="row.remark">查看</a>
           </template>
         </a-table-column> -->
         <!-- <a-table-column
           title="地区"
           dataIndex="city"
           key="address"
           width="60px"
         /> -->

         <a-table-column
           title="邀请关系"
           width="160px"
         >
           <template slot-scope="row">
             <div>
               <div>
                 上级:
                 <template v-if="row.inviter">
                   <img class="inviter-headimg" :src="row.inviter.headimg" alt="用户头像">
                   {{row.inviter.name}}
                 </template>
                 <template v-else>-</template>
               </div>
               <div>直接粉丝: {{row.direct_invitees_count}}人</div>
               <div>间接粉丝: {{row.indirect_invitees_count}}人</div>
             </div>
           </template>
         </a-table-column>

         <!-- <a-table-column
           title="邀请数"
           width="70px"
         >
           <template slot-scope="row">
             <div>{{row.invitees_count}}人</div>
           </template>
         </a-table-column> -->
         <a-table-column
           title="成长值"
           dataIndex="level_score"
           key="level_score"
           width="80px"
         />
         <a-table-column
           title="积分"
           dataIndex="score"
           key="score"
           width="70px"
         />
         <a-table-column
           title="红包"
           key="redpack"
           width="80px"
         >
           <template slot-scope="row">
             <div>{{row.redpack / 100}}元</div>
           </template>
         </a-table-column>
         <a-table-column
           title="注册日期"
           dataIndex="created_at"
           key="created_at"
           width="110px"
         >
           <template slot-scope="created_at">
             <span>{{ created_at | formatDate2 }}</span>
           </template>
         </a-table-column>
         <a-table-column
           title="最后活跃"
           dataIndex="last_active_at"
           key="last_active_at"
           width="100px"
         >
           <template slot-scope="last_active_at">
             <span>{{ last_active_at | formatDate }}</span>
           </template>
         </a-table-column>
      </a-table>
      <div>已选: {{ids.length}} 项</div>
    </div>
  </a-modal>
</template>

<script>
  const resourceType = 'users'

  export default {
    name: 'Popup',
    components: {},
    props: {
      initIds: {
        type: Array
      },
      mode: {
        type: String,
        default () {
          return 'checkbox'
        }
      }
    },
    data() {
      return {
        title: '选择商品',
        isShow: true,
        key: '',
        list: [],
        ids: [],
        per_page: 10,
        page: 1,
        total: 0,
        type: 'all'
      }
    },
    computed: {
      selection() {
        return {
          type: this.mode,
          selectedRowKeys: this.ids,
          onChange: (ids) => {
            this.ids = ids
          }
        }
      },
      pagination() {
        return {
          defaultPageSize: this.per_page,
          defaultCurrent: this.page,
          total: this.total,
          onChange: (e) => {
            console.log(e)
            this.page = e
            // this.per_page = e.pageSize
            this.fetchData()
          }
        }
      }
    },
    mounted() {
      this.ids = this.initIds
      this.fetchData()
    },
    watch: {
      key() {
        this.page = 1
        this.fetchData()
      },
      type () {
        this.page = 1
        this.fetchData()
      }
    },
    methods: {
      refreshData () {
        this.page = 1
        this.fetchData()
      },
      handleSubmit() {
        this.$emit('change', this.ids)
        this.$emit('close')
      },
      handleCancel() {
        this.$emit('close')
      },
      fetchData() {
        this.$http.get(`/${resourceType}`, {
          params: {
            page: this.page,
            per_page: this.per_page,
            key: this.key,
            ids: this.type == 'all' ? [] : this.ids
          }
        }).then(res => {
          this.list = res.data.list
          this.total = res.data.item_total
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .table {

    .thumb {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    .right {
      margin-left: 10px;
    }

    .title {
      // min-height: 30px;
      min-width: 100px;
      font-weight: 500;
    }

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

  .inviter-headimg {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  .content-head {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .table {
    background-color: #fff;
    .user {
      display: flex;
      // flex-wrap: wrap;
      align-items: center;
      img {
        width: 38px;
        height: 38px;
        flex: 0 0 38px;
        border: 1px solid #e1e1e1;
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
