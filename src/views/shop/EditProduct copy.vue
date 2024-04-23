<template>
  <div class="content-wrap">
    <a-spin :spinning="loading">
      <div class="content">
        <div class="side-left">
          <div class="item" :class="{active:current===0}" @click="currentChange(0)">基本信息</div>
          <div class="item" :class="{active:current===1}" @click="currentChange(1)">商品SKU</div>
          <div class="item" :class="{active:current===2}" @click="currentChange(2)">商品详情</div>
          <div style="text-align:center;margin: 100px auto;">
            <a-button type="primary" @click="handleRelease">保存更改</a-button>
          </div>
        </div>
        <div class="side-right">
          <div class="base-content">
            <template v-if="current==0">
              <a-form>
                <a-form-item label="标题(必填)" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <a-input style="width:400px" v-model="form.title" placeholder="请输入" allowClear></a-input>
                </a-form-item>
                <a-form-item label="封面图(必填)" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <UploadImages tips="建议尺寸: 480*480" v-model="form.thumb" size="small"></UploadImages>
                </a-form-item>
                <a-form-item label="轮播图(必填)" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <UploadImages multiple tips="建议尺寸: 960*960" v-model="form.images" size="small"></UploadImages>
                </a-form-item>
                <a-form-item label="编号" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <a-input style="width:400px" v-model="form.number" placeholder="请输入" allowClear></a-input>
                </a-form-item>
                <a-form-item label="原价(人民币)" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <PriceInput style="width:400px" v-model="form.money_price" placeholder="请输入" allowClear></PriceInput>
                </a-form-item>
                <a-form-item label="原价(积分)" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <a-input style="width:400px" v-model="form.score_price" placeholder="请输入" allowClear></a-input>
                </a-form-item>
                <!-- <a-form-item
                  label="ean码"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-input style="width:400px" v-model="form.ean" placeholder="请输入" allowClear></a-input>
                </a-form-item> -->
                <!-- <a-form-item
                  label="所属店铺"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-select
                    mode="single"
                    style="width: 400px"
                    v-model="form.shop_id"
                    placeholder="请选择"
                    allowClear
                  >
                    <template v-for="item in shops">
                      <a-select-opt-group :key="item.id">
                        <span slot="label">{{ item.title }}</span>
                        <a-select-option :value="sub.id" v-for="sub in item.sub_categories" :key="sub.id">{{ sub.title }}</a-select-option>
                      </a-select-opt-group>
                      <a-select-option :value="item.id" :key="item.id">{{ item.title }}</a-select-option>
                    </template>
                  </a-select>
                </a-form-item> -->
                <a-form-item label="所属分类" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <a-select mode="multiple" style="width: 400px" v-model="form.category_ids" placeholder="请选择"
                    allowClear>
                    <template v-for="item in categoryList">
                      <a-select-opt-group :key="item.id">
                        <span slot="label">{{ item.title }}</span>
                        <a-select-option :value="sub.id" v-for="sub in item.sub_categories" :key="sub.id">{{ sub.title }}</a-select-option>
                      </a-select-opt-group>
                      <!-- <a-select-option :value="item.id" :key="item.id">{{ item.title }}</a-select-option> -->
                    </template>
                  </a-select>
                </a-form-item>
                <a-form-item label="标签" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <div class="attr-item">
                    <div class="attr-item-value">
                      <Labels v-model="form.tags"></Labels>
                    </div>
                  </div>
                </a-form-item>
                <!-- <a-form-item
                  label="所属品牌"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-select
                    placeholder="请选择"
                    style="width: 400px"
                    v-model="form.brand_id"
                    allowClear
                  >
                    <a-select-option :value="item.id" v-for="item in brands" :key="item.id">{{ item.title }}</a-select-option>
                  </a-select>
                </a-form-item> -->
                <a-form-item label="备注(仅后台可见)" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
                  <a-input v-model="form.remark" placeholder="选填" />
                </a-form-item>
                <a-form-item label="要求填写收货地址" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <ISwitch v-model="form.is_need_address" :active="1" :unactive="0" />
                </a-form-item>
                <a-form-item label="是否包邮" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <ISwitch v-model="form.is_free_carriage" :active="1" :unactive="0" />
                  <div class="tips">不包邮将使用统一运费设置, 见“系统设置 -> 订单设置”</div>
                </a-form-item>
                <a-form-item label="可线下核销" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <ISwitch v-model="form.is_offline_useable" :active="1" :unactive="0" />
                </a-form-item>
                <a-form-item label="是否上架" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                  <ISwitch v-model="form.status" :active="1" :unactive="0" />
                </a-form-item>
                <!--                 <a-form-item
                  label="运费类型"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-radio-group v-model="form.carriage_type" name="radioGroup">
                    <a-radio :value="0">包邮</a-radio>
                    <a-radio :value="1">到付</a-radio>
                    <a-radio :value="2">运费模板</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item
                  label="运费类型"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 12 }"
                  v-if="form.carriage_type === 2"
                >
                  <a-select
                    placeholder="请选择"
                    style="width: 400px"
                    v-model="form.carriage_template_id"
                    allowClear
                  >
                    <a-select-option :value="item.id" v-for="item in carriageList" :key="item.id">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item> -->
              </a-form>
            </template>

            <template v-if="current==1">
              <a-form>
                <!--                 <a-form-item
                  label="普通属性"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <MultiKVInput v-model="form.normal_attrs"></MultiKVInput>
                </a-form-item> -->
                <div class="sub-item-title">SKU属性</div>
                <a-form-item label="SKU属性" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
                  <div class="attr-item" v-for="(item,index) in form.sku_attrs" :key="index">
                    <div class="number-index">属性{{index + 1}}</div>
                    <a-input :ref="'input'+index" class="key" v-model="item.key" placeholder="标题,如颜色"></a-input>
                    <div class="attr-item-value">
                      <Labels v-model="item.value"></Labels>
                      <a-button class="button" icon="delete" type="dashed" @click="handleSubAttrs(index)"></a-button>
                    </div>
                  </div>
                  <a-button icon="plus" @click="handlePlusAttrs">添加一行</a-button>
                </a-form-item>

                <div class="sub-item-title">SKU库存</div>
                <a-form-item label="SKU" :label-col="{ span: 0 }" :wrapper-col="{ span: 12 }">
                  <div class="attrs-table">
                    <div class="tr tr-header">
                      <div class="cell">商品规格</div>
                      <div class="cell">图片</div>
                      <div class="cell">编号</div>
                      <div class="cell">
                        <a-popover title="批量修改价格" trigger="click">
                          <template slot="content">
                            <div style="display:flex;">
                              <a-input v-model="fillPrice" placeholder="请输入" autofocus style="margin-right:10px;width:120px;"
                                size="small"></a-input>
                              <a-button type="primary" size="small" @click="handleSetAllPrice">填充</a-button>
                            </div>
                          </template>
                          <span>价格(人民币)
                            <a-icon type="edit" /></span>
                        </a-popover>
                      </div>
                      <div class="cell">
                        <a-popover title="批量修改价格" trigger="click">
                          <template slot="content">
                            <div style="display:flex;">
                              <a-input v-model="fillScorePrice" placeholder="请输入" autofocus style="margin-right:10px;width:120px;"
                                size="small"></a-input>
                              <a-button type="primary" size="small" @click="handleSetAllScorePrice">填充</a-button>
                            </div>
                          </template>
                          <span>价格(积分)
                            <a-icon type="edit" /></span>
                        </a-popover>
                      </div>
                      <div class="cell">
                        <a-popover title="批量修改库存" trigger="click">
                          <template slot="content">
                            <div style="display:flex;">
                              <a-input v-model="fillStock" placeholder="请输入" autofocus style="margin-right:10px;width:120px;"
                                size="small"></a-input>
                              <a-button type="primary" size="small" @click="handleSetAllStock">填充</a-button>
                            </div>
                          </template>
                          <span>库存
                            <a-icon type="edit" /></span>
                        </a-popover>
                      </div>
                      <div class="cell">是否上架</div>
                    </div>
                    <div class="tr" v-for="(item,index) in skus" :key="index">
                      <div class="cell text-value">{{ getAttrs(item.attrs) }}</div>
                      <div class="cell">
                        <UploadImages v-model="item.thumb" :isShowTips="false" size="small"></UploadImages>
                      </div>
                      <div class="cell">
                        <a-input v-model="item.number" placeholder="编号"></a-input>
                      </div>
                      <div class="cell">
                        <a-input v-model="item.money_price" placeholder="人民币价"></a-input>
                      </div>
                      <div class="cell">
                        <a-input v-model="item.score_price" placeholder="积分价"></a-input>
                      </div>
                      <div class="cell">
                        <a-input v-model="item.stock" placeholder="库存"></a-input>
                      </div>
                      <div class="cell">
                        <ISwitch v-model="item.status" :active="1" :unactive="0" />
                      </div>
                    </div>
                  </div>
                </a-form-item>
              </a-form>
            </template>

            <template v-if="current === 2">
              <page :data.sync="form.page"></page>
              <!-- <a-form>
                <a-form-item
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 21 }"
                >
                </a-form-item>
              </a-form> -->
            </template>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
  import UploadImages from '@/components/UploadImages/UploadImages'
  import PriceInput from "@/components/IForm/components/IPrice.vue"
  import MultiKVInput from '@/components/MultiKVInput/MultiKVInput'
  import Labels from '@/components/Labels/Labels'
  // import { getBrandList } from '@/api/brands'
  // import { getCategoryList } from '@/api/category'
  // import { getShopList } from '@/api/shops'
  import Page from '@/components/page'
  // import { updateAllProductFields, getProductDetail } from '@/api/products'
  import ISwitch from '@/components/ISwitch/ISwitch'
  // import { getCarriageList } from '@/api/carriage'
  export default {
    name: 'EditProduct',
    components: {
      UploadImages,
      MultiKVInput,
      Labels,
      Page,
      ISwitch,
      PriceInput
    },
    data() {
      return {
        product: {},
        current: 0,
        category: [],
        shops: [],
        brands: [],
        carriageList: [],
        form: {
          title: '',
          thumb: '',
          number: '',
          images: [],
          ean: '',
          category_ids: undefined,
          shop_id: '',
          tags: [],
          money_price: 0,
          score_price: '',
          brand_id: undefined,
          normal_attrs: [],
          sku_attrs: [],
          page: {
            modules: [],
            style: {}
          },
          remark: '',
          status: 0,
          is_need_address: 1,
          is_offline_useable: 1,
          is_free_carriage: 0,
          carriage_type: 0,
          carriage_template_id: undefined
        },
        skus: [],
        currentInput: 0,
        inputValue: '',
        inputVisible: false,
        valueKey: '__',
        attrKey: '###',
        loading: false,
        push: false,
        attrsError: false,
        fillPrice: '',
        fillScorePrice: '',
        fillStock: ''
      }
    },
    watch: {
      'form.sku_attrs': {
        handler(value) {
          const result = this.attrToString(value)
          this.createSkus(result)
        },
        deep: true
      }
    },
    created() {
      this.getCategoryList()
      // getCarriageList().then(res => {
      //   this.carriageList = res.data.list
      // })
      this.$api.emit('product.show', this.$route.params.uuid).then(res => {
        const product = res.data.info
        this.product = product
        this.form = {
          title: product.title,
          thumb: product.thumb,
          number: product.number,
          shop_id: product.shop_id,
          remark: product.remark,
          images: product.ext.images || [],
          ean: product.ean,
          money_price: product.money_price,
          score_price: product.score_price,
          category_ids: product.category_ids || undefined,
          tags: product.tags || [],
          brand_id: product.brand_id,
          normal_attrs: product.ext.normal_attrs || [],
          sku_attrs: product.ext.sku_attrs,
          page: product.ext.page,
          // page: {
          //   modules: product.page && product.page.modules || [],
          //   style: product.page && product.page.style || {}
          // },
          status: product.status,
          is_need_address: product.is_need_address,
          is_offline_useable: product.is_offline_useable,
          is_free_carriage: product.is_free_carriage,
          carriage_type: product.carriage_type,
          carriage_template_id: product.carriage_template_id
        }

        let skus = []
        product.skus.forEach(item => {
          skus.push({
            thumb: item.thumb,
            number: item.number,
            money_price: item.money_price / 100,
            score_price: item.score_price,
            stock: item.stock,
            status: item.status,
            attrs: item.attrs,
            id: item.id,
            uuid: item.uuid
          })
        })
        this.skus = skus
      })
    },
    methods: {
      handleSetAllPrice() {
        this.skus.forEach(item => {
          item.money_price = this.fillPrice
        })
      },
      handleSetAllScorePrice() {
        this.skus.forEach(item => {
          item.score_price = this.fillScorePrice
        })
      },
      handleSetAllStock() {
        this.skus.forEach(item => {
          item.stock = this.fillStock
        })
      },
      handleRelease() {
        if (!this.form.title || !this.form.thumb) {
          this.push = true
          this.current = 0
          return
        }
        const skus = JSON.parse(JSON.stringify(this.skus))
        for (let i = 0; i < this.skus.length; i++) {
          if (this.skus[i].stock === '') {
            // this.attrsError = true
            this.$info({
              title: '提示',
              content: '商品SKU库存不能为空'
            })
            this.current = 1
            return
          }

          if (this.skus[i].money_price === '' && this.skus[i].score_price === '') {
            // this.attrsError = true
            this.$info({
              title: '提示',
              content: '商品SKU人民币和积分价最少需要填1个'
            })
            this.current = 1
            return
          }
          skus[i].money_price = this.skus[i].money_price * 100
        }
        const sendData = {
          ...this.form,
          skus: skus
        }
        this.loading = true
        this.$api.emit('product.update_all', this.product.uuid, sendData).then(res => {
          this.$notification.success({
            message: '提示',
            description: '已保存'
          })
        }).finally(() => {
          this.loading = false
        })
      },
      getAttrs(attrs) {
        const arr = []
        attrs.forEach(item => {
          arr.push(item.value)
        })
        return arr.join('，')
      },
      createSkus(result) {
        const skus = []
        result.forEach(item => {
          const temp = []
          const attrs = item.split(this.attrKey)
          attrs.forEach(attr => {
            const value = attr.split(this.valueKey)
            temp.push({
              key: value[0],
              value: value[1]
            })
          })

          let skuItem = {
            thumb: '',
            money_price: '',
            score_price: '',
            stock: '',
            status: 1,
            attrs: temp
          }
          for (let i = 0; i < this.product.skus.length; i++) {
            if (this.getAttrs(temp) === this.getAttrs(this.product.skus[i].attrs)) {
              skuItem = {
                id: this.product.skus[i].id,
                uuid: this.product.skus[i].uuid,
                number: this.product.skus[i].number,
                thumb: this.product.skus[i].thumb,
                money_price: this.product.skus[i].money_price / 100,
                score_price: this.product.skus[i].score_price,
                stock: this.product.skus[i].stock,
                status: this.product.skus[i].status,
                attrs: temp
              }
              break
            }
          }
          skus.push(skuItem)
        })
        this.skus = skus
      },
      attrToString(arr) {
        const arr2 = arr.filter(item => {
          return item.value.length
        })
        return arr2.reduce((result, current, index) => {
          const temp = current.value.map(item => {
            return current.key + this.valueKey + item
          })
          if (result.length) {
            const arr = []
            const len = temp.length
            for (let i = 0; i < result.length; i++) {
              for (let j = 0; j < len; j++) {
                arr.push(result[i] + this.attrKey + temp[j])
              }
            }
            return arr
          } else {
            return temp
          }
        }, [])
      },
      handlePlusAttrs() {
        if (this.form.sku_attrs.length >= 3) {
          this.$info({
            title: '提示',
            content: '最多添加三行'
          })
          return
        }
        this.form.sku_attrs.push({
          key: '',
          value: []
        })
      },
      handleSubAttrs(index) {
        this.form.sku_attrs.splice(index, 1)
      },
      currentChange(current) {
        this.current = current
      },
      getCategoryList() {
        this.$http('/normal/categories', 'GET').then(res => {
          this.categoryList = res.data.list
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .sub-item-title {
    font-size: 130%;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .content-wrap .content {
    display: flex;
    background-color: #fff;
    padding: 10px 0;

    .side-left {
      width: 20%;
      max-width: 260px;
      border-right: 1px solid #ccc;

      .item {
        line-height: 50px;
        padding-left: 20px;
        font-size: 15px;
        margin: 10px 0;
        position: relative;
        cursor: pointer;

        &.active {
          font-weight: bold;
          background-color: #e6f7ff;
          color: #1890ff;

          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: -1px;
            height: 100%;
            width: 3px;
            background-color: #1890ff;
          }
        }
      }
    }

    .side-right {
      flex: 1;
      padding-left: 30px;

      .attr-item {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        width: 100%;

        .number-index {
          font-weight: bold;
          // margin-right: 30px;
          width: 60px;
          flex: 0 0 60px;
        }

        .key {
          width: 150px;
          margin-right: 10px;
        }

        .tag {
          height: 30px;
        }

        .attr-item-value {
          display: flex;

          .button {
            margin-left: 10px;
          }
        }
      }

      .attrs-table {
        width: 900px;

        .tr {
          display: flex;
          border-bottom: 1px solid #f0f0f0;

          &.tr-header {
            padding: 5px 0;
            font-weight: bold;

            i {
              color: red;
              padding-left: 8px;
            }
          }

          .cell {
            padding: 6px 10px;
            flex: 1;

            &.text-value {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
</style>
