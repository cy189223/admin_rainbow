<template>
  <div class="link-wrap">
    <a-spin :spinning="loadingLinkData">
      <a-select v-model="link.type" style="width: 110px" placeholder="链接类型" allowClear @change="handleChange">
        <a-select-option value="none">不链接</a-select-option>
        <a-select-option value="box">盲盒页</a-select-option>
        <a-select-option value="live">直播页</a-select-option>
        <a-select-option value="coupon">优惠券</a-select-option>
        <a-select-option value="product_list">商品列表页</a-select-option>
        <a-select-option value="category_list">分类列表页</a-select-option>
        <a-select-option value="xpath">系统页面</a-select-option>
        <a-select-option value="ipage">自定义页面</a-select-option>
        <a-select-option value="path">小程序路径</a-select-option>
        <a-select-option value="url">外部URL</a-select-option>
      </a-select>
      <template v-if="link.type==='box'">
        <a-select showSearch class="link-type" v-model="link.box" placeholder="选择盲盒" allowClear>
          <a-select-option :value="item.uuid" v-for="item in boxes" :key="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </template>
      <template v-if="link.type==='coupon'">
        <a-select showSearch class="link-type" v-model="link.coupon_uuid" placeholder="选择优惠券" allowClear>
          <a-select-option :value="item.uuid" v-for="item in couponList" :key="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </template>
      <template v-if="link.type==='ipage'">
        <a-select showSearch class="link-type" v-model="link.page_uuid" placeholder="选择已创建的页面" allowClear>
          <a-select-option :value="item.uuid" v-for="item in pageList" :key="item.uuid">{{ item.title }}</a-select-option>
        </a-select>
      </template>
      <template v-if="link.type==='category_list'">
        <a-select showSearch class="link-type" v-model="link.category_id" placeholder="选中分类" allowClear>
          <a-select-option :value="item.id" v-for="item in topCategoryList" :key="item.id">
            {{ item.title }}
          </a-select-option>˚
        </a-select>
      </template>
      <template v-if="link.type==='product_list'">
        <!-- <a-select-opt-group :key="item.id">
          <span slot="label">{{ item.title }}</span>
          <a-select-option :value="sub.id" v-for="sub in item.sub_categories" :key="sub.id">{{ sub.title }}</a-select-option>
        </a-select-opt-group> -->

        <a-select showSearch class="link-type" v-model="link.category_id" placeholder="指定分类" allowClear>
          <a-select-opt-group>
            <span slot="label">全部商品</span>
            <a-select-option value="">
             全部商品
            </a-select-option>
          </a-select-opt-group>
          <template v-for="group in allCategoryList">
            <a-select-opt-group :key="group.id">
              <span slot="label">{{ group.title }}</span>
              <a-select-option :value="item.id" v-for="item in group.sub_categories" :key="item.id">
                {{ item.title }}
              </a-select-option>
            </a-select-opt-group>
          </template>
        </a-select>

      </template>
      <template v-if="link.type==='live'">
        <a-select showSearch class="link-type" style="width:150px" v-model="link.live_room_id" placeholder="需先到直播管理端创建"
          allowClear>
          <a-select-option :value="item.roomid" v-for="item in liveList" :key="item.id">{{item.anchor_name}} - {{ item.name }}</a-select-option>
        </a-select>
        <a-button @click="getLiveList" style="margin-left: 4px;">刷新</a-button>
        <a href="https://live.weixin.qq.com" target="_blank">
          <a-button style="margin-left: 4px;" type="primary">新建</a-button>
        </a>
      </template>
      <template v-if="link.type==='xpath'">
        <a-select showSearch class="link-type" style="width:200px" v-model="link.path" placeholder="常用系统路径" allowClear>
          <a-select-option :value="item.path" v-for="item in systemPathList" :key="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </template>
      <!-- <template v-else-if="link.type==='product'">
        <a-select showSearch class="link-type" v-model="link.product" placeholder="选择商品" allowClear>
          <a-select-option :value="item.uuid" v-for="item in products" :key="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </template> -->
      <template v-else-if="link.type==='path'">
        <a-input placeholder="任意小程序内的路径" class="link-type" v-model="link.path"></a-input>
      </template>
      <template v-else-if="link.type==='url'">
        <a-input placeholder="仅限部分url有效" class="link-type" v-model="link.url"></a-input>
      </template>
    </a-spin>
  </div>
</template>
<script>
  import {
    getBoxList
  } from '@/api/box'
  import {
    getProductList
  } from '@/api/products'
  export default {
    name: 'LinkType',
    props: {
      link: {
        type: Object,
        default () {
          return {}
        }
      },
      value: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        boxes: [],
        products: [],
        liveList: [],
        loadingLinkData: false,
        systemPathList: [],
        productCategoryList: [],
        ipList: [],
        pageList: [],
        couponList: []
      }
    },
    watch: {
      link(val) {
        if (val instanceof Array)
          this.link = {}
        // if (val === [])
        //   this.link = {}
        this.$emit('input', this.link)
      },
      value(val) {
        if (val instanceof Array)
          val = {}

        this.link = val
      }
    },
    created() {
      this.getBoxList()
      this.getCouponList()
      this.getPageList()
      this.getLiveList()
      this.getAllCategoryList()
      this.getSystemPathList()
      // this.getProductList()

      if (this.value instanceof Array) {
        this.link = {}
      } else {
        this.link = this.value
      }
    },
    computed: {
      allCategoryList() {
        return [{
            title: '全部IP',
            sub_categories: this.ipList
          },
          ...this.productCategoryList
        ]
      },
      topCategoryList() {
        return [{
            title: '全部IP',
            id: 'ip',
          },
          ...this.productCategoryList
        ]
      }
    },
    mounted() {
      console.log('aaaaaa', this.link)
      if (this.link instanceof Array) {
        this.link = {}
      }
    },
    methods: {
      handleChange(e) {
        // if (e === 'box') {
        //   this.getBoxList()
        // }
        // if (e === 'product') {
        //   this.getProductList()
        // }
      },
      getPageList() {
        this.$http.get('/pages').then(res => {
          this.pageList = res.data.list
        })
      },
      getBoxList() {
        this.loadingLinkData = true
        getBoxList().then(res => {
          this.boxes = res.data.list
        }).finally(() => {
          this.loadingLinkData = false
        })
      },
      getCouponList() {
        this.$http.get('/coupons').then(res => {
          this.couponList = res.data.list
        })
      },
      getAllCategoryList() {
        this.loadingLinkData = true
        this.$http.get('/normal/categories').then(res => {
          this.productCategoryList = res.data.list
        })
        this.$http.get('/ip/categories').then(res => {
          this.ipList = res.data.list
        })
        // getBoxList().then(res => {
        //   this.boxes = res.data.list
        // }).finally(() => {
        //   this.loadingLinkData = false
        // })
      },
      // getProductList () {
      //   this.loadingLinkData = true
      //   getProductList().then(res => {
      //     this.products = res.data.list
      //   }).finally(() => {
      //     this.loadingLinkData = false
      //   })
      // },
      getLiveList() {
        this.$http.get('/miniapp/live-list').then(res => {
          this.liveList = res.data.list
        })
      },
      getSystemPathList() {
        this.$http.get('/paths').then(res => {
          this.systemPathList = res.data.list
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .link-wrap {
    display: flex;
  }

  .link-type {
    width: 250px;
    margin-left: 15px;
  }
</style>
