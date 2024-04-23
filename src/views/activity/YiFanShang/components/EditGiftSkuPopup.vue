<template>
  <a-modal :title="`编辑赠送赏`" style="top: 100px;" :visible="true" width="1200px" @cancel="handleCancel">
    <div class="tips">
    </div>
    <a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="20px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="图片" key="thumb" width="80px">
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
      <a-table-column title="赏标题" key="number" width="50px">
        <template slot-scope="row">
          <div>
            {{row.shang_title || '-'}}
            <!-- <a-input v-model="row.number" placeholder="请输入" style="width:160px;" /> -->
          </div>
        </template>
      </a-table-column>
      <a-table-column title="回收价" key="number" width="100px">
        <template slot-scope="row">
          <div>
            <PriceDisplay :info="row"></PriceDisplay>
          </div>
        </template>
      </a-table-column>
      <a-table-column title="显示零售价" key="number" width="100px">
        <template slot-scope="row">
          <div v-if="row.display_money_price">
            {{row.display_money_price / 100}} 元
            <!-- <PriceDisplay :info="row" :prefix="display_"></PriceDisplay> -->
          </div>
        </template>
      </a-table-column>
      <a-table-column title="抽取位置" key="number" width="100px">
        <template slot-scope="row">
          <div>
            第{{row.lottery_start_point}} - 第{{row.lottery_end_point}}发
            <br/>
            取{{row.total_per_room}}位送出
          </div>
        </template>
      </a-table-column>
      <a-table-column title="SKU类型" width="80px">
        <template slot-scope="row">
          <span>
            <span v-if="row.sku_type === 1">-</span>
            <span v-else-if="row.sku_type === 2">绑定商品</span>
            <span v-else-if="row.sku_type === 3">绑定虚拟资产</span>
          </span>
        </template>
      </a-table-column>

      <a-table-column width="80px">
        <div slot="title">
          预售时间
          <tips>设置后在预售时间前用户无法选择发货</tips>
        </div>
        <template slot-scope="row">
          <span>
            <span v-if="!row.presell_date">-</span>
            <span v-else>{{row.presell_date}}</span>
          </span>
        </template>
      </a-table-column>

      <a-table-column title="排序" width="60px" v-if="!selectMode">
        <template slot-scope="row">
          {{row.list_weight}}
          <span @click="handleEditListWeight(row)" style="margin-left: 10px;"><a href="javascript:;">
              <a-icon type="edit" />
            </a></span>
        </template>
      </a-table-column>
      <a-table-column title="总库存" width="60px">
        <template slot-scope="row">
          <span>
            {{row.stock}}件
            <!-- <a-input v-model="row.stock" placeholder="请输入" style="width:80px;" /> -->
          </span>
        </template>
      </a-table-column>
      <a-table-column title="每箱数量" width="60px">
        <template slot-scope="row">
          <span>
            {{row.total_per_room}}件
            <!-- <a-input v-model="row.stock" placeholder="请输入" style="width:80px;" /> -->
          </span>
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
          <!-- <a-divider type="vertical" /> -->
          <!-- <a href="javascript:;" @click="handleDelete(row)">删除</a> -->
        </template>
      </a-table-column>
    </a-table>
    <template slot="footer">
      <div class="btn-c">
        <!-- <a-button type="primary" class="add" @click="handleCreate">
          新增一款
        </a-button> -->
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
  export default {
    components: {
      UploadImages,
      iSwitch
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
              title: 'SKU类型',
              key: 'sku_type',
              type: 'radio',
              default: 1,
              required: true,
              span: 24,
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
                },
                // {
                //   title: '免单',
                //   value: 5
                // }
              ],
              tips: '选择免单会按一抽的价格返还给中奖用户'
            },
            {
              title: '绑定商品',
              key: 'product_id',
              type: 'product_id',
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
            {
              title: '赏标题',
              key: 'shang_title',
              placeholder: '例如 A赏 B赏'
              // required: true,
            },
            {
              title: '封面',
              key: 'thumb',
              type: 'image',
              tips: '建议宽600，高900',
            },
            {
              title: '回收价',
              key_prefix: '',
              type: 'mix_price',
              tips: '价值用于回收时作为回收原价进行折扣计算',
              newline: true,
              required: true,
            },
            {
              title: '显示零售价',
              key: 'display_money_price',
              type: 'price',
              tips: '零售价仅用于小程序显示， 选填',
              newline: true,
              // required: true,
            },
            // {
            //   title: '总库存',
            //   key: 'stock',
            //   type: 'number',
            //   tips: '总库存应该大于等于 每期送出数量 * 期数',
            //   required: true
            // },
            {
              title: '每个箱子数量',
              key: 'total_per_room',
              type: 'number',
              tips: '每个箱子内提供的奖品数量',
              required: true
            },
            {
              title: '抽奖开始位置',
              key: 'lottery_start_point',
              prefix: '从(包含)第',
              suffix: '位抽奖者开始',
              type: 'number',
              // tips: '每个箱子内提供的奖品数量',
              required: true
            },
            {
              title: '抽奖结束位置',
              key: 'lottery_end_point',
              prefix: '至(包含)第',
              suffix: '位抽奖者结束',
              type: 'number',
              // tips: '每个箱子内提供的奖品数量',
              required: true
            },
            {
              title: '预售日期',
              key: 'presell_date',
              showTime: false,
              type: 'date',
              tips: '设置此日期后，用户仓库内此奖品只能在预售日期之后才能进行发货',
              // required: true
            },
            {
              title: '奖品详情图',
              key: 'detail_images',
              type: 'images',
              newline: true,
              sizeLimit: 400,
              tips: '显示在用户的物品详情中。 不上传则不显示。 <br/> 长图请切成多张小图上传'
              // tips: '不设置则没有连'
              // required: true
            }
          ]
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
        this.$http.get(`/yi-fan-shang/skus`, {
          params: {
            shang_type: 'gift',
            activity_id: this.info.id
          }
        }).then(res => {
          this.list = res.data.list
        })
      },
      handleCreate() {
        this.$iForm.show({
          title: '新增活动奖品',
          frame: this.frame,
          success: (data) => {
            this.$http.post(`/yi-fan-shang/skus`, {
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
            this.$http.put(`/yi-fan-shang/skus/${row.uuid}`, {
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
        this.$http.delete(`/activities/${this.uuid}/skus/${row.uuid}`).then(res => {
          this.$message.success('删除成功')
          this.initList()
        })
      },
      handleEditListWeight(row) {
        this.$iForm.show({
          title: '编辑排序',
          frame: [
            {
              title: '排序',
              key: 'list_weight',
              type: 'number'
            }
          ],
          form: row,
          success: (data) => {
            this.$http.put(`/yi-fan-shang/skus/${row.uuid}`, {
              type: 'update',
              attributes: data
            }).then(res => {
              this.initList()
              this.$iForm.hide()
            })
          },
        })
      },
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
