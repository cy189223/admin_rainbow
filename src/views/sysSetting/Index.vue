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
	import rankListSetting from "./rankListSetting.vue"
  import Order from "./Order.vue"
	import Notice from "./Notice.vue"
  import PresetAccount from "./PresetAccount.vue"
  import PayEnable from "./PayEnable.vue"
  import Popup from "./Popup.vue"
  // import Danmu from "./Danmu.vue"
  // import Box from "./Box.vue"
  import Register from "./Register.vue"
  import Signin from "./Signin.vue"
  import Share from "./Share.vue"
  import Taobao from "./Taobao.vue"
  import Carriage from "./Carriage.vue"
  import UserStatement from "./UserStatement.vue"
  import AppVersion from "./AppVersion.vue"
  // import loginPage from "./LoginPage.vue"
  // import ipList from "./IPList.vue"
  // import shareRule from "./ShareRule.vue"
  // import boxRule from "./BoxRule.vue"
  // import eggLotteryRule from "./EggLotteryRule.vue"
  // import vip from "./Vip.vue"
  // import userCenter from "./UserCenter.vue"

  export default {
    components: {
			rankListSetting,
			Notice,
      Order,
      PresetAccount,
      Popup,
      // Danmu,
      // Box,
      Register,
      Signin,
      Share,
      Taobao,
      PayEnable,
      Carriage,
      UserStatement,
      AppVersion,
      // loginPage,
      // shareRule,
      // boxRule,
      // eggLotteryRule,
      // vip,
      // ipList,
      // userCenter
    },
    data() {
      return {
        current: 'Notice',
        list: [
					{
					  title: '首页公告',
					  key: 'Notice',
					},
					{
					  title: '排行榜设置',
					  key: 'rankListSetting',
					},
          {
            title: '订单设置',
            key: 'Order',
          },
          {
            title: '运费设置',
            key: 'Carriage',
          },
          {
            title: '支付开关',
            key: 'PayEnable',
          },
          {
            title: '系统预留帐号',
            key: 'PresetAccount',
          },
          // {
          //   title: '盲盒设置',
          //   key: 'Box'
          // },
          {
            title: '注册与登陆',
            key: 'Register'
          },
          {
            title: '签到设置',
            key: 'Signin'
          },
          {
            title: '分享设置',
            key: 'Share'
          },
          {
            title: '首页弹窗设置',
            key: 'Popup'
          },
          {
            title: '用户使用协议',
            key: 'UserStatement'
          },
          {
            title: 'App版本管理',
            key: 'AppVersion'
          },
          // {
          //   title: '弹幕设置',
          //   key: 'Danmu'
          // },
          // {
          //   title: '淘宝端设置',
          //   key: 'Taobao'
          // }
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
