<template>
  <a-modal :title="`参与用户`" style="top: 100px;" :visible="true" width="1100px" @cancel="handleCancel">

    <div>
      <div class="content-head" style="margin-bottom: 20px;">
        <a-radio-group v-model="type" buttonStyle="solid" style="margin-right:10px;">
          <a-radio-button value="all">全部({{total}})</a-radio-button>
          <a-radio-button value="lucky">已中奖</a-radio-button>
        </a-radio-group>

        <a-select style="width: 100px;margin-left:20px;" v-model="session" placeholder="选择期数" allowClear>
          <a-select-option value="current">当期</a-select-option>
          <a-select-option value="last">上一期</a-select-option>
          <a-select-option value="all">所有期</a-select-option>
        </a-select>

        <a-input style="width: 100px; margin-left: 10px;" v-model="customSession" placeholder="自定义期数"></a-input>

        <iDatePicker style="margin-left: 30px; float: right;" placeholder="筛选参与时间" v-model="joinDay"></iDatePicker>

      </div>
    </div>

    <a-table class="product-table table" :pagination="pagination" :rowKey="row => row.id" :dataSource="list" bordered
      size="small">
      <a-table-column title="序号" width="20px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="用户" key="thumb" width="80px">
        <template slot-scope="row">
          <div class="user">
            <img :src="row.user.headimg" alt="用户头像">
            <span>{{ row.user.name }}</span>
            <!-- <a-icon class="gender-man" v-if="row.user.gender==='男'" type="man" />
            <a-icon class="gender-woman" v-else type="woman" /> -->

            <a-tag color="red" style="margin-left: 10px;" v-if="row.user.client_type === 'ali'">天猫用户</a-tag>
          </div>
        </template>
      </a-table-column>
      <!-- <a-table-column title="标题" key="title" width="60px">
        <template slot-scope="row">
          <span>
            {{row.title}}
          </span>
        </template>
      </a-table-column> -->
      <a-table-column title="参与期数" key="number" width="40px">
        <template slot-scope="row">
          <span>
            第{{row.session}}期
            <!-- <a-input v-model="row.number" placeholder="请输入" style="width:160px;" /> -->
          </span>
        </template>
      </a-table-column>
      <a-table-column title="签号数量" key="number" width="50px">
        <template slot-scope="row">
          <span>
            {{row.tickets_count}} 张
            <!-- <a-input v-model="row.number" placeholder="请输入" style="width:160px;" /> -->
          </span>
        </template>
      </a-table-column>
      <a-table-column title="助力次数" key="number" width="50px">
        <template slot-scope="row">
          <span>
            {{row.invitees_count}} 次
            <!-- <a-input v-model="row.number" placeholder="请输入" style="width:160px;" /> -->
          </span>
        </template>
      </a-table-column>
      <a-table-column title="是否中奖" width="40px">
        <template slot-scope="row">
          <span v-if="row.is_lucky_user"> 已中奖 </span>
          <span v-else> - </span>
        </template>
      </a-table-column>
      <a-table-column title="奖品" width="100px">
        <template slot-scope="row">
          <div v-if="row.lucky_ticket">
            <span v-if="row.lucky_ticket.package_sku">
              【{{row.lucky_ticket.package_sku.sid}}】
              {{row.lucky_ticket.package_sku.title}}
            </span>
          </div>
          <span v-else> - </span>
        </template>
      </a-table-column>
      <a-table-column title="参与时间" width="50px">
        <template slot-scope="row">
          <span>
            {{row.created_at}}
            <!-- <a-input v-model="row.stock" placeholder="请输入" style="width:80px;" /> -->
          </span>
        </template>
      </a-table-column>
      <!-- <a-table-column title="上下架" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.status || 1" v-model="row.status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="操作" width="80px">
        <template slot-scope="row">
          <a href="javascript:;" @click="handleEdit(row)">编辑</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="handleDelete(row)">删除</a>
        </template>
      </a-table-column> -->
    </a-table>
    <template slot="footer">
      <div class="btn-c">
        <!-- <a-button type="primary" class="add" @click="handleCreate">
          新增一款
        </a-button> -->
        <div style="flex-grow: 1;"></div>

        <a-button key="back" @click="handleCancel">关闭</a-button>
        <!-- <a-button key="submit" type="primary" @click="handleSave">
          保存
        </a-button> -->
      </div>
    </template>
  </a-modal>
</template>
<script>
  import UploadImages from '@/components/UploadImages/UploadImages'
  import iSwitch from '@/components/ISwitch/ISwitch'
  import IDatePicker from "@/components/IDatePicker/IDatePicker.vue"
  export default {
    components: {
      UploadImages,
      iSwitch,
      IDatePicker
    },
    props: {
      uuid: {
        type: String,
        default () {
          return ''
        }
      }
    },
    data() {
      return {
        list: [],
        type: 'all',
        per_page: 10,
        page: 1,
        total: 0,
        session: 'current',
        customSession: "",
        joinDay: ""
      }
    },
    watch: {
      uuid() {
        this.initList()
      },
      type() {
        this.page = 1
        this.initList()
      },
      session() {
        this.page = 1
        this.initList()
      },
      customSession () {
        this.page = 1
        this.initList()
      },
      joinDay () {
        this.page = 1
        this.initList()
      }
    },
    created() {
      this.initList()
    },
    computed: {
      pagination() {
        return {
          defaultPageSize: this.per_page,
          defaultCurrent: this.page,
          total: this.total,
          onChange: (e) => {
            console.log(e)
            this.page = e
            // this.per_page = e.pageSize
            this.initList()
          }
        }
      }
    },
    methods: {
      initList() {
        this.$http.get(`/lotteries/${this.uuid}/users`, {
          params: {
            type: this.type,
            page: this.page,
            session: this.customSession || this.session,
            join_day: this.joinDay,
            per_page: this.per_page,
          }
        }).then(res => {
          this.total = res.data.item_total
          this.list = res.data.list
        })
      },
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      handleSave() {
        this.$emit('refresh')
        this.$emit('close')
        // this.$http.put(`/activities/${this.uuid}/skus/batch`, {
        //   list: this.list
        // }).then(res => {
        //   this.$message.success('保存成功')
        //   this.initList()
        // })
      },
      handleDelete(row) {
        this.$http.delete(`/activities/${this.uuid}/skus/${row.uuid}`).then(res => {
          this.$message.success('删除成功')
          this.initList()
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .thumb {
    width: 60px;
    height: 60px;
    border-radius: 6px;
  }

  .btn-c {
    display: flex;
    // margin-top: 30px;
    padding: 0rpx 30rpx;

    .add {}

    .save {
      margin-right: 20px;
    }

    .cancel {}
  }

  .tips {
    color: gray;
    font-size: 80%;
    margin-bottom: 10px;
  }

  .table {
    background-color: #fff;

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

  a-input {
    display: inline;
  }
</style>
