<template>
  <a-modal :title="`编辑奖品等级`" style="top: 100px;" :visible="true" width="1000px" @cancel="handleCancel">
    <a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="20px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="标题" key="thumb" width="80px">
        <template slot-scope="row">
          <a-input v-model="row.title" placeholder="留空则使用默认设置"></a-input>
          <!-- {{row.title}} -->
        </template>
      </a-table-column>
      <a-table-column title="概率" key="odds" width="80px">
        <template slot-scope="row">
          <a-input-number v-model="row.odds" style="width: 100px;"></a-input-number> %
          <!-- {{row.title}} -->
        </template>
      </a-table-column>
      <a-table-column title="图标" key="odds" width="80px">
        <template slot-scope="row">
          <UploadImages size="small" v-model="row.icon" tips="留空则使用默认设置" :isShowTips="true"></UploadImages>
          <!-- <a-input v-model.number="row.odds" style="width: 100px;"></a-input> % -->
          <!-- {{row.title}} -->
        </template>
      </a-table-column>
      <a-table-column title="上下架" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.status || 1" v-model="row.status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column>
    </a-table>
    <template slot="footer">
      <div class="btn-c">
        <!-- <a-button type="primary" class="add" @click="handleCreate">
          新增一款
        </a-button> -->
        <div style="flex-grow: 1;"></div>

        <!-- <a-button key="back" @click="handleCancel">关闭</a-button> -->
        <a-button key="submit" type="primary" @click="handleSave">
          保存并关闭
        </a-button>
      </div>
    </template>
  </a-modal>
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
      },
      info: {
        type: Object
      }
    },
    data() {
      return {
        list: [],
      }
    },
    watch: {
    },
    created() {
      this.list = JSON.parse(JSON.stringify(this.info.sku_level)).slice(0, 5)
      // this.initList()
    },
    methods: {
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      handleSave() {
        //  检查概率和是否为100%
        let oddsSum = 0;
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].status == 1) {
            oddsSum += this.list[i].odds
          }
        }
        // console.log(oddsSum)
        if (oddsSum < 99.99 || oddsSum > 100.01) {
          this.$message.error('所有已上架的等级概率之和需要等于100%')
          return false
        }

        this.$http.put(`/fudais/${this.info.uuid}/sku-level`, {
          list: this.list
        }).then(res => {
          this.$message.success('保存成功')
          // this.initList()
          this.$emit('refresh')
          this.$emit('close')
        })

        // this.$emit('refresh')
        // this.$emit('close')
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
