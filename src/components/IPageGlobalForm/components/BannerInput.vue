<template>
  <div class="container-scope">
    <div v-for="(item, index) in list" class="item">
      <div class="char-key">{{index + 1}}</div>
      <div class="body">
        <div class="item-content">
          <span class="key">图片: </span>
          <UploadImages :isShowTips="false" size="small" :imgStyle="{}" v-model="item.image"></UploadImages>

          <span class="key" style="margin-left: 30px;">标题: </span>
          <a-input style="width: 160px" placeholder="不输入则不显示" v-model="item.text"></a-input>
        </div>
        <div class="item-content" v-if="options.link !== false">
          <span class="key">链接: </span>
          <LinkType v-model="item.link"></LinkType>
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
  import UploadImages from '@/components/UploadImages/UploadImages'
  import LinkType from '@/components/LinkType/LinkType'
  export default {
    components: {
      UploadImages,
      LinkType
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
          image: '',
          text: '',
          link: {
            type: 'path'
          }
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
