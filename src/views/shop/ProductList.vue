/* eslint-disable */
<template>
  <div class="content-wrap">
    <div class="content-head" style="margin-bottom: 20px;">
      <div class="sort-keys">

        <div class="tab-list">
          <div class="item" @click="keys.status = item.key" :class="{actived: keys.status === item.key}"
            v-for="(item, index) in statusList">
            {{item.text}}
            ({{statusTotal[item.key]}})
            <!-- ({{orderStat[item.key] || 0}}) -->
          </div>
        </div>


        <!-- <a-input placeholder="输入关键字" style="width: 180px;margin-right:10px;" v-model="keys.key" allowClear /> -->
       <a-input-search placeholder="模糊搜索" enter-button  style="width: 180px;margin-right:10px;" v-model="keys.key" allowClear :size="size"
         @input="refresh" @search="refresh" />

        <a-select style="width: 150px;margin-right:10px;" v-model="keys.category_id" placeholder="分类" allowClear>
          <template v-for="item in allCategoryList">
            <a-select-opt-group :key="item.id">
              <span slot="label">{{ item.title }}</span>
              <a-select-option :value="sub.id" v-for="sub in item.sub_categories" :key="sub.id">{{ sub.title }}</a-select-option>
            </a-select-opt-group>
            <!-- <a-select-option :value="item.id" :key="item.id">{{ item.title }}</a-select-option> -->
          </template>
        </a-select>

        <a-input placeholder="完整编号搜索" style="width: 180px;margin-right:10px;" v-model="keys.number" allowClear />


        <a-button style="margin-left: 30px; float: right;" type="primary" @click="isBatchEdit = !isBatchEdit">
          <span>批量编辑</span>
        </a-button>

       <!-- <a-radio-group v-model="keys.status" buttonStyle="solid" style="margin-right:10px;">
          <a-radio-button :value="1">上架中({{statusTotal.on}})</a-radio-button>
          <a-radio-button :value="0">已下架({{statusTotal.off}})</a-radio-button>
        </a-radio-group> -->

        <!-- <a-button type="primary" @click="resetKeys">重置</a-button> -->
      </div>
      <a-button type="primary" icon="plus" @click="plusProducts">创建商品</a-button>
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination">
      <a-table-column title="主图" width="60px">
        <template slot-scope="row">
          <div class="product-info">
            <div class="thumb" :style="`background-image:url(${row.thumb}?x-oss-process=image/resize,w_400)`">
              <img v-if="row.image_tag" :src="row.image_tag.image  + '?x-oss-process=image/resize,w_400'" :class="'tag-image ' + 'location-' + row.image_tag.location"></img>
            </div>
          </div>
        </template>
      </a-table-column>

      <a-table-column title="商品" width="320px">
        <template slot-scope="row">
          <div class="product-info">
            <!-- <div class="thumb" :style="`background-image:url(${row.thumb})`"></div> -->
            <div class="info-meta">
              <div class="title">

                <!-- <a-icon class="star" type="star" @click="markOrder" :theme="row.marked_at ? 'filled' : 'outlined'"></a-icon> -->
                <span>{{ row.title }}</span>&nbsp;
                <a-tag color="orange" v-if="row.is_presell">预售</a-tag>
                <a-tag color="red" v-if="row.status == 0">下架</a-tag>
                <a-tag color="red" v-if="row.stock === 0">售罄</a-tag>
                <a @click="handleEditBaseInfo(row)">
                  编辑
                  <a-icon type="edit" ></a-icon>
                </a>
              </div>
              <div class="brand">
                <span class="marked-tag" @click="markProduct(row)" :class="{actived: row.marked_at}">标记</span>
                <span v-if="row.brand">{{ row.brand.title }}</span>
                <span v-if="row.categories && row.categories.length">&nbsp;/&nbsp;{{ getProductCategory(row.categories) }}</span>
                <span v-if="row.number">&nbsp;/&nbsp;{{ row.number }}</span>
                <span v-if="row.supplier">&nbsp;/&nbsp;{{row.supplier}}</span>
              </div>
              <!-- <div class="remark" v-if="row.remark">
                (备注) {{ row.remark }}
              </div> -->
              <div class="price-c">
                <PriceDisplay :info="row"></PriceDisplay>
              </div>
            </div>
          </div>
        </template>
      </a-table-column>

      <!-- <a-table-column width="130px">
        <div slot="title">
          <span>显示价格&nbsp;</span>
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span>可设置<br /> 1、单人民币支付价格 <br /> 2、单积分支付价格 <br /> 3、人民币+积分混合支付价格</span>
            </template>
            <a-icon type="question-circle" />
          </a-tooltip>
        </div>
        <template slot-scope="row">
          <div>
            <div v-if="row.money_price">¥{{ row.money_price | priceToFixed }}</div>
            <div v-if="row.score_price">{{row.score_price}}积分</div>
          </div>
        </template>
      </a-table-column> -->

      <a-table-column title="SKU库存" width="140px">
        <template slot-scope="row">
          <span>{{ row.skus_count }}&nbsp;SKU</span>&nbsp;
          <a>
            <a-icon type="edit" @click="handleEditSkus(row)"></a-icon>
          </a>
          <div style="font-size:13px;"><span>库存{{ row.stock || 0 }}&nbsp;件</span></div>
        </template>
      </a-table-column>

      <!-- <a-table-column title="库存" width="100px">
        <template slot-scope="row">
          <span>{{ row.stock || 0 }}&nbsp;件</span>
        </template>
      </a-table-column> -->

      <a-table-column title="销量" width="120px">
        <template slot-scope="row">
          <span>已售&nbsp;{{ row.sales || 0 }}&nbsp;件</span>
        </template>
      </a-table-column>

      <!-- <a-table-column title="分销/下单赠送" width="160px">
        <template slot-scope="row">
          <RewardAndBrokerage :info="row" @update="updateRewardAndBrokerage(row, $event)"></RewardAndBrokerage>
        </template>
      </a-table-column> -->

      <a-table-column title="排序" width="100px">
        <template slot-scope="row">
          <div>
            <span>{{ row.list_weight || 0 }}&nbsp;</span>
            <a-popover title="排序权重" trigger="click" v-model="row.visible">
              <template slot="content">
                <div style="display:flex;">
                  <a-input v-model="listWeight" placeholder="请输入" autofocus style="margin-right:10px;width:120px;" size="small"></a-input>
                  <a-button type="primary" size="small" @click="handleUpdateListWeight(row)" :loading="loading3">保存</a-button>
                </div>
              </template>
              <span><a href="javascript:;">
                  <a-icon type="edit" /></a></span>
            </a-popover>
          </div>
        </template>
      </a-table-column>

      <!-- <a-table-column title="碎片兑换" width="110px">
        <template slot-scope="row">
          <div>

            <span v-if="row.cover_chip_status">已设置</span>
            <span v-else>-</span>
          </div>
          <div>
            <a href="javascript:;" @click="handleEditCoverChip(row)">编辑</a>
          </div>
        </template>
      </a-table-column> -->

      <a-table-column title="人群专享价" width="110px">
        <template slot-scope="row">
          <div>

            <span v-if="row.group_prices_count">已设置</span>
            <span v-else>-</span>
          </div>
          <div>
            <a href="javascript:;" @click="handleEditGroupPrice(row)">编辑</a>
          </div>
        </template>
      </a-table-column>

      <a-table-column title="是否上架" width="100px">
        <template slot-scope="row">
          <ISwitch :value="row.status" :active="1" :unactive="0" @change="productStatusChange($event, row)" />
        </template>
      </a-table-column>

      <a-table-column title="操作" width="200px">
        <template slot-scope="row">
          <span>
            <a href="javascript:;" @click="getPath(row)">预览/路径</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleEditProduct(row)">编辑</a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item @click="handleDelete(row)"><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多
                <a-icon type="down" /></a>
            </a-dropdown>
          </span>
        </template>
      </a-table-column>
    </a-table>

    <a-modal title="编辑商品SKU" style="top: 100px;" :visible.sync="visible" width="1000px" @ok="handleOk" @cancel="visible = false">
      <a-table class="modal-skus-table" :rowKey="row => row.uuid" :dataSource="skus" :pagination="false" size="small"
        :loading="getSkusLoading">
        <a-table-column title="商品规格">
          <template slot-scope="row">
            <span>{{ getAttrs(row.attrs) }}</span>
          </template>
        </a-table-column>

        <a-table-column title="图片" key="image" width="120px">
          <template slot-scope="row">
            <UploadImages v-model="row.thumb" size="small"></UploadImages>
          </template>
        </a-table-column>
        <a-table-column title="编号" width="120px">
          <template slot-scope="row">
            <a-input v-model="row.number" placeholder="编号"></a-input>
          </template>
        </a-table-column>
        <a-table-column title="价格(人民币)" width="120px">
          <template slot-scope="row">
            <a-input v-model="row.money_price" placeholder="人民币价"></a-input>
          </template>
        </a-table-column>
        <a-table-column title="价格(积分)" width="120px">
          <template slot-scope="row">
            <a-input v-model="row.score_price" placeholder="积分价"></a-input>
          </template>
        </a-table-column>
        <a-table-column title="库存" width="120px">
          <template slot-scope="row">
            <a-input v-model="row.stock" placeholder="库存"></a-input>
          </template>
        </a-table-column>
        <a-table-column title="销量" key="sales" width="60px">
          <template slot-scope="row">
            <span>&nbsp;&nbsp;{{ row.sales }}</span>
          </template>
        </a-table-column>
        <a-table-column title="是否上架" key="status" width="120px">
          <template slot-scope="row">
            <ISwitch v-model="row.status" :active="1" :unactive="0" />
          </template>
        </a-table-column>
      </a-table>
    </a-modal>

   <!-- <a-modal title="设置使用碎片兑换商品" width="1000px" :footer="null" @cancel="isEditCoverChip = fetchData() || false" :visible="isEditCoverChip">
      <div>
        <EditCoverChip @close="isEditCoverChip = false" @refresh="fetchData" :id="editId"></EditCoverChip>
      </div>
    </a-modal> -->

    <a-modal title="设置人群价" width="1000px" :footer="null" @cancel="isEditGroupPrice = fetchData() || false" :visible="isEditGroupPrice">
      <div>
        <EditGroupPrice @close="isEditGroupPrice = false" v-if="isEditGroupPrice" @refresh="fetchData" :uuid="editUuid" type="products"></EditGroupPrice>
      </div>
    </a-modal>
    
    <BatchEdit @hide="isBatchEdit=false" :isShow="isBatchEdit"></BatchEdit>

    <a-modal title="编辑商品信息" style="top: 100px;" :visible.sync="visible2" width="600px" @ok="handleOk2" @cancel="visible2 = false"
      :confirmLoading="loading2">
      <a-form :form="form">
        <a-form-item label="标题" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入" v-decorator="[
			  'title',
			  {rules: [{ required: true, message: '请输入商品标题!' }]}
			]" />
        </a-form-item>
        <a-form-item label="编号" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入" v-decorator="[
			  'number'
			]" />
        </a-form-item>
        <!-- <a-form-item label="品牌" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-select placeholder="请选择" v-decorator="[
			  'brand_id'
			]" allowClear>
            <a-select-option :value="item.id" v-for="item in brands" :key="item.id">{{ item.title }}</a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item label="分类" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-select mode="multiple" placeholder="请选择" v-decorator="[
			  'category_ids'
			]" allowClear>
            <template v-for="item in allCategoryList">
              <a-select-opt-group :key="item.id">
                <span slot="label">{{ item.title }}</span>
                <a-select-option :value="sub.id" v-for="sub in item.sub_categories" :key="sub.id">{{ sub.title }}</a-select-option>
              </a-select-opt-group>
            </template>
          </a-select>
        </a-form-item>

        <a-form-item label="绑定角标" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-select placeholder="请选择" v-decorator="[
          'image_tag_id'
        ]" allowClear>
            <template v-for="item in imageTagList">
              <a-select-option :value="item.id" :key="item.id">{{ item.title }}</a-select-option>
            </template>
          </a-select>
        </a-form-item>

        <a-form-item label="备注" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入" v-decorator="[
          'remark'
        ]" />
        </a-form-item>


      </a-form>
    </a-modal>
  </div>
