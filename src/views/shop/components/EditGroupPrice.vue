<template>
  <div class="editor-content">
    <a-table class="product-table" :rowKey="row => row.uuid" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="50px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
     <!-- <a-table-column title="图片" width="100px">
        <template slot-scope="row">
          <img :src="row.thumb" class="thumb" />
        </template>
      </a-table-column> -->
      <a-table-column title="标题(显示在商品详情页)">
        <template slot-scope="row">
          <div>
            <a-input placeholder="如VIP专享价" style="width: 160px; margin-right: 4px;" v-model="row.title"></a-input>
          </div>
        </template>
      </a-table-column>

      <a-table-column title="人群" width="200px">
        <!-- <template slot-scope="row">
          <a-select class="select" style="width: 160px;" v-model="row.group_id" placeholder="请到碎片模块创建">
            <a-select-option :value="option.id" v-for="option in groupList">{{option.title}}</a-select-option>
          </a-select>
        </template> -->
      </a-table-column>
      <a-table-column title="专享价">
        <template slot-scope="row">
          <div>
            <IPrice v-model="row.money_price" style="width: 100px; margin-right: 4px;" />元 + <a-input style="width: 100px; margin-right: 4px;" v-model.number="row.score_price"></a-input>积分
          </div>
        </template>
      </a-table-column>
      <a-table-column title="显示排序">
        <template slot-scope="row">
          <div>
            <a-input style="width: 100px; margin-right: 4px;" v-model.number="row.list_weight"></a-input>
          </div>
        </template>
      </a-table-column>
     <!-- <a-table-column title="已兑换" width="80px">
        <template slot-scope="row">
          <span>
            {{row.cover_chip_count || 0}}
          </span>
        </template>
      </a-table-column>
      <a-table-column title="兑换开关" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.cover_chip_status || 1" v-model="row.cover_chip_status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column> -->

      <a-table-column title="操作" width="80px">
        <template slot-scope="row">
          <a href="javascript:;" @click="handleDelete(row)">删除</a>
        </template>
      </a-table-column>

    </a-table>

    <div class="btn-c">
      <a-button type="primary" class="add" @click="handleCreate">
        新增一行
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
      },
      type: {
        type: String,
        default () {
          return ''
        }
      }
    },
    data() {
      return {
        list: [],
        groupList: []
      }
    },
    watch: {
      id() {
        this.initList()
      }
    },
    created() {
      this.initList()
    },
    methods: {
      initList() {
        this.$http.get(`/${this.type}/${this.uuid}/group-price`).then(res => {
          this.list = res.data.list
        })

        this.$http.get(`/user-groups`).then(res => {
          this.groupList = res.data.list
        })
      },
      handleCreate() {
        this.list.push({
          uuid: Math.random().toString(36).slice(-8),
          group_id: undefined,
          money_price: 0,
          score_price: 0,
          list_weight: 100
        })
        // this.$http.post(`/${this.type}/${this.uuid}/skus`).then(res => {
        //   this.initList()
        // })
      },
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      handleSave() {
        this.$http.post(`/${this.type}/${this.uuid}/group-price`, {
          list: this.list
        }).then(res => {
          this.$message.success('保存成功')
          this.initList()
          this.$emit('refresh')
          this.$emit('close')
        })
      },
      handleDelete(row) {
        for (let i=0; i < this.list.length; i++) {
          if (this.list[i].uuid === row.uuid) {
            this.list.splice(i, 1)
            break;
          }
        }
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
