<template>
  <div class="list">
    <div class="item-c">
      <div class="item" v-if="options.margin">
        <div class="key">左右边距:</div>
        <!-- <a-slider class="slider" v-model="style.margin" :min="0" :max="100" /> -->
        <a-input-number size="small" v-model="style.margin" :min="0" :max="500" />
      </div>
      <div class="item" v-if="options.margin_top">
        <div class="key">上边距:</div>
        <!-- <a-slider class="slider" v-model="style.margin_top" :min="0" :max="100" /> -->
        <a-input-number size="small" v-model="style.margin_top" :min="0" :max="1000" />
      </div>
    </div>
    <div  class="item-c">
      <div class="item" v-if="options.height">
        <div class="key">高度:</div>
        <!-- <a-slider class="slider" v-model="style.height" :min="0" :max="1000" /> -->
        <a-input-number size="small" v-model="style.height" :min="0" :max="1000" />
      </div>
      <div class="item" v-if="options.radius">
        <div class="key">圆角:</div>
        <!-- <a-slider class="slider" v-model="style.radius" :min="0" :max="100" /> -->
        <a-input-number size="small" v-model="style.radius" :min="0" :max="100" />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        style: {}
      };
    },
    props: {
      value: {
        type: Object | Array,
        default () {
          return {}
        }
      },
      options: {
        type: Object,
        default () {
          return {
            margin: true,
            margin_top: true,
            height: false,
            radius: false
          }
        }
      }
    },
    mounted() {},
    watch: {
      value(val) {
        if (val == false) {
          val = {}
        }
        this.style = val || {}
      },
      style(val) {
        if (val == false) {
          this.$emit('input', {})
        } else {
          this.$emit('input', this.style)
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .code-box-demo .ant-slider {
    margin-bottom: 16px;
  }

  .list {

    display: flex;
    flex-direction: column;

    .item-c {
      display: flex;

      margin-top: 4px;
    }

    .item {
      // border: 1px solid red;
      // float: left;
      display: flex;
      align-items: center;
      // width: 300px;
      flex: 0 0 160px;
      // margin-bottom: 10px;

      .key {
        font-weight: 500;
        margin-right: 6px;
        width: 70px;
        flex: 0 0 70px;
        text-align: right;
      }

      .slider {
        width: 100px;
        flex: 0 0 100px;
        margin-right: 20px;
      }
    }
  }
</style>
