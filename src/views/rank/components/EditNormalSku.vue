<template>
  <a-modal :title="`编辑普通款`" style="top: 100px;" :visible="true" width="1000px" @cancel="handleCancel">
    <div class="tips" style="color: red; font-size: 80%; margin-bottom: 10px;">返售金额不设置将按"系统设置" -> "订单设置" 中的内容统一折价返售</div>
    <a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="50px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="图片" key="thumb" width="80px">
        <template slot-scope="row">
          <UploadImages v-model="row.thumb" tips="600*800" size="small"></UploadImages>
        </template>
      </a-table-column>
      <a-table-column title="标题" key="title" width="150px">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.title" placeholder="请输入" />
          </span>
        </template>
      </a-table-column>
      <a-table-column title="编号" key="number" width="150px">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.number" placeholder="请输入"/>
          </span>
        </template>
      </a-table-column>
      <a-table-column title="返售金额" key="number" width="150px">
        <template slot-scope="row">
          <div>
            人民币
            <IPrice v-model="row.return_money" size="small" placeholder="请输入" style="width: 80px"/>
          </div>
          <div style="margin-top: 6px;">
            积分
            <a-input v-model.number="row.return_score" size="small" placeholder="请输入"  style="width: 80px"/>
          </div>
        </template>
      </a-table-column>
      <a-table-column title="库存" width="80px">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.stock" placeholder="请输入"/>
          </span>
        </template>
      </a-table-column>
      <a-table-column title="已售" width="80px">
        <template slot-scope="row">
          <span>
            {{row.sales}}次
          </span>
        </template>
      </a-table-column>
      <a-table-column title="上下架" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.status || 1" v-model="row.status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column>
      <a-table-column title="操作" width="80px">
        <template slot-scope="row">
          <a href="javascript:;" @click="handleDelete(row)">删除</a>
        </template>
      </a-table-column>
    </a-table>
    <template slot="footer">
      <div class="btn-c">
        <a-button type="primary" class="add" @click="handleCreate">
          新增一款
        </a-button>
        <div style="flex-grow: 1;"></div>

        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleSave">
          保存
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
  import UploadImages from '@/components/UploadImages/UploadImages'
  import iSwitch from '@/components/ISwitch/ISwitch'
  import IPrice from '@/components/IForm/components/IPrice'
  export default {
    components: {
      UploadImages,
      iSwitch,
      IPrice
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
        list: []
      }
    },
    watch: {
      uuid() {
        this.initList()
      }
    },
    created() {
      this.initList()
    },
    methods: {
      initList() {
        this.$http.get(`/boxes/${this.uuid}/normal-skus`).then(res => {
          this.list = res.data.list
        })
      },
      handleCreate() {
        this.$http.post(`/boxes/${this.uuid}/normal-skus`).then(res => {
          this.initList()
        })
      },
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      handleSave() {
        this.$http.put(`/boxes/${this.uuid}/normal-skus/batch`, {
          list: this.list
        }).then(res => {
          this.$message.success('保存成功')
          this.initList()
        })
      },
      handleDelete(row) {
        this.$http.delete(`/boxes/${this.uuid}/normal-skus/${row.uuid}`).then(res => {
          this.$message.success('删除成功')
          this.initList()
        })
      }
    }
  }
</script>
<style lang="less" scoped>
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

  a-input {
    display: inline;
  }
</style>
