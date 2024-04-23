<template>
  <div class="phone">
    <div class="head">
      <div class="camera"></div>
      <div class="Headset"></div>
    </div>
    <div class="phone-content" :native="false">
      <div class="module-c" :style="`padding:0 ${page.style.padding}px`">
        <template v-if="page.modules.length>0">
          <draggable class="draggable" v-model="page.modules" @end="dragEnd">
            <div class="item" v-for="(item,index) in page.modules" :style="item.style | parseOuterStyle" :key="item.type+index">
              <component v-if="downList.indexOf(item.type) > -1" class="component-item" :class="{active:index === currentIndex}" :is="item.type + 'Item'" :module="item"
                :style="item.style | parseStyle" @click.capture.native="currentChange(index, $event)">
                <toolBar class="outline tool-bar" @action="actionHandle"></toolBar>
              </component>
              <defaultItem v-else class="component-item" :class="{active:index === currentIndex}" :info="item" @click.capture.native="currentChange(index, $event)">
                <toolBar class="outline tool-bar" @action="actionHandle"></toolBar>
              </defaultItem>
            </div>
          </draggable>
        </template>
        <template v-else>
          <a-button class="add-module-btn" type="primary" size="small" @click="isShowAddModule=true">
            添加组件
          </a-button>
        </template>
      </div>
    </div>
    <div class="bottom">
      <div class="touch"></div>
    </div>
    <a-modal title="选择模块" :visible.sync="isShowAddModule" width="900px" @ok="isShowAddModule = false" @cancel="isShowAddModule = false">
      <div class="c-title">单项组件</div>
      <div class="module-list">
        <!-- <div class="item" @click="addItem('multiList')">
          <div class="icon"><img src="@/assets/module-icons/bt.png"></div>
          <p>分栏列表</p>
        </div> -->
        <div class="item" @click="addItem('searchBar')">
          <div class="icon"><img src="@/assets/module-icons/bt.png"></div>
          <p>搜索框</p>
        </div>
        <div class="item" @click="addItem('title')">
          <div class="icon"><img src="@/assets/module-icons/bt.png"></div>
          <p>标题栏</p>
        </div>
        <div class="item" @click="addItem('signin')">
          <div class="icon"><img src="@/assets/module-icons/swiper.png"></div>
          <p>签到卡</p>
        </div>
        <div class="item" @click="addItem('html')">
          <div class="icon"><img src="@/assets/module-icons/swiper.png"></div>
          <p>富文本</p>
        </div>
        <div class="item" @click="addItem('swiper')">
          <div class="icon"><img src="@/assets/module-icons/swiper.png"></div>
          <p>轮播图</p>
        </div>
        <div class="item" @click="addItem('images')">
          <div class="icon"><img src="@/assets/module-icons/images.png"></div>
          <p>多图组合</p>
        </div>
        <div class="item" @click="addItem('imageList')">
          <div class="icon"><img src="@/assets/module-icons/images.png"></div>
          <p>详情图切图</p>
        </div>
        <div class="item" @click="addItem('video')">
          <div class="icon"><img src="@/assets/module-icons/swiper.png"></div>
          <p>视频</p>
        </div>
      </div>

      <div class="c-title">列表组件</div>
      <div class="module-list">
        <!-- <div class="item" @click="addItem('boxes')">
          <div class="icon"><img src="@/assets/module-icons/splb.png"></div>
          <p>盲盒列表</p>
        </div> -->
        <div class="item" @click="addItem('products')">
          <div class="icon"><img src="@/assets/module-icons/splb.png"></div>
          <p>商品列表</p>
        </div>
        <div class="item" @click="addItem('activities')">
          <div class="icon"><img src="@/assets/module-icons/splb.png"></div>
          <p>活动列表</p>
        </div>
        <div class="item" @click="addItem('ips')">
          <div class="icon"><img src="@/assets/module-icons/splb.png"></div>
          <p>IP列表</p>
        </div>
        <!-- <div class="item" @click="addItem('categoryList')">
          <div class="icon"><img src="@/assets/module-icons/splb.png"></div>
          <p>分类列表</p>
        </div> -->
        <div class="item" @click="addItem('coupons')">
          <div class="icon"><img src="@/assets/module-icons/splb.png"></div>
          <p>优惠券列表</p>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  import imagesItem from './displayModules/images'
  import titleItem from './displayModules/title'
  import ipsItem from './displayModules/ips'
  import videoItem from './displayModules/video'
  import imageListItem from './displayModules/imageList'
  // import couponsItem from './displayModules/coupons'
  import signinItem from './displayModules/signin'
  import swiperItem from './displayModules/swiper'
  import htmlItem from './displayModules/html'
  import defaultItem from './displayModules/default'
  import toolBar from './ToolBar.vue'
  

  export default {
    name: 'phone',
    components: {
      draggable,
      imagesItem,
      imageListItem,
      defaultItem,
      titleItem,
      swiperItem,
      htmlItem,
      ipsItem,
      videoItem,
      // couponsItem,
      signinItem,
      toolBar
    },
    props: {
      value: {
        type: Object,
        default () {
          return {}
        }
      },
      // preview: {
      //   type: Number
      // },
      // tool: {
      //   type: Array
      // }
    },
    data() {
      return {
        isShowAddModule: false,
        currentUuid: "",
        currentIndex: 0,
        addLocation: 0,
        page: {
          style: {},
          modules: []
        },
        downList: [
          'title',
          'images',
          'ips',
          'swiper',
          'html',
          'imageList',
          'video',
          // 'categoryList'
          // 'searchBar'
          // 'signin'
        ]
      }
    },
    watch: {
      value(val) {
        this.page = val || this.page
      },
      page: {
        handler(val, oldval) {
          this.$emit('input', val)
        },
        deep: true
      },
      currentIndex (val) {
        this.$emit('currentChange', val)
      }
    },
    filters: {
      parseStyle (style) {
        return `margin-top: ${style.margin_top / 2.5}px; padding: 0 ${style.margin / 2.5}px;`
      },
      parseOuterStyle (style) {

      }
    },
    mounted() {
      this.page = this.value
    },
    computed: {},
    methods: {
      currentChange(index, event) {
        this.currentIndex = index
        // this.currentUuid = item.uuid
      },
      emitChange() {
        this.$emit('input', this.page)
      },
      actionHandle(type) {
        console.log('type ===>', type)
        switch (type) {
          case 'top': // 上方添加
            this.addLocation = 0
            this.isShowAddModule = true
            break
          case 'bottom': // 下方添加
            this.addLocation = 1
            this.isShowAddModule = true
            break
          case 'delete': // 删除
            this.deleteItem()
            break
        }
      },
      deleteItem() {
        this.page.modules.splice(this.currentIndex, 1)
      },
      addItem(type) {
        console.log(this.currentIndex, this.addLocation)
        let index = this.currentIndex + this.addLocation
        index = index < 0 ? 0 : index
        console.log('index after: ', index)

        this.page.modules.splice(index, 0, {
          type: type,
          uuid: this.$tool.randomStr(),
          style: {}
        })

        this.emitChange()

        this.currentIndex = index

        this.isShowAddModule = false
      },
      dragEnd(e) {
        console.log(e)
      }
    }
  }
