<template>
  <div class="container-scope" :class="info.style.template">
    <div class="text-c">
      {{moduleName}}
      <div class="tips">此组件无法实时预览，请在小程序中查看效果</div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'defaultItem',
    props: {
      info: {
        type: Object
      }
    },
    computed: {
      style() {
        return this.info.style
      },
      moduleName() {
        let map = {
          'title': '标题',
          'images': '多图片',
          'swiper': '轮播图',
          'boxes': '盲盒列表',
          'activities': '活动列表',
          'products': '商品列表',
          'ips': 'IP列表',
          'signin': '签到卡',
          'coupons':  '优惠券列表',
          'searchBar': '搜索框',
          'multiList': '分栏列表',
          'categoryList': '分类列表'
        }
        return map[this.info.type] || '未定义模块'
      }
    }
  }
</script>
<style lang="less" scoped>
  .container-scope {
    position: relative;
    cursor: pointer;

    &:hover {
      // border: 2px dashed red;
    }

    .text-c {
      text-align: center;
      font-weight: 500;
      height: 100px;
      // line-height: 100px;
      padding-top: 20px;
      box-sizing: border-box;
    }

    .tips {
      color: #bbb;
      font-weight: 400;
      font-size: 80%;
      margin-top: 6px;
    }
  }
</style>
