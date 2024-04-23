<template>
  <a-row class="form-item border">
    <div class="form-title">页面全局配置</div>
    <a-row :style="'width: ' + width" :class="{border: border}" class="form-item">
      <div class="form-title" v-if="title">{{title}}</div>

      <a-col class="input-item" span="8">
        <div class="input-title">页面标题:<span class="star">*</span></div>
        <div style="flex-grow: 1; padding-left: 10px;">
          <a-input v-model="page.title" placeholder="页面顶部标题栏文字"></a-input>
        </div>
      </a-col>
      <a-col class="input-item" span="8">
        <div class="input-title">标题栏颜色:</div>
        <div style="flex-grow: 1; padding-left: 10px;">
          <a-input v-model="page.nav_color" placeholder="如 #FFFFFF"></a-input>
        </div>
      </a-col>

      <div style="height: 1px; width: 1px;clear:both"></div>

      <a-col class="input-item" span="8">
        <div class="input-title">悬浮按钮:</div>
        <div style="flex-grow: 1; padding-left: 10px; display: flex; align-items: center; position: relative; top: 4px;">
          <i-switch :active="1" v-model="page.is_float_btn" style="" size="small"></i-switch>

          <a href="javascript:;" @click="handleEditFloatBtn()" style="margin-left: 10px;">编辑</a>
        </div>
      </a-col>

    </a-row>
  </a-row>
</template>
<script>
  import iSwitch from '@/components/ISwitch/ISwitch'

  export default {
    components: {
      iSwitch,
    },
    props: {
      page: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        isFloatBtn: 0,
        form: {
          float_btn: {
            is_animate: 0,
            link: {},
            image: ''
          }
        }
      }
    },
    mounted() {},
    watch: {
      'page.is_float_btn' (val) {
        this.is_float_btn
      }
    },
    computed: {
      floatBtnFrame () {
        return [
          {
            title: '悬浮按钮图片',
            key: 'image',
            type: 'image',
            isShowImageTips: false,
            tips: '300*300, 200K以内, 可以上传gif动态图片',
            newline: true,
            required: true,
          },
          {
            title: '点击链接',
            key: 'link',
            type: 'link',
            newline: true,
            required: true,
          },
          {
            title: '左右晃动动画',
            key: 'is_animate',
            type: 'boolean',
            tips: '开启后系统会自动给悬浮按钮增加左右晃动动画',
            newline: true,
            required: true,
          },
        ]
      }
    },
    methods: {
      handleEditFloatBtn () {
        this.$iForm.show({
          title: '编辑悬浮按钮',
          frame: this.floatBtnFrame,
          form: this.page.float_btn || {},
          success: (data) => {
            this.page.float_btn = data
            this.$iForm.hide()
          },
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rich-text-c {
    // margin-bottom: 100px;
  }

  .tips {
    color: #aaa;
    font-size: 90%;
    margin-top: 10px;
  }

  .form-item {
    padding: 20px 0px 0px 0px;
    position: relation;
    margin-bottom: 10px;
  }

  .border {
    border: 1px solid #e1e1e1;
  }

  .form-title {
    position: absolute;
    top: -10px;
    left: 10px;
    font-size: 110%;
    font-weight: 700;
    background: white;
    padding: 0px 10px;
  }

  .input-item {
    display: flex;
    margin-bottom: 16px;

    // border: 1px solid red;
    .select {
      width: 100%;
    }
  }

  .input-title {
    text-align: right;
    min-width: 100px;
    padding-right: 11px;
    position: relative;
    top: 5px;
    font-weight: 500;

    .star {
      color: red;
      position: absolute;
    }
  }

  .text-value {
    color: gray;
    position: relative;
    top: 5px;
    color: #aaa;
  }

  .input-title-empty-2 {
    width: 20px;
    height: 1px;
  }
</style>