</template>
<script>
  import UploadImages from '@/components/UploadImages/UploadImages'
  import ISwitch from '@/components/ISwitch/ISwitch'
  import EditCoverChip from './components/EditCoverChip'
  import EditGroupPrice from './components/EditGroupPrice'
  import BatchEdit from "./components/BatchEdit"

  import moment from 'moment'
  import {
    clearTimeout,
    setTimeout
  } from 'timers'
  export default {
    name: 'Products',
    components: {
      UploadImages,
      ISwitch,
      EditCoverChip,
      EditGroupPrice,
      BatchEdit
    },
    data() {
      return {
        statusList: [
          {
            text: '上架中',
            key: 'on_stock'
          },
          {
            text: '已下架',
            key: 'off_stock'
          },
          {
            text: '已售罄',
            key: 'sell_out'
          },
          {
            text: '标记的',
            key: 'marked'
          },
        ],
        loading: false,
        loading2: false,
        loading3: false,
        list: [],
        actived: 'on_stock',
        statusTotal: {
          on_stock: 0,
          off_stock: 0,
          sell_out: 0,
          marked: 0
        },
        page: 1,
        per_page: 8,
        total: 0,
        categoryList: [],
        ipList: [],
        imageTagList: [],
        brands: [],
        keys: {
          category_id: undefined,
          key: '',
          brand_id: undefined,
          shop_id: undefined,
          status: 'on_stock',
          number: undefined
        },
        visible: false,
        visible2: false,
        current: {},
        skus: [],
        getSkusLoading: false,
        form: this.$form.createForm(this),
        timeout: null,
        listWeight: '',
        isEditCoverChip: false,
        isEditGroupPrice: false,
        editUuid: '',
        editId: '',
        isBatchEdit: false
      }
    },
    computed: {
      pagination() {
        console.log(this.page)
        return {
          defaultPageSize: this.per_page,
          defaultCurrent: this.page,
          total: this.total,
          onChange: (e) => {
            this.page = e
            this.fetchData()
          }
        }
      },
      allCategoryList () {
        return [
          {
            id: 0,
            title: '所有IP',
            sub_categories: this.ipList
          },
          ...this.categoryList
        ]
      }
    },
    watch: {
      keys: {
        handler(value) {
          this.page = 1
          this.fetchData()
          // clearTimeout(this.timeout)
          // this.timeout = setTimeout(() => {
          //   this.fetchData()
          // }, 300)
        },
        deep: true
      }
    },
    filters: {
      priceToFixed(value) {
        return value ? (value / 100).toFixed(2) : '0.00'
      },
      formatDate(value) {
        return value ? moment(value).format('YYYY-MM-DD hh:mm') : ''
      }
    },
    created() {
      this.page = parseInt(localStorage.getItem("product_list_page") || 1)
      localStorage.setItem("product_list_page", 1)
      // this.$loading.show()
      this.getCategoryList()
      this.getImageTagList()
      // this.getBrands()
      // this.getShops()
      this.fetchData()
      this.fetchTotalData()
    },
    methods: {
      // 标记
      markProduct(row) {
         this.$http.patch(`/shop/products/${row.uuid}`, {
           type: 'mark'
         }).then((res) => {
           this.$message.success('保存成功')
           this.fetchData()
           this.fetchTotalData()
         })
      },
      // 编辑碎片
      handleEditCoverChip(row) {
        this.editUuid = row.uuid
        this.editId = row.id
        this.isEditCoverChip = true
      },
      handleEditGroupPrice(row) {
        this.editUuid = row.uuid
        this.editId = row.id
        this.isEditGroupPrice = true
      },
      fetchTotalData() {
        this.$http('/status-total/product').then((res) => {
          this.statusTotal = res.data.total
        })
      },
      getPath(row) {
        // this.$info({
        //   title: '商品路径',
        //   content: '/pages/productDetail/index?uuid=' + row.uuid
        // })

        this.$getPathPopup.show({
          page: '/pages/productDetail/index',
          param: 'uuid=' + row.uuid
        });

      },
      currentChange(pagination) {
        console.log(pagination)
        this.page = pagination.current
        this.fetchData()
      },
      updateRewardAndBrokerage(row, data) {
        this.updateItem(row, data).then(res => {
          this.$message.success('保存成功');
          this.$iForm.hide()
          this.fetchData()
        })
      },
      updateItem(row, data) {
        return this.$api.emit('product.update', row.uuid, {
          ...data
        })
      },
      handleUpdateListWeight(row) {
        this.loading3 = true
        this.$api.emit('product.update', row.uuid, {
          list_weight: this.listWeight
        }).then(() => {
          this.fetchData()
          this.listWeight = ''
        }).finally(() => {
          this.loading3 = false
        })
        row.visible = true
      },
      handleDelete(row) {
        this.$confirm({
          title: '提示',
          content: `确认删除商品 “${row.title}” ？`,
          onOk: () => {
            return new Promise((resolve, reject) => {
              this.$api.emit('product.destory', row.uuid).then(res => {
                this.fetchData()
                resolve()
              }).catch(err => {
                reject(err)
              })
            })
          }
        })
      },
      resetKeys() {
        this.keys = {
          category_ids: undefined,
          key: '',
          brand_id: undefined,
          status: ''
        }
      },
      handleEditProduct(row) {
        localStorage.setItem("product_list_page", this.page)
        this.$router.push({
          name: 'EditProduct',
          params: {
            uuid: row.uuid
          }
        })
      },
      handleOk2() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.loading2 = true
            this.$api.emit('product.update', this.current.uuid, {
              ...values,
              image_tag_id: values.image_tag_id || ''
            }).then(() => {
              this.fetchData()
              this.visible2 = false
            }).finally(() => {
              this.loading2 = false
            })
          }
        })
      },
      handleEditBaseInfo(row) {
        this.visible2 = true
        this.current = row
        this.$nextTick(() => {
          const ids = []
          row.categories.forEach(item => {
            ids.push(item.id)
          })
          this.form.setFields({
            title: {
              value: row.title
            },
            brand_id: {
              value: row.brand && row.brand.id
            },
            number: {
              value: row.number
            },
            category_ids: {
              value: row.category_ids
            },
            image_tag_id: {
              value: row.image_tag_id
            },
            remark: {
              value: row.remark
            }
          })
        })
      },
      productStatusChange(e, row) {
        this.loading = true
        this.$api.emit('product.' + (e === 1 ? 'put_on' : 'put_off'), row.uuid).finally(() => {
          this.fetchData()
          this.fetchTotalData()
        })
      },
      refresh() {
        this.page = 1
        this.fetchData()
        this.fetchTotalData()
      },
      getAttrs(attrs) {
        const arr = []
        attrs.forEach(item => {
          arr.push(item.value)
        })
        return arr.join('，')
      },
      handleOk() {
        const skus = []
        let flag = false
        this.skus.forEach(item => {
          skus.push({
            id: item.id,
            uuid: item.uuid,
            number: item.number,
            money_price: item.money_price * 100,
            score_price: item.score_price,
            stock: item.stock,
            thumb: item.thumb,
            status: item.status
          })
          if (item.price === '' || item.stock === '') {
            flag = true
          }
        })
        if (flag) {
          this.$info({
            title: '提示',
            content: '商品SKU价格和库存不能为空'
          })
          return
        }
        this.getSkusLoading = true
        this.$api.emit('product.sku.batch_update', skus).then(() => {
          this.visible = false
        }).finally(() => {
          this.getSkusLoading = false
          this.fetchData()
        })
      },
      handleEditSkus(row) {
        this.current = JSON.parse(JSON.stringify(row))
        this.visible = true
        this.getSkusLoading = true
        this.$api.emit('product.sku.list', {
          product_id: row.id
        }).then(res => {
          console.log(res)
          res.data.list.forEach(item => {
            item.money_price = item.money_price / 100
          })
          this.skus = res.data.list
        }).finally(() => {
          this.getSkusLoading = false
        })
      },
      getProductCategory(arr) {
        const temp = []
        arr.forEach(item => {
          temp.push(item.title)
        })
        return temp.join('、')
      },
      onSearch(value) {
        console.log(value)
      },
      plusProducts() {
        this.$router.push({
          path: '/product/release'
        })
      },
      getCategoryList() {
        this.$http('/normal/categories', 'GET').then(res => {
          this.categoryList = res.data.list
        })

        this.$http('/ip/categories', 'GET').then(res => {
          this.ipList = res.data.list
        })
      },
      getImageTagList() {
        this.$http('/image-tags', 'GET').then(res => {
          this.imageTagList = res.data.list
        })
      },
      getBrandList() {
        this.brands = this.$api.emit('brand.list')
      },
      getShopList() {
        getShopList().then(res => {
          this.shops = res.data.list
        })
      },
      fetchData() {
        // this.fetchTotalData()
        this.$api.emit('product.list', {
          page: this.page,
          per_page: this.per_page,
          ...this.keys
        }).then(res => {
          res.data.list.forEach(item => {
            item.visible = false
          })
          this.list = res.data.list
          this.total = res.data.item_total
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

  .marked-tag {
    border-radius: 50px;
    border: 1px solid #666;
    font-size: 10px;
    padding: 1px 6px;
    color: #666;
    cursor: pointer;

    &.actived {
      background: #666;
      color: white;
    }
  }

  .sort-keys {
    display: flex;
    align-items: center;

    .tab-list {
      display: flex;
      margin-top: 6px;
      border-bottom: 1px solid #e1e1e1;
      margin-right: 50px;

      .item {
        margin-right: 30px;
        padding: 0px 10px 4px 10px;
        cursor: pointer;
        font-weight: 500;

        &.actived {
          color: #1890FF;
          border-bottom: 3px solid #1890FF;
        }

        &:hover {
          color: #1890FF;
        }
      }
    }

  }

  .content-wrap {
    background-color: #fff;

    .content-head {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .table {
      .product-info {
        .thumb {
          width: 80px;
          height: 80px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100%;
          margin-right: 0px;
          border-radius: 4px;
          position: relative;
          overflow: hidden;

          .tag-image {
           width: 36px;
           height: 36px;
           position: absolute;
           top: 0px;

           &.location-1 {
             right: 0px;
             top: 0px;
           }

           &.location-2 {
             left: 0px;
             top: 0px;
           }
          }
        }

        .title {
          font-weight: 500;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          margin-bottom: 4px;
        }

        .brand {
          color: rgba(0, 0, 0, 0.45);
          font-size: 13px;
          line-height: 22px;
        }

        .remark {
          color: rgba(0, 0, 0, 0.45);
          font-size: 13px;
          line-height: 22px;
          width: 200px;
          border: 1px solid red;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }


        .image-tag {
          color: rgba(0, 0, 0, 0.45);
          font-size: 13px;
          line-height: 22px;
        }

        .price-c {
          // color: #FA253B;
          // color: red;
          font-weight: 500;
        }
      }
    }
  }
</style>
