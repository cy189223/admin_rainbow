<template>
  <div class="wrap">
    <div class="screening-list">

      <div class="screening-item" v-for="item in list" :key="item.id">
        <div class="thumb" :style="`background-image:url(${item.thumb})`"></div>
      </div>

      <div class="screening-item" v-if="!list.length">
        <div class="thumb"></div>
      </div>

    </div>
    <slot></slot>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'topic',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      list: []
    }
  },
  watch: {
    'data.list': {
      handler (value) {
        if (value && value.length) {
          this.getTopicByIds()
        } else {
          this.list = []
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getTopicByIds () {
      request({
        url: '/movie/topics',
        params: {
          ids: this.data.list
        }
      }).then(res => {
        this.list = res.data.list
      })
    },
    changeToStr (arr) {
      if (arr && arr.length) {
        return arr.join('/')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  height: 120px;
}
.screening-list {
  // white-space: nowrap;
  overflow: hidden;
  .screening-item {
    display: inline-block;
    margin-right: 15px;
    .thumb {
      width: 80px;
      height: 120px;
      background-color: #eee;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}
</style>
