<template>
  <a-modal :title="`所有箱子`" style="top: 100px;" :visible="true" width="1000px" @cancel="handleCancel">
    <a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="pagination" size="small">
     <!-- <a-table-column title="序号" width="20px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="图片" key="thumb" width="80px">
        <template slot-scope="row">
          <img :src="row.thumb" class="thumb" />
          {{row.title}}
        </template>
      </a-table-column> -->
      <a-table-column title="序号" key="title" width="30px">
        <template slot-scope="row">
          <span>
            第{{row.num}}箱
          </span>
        </template>
      </a-table-column>
      <a-table-column title="库存" key="title" width="30px">
        <template slot-scope="row">
          <span>
            剩 {{row.stock}} 发
          </span>
        </template>
      </a-table-column>
      <a-table-column title="抽取记录" width="160px">
        <template slot-scope="row">
          <div v-if="row.open_records">
            <span v-for="(item, index) in  row.open_records" style="margin-left: 10px;">
              {{item.open_index}}.{{item.shang_title}}
            </span>
            <!-- {{row.sales}}次 / {{row.allot_total}}次 -->
          </div>
        </template>
      </a-table-column>
      <!-- <a-table-column title="上下架" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.status || 1" v-model="row.status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column> -->
      <a-table-column title="操作" width="40px">
        <template slot-scope="row">
          <!-- <a href="javascript:;" @click="handleEdit(row)">查看已开</a> -->
          <!-- <a-divider type="vertical" /> -->
          <a href="javascript:;" @click="handleEditOdds(row)">编辑概率</a>
        </template>
      </a-table-column>
    </a-table>
    <template slot="footer">
      <div class="btn-c">
        <a-button type="primary" class="add" @click="initList">
          刷新数据
        </a-button>
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
  // import EditOdds from './EditOddsPopup.vue'

  export default {
    components: {
      UploadImages,
      iSwitch,
      // EditOdds
    },
    props: {
      uuid: {
        type: String,
        default () {
          return ''
        }
      },
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        list: [],
        page: 1,
        perPage: 10,
        total: 0,
      }
    },
    watch: {
      uuid() {
        this.initList()
      }
    },
    computed: {
      pagination() {
        return {
          defaultPageSize: this.perPage,
          defaultCurrent: this.page,
          total: this.total,
          onChange: (e) => {
            this.page = e
            // this.per_page = e.pageSize
            this.initList()
          }
        }
      }
    },
    created() {
      this.initList()
    },
    methods: {
      initList() {
        this.list = [{}]
        // this.$http.get(`/yifanshang/${this.info.uuid}/rooms`, {
        //   params: {
        //     page: this.page,
        //     per_page: this.perPage,
        //   }
        // }).then(res => {
        //   this.list = res.data.list
        //   this.total = res.data.item_total
        // })
      },
      handleEditOdds(row) {
        this.$emit('editOdds', row)
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

  a-input {
    display: inline;
  }
</style>
