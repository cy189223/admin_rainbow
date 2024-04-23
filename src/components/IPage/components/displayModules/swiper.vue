<template>
  <div class="swiper-wrap">
    <!-- {{module.style}} -->
    <Swiper class="swiper" :style="'height:' + (module.style.height || 300) / 2.5 + 'px; border-radius:' + module.style.radius / 2.5 + 'px'"
      autoplay @change="change" :options="swiperOptions">
      <SwiperSlide class="swiper-slider" v-for="item in list" :key="item.image">
        <img mode="aspectFill" :src="item.image" class="slide-image" :data-item="item" @tap="handleClick" />
      </SwiperSlide>
      <div class="swiper-pagination" slot="pagination"></div>
    </Swiper>
    <slot name="default"></slot>
    <!-- <div class="dots">
      <div class="dot-item" :class="{active:current===index}" v-for="(item,index) in list" :key="item"></div>
    </div> -->
  </div>
</template>

<script>
  // import 'swiper/dist/css/swiper.css'
  import 'swiper/swiper-bundle.css'
  import {
    Swiper,
    SwiperSlide
  } from 'vue-awesome-swiper'
  export default {
    name: "Banner",
    props: {
      module: {
        type: Object
      }
    },
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        current: 0
      }
    },
    computed: {
      list() {
        return this.module.list || []
      },
      swiperOptions() {
        return {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          direction: 'horizontal',
          autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
        }
        // Some Swiper option/callback...
      }
    },
    methods: {
      change(e) {
        this.current = e.detail.current
      },
      handleClick(e) {
        let item = e.currentTarget.dataset.item
        let link = item.link || {}
        this.$tool.toLink(link)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-wrap {
    width: 100%;
    height: 100%;
    // height: 300px;
    position: relative;
    overflow: hidden;

    .swiper {
      // height: 300px;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    left: 0;
    bottom: 30rpx;
    width: 100%;
    height: 8rpx;
    display: flex;
    justify-content: center;

    .dot-item {
      margin: 0 6rpx;
      width: 10rpx;
      height: 10rpx;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.6);
      transition: all 0.4s;

      &.active {
        border-radius: 6rpx;
        width: 26rpx;
        background-color: #FD9D11;
      }
    }
  }
</style>
