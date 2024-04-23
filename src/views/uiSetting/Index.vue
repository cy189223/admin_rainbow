<template>
  <div class="container-index">
    <ul class="left-list">
      <li :class="{actived: current == item.key}" @click="current=item.key" v-for="(item, index) in list">{{item.title}}</li>
    </ul>
    <component :is="current" class="right"></component>
  </div>
</template>

<script>
  // import AttrEditor from "./components/AttrEditor"
  import boxHome from "./BoxHome.vue"
  import shopHome from "./ShopHome.vue"
  import activityHome from "./ActivityHome.vue"
  import topicHome from "./TopicHome.vue"
  import boxRoom from "./BoxRoom.vue"
  import openBox from "./OpenBox.vue"
  import loginPage from "./LoginPage.vue"
  import ipList from "./IPList.vue"
  import shareRule from "./ShareRule.vue"
  import boxRule from "./BoxRule.vue"
  import eggLotteryRule from "./EggLotteryRule.vue"
  import vip from "./Vip.vue"
  import contactPage from "./ContactPage.vue"
  import userCenter from "./UserCenter.vue"

  export default {
    components: {
      boxHome,
      shopHome,
      activityHome,
      topicHome,
      boxRoom,
      openBox,
      loginPage,
      shareRule,
      boxRule,
      eggLotteryRule,
      vip,
      ipList,
      userCenter,
      contactPage
    },
    data() {
      return {
        current: 'boxHome',
        list: [{
            title: '首页',
            key: 'boxHome',
          },
          {
            title: '商城首页',
            key: 'shopHome'
          },
          {
            title: '活动区首页',
            key: 'activityHome'
          },
          {
            title: '论坛首页',
            key: 'topicHome'
          },
          {
            title: '9宫格房间页',
            key: 'boxRoom'
          },
          {
            title: '单盒小盒页',
            key: 'openBox'
          },
          {
            title: 'IP列表页',
            key: 'ipList'
          },
          {
            title: '登陆页',
            key: 'loginPage'
          },
          {
            title: '分销邀请页',
            key: 'shareRule'
          },
          // {
          //   title: '盲盒玩法规则',
          //   key: 'boxRule'
          // },
          // {
          //   title: '扭蛋机玩法规则',
          //   key: 'eggLotteryRule'
          // },
          {
            title: 'VIP开通页面',
            key: 'vip'
          },
          {
            title: '个人中心页',
            key: 'userCenter'
          },
          {
            title: '客服联系页',
            key: 'contactPage'
          },
        ]
      }
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .container-index {
    display: flex;

    .left-list {
      border-right: 1px solid #e1e1e1;
      width: 140px;
      flex: 0 0 140px;
      margin-right: 10px;
      padding-left: 0px;
      margin-left: -12px;

      li {
        list-style: none;
        border-bottom: 1px solid #e1e1e1;
        padding: 10px 10px;
        text-align: center;
        cursor: pointer;
        font-weight: 500;


        &.actived,
        &:hover {
          background: #1890FF;
          color: white;
        }
      }
    }


    .right {
      flex-grow: 1;
    }
  }
</style>
