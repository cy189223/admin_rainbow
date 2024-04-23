<template>
  <a-modal :title="`编辑概率`" style="top: 100px;" :visible="true" width="1100px" @cancel="handleCancel">
    <a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="赏标题" width="20px">
        <template slot-scope="row">
          <a-tag color='blue' v-if="row.shang_type === 0">{{ row.shang_title }}</a-tag>
          <a-tag color='orange' v-else>{{ row.shang_title }}</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="总次数" width="60px">
        <template slot-scope="row">
          <span color='blue'>{{ row.total_per_room }}</span>
        </template>
      </a-table-column>
      <a-table-column title="概率" key="thumb" width="80px">
        <template slot-scope="row">
          <a-input style="width: 880px;" v-model="row.target_index" v-if="row.shang_type === 0" placeholder="填写指定出现的序号,多个使用空格隔开"></a-input>
          <a-input style="width: 880px;" v-model="row.target_phone" v-else placeholder="填写限制抽中的手机号,多个使用空格隔开"></a-input>
        </template>
      </a-table-column>
      <!-- <a-table-column title="上下架" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.status || 1" v-model="row.status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column> -->
    </a-table>
    <template slot="footer">
      <div class="btn-c">
        <!-- <a-button type="primary" class="add" @click="handleCreate">
          新增一款
        </a-button> -->
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
        type: Object,
        default () {
          return {}
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
        this.$http.get(`/fudai_yifanshang/odds?activity_id=${this.info.id}`).then(res => {
          this.list = res.data.list
        })
      },
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      handleSave() {
        this.$http.put(`/fudai_yifanshang/odds`, {
          'activity_id': this.info.id,
          'list': this.list
        }).then(res => {
          this.$message.success('保存成功')
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
