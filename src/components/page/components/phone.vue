<template>
  <div id="phone" :style="`background:${data.style.background || '#ffffff'}`">
    <div class="phone-bar">
      <pageSetting>
      </pageSetting>
    </div>
    <div class="phone-content">
      <div class="page-content" :style="data.style">
        <vue-draggable class="draggable" v-model="data.modules" v-if="data && data.modules">
          <component
            class="component-item"
            :class="{active:currentIndex===index}"
            v-for="(item,index) in data.modules"
            :key="index"
            :is="item.type"
            :data="item"
            :style="`padding:0 ${item.style.padding}px;margin-top:${item.style.margin_top}px`">
            <outline v-if="edit" class="outline" @delete-handle="deleteHandle(index)" @click.native.self="setCurrent(index)"></outline>
          </component>
        </vue-draggable>
      </div>
    </div>
    <div class="models" v-if="edit">
      <div class="title">基础组件</div>
      <div class="models-content">
        <div class="model-item" @click="clickHanle('imageList')">图片</div>
        <div class="model-item" @click="clickHanle('richtext')">富文本</div>
        <div class="model-item" @click="clickHanle('wVideo')">视频</div>
      </div>
    </div>
  </div>
</template>
<script>
import pageSetting from './models/pageSetting'
import outline from './outline'
import pageData from '../pageData.js'
import vueDraggable from 'vuedraggable'
import richtext from './models/richtext'
import imageList from './models/imageList'
import wVideo from './models/wVideo'

export default {
  name: 'Phone',
  components: {
    vueDraggable,
    pageSetting,
    outline,
    richtext,
    wVideo,
    imageList
  },
  props: {
    data: {
      type: Object,
      default () {
        return {
          style: {},
          modules: []
        }
      }
    },
    edit: {
      type: Boolean
    },
    currentIndex: {
      type: [Number, String, Object],
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      temp: {}
    }
  },
  watch: {
    data: {
      handler (value) {
        this.temp = JSON.parse(JSON.stringify(value))
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setCurrent (index) {
      this.$emit('set-current', index)
    },
    clickHanle (type) {
      this.temp.modules.push(JSON.parse(JSON.stringify(pageData[type])))
      this.$emit('modules-change', this.temp)
    },
    deleteHandle (index) {
      this.temp.modules.splice(index, 1)
      this.$emit('modules-change', this.temp)
      if (index === this.currentIndex) {
        this.setCurrent('')
      }
    }
  }
}
</script>
<style lang="less" scoped>
#phone {
  width: 320px;
  border: 1px solid #dddddd;
  overflow: hidden;
  .phone-content {
    width: 340px;
    height: 500px;
    padding-bottom: 40px;
    overflow-y: scroll;
    overflow-x: hidden;
    .component-item {
      position: relative;
      .outline {
        display: none;
      }
      &.active .outline {
        display: block;
      }
      &:hover .outline {
        display: block;
      }
    }
    .page-content {
      width: 318px;
    }
  }
  .models {
    padding: 10px 10px;
    border-top: 1px solid #dddddd;
    font-size: 12px;
    .title {
      height: 36px;
      line-height: 36px;
    }
    .models-content {
      display: flex;
      flex-wrap: wrap;
      .model-item {
        width: 90px;
        height: 28px;
        border: 1px dashed #e5e5e5;
        text-align: center;
        line-height: 28px;
        margin-right: 10px;
        margin-bottom: 8px;
        background-color: #f6f6f6;
        color: #666;
        cursor: pointer;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:hover {
          background-color: #eeeeee;
        }
      }
    }
  }
}
</style>
