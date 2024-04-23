<template>
  <div id="page">
    <div class="page-content">
      <phone :data="data" :edit="edit" @modules-change="contentChange" @set-current="setCurrent" :current-index="index"></phone>
      <editor-content :current="current" @current-change="currentChange"></editor-content>
    </div>
  </div>
</template>
<script>
import phone from './components/phone'
import editorContent from './components/editorContent'
export default {
  name: 'Page',
  components: {
    phone,
    editorContent
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      index: '',
      current: {}
    }
  },
  methods: {
    contentChange (data) {
      this.$emit('update:data', data)
    },
    currentChange (current) {},
    setCurrent (index) {
      if (!this.edit) return false
      this.index = index
      if (index === '') {
        this.current = {}
      } else {
        this.current = this.data.modules[index]
      }
    }
  }
}
</script>
<style lang="less" scoped>
#page {
  padding: 10px 0;
  .page-content {
    display: flex;
    flex-wrap: wrap;
  }
  /deep/ .el-form-item {
    margin-bottom: 8px;
  }
  /deep/ .el-form {
    padding: 10px 0;
  }
}
</style>
