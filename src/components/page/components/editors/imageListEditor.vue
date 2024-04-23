<template>
  <div class="image-list-editor">
    <a-form class="form" ref="form" label-width="80px" @submit.native.prevent>
      <a-form-item label="上边距">
        <a-slider class="slider" v-model="data.style.margin_top"></a-slider>
      </a-form-item>
      <a-form-item label="左右边距">
        <a-slider class="slider" v-model="data.style.padding"></a-slider>
      </a-form-item>
      <a-form-item label="图片间隔">
        <a-slider class="slider" v-model="data.margin"></a-slider>
      </a-form-item>
      <a-form-item label="图片(可上传多张)">
        <div class="img">
          <UploadImages multiple v-model="data.images"></UploadImages>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import UploadImages from '@/components/UploadImages/UploadImages'
export default {
  name: 'ImageListEditor',
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
  },
  data () {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.slider {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
