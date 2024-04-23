

<template>
  <div class="container-scope">
    <div v-for="(item, index) in list" class="item">
      <div class="char-key">{{index + 1}}</div>
      <div class="body">
        <div class="item-content">
          <span>商品件数>=</span>
          <a-input v-model.number="item.total" style="width: 100px; margin: 0px 10px;"></a-input>件时，运费为
          <IPrice v-model="item.carriage" style="width: 100px; margin: 0px 10px;"></IPrice>
          <!-- <LinkType v-model="item.link"></LinkType> -->
        </div>
        <div class="item-content">
          <a href="javascript:;" class="delete-text" @click="handleDelete(index)">删除</a>
          <a href="javascript:;" style="margin-left: 20px;" class="delete-text" @click="handleAdd(index)">添加</a>
        </div>
      </div>
    </div>
    <div v-if="!list || !list.length">
      <a-button size="small" type="primary" @click="handleAdd(0)">添加</a-button>
    </div>
  </div>
</template>
<script>
  import IPrice from './IPrice.vue'
  export default {
    components: {
      IPrice
      // ImageView
    },
    props: {
      size: {
        default () {
          return 'default'
        }
      },
      value: {
        type: Array,
        default () {
          return []
        }
      },
      options: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        list: []
      }
    },
    mounted() {},
    watch: {
      value(val) {
        this.list = val || []
      },
      list(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      handleDelete(index) {
        this.list.splice(index, 1)
      },
      handleAdd(index) {
        index = index + 1
        this.list.splice(index, 0, {
          total: '',
          carriage: 0
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-scope {
    width: 100%;
  }

  .list {}

  .item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 10px;
    margin-bottom: 10px;

    .char-key {
      margin-right: 10px;
      // padding: 10px;
      border-radius: 50%;
      border: 1px solid #e1e1e1;
      width: 40px;
      height: 40px;
      box-sizing: border-box;
      text-align: center;
      line-height: 40px;
      flex: 0 0 40px;
      background: #f1f1f1;
    }

    .body {
      // border: 1px solid red;
      flex-grow: 1;
    }

    .item-content {
      display: flex;
      align-items: center;
      // border: 1px solid red;
      margin-top: 10px;
      width: 100%;

      .key {
        flex: 0 0 40px;
      }

      .input {
        flex-grow: 1;
      }
    }
  }
</style>
