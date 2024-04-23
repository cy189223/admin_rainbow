<template>
  <a-modal :title="`编辑卡片`" style="top: 100px;" :visible="true" width="1000px" @cancel="handleCancel">
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
      <!-- <a-table-column title="标题" key="title" width="60px">
        <template slot-scope="row">
          <span>
            {{row.title}}
          </span>
        </template>
      </a-table-column> -->
      <a-table-column title="总库存" width="50px">
        <template slot-scope="row">
          <span>
            {{row.stock}}件
            <!-- <a-input v-model="row.stock" placeholder="请输入" style="width:80px;" /> -->
          </span>
        </template>
      </a-table-column>
      <a-table-column title="已抽出" width="60px">
        <template slot-scope="row">
          <span>
            {{row.sales}}次
          </span>
        </template>
      </a-table-column>
      <a-table-column title="概率" width="60px">
        <template slot-scope="row">
          <span>
            {{row.odds}}%
          </span>
        </template>
      </a-table-column>
      <a-table-column title="最小开出位置" width="60px">
        <template slot-scope="row">
          <span>
            {{row.min_open_index || '-'}}
          </span>
        </template>
      </a-table-column>
      <a-table-column title="最小间隔限制" width="60px">
        <template slot-scope="row">
          <span>
            {{row.interval || '-'}}
          </span>
        </template>
      </a-table-column>
      <a-table-column title="允许抽出" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.status || 1" v-model="row.status" @change="statusChange($event, row)" size="small"></i-switch>
          </span>
        </template>
      </a-table-column>
      <a-table-column title="操作" width="80px">
        <template slot-scope="row">
          <a href="javascript:;" @click="handleEdit(row)">编辑</a>
          <a-divider type="vertical" />
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
  import ISkuType from '@/components/ISkuType/ISkuType'
  export default {
    components: {
      UploadImages,
      iSwitch,
      ISkuType
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
        frame: [
            {
              title: '卡片名称',
              key: 'title',
              required: true,
              placeholder: '如"福卡"'
            },
            {
              title: '卡片编号',
              key: 'number',
              placeholder: '选填'
              // required: true,
            },
            // {
            //   title: '赏标题',
            //   key: 'shang_title',
            //   placeholder: '例如 A赏 B赏'
            //   // required: true,
            // },
            {
              title: '封面',
              key: 'thumb',
              type: 'image',
              isShowImageTips: false,
              sizeLimit: 600,
              required: true,
              tips: '建议800*800',
            },
            // {
            //   title: '价值',
            //   key_prefix: '',
            //   type: 'mix_price',
            //   tips: '价值用于返售时作为返售原价进行折扣计算',
            //   newline: true,
            //   required: true,
            // },
            {
              title: '抽中概率',
              key: 'odds',
              type: 'number',
              suffix: '%',
              // tips: '价值用于返售时作为返售原价进行折扣计算',
              newline: true,
              required: true,
            },
            {
              title: '总库存',
              key: 'stock',
              type: 'number',
              suffix: '份',
              required: true
            },
            {
              title: '限制抽出序号',
              key: 'min_open_index',
              type: 'number',
              suffix: '后才有机率出此卡',
              prefix: '总抽出卡片数大于等于',
              tips: '不填或填0则不限制',
              newline: true,
              // required: true,
            },
            {
              title: '限制间隔',
              key: 'interval',
              type: 'number',
              prefix: '每两块出现间隔应大于等于',
              tips: '不填或填0则不限制',
              newline: true,
              // required: true,
            },
            // {
            //   title: '每期抽取',
            //   key: 'per_session_stock',
            //   type: 'number',
            //   suffix: '份',
            //   required: true
            // },
            // {
            //   title: '每个箱子数量',
            //   key: 'total_per_room',
            //   type: 'number',
            //   tips: '每个箱子内提供的奖品数量',
            //   required: true
            // },
          ]
      }
    },
    watch: {
      uuid() {
        this.initList()
      },
    },
    created() {
      this.initList()
    },
    methods: {
      initList() {
        this.$http.get(`/jika/cards`, {
          params: {
            activity_id: this.info.id
          }
        }).then(res => {
          this.list = res.data.list
        })
      },
      handleCreate() {
        this.$iForm.show({
          title: '新增活动卡片',
          frame: this.frame,
          success: (data) => {
            this.$http.post(`/jika/cards`, {
              activity_id: this.info.id,
              ...data
            }).then(res => {
              this.initList()
              this.$iForm.hide()
            })
          },
        })
      },
      handleEdit(row) {
        this.$iForm.show({
          title: '编辑活动卡片',
          frame: this.frame,
          form: row,
          success: (data) => {
            this.$http.put(`/jika/cards/${row.uuid}`, {
              type: 'update',
              attributes: data
            }).then(res => {
              this.initList()
              this.$iForm.hide()
            })
          },
        })
      },
      statusChange(e, row) {

        this.$http.put(`/jika/cards/${row.uuid}`, {
          type: 'update',
          attributes: {
            'status':  e
          }
        }).then(res => {
          this.initList()
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
        this.$confirm({
          title: '提示',
          content: `确认删除吗？`,
          onOk: () => {
            this.$http.delete(`/jika/cards/${row.uuid}`).then(res => {
              this.$message.success('删除成功')
              this.initList()
            })
          }
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
