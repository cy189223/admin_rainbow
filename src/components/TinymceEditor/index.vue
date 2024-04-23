<template>
  <div class="tinymce-editor">
    <editor
      v-model="content"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
      placeholder="Bhanu Pratap welcomes you, please enter some text here...."
    >
    </editor>
  </div>
</template>
<script>
import { axios } from '@/utils/request'
import { mapGetters } from 'vuex'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/fullscreen' // 全屏编辑插件
import 'tinymce/plugins/codesample' // 代码块插件
import 'tinymce/plugins/link' // 代码块插件
export default {
  name: 'TinymceEditor',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default:
        'lists image link media table wordcount blockquote fullscreen codesample'
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo |  formatselect | link bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat fullscreen'
    }
  },
  data () {
    return {
      init: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        height: 400,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: 'file edit insert view format table',
        // ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          var formData = new FormData()
          formData.append('image', blobInfo.blob(), blobInfo.filename())
          axios(
            {
              url: this.uploadUrl,
              method: 'post',
              data: formData
            },
            false
          )
            .then(result => {
              const url = result.data.image.url
              success && success(url)
            })
            .catch(() => {
              failure && failure()
            })
        }
      },
      content: this.value
    }
  },
  computed: {
    ...mapGetters(['baseUrl']),
    uploadUrl () {
      return `${this.baseUrl}/admin-api/image`
    }
  },
  watch: {
    value (newValue) {
      this.content = newValue
    },
    content (newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    }
  }
}
</script>
<style lang="less">
.tinymce-editor {
  /deep/ img {
    width: 100%!important;
    height: auto;
  }
  // /deep/ .tox .tox-mbtn {
  //   height: 30px;
  // }
  // /deep/ .tox .tox-tbtn {
  //   height: 28px;
  // }
}
</style>
