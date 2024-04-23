<template>
  <transition name="fade-in">
    <div
      class="content-wrap"
      v-show="visible"
    >
      <!-- <transition name="el-fade-in-linear"> -->
      <img
        v-if="loaded"
        :src="src"
        :style="style"
      >
      <!-- </transition> -->
      <div
        class="close el-icon-close"
        @click="handleClick"
      ></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Preview',
  data () {
    return {
      src: '',
      visible: false,
      win: {
        width: 0,
        height: 0
      },
      style: {},
      loaded: false
    }
  },
  created () {
    this.win = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  },
  methods: {
    handleClick () {
      this.loaded = false
      this.visible = false
    },
    preview (src) {
      this.loadImg(src)
      this.src = src
      this.visible = true
    },
    loadImg (src) {
      const oImage = new Image()
      oImage.src = src
      oImage.onload = e => {
        this.loaded = true

        const width = oImage.width
        const height = oImage.height
        if (width < this.win.width && height < this.win.height) {
          this.style = {
            width: width + 'px',
            height: height + 'px'
          }
          return
        }

        if (width / height > this.win.width / this.win.height) {
          this.style = {
            width: this.win.width + 'px',
            height: 'auto'
          }
        } else {
          this.style = {
            width: 'auto',
            height: this.win.height + 'px'
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.3s;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.content-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .close {
    width: 70px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    background-color: #f56c6c;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
