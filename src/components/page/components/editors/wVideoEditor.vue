<template>
  <div class="vde-editor">
    <a-form class="form" ref="form" label-width="80px" @submit.native.prevent>
      <a-form-item label="上边距">
        <a-slider class="slider" v-model="data.style.margin_top"></a-slider>
      </a-form-item>
      <a-form-item label="左右边距">
        <a-slider class="slider" v-model="data.style.padding"></a-slider>
      </a-form-item>
      <a-form-item label="视频资源">
        <a-input v-model="data.url" size="small"></a-input>
      </a-form-item>
      <a-form-item label="是否竖屏">
        <a-radio-group v-model="data.vertical">
          <a-radio :label="true">是</a-radio>
          <a-radio :label="false">否</a-radio>
        </a-radio-group>
        <p class="tips">竖屏时默认全屏播放</p>
      </a-form-item>
      <a-form-item label="封面图片">
        <div class="img">
          <UploadImages :image.sync="data.img"></UploadImages>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import UploadImages from '@/components/UploadImages/UploadImages'
export default {
  name: 'WVideoEditor',
  components: {
    UploadImages
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.img {
  line-height: 0;
}
.slider {
  padding-left: 15px;
  padding-right: 15px;
}
.tips {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #E53935;
}
</style>
