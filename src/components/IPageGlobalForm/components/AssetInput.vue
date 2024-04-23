<template>
  <div class="container-scope" v-if="value">
    <div class="input-list">
      <div class="block">
        <div class="item">
          <ICheckbox v-model="form.is_score" />
          {{prefix}}
          <a-input class="input" size="small" v-model.number="form.score" /> 积分
        </div>
        <div class="item">
          <ICheckbox v-model="form.is_redpack" />
          {{prefix}}
          <IPrice class="input" size="small" v-model.number="form.redpack" /> 元红包
        </div>
      </div>
      <div class="block">
        <div class="item">
          <ICheckbox v-model="form.is_show_box_card" />
          {{prefix}}
          <a-input class="input" size="small" v-model.number="form.show_box_card" />
          张显示卡
        </div>
        <div class="item">
          <ICheckbox v-model="form.is_exclude_box_card" />
          {{prefix}}
          <a-input class="input" size="small" v-model.number="form.exclude_box_card" /> 张排除卡
        </div>
      </div>
      
      <div class="block">
        <div class="item">
          <ICheckbox v-model="form.is_level_score" />
          {{prefix}}
          <a-input class="input" size="small" v-model.number="form.level_score" /> 成长值
        </div>
        <!-- <div class="item">
          <ICheckbox v-model="form.is_coupon" />
          {{prefix}}
          <a-input class="input" size="small" v-model.number="form.coupon_id" /> 优惠券
        </div> -->
      </div>
     <!-- <div class="block">
        <div class="item">
          <ICheckbox v-model="form.is_show_box_card" />
          {{prefix}}
          <a-input class="input" size="small" v-model.number="form.show_box_card" />
          张显示卡
        </div>
        <div class="item">
          <ICheckbox v-model="form.is_exclude_box_card" />
          {{prefix}}
          <a-input class="input" size="small" v-model.number="form.exclude_box_card" /> 张排除卡
        </div>
      </div> -->
      <!-- <div class="block">
        <div class="item">
          <ICheckbox v-model="form.is_chip" />
          {{prefix}}
          <a-input class="input" size="small" v-model.number="form.chip_total" />
          个碎片<a-input class="input" size="small" v-model.number="form.chip_id" />
        </div>
      </div> -->
    </div>

    <div class="tips">提示:可同时勾选多个资产</div>
  </div>
</template>
<script>
  import ICheckbox from "@/components/IForm/components/ICheckbox.vue"
  import IPrice from "@/components/IForm/components/IPrice.vue"
  export default {
    components: {
      // ImageView
      ICheckbox,
      IPrice
    },
    props: {
      size: {
        default () {
          return 'default'
        }
      },
      prefix: {
        default () {
          return ''
        }
      },
      value: {
        type: Object
      },
      options: {
        type: Object
      }
    },
    data() {
      return {
        form: {}
      }
    },
    mounted() {},
    created() {
      this.form = this.value || {}
    },
    watch: {
      value(val) {
        // console.log('init val ====>',  val)
        this.form = val || {}
      },
      form(val) {
        // console.log('form val change ====>',  val)
        this.$emit('input', val)
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .input-list {
    // display: flex;
  }
  .input {
    width: 90px;
    margin: 0px 3px;
  }

  .block {
    overflow: hidden;
  }

  .tips {
    color: #aaa;
    font-size: 90%;
    margin-top: 10px;
    display: block;
  }

  .item {
    margin-bottom: 10px;
    min-width: 200px;
    float: left;
  }

</style>
