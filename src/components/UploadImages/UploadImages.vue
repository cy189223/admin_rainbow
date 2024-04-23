<template>
  <div
    class="upload-wrap"
    :class="[size]"
  >
    <vuedraggable
      class="images"
      v-model="images"
      @end="updateValue"
    >
      <div
        class="uploaded-item"
        v-for="(item, index) in images"
        :key="item"
      >
        <img
          :src="item"
          :style="imgStyle"
          @click.stop="viewImage(item)"
          v-if="item.indexOf('http') === 0"
        >
        <template v-else>
          <a-spin :spinning="true">
            上传中
          </a-spin>
        </template>
      <!-- <embed :src="item" width="1000" height="500" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" /> -->
        <div
          class="action"
        >
          <!-- <a-icon class="action-item" type="scissor" @click="handleCropper(index)"></a-icon> -->
          <a-icon class="action-item delete-icon" type="delete" @click.stop="deleteItem(index)"></a-icon>
        </div>
      </div>

      <a-upload
        multiple
        :action="uploadUrl"
        accept="image/*"
        :headers="headers"
        @change="handleChange"
        name="image"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        v-if="isShowPlus"
      >
        <a-spin :spinning="loading">
          <a-button
            class="upload-btn"
            type="dashed"
          >
            <a-icon type="plus" />
          </a-button>
        </a-spin>
      </a-upload>

      <a href="javascript:;" class="library-btn" v-if="showLibrary" style="font-size: 80%;" @click="viewAllPicture()">图库</a>

    </vuedraggable>

    <!-- <a href="javascript:;" class="library-btn" v-if="showLibrary" style="font-size: 80%;" @click="viewAllPicture()">图库</a> -->

    <a href="javascript:;" style="font-size: 80%;" v-if="defaultVal"  @click="useDefault()">使用默认图</a>

    <PictureLibrary @close="isPictureLibrary = false" @select="selectImage" v-if="isPictureLibrary"></PictureLibrary>

    <Cropper
      :visible.sync="cropperVisible"
      :image="images[current]"
      @finish="cropperFinish"
    ></Cropper>
   <!-- <div class="limit-tips" v-if="tips || sizeLimit">
      <span style="margin-right: 10px;" v-if="sizeLimit">限制{{sizeLimit}}K</span> <span>{{tips || ''}}</span>
    </div> -->
    <!-- <div class="limit-tips" v-else-if="isShowTips">（单张图片建议控制在300K内，<a target="_blank" href="https://tinypng.com/">压缩图片</a>）</div> -->
  </div>
</template>
<script>
import vuedraggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Cropper from '@/components/Cropper/Cropper'
import PictureLibrary from './PictureLibrary.vue'

