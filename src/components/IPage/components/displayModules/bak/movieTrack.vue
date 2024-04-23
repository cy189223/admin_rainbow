<template>
  <div class="wrap">
    <!-- <div class="title">
      <span>{{data.title}}</span>
      <span class="el-icon-arrow-right"></span>
    </div> -->
  
    <div class="screening-list">

      <div class="screening-item" v-for="item in list" :key="item.id">
        <div class="thumb" :style="`background-image:url(${item.thumb})`"></div>
        <div class="info">
          <p class="meta">{{item.time}}</p>
          <h4>{{item.title}}</h4>
        </div>
      </div>

      <div class="screening-item" v-if="!data.list.length">
        <div class="thumb" :style="`background-color:#eeeeee`"></div>
        <div class="info">
          <p class="meta">时间</p>
          <h4>标题</h4>
        </div>
      </div>
    
    </div>
    <slot></slot>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'movieTrack',
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
          this.getMoviesByIds()
        } else {
          this.list = []
        }
      },
      immediate: true,
      deep: true
    }
  },
   methods: {
    getMoviesByIds () {
      request({
        url: '/movie/articles?type=movie_track',
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
.wrap .title {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
.screening-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .screening-item {
    width: 48%;
    margin-bottom: 8px;
    .thumb {
      width: 100%;
      padding-bottom: 60%;
      background-size: cover;
      background-position: center;
    }
    .info {
      h4 {
        // margin-top: 4px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .meta {
        margin-top: 4px;
        font-size: 12px;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
