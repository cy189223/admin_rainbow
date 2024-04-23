<template>
  <div class="editor-content">
    <div class="tips" style="color: red; font-size: 80%; margin-bottom: 10px;">返售金额不设置将按"系统设置" -> "订单设置" 中的内容统一折价返售</div>
    <a-table class="product-table" :rowKey="row => row.uuid" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="50px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="图片" width="100px">
        <template slot-scope="row">
          <UploadImages v-model="row.thumb" tips="600*800"  size="small"></UploadImages>
        </template>
      </a-table-column>
      <a-table-column title="标题" width="60px">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.title" placeholder="请输入" style="width:130px;" />
          </span>
        </template>
      </a-table-column>
      <a-table-column title="编号"  width="160px">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.number" placeholder="请输入" />
          </span>
        </template>
      </a-table-column>
      <a-table-column title="返售金额" key="number" width="150px">
        <template slot-scope="row">
          <div>
            人民币
            <IPrice v-model="row.return_money" size="small" placeholder="请输入" style="width: 70px"/>
          </div>
          <div style="margin-top: 6px;">
            积分
            <a-input v-model.number="row.return_score" size="small" placeholder="请输入"  style="width: 80px"/>
          </div>
        </template>
      </a-table-column>
      <a-table-column title="库存"  width="100px">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.stock" placeholder="库存"/>
          </span>
        </template>
      </a-table-column>
      <a-table-column title="已售" width="80px">
        <template slot-scope="row">
          <span>
            {{row.sales}}
            <!-- <a-input v-model="row.sales" disabled placeholder="0-100之间" style="width:70px;" /> -->
          </span>
        </template>
      </a-table-column>
      <a-table-column width="160px">
        <div slot="title">
          概率(%)
          <tips>填0则不会出现隐藏款<br/>此值需要大于每个房间的盒子数 <br/>每个房间中最多只可能出现1个隐藏款</tips>
        </div>
        <template slot-scope="row">
          <span>
            每抽<a-input v-model="row.probability" placeholder="0-100" style="width:80px; margin: 0px 1px;" />次出1个
          </span>
        </template>
      </a-table-column>
      <!-- <a-table-column width="100px">
        <div slot="title">
          前几次必不中
          <tips>例如3: 表示每个房间中最先打开的3个小盒一定不会是隐藏款</tips>
        </div>
        <template slot-scope="row">
          <span>
            <a-input v-model="row.hidden_before_times" placeholder="0" style="width:60px;" /> 次
          </span>
        </template>
      </a-table-column> -->
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
    <div class="btn-c">
      <a-button type="primary" class="add" @click="handleCreate">
        新增一款
      </a-button>
      <div style="flex-grow: 1;"></div>

      <a-button class="save" type="primary" @click="handleSave">保存</a-button>
      <a-button class="cancel" @click="handleCancel">关闭</a-button>
    </div>
  </div>
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
        this.$http.get(`/boxes/${this.uuid}/hidden-skus`).then(res => {
          this.list = res.data.list
        })
      },
      handleCreate() {
        this.$http.post(`/boxes/${this.uuid}/hidden-skus`).then(res => {
          this.initList()
        })
      },
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      handleSave() {
        this.$http.put(`/boxes/${this.uuid}/hidden-skus/batch`, {
          list: this.list
        }).then(res => {
          this.$message.success('保存成功')
          this.initList()
        })
      },
      handleDelete(row) {
        this.$http.delete(`/boxes/${this.uuid}/hidden-skus/${row.uuid}`).then(res => {
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
    margin-top: 30px;

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
