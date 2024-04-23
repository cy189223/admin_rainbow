<template>
  <div
    class="cropper-wrapper"
    v-if="visible"
    @click="handleHide"
  >
    <div class="content" @click.stop>
      <i
        class="colse-btn el-icon-close"
        @click="handleHide"
      ></i>
      <h2 class="title">裁剪图片</h2>
      <div class="cropper-container">
        <vue-cropper
          ref="cropper"
          :img="image"
          :fixedBox="option.fixedBox"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :centerBox="option.centerBox"
          :fixed="option.fixed"
          :full="option.full"
          :infoTrue="option.infoTrue"
          :outputType="option.outputType"
          :outputSize="option.outputSize">
        </vue-cropper>
      </div>
      <div class="bottom">
        <a-button @click="handleHide" style="margin-right:10px">取消</a-button>
        <a-button type="primary" @click="finish" :loading="loading">确认裁剪</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
import { axios } from '@/utils/request'
export default {
  name: 'Cropper',
  components: {
    VueCropper
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      option: {
        fixedBox: false,
        autoCrop: true,
        autoCropWidth: 400,
        autoCropHeight: 400,
        centerBox: true,
        fixed: false,
        full: true,
        infoTrue: true,
        outputType: 'png',
        outputSize: 0.9
      }
    }
  },
  methods: {
    finish () {
      this.$refs.cropper.getCropBlob(res => {
        this.loading = true
        var formdata1 = new FormData()
        formdata1.append('image', res, res.name)
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios({
          url: '/image',
          method: 'post',
          data: formdata1,
          config
        }).then(res => {
          this.$emit('finish', res.data.image.url)
          this.handleHide()
        }).finally(() => {
          this.loading = false
        })
      })
    },
    handleHide () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="less" scoped>
.cropper-wrapper {
  padding-bottom: 30px;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1100;
  background-color: rgba(0, 0, 0, 0.6);
  .content {
    margin: 0 auto;
    margin-top: 10%;
    width: 1000px;
    height: 60%;
    background-color: #ffffff;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    .colse-btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
      color: #555555;
    }
    h2.title {
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 17px;
      color: #444444;
      letter-spacing: 3px;
      border-bottom: 1px solid #f0f0f0;
      background-color: #ffffff;
      box-sizing: border-box;
    }
    .cropper-container {
      position: absolute;
      width: 100%;
      top: 50px;
      bottom: 70px;
      left: 0;
    }
    .bottom {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 70px;
      line-height: 70px;
      padding: 0 25px;
      text-align: right;
    }
  }
}
</style>
