<template>
  <div class="banner-editor">
    <a-form class="form" ref="form" label-width="80px" @submit.native.prevent>
      <a-form-item label="上边距" v-bind="formItemLayout">
        <a-slider class="slider" v-model="data.style.margin_top"></a-slider>
      </a-form-item>
      <a-form-item label="左右边距" v-bind="formItemLayout">
        <a-slider class="slider" v-model="data.style.padding"></a-slider>
      </a-form-item>
      <a-form-item label="标题" v-bind="formItemLayout">
        <a-input v-model="data.title" size="small"></a-input>
      </a-form-item>
      <a-form-item label="图片" v-bind="formItemLayout">
        <div class="img">
          <upload-img :image.sync="data.img"></upload-img>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  name: 'BannerEditor',
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
.img {
  line-height: 0;
}
.slider {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
