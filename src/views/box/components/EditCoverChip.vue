<template>
  <div class="editor-content">
    <div style="color: gray; font-size: 90%; margin-bottom: 10px;">
      可单独对sku设置碎片兑换。 用户可在"我的盒柜"中把抽到的盲盒(未发货的)按设置的兑换率兑换成对应的碎片。
      <br/>
      兑换后盲盒不再发货（与返售相似）。碎片可用于在商城中兑换商城商品（可在”商品管理“中对单个商品设置兑换率）。
    </div>
    <a-table class="product-table" :rowKey="row => row.uuid" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="50px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="图片" width="100px">
        <template slot-scope="row">
          <img :src="row.thumb" class="thumb" />
          <!-- <UploadImages v-model="row.thumb" tips="600*800"  size="small"></UploadImages> -->
        </template>
      </a-table-column>
      <a-table-column title="标题" width="160px">
        <template slot-scope="row">
          <div class="title">
            {{row.title}}
          </div>
          <div class="number">
            {{row.number}}
          </div>
        </template>
      </a-table-column>
      <a-table-column title="兑换设置">
        <template slot-scope="row">
          <div>
            <span>集齐</span>
            <a-input v-model="row.chip_need_sku_total" placeholder="整数" style="width:70px;" />
            <span>个此sku，兑换</span>
            <a-input v-model="row.chip_total" placeholder="整数" style="width:70px;" />
            <span>个</span>
            <a-select class="select" v-model="row.chip_id" placeholder="请到碎片模块创建">
              <a-select-option :value="option.id" v-for="option in chipList">{{option.title}}</a-select-option>
            </a-select>
          </div>
        </template>
      </a-table-column>
      <a-table-column title="兑换开关" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.chip_status || 1" v-model="row.chip_status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column>

    </a-table>

    <div class="btn-c">
      <!-- <a-button type="primary" class="add" @click="handleCreate">
        新增一款
      </a-button> -->
      <div style="flex-grow: 1;"></div>

      <a-button class="save" type="primary" @click="handleSave">保存</a-button>
      <a-button class="cancel" @click="handleCancel">关闭</a-button>
    </div>

  </div>
</template>
<script>
  import UploadImages from '@/components/UploadImages/UploadImages'
  import iSwitch from '@/components/ISwitch/ISwitch'
  export default {
    components: {
      UploadImages,
      iSwitch
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
        chipList: []
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
        this.$http.get(`/boxes/${this.uuid}/skus`).then(res => {
          this.list = res.data.list
        })

        this.$http.get(`/chips`).then(res => {
          this.chipList = res.data.list
        })
      },
      handleCreate() {
        this.$http.post(`/boxes/${this.uuid}/skus`).then(res => {
          this.initList()
        })
      },
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      handleSave() {
        this.$http.put(`/boxes/${this.uuid}/skus/batch`, {
          list: this.list
        }).then(res => {
          this.$message.success('保存成功')
          this.initList()
        })
      },
      handleDelete(row) {
        this.$http.delete(`/boxes/${this.uuid}/skus/${row.uuid}`).then(res => {
          this.$message.success('删除成功')
          this.initList()
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .title {
    font-weight: 500;
    font-size: 110%;
  }
  .number {
    color: gray;
  }
  .thumb {
    height: 80px;
  }
  .btn-c {
    display: flex;
    margin-top: 30px;

    .add {}

    .save {
      margin-right: 20px;
    }


    .cancel {}
  }
  span {
    margin: 0px 6px;
  }

  .select {
    width: 100px;
  }

  a-input {
    display: inline;
  }
</style>
