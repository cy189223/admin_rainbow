<template>
  <div class="editor-content">
    <a-table class="product-table" :rowKey="row => row.uuid" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="50px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="图片" width="100px">
        <template slot-scope="row">
          <UploadImages v-model="row.thumb" size="small"></UploadImages>
        </template>
      </a-table-column>
      <a-table-column title="标题" width="60px">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.title" placeholder="请输入" style="width:160px;" />
          </span>
        </template>
      </a-table-column>
      <a-table-column title="编号">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.number" placeholder="请输入" style="width:100px;" />
          </span>
        </template>
      </a-table-column>
      <a-table-column title="总库存">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.total" placeholder="0-100之间" style="width:70px;" />
          </span>
        </template>
      </a-table-column>
      <a-table-column width="60px">
        <div slot="title">
          抽中概率(%)
          <tips>填写50即为50%的中奖机率</tips>
        </div>
        <template slot-scope="row">
          <span>
            <a-input v-model="row.probability" placeholder="0-100" style="width:80px;" />
          </span>
        </template>
      </a-table-column>
      <a-table-column width="100px">
        <div slot="title">
          前几次必不中
          <tips>例如3: 表示每个房间中最先打开的3个小盒一定不会是隐藏款</tips>
        </div>
        <template slot-scope="row">
          <span>
            <a-input v-model="row.hidden_before_times" placeholder="0" style="width:60px;" /> 次
          </span>
        </template>
      </a-table-column>
      <a-table-column title="已抽中次数" width="80px">
        <template slot-scope="row">
          <span>
            {{row.open_count}}次
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
  export default {
    components: {
      UploadImages
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
