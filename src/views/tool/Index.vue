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
  import Qrcode from "./Qrcode.vue"

  export default {
    components: {
      Qrcode
    },
    data() {
      return {
        current: 'Qrcode',
        list: [{
            title: '小程序码',
            key: 'Qrcode',
          }
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