export default {
  name: 'UploadImages',
  components: {
    vuedraggable,
    Cropper,
    PictureLibrary
  },
  props: {
    isShowTips: {
      type: Boolean,
      default () {
        return true
      }
    },
    value: {
      type: [Array, String],
      default () {
        return ''
      }
    },
    tips: {
      default () {
        return ''
      }
    },
    sizeLimit: {
      type: Number,
      default () {
        return 0
      }
    },
    size: {
      type: String,
      default: 'normal'
    },
    imgStyle: {
      type: Object,
      default: () => {}
    },
    multiple: {
      type: Boolean,
      default () {
        return false
      }
    },
    defaultVal: {
      type: [String, Array, Boolean]
    },
    showLibrary: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      current: 0,
      cropperVisible: false,
      loading: false,
      type: 'string',
      images: [],
      isPictureLibrary: false,
      headers: {
        Authorization: this.$ls.get(ACCESS_TOKEN)
      }
    }
  },
  computed: {
    ...mapGetters(['baseUrl']),
    uploadUrl () {
      return `${this.baseUrl}/admin-api/image`
      // return `${process.env.VUE_APP_BASE_URL}/admin-api/image`
    },
    isShowPlus () {
      return this.type == 'array' || !this.images.length || (this.images[0].indexOf('http') !== 0)
    }
  },
  watch: {
    value: {
      handler (value) {
        if (typeof value !== 'array' && !this.multiple) {
          this.type = 'string'
          this.images = value ? [value] : []
        } else {
          this.type = 'array'
          this.images = value ? JSON.parse(JSON.stringify(value)) : []
        }
      },
      immediate: true
    }
  },
  methods: {
    selectImage(item) {
      this.images = item
      this.updateValue()
      this.isPictureLibrary = false
    },
    viewAllPicture () {
      this.isPictureLibrary = true
    },
    useDefault () {
      if (typeof this.defaultVal == 'string')
        this.images = [this.defaultVal]
      else
        this.images = this.defaultVal

      this.updateValue()
    },
    viewImage (src) {
      var newwin=window.open()
      newwin.document.write("<img src="+ src +" />")
    },
    handleCropper (index) {
      this.current = index
      this.cropperVisible = true
    },
    deleteItem (index) {
      this.images.splice(index, 1)
      this.updateValue()
    },
    // uploadFiles (e) {
    //   console.log('file upload ===>', e)
    //   let files = e.target.files;

    //   for
    // },
    beforeUpload (file, fileList) {

      if (this.sizeLimit) {
        if (file.size > this.sizeLimit * 1000) {
          this.$message.error('此处限制' + this.sizeLimit + 'K')
          return false
        }
      }

      if (file.type === 'image/gif') {
        // 大于1.5M直接拒绝
        if (file.size > 1500000) {
          this.$message.error('gif动态图不能超出1.5M')
          return false
        }
      }
      else {
        // 大于1.5M直接拒绝
        if (file.size > 600000) {
          this.$message.error('非gif图片请控制在600K内，gif动态图片不能超出1.5M')
          return false
        }
      }

      let url = file.uid
      if (this.type === 'string') {
        this.images = [url]
      } else {
        this.images.push(url)
      }

      this.loading = true

      return true
    },
    updateValue () {
      this.$emit('input', this.type === 'string' ? this.images[0] || '' : this.images)
    },
    handleDelete (index) {
      this.images.splice(index, 1)
      this.updateValue()
    },
    handleChange ({ file, fileList }) {
      // console.log(file)
      if (file.response) {
        this.loading = false

        if (file.response.status_code === 500) {
          this.loading = false
          this.$message.error('图片上传失败，请检查大小后重新上传')
          this.updateValue()
          return false
        }

        this.loading = false
        const url = file.response.data.image.url
        const uuid = file.uid

        this.images.splice( this.images.indexOf(uuid), 1,  url)
        // if (this.type === 'string') {
        //   this.images = [url]
        // } else {
        //   this.images.push(url)
        // }
        this.updateValue()
      }
    },
    cropperFinish (e) {
      this.images[this.current] = e
    }
  }
}
</script>
<style lang="scss" scoped>
  .limit-tips {
    color: #ABABAB;
    font-size: 90%;
    display: flex;
  }

  .library-btn {
    // float: right;
    margin-left: 10px;
    margin-top: 50px;
  }

  .upload-wrap {
    .images {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      .uploaded-item {
        padding: 3px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        background-color: #fff;
        margin-right: 8px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        img {
          width: auto;
          height: 60px;
          cursor: pointer;
        }
        &:hover .action {
          opacity: 1;
        }
        .action {
          position: absolute;
          // width: 100%;
          // height: 100%;

          width: 20px;
          height: 20px;
          right: 0px;
          top: 0px;
          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
          transition: all 0.4s;
          .action-item {
            margin: 0 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
          }
          &:hover {
            background: red;
          }
        }
      }
      .upload-btn {
        width: 66px;
        height: 66px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        /deep/ i {
          font-size: 24px;
        }
      }
    }
    &.small {
       .images .upload-btn {
        width: 60px;
        height: 60px;
      }
      .images .uploaded-item .action .action-item {
        font-size: 16px;
      }
    }
  }
</style>
