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
          style="width:100%"
          src="@/assets/file.png"
        />
        <div
          class="action"
        >
          <a-icon class="action-item" type="play-circle" @click="$open(item)"></a-icon>
          <a-icon class="action-item" type="delete" @click="deleteItem(index)"></a-icon>
        </div>
      </div>
      <a-upload
        multiple
        :action="uploadUrl"
        :accept="acceptType"
        :headers="headers"
        @change="handleChange"
        name="file"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        v-if="type==='array' || !images[0]"
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
    </vuedraggable>

  </div>
</template>
<script>
import vuedraggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'UploadFile',
  components: {
    vuedraggable,
  },
  props: {
    acceptType: {
      type: String,
      default: '*'
    },
    value: {
      type: [Array, String],
      default () {
        return ''
      }
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  data () {
    return {
      isPlayVideo: false,
      videoUrl: '',
      current: 0,
      cropperVisible: false,
      loading: false,
      type: 'string',
      images: [],
      headers: {
        Authorization: this.$ls.get(ACCESS_TOKEN)
      }
    }
  },
  computed: {
    ...mapGetters(['baseUrl']),
    uploadUrl () {
      // return `${this.baseUrl}/admin-api/image`
      return `${process.env.VUE_APP_BASE_URL}/admin-api/file`
    }
  },
  watch: {
    value: {
      handler (value) {
        if (typeof value === 'string' || !value) {
          this.type = 'string'
          this.images = value ? [value] : []
        } else {
          this.type = 'array'
          this.images = JSON.parse(JSON.stringify(value))
        }
      },
      immediate: true
    }
  },
  methods: {
    playVideo (src) {
      this.isPlayVideo = true
      this.videoUrl = src
      this.$nextTick(() => {
        this.$refs.video.play()
      })
    },
    handleCropper (index) {
      this.current = index
      this.cropperVisible = true
    },
    deleteItem (index) {
      this.images.splice(index, 1)
      this.updateValue()
    },
    beforeUpload () {
      this.loading = true
      this.$loading.show('上传中')
      this.$message.info('文件上传耗时将比较长，10M文件约1分钟时长，请稍候')
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
        this.$loading.hide()
        const url = file.response.data.file.url
        if (this.type === 'string') {
          this.images = [url]
        } else {
          this.images.push(url)
        }
        this.updateValue()
      }
    },
    cropperFinish (e) {
      this.images[this.current] = e
    }
  }
}
</script>
<style lang="less" scoped>
.upload-wrap {
  .images {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .uploaded-item {
      width: 86px;
      height: 86px;
      padding: 6px;
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
        width: 100%;
        height: 100%;
      }
      &:hover .action {
        opacity: 1;
      }
      .action {
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.4s;
        .action-item {
          margin: 0 6px;
          cursor: pointer;
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
    .upload-btn {
      width: 86px;
      height: 86px;
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
    .images .uploaded-item, .images .upload-btn {
      width: 60px;
      height: 60px;
    }
    .images .uploaded-item .action .action-item {
      font-size: 16px;
    }
  }
}
</style>
