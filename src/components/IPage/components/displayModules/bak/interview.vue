<template>
  <div class="interview-wrap">
    <div class="title" v-if="data.title_left || data.title_right">
      <span class="left">{{data.title_left}}</span>
      <span>|</span>
      <span class="right">{{data.title_right}}</span>
    </div>
    <div class="interview" :class="{left:data.direction==='left'}">
      <div class="people" v-if="data.direction==='left'">
        <div class="thumb"><img :src="data.headimg" alt=""></div>
        <p class="name">{{data.name}}</p>
      </div>
      <div class="content">
        <template v-for="(item,index) in data.modules">
          <div class="text" v-if="item.type==='text'" v-html="item.text"></div>
          <div class="image" v-if="item.type==='image'">
            <img :src="item.image">
            <p v-html="item.description"></p>
          </div>
        </template>
      </div>
      <div class="people" v-if="data.direction==='right'">
        <div class="thumb"><img :src="data.headimg" alt=""></div>
        <p class="name">{{data.name}}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'interview',
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.interview-wrap {
  .title {
    padding: 20px 0;
    text-align: center;
    line-height: 24px;
  }
}
.interview {
  padding-bottom: 10px;
  display: flex;
  &.left .people{
    margin-right: 10px;
    margin-left: 0;
  }
  .people {
    width: 50px;
    margin-left: 10px;
    .thumb {
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-size: 14px;
      text-align: center;
      margin-top: 6px;
    }
  }
  .content {
    padding: 2px 0;
    box-sizing: border-box;
    flex: 1;
    font-size: 14px;
    line-height: 22px;
    text-align: justify;
    white-space: pre-wrap;
    .image {
      margin-top: 10px;
      p {
        font-size: 12px;
        color: #a0a0a0;
        line-height: 18px;
      }
    }
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