</script>
<style lang="less" scoped>
  @height: 60px;
  @bg-color: #666666;

  .display-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .c-title {
    font-size: 120%;
    font-weight: 500;
    margin: 10px 0px;
  }

  .phone {
    width: 300px;
    border: 10px solid @bg-color;
    border-top: none;
    border-bottom: none;
    background-color: @bg-color;
    border-radius: 30px;
    overflow: hidden;
    height: 660px;

    .head {
      height: @height;
      .display-flex;

      .camera {
        padding: 3px;
        border-radius: 50%;
        background-color: #ffffff;
      }

      .Headset {
        height: 6px;
        width: 70px;
        background-color: #ffffff;
        border-radius: 3px;
        margin-left: 10px;
      }
    }

    .phone-content {
      min-height: 540px;
      background-color: #ffffff;
      box-sizing: border-box;
      overflow: hidden;
      height: 500px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
        font-weight: normal;
        padding-bottom: 12px;
      }

      &.scroller {
        height: 540px;
      }

      .component-item {
        position: relative;
        background-color: #ffffff;
        box-sizing: border-box;
        cursor: pointer;

        min-height: 50px;

        border: 2px dashed #e1e1e1;

        .tool-bar {
          display: none;
        }

        &:hover .outline {
          display: block;
        }

        &.active, &:hover {
          border: 2px dashed red;
        }
      }
    }

    .bottom {
      height: @height;
      .display-flex;

      .touch {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ffffff;
      }
    }
  }

  .add-module-btn {
    // margin-top: 100px;
    margin: 100px auto 0px auto;
    display: block;
  }

  .module-list {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 110px;
      margin-bottom: 15px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #dddddd;
      margin-right: 15px;

      &:hover {
        background-color: #F2F6FC;
      }

      .icon {
        width: 100px;
        height: 80px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 60px;
          height: auto;
        }
      }

      p {
        margin-bottom: 10px;
      }
    }
  }
</style>
