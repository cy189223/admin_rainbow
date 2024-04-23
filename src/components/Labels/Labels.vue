<template>
  <vuedraggable v-model="tags" class="labels" @end="updateValue">
    <div class="tag-item" v-for="(tag, index) in tags" :key="index">
      <input type="text" v-model="tags[index]" :style="`width:${inputWidth(tag)*6 + 5}px`" @blur="updateValue"/>
      <a-icon class="close" type="close" @click="handleClose(index)"></a-icon>
    </div>
    <a-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </a-input>
    <a-button v-else class="button-new-tag" @click="showInput" type="dashed">+ 添加</a-button>
  </vuedraggable>
</template>
<script>
import vuedraggable from 'vuedraggable'
export default {
  name: 'Labels',
  components: {
    vuedraggable
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  watch: {
    value: {
      handler (value) {
        if (value && value.length) {
          this.tags = JSON.parse(JSON.stringify(value))
        } else {
          this.tags = []
        }
      },
      immediate: true
    }
  },
  methods: {
    inputWidth (str) {
      if (!str) {
        return 4
      };
      let len = 0
      /* eslint-disable */
      for (let i = 0; i < str.length; i++) {
        const a = str.charAt(i)
        if (a.match(/[^\x00-\xff]/ig) != null) {
          // 汉字占两个字符
          len += 2
        } else if (a.match(/[a-z,0-9]/) != null) {
          len += 1.2
        } else if (a.match(/[A-Z]/) != null) {
          len += 1.6
        } else {
          len += 1
        }
      }
      
      /* eslint-enable */

      return len
    },
    handleClose (index) {
      this.tags.splice(index, 1)
      this.updateValue()
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''

      this.updateValue()
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.focus()
      })
    },
    updateValue () {
      this.$emit('input', this.tags)
    }
  }
}
</script>
<style lang="less" scoped>
.labels {
  display: flex;
  flex-wrap: wrap;
  .tag-item {
    margin-right: 8px;
    cursor: pointer;
    height: 32px;
    background-color: #ecf5ff;
    padding: 0 10px;
    border-radius: 3px;
    border: 1px solid #cae4ff;
    display: flex;
    align-items: center;
    input {
      background-color: transparent;
      border: 0;
      font-size: 12px;
      color: #409eff;
    }
    i {
      color: #409eff;
      cursor: pointer;
      font-size: 12px;
    }
  }
  .input-new-tag {
    width: 100px;
  }
}
</style>
