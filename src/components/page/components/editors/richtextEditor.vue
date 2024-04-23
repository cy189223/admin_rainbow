<template>
  <div class="richtext-editor">
    <a-form class="form" ref="form" label-width="80px">
      <a-form-item label="上边距">
        <a-slider class="slider" v-model="data.style.margin_top"></a-slider>
      </a-form-item>
      <a-form-item label="左右边距">
        <a-slider class="slider" v-model="data.style.padding"></a-slider>
      </a-form-item>
    </a-form>
    <vue-editor
      id="editor"
      useCustomImageHandler
      @imageAdded="handleImageAdded"
      v-model="data.content"></vue-editor>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'RichtextEditor',
  components: {
    VueEditor
  },
  props: {
    data: {
      type: Object,
      default () {
        return {
          content: ''
        }
      }
    }
  },
  methods: {
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('image', file)
      this.$request({
        url: '/image',
        method: 'post',
        data: formData
      }, false)
        .then((result) => {
          const url = result.data.image.url
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.richtext-editor {
  /deep/ .quillWrapper .ql-snow.ql-toolbar button svg {
    width: 16px;
    height: 16px;
  }
  /deep/ .quillWrapper .ql-snow.ql-toolbar .ql-formats {
    margin-bottom: 6px;
    margin-right: 10px;
  }
  .slider {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
