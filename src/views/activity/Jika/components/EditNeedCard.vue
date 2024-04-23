<template>
  <a-modal :title="`设置兑换所需卡片数`" style="top: 100px;" :visible="true" width="800px" @cancel="handleCancel">
    <div class="tips">
    </div>
    <a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="20px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="卡片封面" key="thumb" width="80px">
        <template slot-scope="row">
          <div style="display: flex; align-items: center;">
            <img :src="row.thumb" class="thumb" style="margin-right: 10px;" />
            <div>
              {{row.title}} <br/>
              {{row.number}}
            </div>
          </div>
        </template>
      </a-table-column>
      <a-table-column title="所需数量" key="title" width="60px">
        <template slot-scope="row">
          需要集齐
          <a-input-number style="width: 180px;" v-model="needCards[row.id]" placeholder="0为不需要"></a-input-number>
          张此卡
        </template>
      </a-table-column>
    </a-table>
    <template slot="footer">
      <div class="btn-c">
        <div style="flex-grow: 1;"></div>

        <a-button key="back" @click="handleCancel">关闭</a-button>
        <a-button key="submit" type="primary" @click="handleSave">
          保存
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
  export default {
    components: {
    },
    props: {
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
        needCards: {}
      }
    },
    watch: {
      uuid() {
        this.initList()
      },
    },
    computed: {
    },
    created() {
      this.initList()

      this.needCards = this.info.need_cards || {}
    },
    methods: {
      initList() {
        this.$http.get(`/jika/cards`, {
          params: {
            activity_id: this.info.activity_id
          }
        }).then(res => {
          this.list = res.data.list
        })
      },
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      handleSave() {
        this.$http.put(`/jika/skus/${this.info.uuid}`, {
          type: 'update_need_cards',
          need_cards: this.needCards
        }).then(res => {
          this.$message.success('保存成功~')
          this.$emit('refresh')
          this.$emit('close')
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .thumb {
    width: 60px;
    // height: 60px;
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
    font-size: 90%;
    margin-bottom: 10px;
  }

  a-input {
    display: inline;
  }
</style>
