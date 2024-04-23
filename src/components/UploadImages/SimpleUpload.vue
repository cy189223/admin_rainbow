<template>
  <a-upload multiple :action="uploadUrl" accept="image/*" :headers="headers" @change="handleChange" name="image"
    :showUploadList="false" :beforeUpload="beforeUpload" v-if="isShowPlus">
    <a-spin :spinning="loading">
      <a-button class="upload-btn-abc" type="dashed">
        <a-icon type="plus" />
      </a-button>
    </a-spin>
  </a-upload>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'

  export default {
    name: 'UploadImages',
    components: {
    },
    props: {
      multiple: {
        type: Boolean,
        default () {
          return false
        }
      },
      size: {
        type: String,
        default: 'normal'
      },
      tagId: {
        type: Number
      }
    },
    data() {
      return {
        current: 0,
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
      uploadUrl() {
        return `${this.baseUrl}/admin-api/image`
        // return `${process.env.VUE_APP_BASE_URL}/admin-api/image?tag_id=${this.tagId}`
      },
      isShowPlus() {
        return true
        // return this.type == 'array' || !this.images.length || (this.images[0].indexOf('http') !== 0)
      }
    },
    watch: {
      value: {
        handler(value) {
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
      viewAllPicture() {
        this.isPictureLibrary = true
      },
      useDefault() {
        if (typeof this.defaultVal == 'string')
          this.images = [this.defaultVal]
        else
          this.images = this.defaultVal

        this.updateValue()
      },
      viewImage(src) {
        var newwin = window.open()
        newwin.document.write("<img src=" + src + " />")
      },
      handleCropper(index) {
        this.current = index
        this.cropperVisible = true
      },
      deleteItem(index) {
        this.images.splice(index, 1)
        this.updateValue()
      },
      // uploadFiles (e) {
      //   console.log('file upload ===>', e)
      //   let files = e.target.files;

      //   for
      // },
      beforeUpload(file, fileList) {

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
        } else {
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
      updateValue() {
        this.$emit('input', this.type === 'string' ? this.images[0] || '' : this.images)
      },
      handleDelete(index) {
        this.images.splice(index, 1)
        this.updateValue()
      },
      handleChange({
        file,
        fileList
      }) {
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

          this.images.splice(this.images.indexOf(uuid), 1, url)
          if (this.type === 'string') {
            this.images = [url]
          } else {
            this.images.push(url)
          }
          this.updateValue()

          this.$emit('uploadSuccess', this.images)
        }
      },
      cropperFinish(e) {
        this.images[this.current] = e
      }
    }
  }
</script>
<style lang="scss" scoped>
    .upload-btn-abc {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        /deep/ i {
          font-size: 24px;
        }

        margin-right: 8px;
      }
</style>
