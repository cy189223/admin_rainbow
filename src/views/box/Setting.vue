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
  import Rule from "./Setting/Rule.vue"
  import Danmu from "./Setting/Danmu.vue"
  import Base from "./Setting/Base.vue"

  export default {
    components: {
      Rule,
      Danmu,
      Base
    },
    data() {
      return {
        current: 'Base',
        list: [
          {
            title: '基础设置',
            key: 'Base',
          },
          {
            title: '盲盒规则',
            key: 'Rule',
          },
          {
            title: '弹幕设置',
            key: 'Danmu',
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
    min-height: 80vh;
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
