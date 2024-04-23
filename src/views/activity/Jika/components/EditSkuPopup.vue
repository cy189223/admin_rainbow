<template>
  <a-modal :title="`编辑奖品`" style="top: 100px;" :visible="true" width="1000px" @cancel="handleCancel">
    <div class="tips">
    </div>
    <a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="20px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="奖品图片" key="thumb" width="80px">
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
      <a-table-column title="价值" key="number" width="100px">
        <template slot-scope="row">
          <div>
            <PriceDisplay :info="row"></PriceDisplay>
          </div>
        </template>
      </a-table-column>

      <a-table-column title="兑换所需卡片" width="200px">
        <template slot-scope="row">
          <div>
            <div v-html="displayNeedCard(row)"></div>
            <a href="javascript:;" @click="handleEditNeedCard(row)">编辑</a>
          </div>
        </template>
      </a-table-column>

      <a-table-column title="总库存" width="50px">
        <template slot-scope="row">
          <span>
            {{row.stock}}件
            <!-- <a-input v-model="row.stock" placeholder="请输入" style="width:80px;" /> -->
          </span>
        </template>
      </a-table-column>
      <a-table-column title="SKU类型" width="80px">
        <template slot-scope="row">
          <ISkuType :info="row"></ISkuType>
        </template>
      </a-table-column>
      <!-- <a-table-column title="已领取/已抽出" width="60px">
        <template slot-scope="row">
          <span>
            {{row.sales}}次 / {{row.allot_total}}次
          </span>
        </template>
      </a-table-column> -->
      <!-- <a-table-column title="上下架" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.status || 1" v-model="row.status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column> -->
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

    <EditNeedCard v-if="isEditNeedCard" :info="current" @refresh="initList" @close="isEditNeedCard = false"></EditNeedCard>

  </a-modal>
</template>
<script>
  import UploadImages from '@/components/UploadImages/UploadImages'
  import iSwitch from '@/components/ISwitch/ISwitch'
  import ISkuType from '@/components/ISkuType/ISkuType'
  import EditNeedCard  from "./EditNeedCard.vue"

  export default {
    components: {
      UploadImages,
      iSwitch,
      ISkuType,
      EditNeedCard
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
        current:  {},
        isEditNeedCard: false,
        list: [],
        cardList: [],
        frame: [
            {
              title: 'SKU类型',
              key: 'sku_type',
              type: 'radio',
              default: 1,
              required: true,
              options: [
                {
                  title: '无绑定',
                  value: 1
                },
                {
                  title: '绑定商城中的商品',
                  value: 2
                },
                {
                  title: '平台虚拟资产',
                  value: 3
                }
              ],
              tips: ''
            },
            {
              title: '绑定商品',
              key: 'product_id',
              type: 'product_id',
              auto_fill_fields: {
                'title': 'title',
                'thumb': 'thumb',
                'number': 'number',
                'money_price': 'money_price',
                'score_price': 'score_price'
              },
              where: {
                sku_type: 2
              }
            },
            {
              title: '绑定虚拟资产',
              key: 'assets',
              type: 'assets',
              where: {
                sku_type: 3
              }
            },
            {
              title: '奖品名称',
              key: 'title',
              required: true,
              placeholder: '如"积分礼包1"'
            },
            {
              title: '编号',
              key: 'number',
              placeholder: '填写编号方便在订单中对应货物'
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
              required: true,
              tips: '建议800*800，发放后会显示在中奖者的物品仓库中',
            },
            {
              title: '价值',
              key: 'money_price',
              type: 'price',
              newline: true,
              required: true,
            },
            // {
            //   title: '价值',
            //   key_prefix: '',
            //   type: 'mix_price',
            //   tips: '价值用于返售时作为返售原价进行折扣计算',
            //   newline: true,
            //   required: true,
            // },
            // {
            //   title: '抽中概率',
            //   key: 'odds',
            //   type: 'number',
            //   suffix: '%',
            //   // tips: '价值用于返售时作为返售原价进行折扣计算',
            //   newline: true,
            //   required: true,
            // },
            {
              title: '总库存',
              key: 'stock',
              type: 'number',
              tips: '总库存应该大于等于 每期抽取数量 * 期数',
              suffix: '份',
              required: true
            },
            {
              title: '兑换所需卡片数',
              type: 'text',
              text: '创建后在奖品列表中设置'
            },
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
      displayNeedCard(row) {
        let needCards = row.need_cards || {}

        let str = ''
        for (let key in needCards) {

          let card = this.cardList.find(item => {
            return key == item.id
          })

          console.log('find card ===>', card)

          if (card) {
            str += card.title + '&nbsp x' + needCards[key] + "</br>"
          }
        }

        return str ||  '暂未设置'
      },
      handleEditNeedCard(row) {
        this.current = row
        this.isEditNeedCard  = true
      },
      initList() {
        this.$http.get(`/jika/skus`, {
          params: {
            activity_id: this.info.id
          }
        }).then(res => {
          this.list = res.data.list
        })

        this.$http.get(`/jika/cards`, {
          params: {
            activity_id: this.info.id
          }
        }).then(res => {
          this.cardList = res.data.list
        })
      },
      handleCreate() {
        this.$iForm.show({
          title: '新增活动奖品',
          frame: this.frame,
          success: (data) => {
            this.$http.post(`/jika/skus`, {
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
          title: '编辑活动奖品',
          frame: this.frame,
          form: row,
          success: (data) => {
            this.$http.put(`/jika/skus/${row.uuid}`, {
              type: 'update',
              attributes: data
            }).then(res => {
              this.initList()
              this.$iForm.hide()
            })
          },
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
            this.$http.delete(`/jika/skus/${row.uuid}`).then(res => {
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
