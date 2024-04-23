<template>
  <div class="editor-content box-card" v-show="current.type">
    <component :is="current.type" :data="current"></component>
  </div>
</template>
<script>
import richtext from './editors/richtextEditor'
import imageList from './editors/imageListEditor'
import banner from './editors/bannerEditor'
import wVideo from './editors/wVideoEditor'
export default {
  name: 'EditorContent',
  components: {
    richtext,
    banner,
    wVideo,
    imageList
  },
  props: {
    current: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.editor-content {
  margin-left: 10px;
  width: 600px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #f0f0f0;
}
</style>
