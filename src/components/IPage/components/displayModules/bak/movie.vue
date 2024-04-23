<template>
  <div class="movie" :class="{scroll:data.col === 'scroll'}">
    <div class="movie-item" :class="{col3: data.col === 3}" v-for="item in list" :key="item.id">
      <div class="thumb" :style="`background-image:url(${item.thumb})`"></div>
      <div class="info">
        <h4>{{item.title}}</h4>
        <p class="meta">导演：{{changeToStr(item.directors)}}</p>
      </div>
    </div>
    <div class="movie-item" v-if="!data.list.length">
      <div class="thumb" :style="`background-color:#eeeeee`"></div>
      <div class="info">
        <h4>电影标题</h4>
        <p class="meta">导演：xxx</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'movie',
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
        url: '/movie',
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
.movie {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &.scroll {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    .movie-item {
      display: inline-block;
      width: 30%;
      margin-right: 2%;
      margin-bottom: 8px;
      .info {
        h4 {
          font-size: 13px;
          line-height: 18px;
        }
        .meta {
          line-height: 18px;
        }
      }
    }
  }
  .movie-item {
    width: 47%;
    margin-bottom: 8px;
    &.col3 {
      width: 32%;
      .info {
        h4 {
          font-size: 13px;
          line-height: 18px;
        }
        .meta {
          line-height: 18px;
        }
      }
    }
    .thumb {
      width: 100%;
      padding-bottom: 100%;
      background-size: cover;
      background-position: center;
    }
    .info {
      h4 {
        margin-top: 5px;
        text-align: center;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .meta {
        text-align: center;
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
