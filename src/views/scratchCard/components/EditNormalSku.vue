<template>
  <a-modal :title="`编辑普通款`" style="top: 100px;" :visible="true" width="1480px" @cancel="handleCancel">
    <div class="tips" style="color: red; font-size: 96%; margin-bottom: 10px;">
      虚拟资产类奖品禁止回收
      <a href="https://www.yuque.com/u1307645/mwy3k3/xkcbir" target="_blank">回收说明文档</a>
    </div>
    <a-table class="product-table" :rowKey="row => row.id" :dataSource="list" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="50px">
        <template slot-scope="text, record, index">
          <div>{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="图片" width="130px">
        <template slot-scope="row">
          <UploadImages v-model="row.thumb" tips="600*800" size="small"></UploadImages>
        </template>
      </a-table-column>
      <a-table-column title="标题/编号" width="220px">
        <template slot-scope="row">
          <div style="margin-top: 6px; display: flex; align-items: center;">
            <div style="flex: 0 0 36px">标题</div>
            <a-input style="width: 180px;" v-model="row.title" placeholder="请输入" />
          </div>
          <div style="margin-top: 6px; display: flex; align-items: center;">
            <div style="flex: 0 0 36px">编号</div>
            <a-input v-model="row.number" placeholder="选填" />
          </div>
        </template>
      </a-table-column>
      <a-table-column title="奖品类型" width="130px">
        <template slot-scope="row">
          <ISkuType :info="row"></ISkuType>
          <a href="javascript:;" @click="handleEdit(row)">编辑</a>
        </template>
      </a-table-column>
      <!-- <a-table-column title="编号" key="number" width="150px">
        <template slot-scope="row">
          <div>
            <a-input v-model="row.number" placeholder="请输入"/>
          </div>
        </template>
      </a-table-column> -->
      <a-table-column width="160px">
        <div slot="title">
          零售价
          <tips>1、显示在小程序端</tips>
        </div>
        <template slot-scope="row">
          <div>
            <IPrice v-model="row.display_money_price" size="small" placeholder="请输入" style="width: 110px" /> +
          </div>
          <div style="margin-top: 6px;">
            <a-input v-model.number="row.display_score_price" size="small" placeholder="请输入" style="width: 90px" />&nbsp积分
          </div>
        </template>
      </a-table-column>
      <a-table-column width="160px">
        <div slot="title">
          回收价
          <tips>1、作为回收原价进行折扣计算</tips>
        </div>
        <template slot-scope="row">
          <div>
            <IPrice v-model="row.money_price" size="small" placeholder="请输入" style="width: 110px" /> +
          </div>
          <div style="margin-top: 6px;">
            <a-input v-model.number="row.score_price" size="small" placeholder="请输入" style="width: 90px" />&nbsp积分
          </div>
        </template>
      </a-table-column>
      <a-table-column title="库存" width="90px">
        <template slot-scope="row">
          <span>
            <a-input v-model="row.stock" placeholder="请输入" />
          </span>
        </template>
      </a-table-column>

      <a-table-column width="120px">
        <div slot="title">
          抽中概率(%)
          <tips>1、此概率在连抽情况或非1:1情况下生效 <br /> 2、此概率可设置显示在小程序端</tips>
        </div>
        <template slot-scope="row">
          <span>
            <a-input v-model="row.odds" placeholder="0-100" style="width:70px; margin: 0px 1px;" />%
          </span>
        </template>
      </a-table-column>

      <a-table-column title="已售" width="80px">
        <template slot-scope="row">
          <span>
            {{row.sales}}次
          </span>
        </template>
      </a-table-column>
      <a-table-column title="允许回收" width="80px">
        <template slot-scope="row">
          <span v-if="row.sku_type === 3">
            系统禁止
          </span>
          <span v-else>
            <i-switch :active="row.is_return_saleable || 1" v-model="row.is_return_saleable" size="small"></i-switch>
          </span>
        </template>
      </a-table-column>
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
    <template slot="footer">
      <div class="btn-c">
        <a-button type="primary" class="add" @click="handleCreate">
          新增一款
        </a-button>
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
  import IPrice from '@/components/IForm/components/IPrice'
  import ISkuType from '@/components/ISkuType/ISkuType'
  export default {
    components: {
      UploadImages,
      iSwitch,
      IPrice,
      ISkuType
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
        frame: [{
            title: '奖品类型',
            key: 'sku_type',
            type: 'radio',
            default: 1,
            required: true,
            span: 24,
            options: [{
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
          // {
          //   title: '操作',
          //   type: 'button',
          //   text: '点击获取商品信息',
          //   where: {
          //     sku_type: 2
          //   }
          // },
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
            placeholder: '可填写编号方便在订单中对应货物'
            // required: true,
          },
          {
            title: '封面',
            key: 'thumb',
            type: 'image'
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
      handleEdit(row) {
        this.$iForm.show({
          title: '编辑活动奖品',
          frame: this.frame,
          form: row,
          success: (data) => {
            let index = this.list.findIndex((item) => {
              return item.uuid === row.uuid
            })
            console.log(index)
            this.list.splice(index, 1, {
              ...this.list[index],
              ...data
            })
            // this.list[index] = {
            //   ...this.list[index],
            //   ...data
            // }
            this.$iForm.hide()
            // this.$http.put(`/fudai/skus/${row.uuid}`, {
            //   type: 'update',
            //   attributes: {
            //     ...data
            //   }
            // }).then(res => {
            //   this.initList()
            //   this.$iForm.hide()
            // })
          },
        })
      },
      initList() {
        this.$http.get(`/boxes/${this.uuid}/normal-skus`).then(res => {
          this.list = res.data.list
        })
      },
      handleCreate() {
        this.$http.post(`/boxes/${this.uuid}/normal-skus`).then(res => {
          this.initList()
        })
      },
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      handleSave() {
        this.$http.put(`/boxes/${this.uuid}/normal-skus/batch`, {
          list: this.list
        }).then(res => {
          this.$message.success('保存成功')
          this.initList()
        })
      },
      handleDelete(row) {
        this.$http.delete(`/boxes/${this.uuid}/normal-skus/${row.uuid}`).then(res => {
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
    // margin-top: 30px;
    padding: 0rpx 30rpx;

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
