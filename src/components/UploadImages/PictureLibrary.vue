<template>
  <a-modal title="图片库" style="top: 100px;" :zIndex="100001" :visible="true" width="1200px" @cancel="handleCancel" @ok="handleCancel">
    <div class="image-c">
      <div class="left-tag-list">
        <li class="item" :class="{actived: currentTag == 0}" @click="currentTag=0">
          最近上传
        </li>
        <li :class="{actived: currentTag == tag.id}" @click="currentTag=tag.id" v-for="(tag, index) in tagList">
          {{tag.title}}
        </li>

        <div class="btn-c">
          <a-button class="btn" size="small" type="primary" @click="toImageTagList">管理分类</a-button>
        </div>
        <!-- <a-button class="btn" size="small" type="primary" @click="submit">添加分类</a-button> -->

      </div>

      <div>
        <!-- <UploadImages :showLibrary="false"></UploadImages> -->
        <div class="image-list">
          <SimpleUpload :tagId="currentTag" @uploadSuccess="uploadSuccess"></SimpleUpload>
          <div class="item" v-for="(item, index) in list" >
            <img :src="item.url  + '?x-oss-process=image/resize,w_400'" @click="selectImage(item)"></img>
          </div>
        </div>
      </div>

    </div>
  </a-modal>
</template>
<script>
  import SimpleUpload from './SimpleUpload'
  export default {
    components: {
      SimpleUpload
      // UploadImages,
    },
    props: {
    },
    data() {
      return {
        tagList: [
        ],
        currentTag: 0,
        list: [],
      }
    },
    watch: {
      currentTag () {
        this.initList()
      }
    },
    computed: {

    },
    created() {
      this.initCategoryList()
      this.initList()
    },
    methods: {
      uploadSuccess(urls) {
        // console.log(urls)
        urls.map(item => {
          this.list.unshift({
            url: item,
          })
        })
        // this.list = urls.concat(this.list)
      },
      selectImage(item) {
        this.$emit('select', [item.url])
      },
      initCategoryList() {
        this.$http.get(`/image/categories`).then(res => {
          this.tagList = res.data.list
        })
      },
      initList() {
        this.$http.get(`/image/history`, {
          params: {
            tag_id: this.currentTag
          }
        }).then(res => {
          this.list = res.data.list
        })
      },
      handleCancel() {
        this.$emit('refresh')
        this.$emit('close')
      },
      toImageTagList() {
        this.$router.push({
          path: '/image/history/tag'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .image-c {
    // padding-left: 200px;
    display: flex;
  }
  .left-tag-list {
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
    .btn-c {
      padding-top: 50px;
      text-align: center;
    }
  }

  .image-list {
    text-align: left;
    display: flex;
    flex-wrap: wrap;

    .item {
      cursor: pointer;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid rgba(0, 0, 0, 0);
      width: 80rpx;
      height: 80rpx;
      margin-right: 8px;
      margin-bottom: 10px;
      &:hover {
        border: 2px solid #1890FF;
      }

      img {
        height: 80px;
      }
    }
  }
</style>
