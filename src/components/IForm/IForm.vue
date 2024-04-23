<template>
  <a-row :style="'width: ' + width" :class="{border: border}" class="form-item">
    <div class="form-title" v-if="title">{{title}}</div>
    <template v-for="(item, index) in formFrame" v-if="isInit">
      <div style="height: 1px; width: 1px;clear:both" v-if="item.newline"></div>
      <a-col class="input-item" :span="item.span || 18" v-if="calcIf(item)">
        <div class="input-title" :style="{width: labelWidth, flex: '0 0 ' + labelWidth}" v-if="item.title">{{item.title}}:<span
            v-if="item.required" class="star">*</span></div>
        <div class="input-title-empty-2" v-else></div>

        <div style="flex-grow: 1; padding-left: 10px;">
          <span v-if="item.prefix" style="margin-left:0px; margin-right: 6px;">{{item.prefix}}</span>
          <!-- {{item.options}} -->
          <a-input :disabled="item.disabled" v-model="formData[item.key]" :style="'width:' + item.input_width" :placeholder="item.placeholder || '请输入'" :size="size"
            v-if="!item.type || item.type === 'input'"></a-input>
          <a-input :disabled="item.disabled" v-model="formData[item.key]" type="password" :style="'width:' + item.input_width" :placeholder="item.placeholder || '请输入'" :size="size"
              v-if="item.type === 'password'"></a-input>
<!--          <a href="javascript:;"  @click="item.callback" v-if="item.type === 'button'">{{item.text}}</a> -->
          <a-input-number style="width: 180px;" :placeholder="item.placeholder || '请输入整数'" :disabled="item.disabled" v-model.number="formData[item.key]" :size="size" v-else-if="item.type === 'number'"></a-input-number>
          <a-input style="width: 80px;" :disabled="item.disabled" type="color" v-model="formData[item.key]" :size="size" v-else-if="item.type === 'color'"></a-input>
          <iDatePicker :showTime="item.showTime === false ? false : true" v-model="formData[item.key]" :size="size" v-else-if="item.type === 'date'"></iDatePicker>
          <i-switch :disabled="item.disabled" :active="item.active || 1" v-model="formData[item.key]" :size="size"
            v-else-if="item.type === 'boolean'"></i-switch>
          <a-textarea :placeholder="item.placeholder || '请输入'" rows="4"  v-model="formData[item.key]" :size="size" v-else-if="item.type === 'textarea'"></a-textarea>
          <a-select allowClear class="select" v-model="formData[item.key]" :size="size" v-else-if="item.type === 'select'">
            <!-- <a-select-option value="">请选择</a-select-option> -->
            <a-select-option :value="option.value || option" v-for="option in item.options">{{option.title || option}}</a-select-option>
          </a-select>
          <a-select allowClear class="select" mode="multiple" v-model="formData[item.key]" :size="size" v-else-if="item.type === 'multi_select'">
            <!-- <a-select-option value="">请选择</a-select-option> -->
            <a-select-option :value="option.value || option" v-for="option in item.options">{{option.title || option}}</a-select-option>
          </a-select>
          <a-select allowClear class="select" v-model="formData[item.key]" :size="size" v-else-if="item.type === 'year'">
            <a-select-option :value="option" v-for="option in years">{{option}}</a-select-option>
          </a-select>
          <UploadImages :defaultVal="item.default" :size="size" :sizeLimit="item.sizeLimit" :isShowTips="item.isShowImageTips" :imgStyle="item.style" :multiple="true" v-model="formData[item.key]"
            v-else-if="item.type === 'images'"></UploadImages>
          <UploadImages :defaultVal="item.default" :size="size" :sizeLimit="item.sizeLimit" :isShowTips="item.isShowImageTips" :imgStyle="item.style" v-model="formData[item.key]"
            v-else-if="item.type === 'image'"></UploadImages>

          <UploadFile :size="size" :acceptType="item.acceptType" :imgStyle="item.style" v-model="formData[item.key]"
            v-else-if="item.type === 'file'"></UploadFile>
          <!-- <ITable :meta="item" :disabled="disabled" :columns="item.columns" v-model="formData[item.key]" v-else-if="item.type === 'table'"></ITable> -->
          <!-- <ImageView :images="formData[item.key]" v-else-if="item.type === 'image_view'"></ImageView> -->
          <a-checkbox-group v-model="formData[item.key]" :defaultValue="formData[item.key]" v-else-if="item.type === 'multi_check'">
            <div style="padding: 6px 0px;">
              <a-checkbox v-for="option in item.options" :value="option.value || option">{{option.title || option}}</a-checkbox>
            </div>
          </a-checkbox-group>
          <i-price :disabled="item.disabled" v-model="formData[item.key]" :size="size" v-else-if="item.type === 'price'"></i-price>
          <mix-price :disabled="item.disabled" :initScore="formData[(item.key_prefix || '') + 'score_price']" :initMoney="formData[(item.key_prefix || '') + 'money_price']" @moneyChange="changeMixMoneyPrice($event, item)" @scoreChange="changeMixScorePrice($event, item)" :size="size" v-else-if="item.type === 'mix_price'"></mix-price>
			<prize-interval :disabled="item.disabled" :initStart="formData[(item.key_prefix || '') + 'lottery_start_point']" :initEnd="formData[(item.key_prefix || '') + 'lottery_end_point']" @startChange="changeStartPoint($event, item)" @endChange="changeEndPoint($event, item)" :size="size" v-else-if="item.type === 'prize_interval'"></prize-interval>
          <RichText class="rich-text-c" v-model="formData[item.key]" v-else-if="item.type === 'html'"></RichText>
          <ArrayInput v-model="formData[item.key]" :options="item.options" v-else-if="item.type === 'array_input'"></ArrayInput>
          <Labels v-model="formData[item.key]" :options="item.options" v-else-if="item.type === 'tags'"></Labels>
          <BannerInput v-model="formData[item.key]" :options="item.options" v-else-if="item.type === 'banner_input'"></BannerInput>
          <!-- <SelectProduct v-model="formData[item.key]" :options="item.options" v-else-if="item.type === 'product_id'"></SelectProduct> -->
          <LinkType v-model="formData[item.key]" :options="item.options" v-else-if="item.type === 'link'"></LinkType>
          <a-radio-group style="margin-top: 4px;" :defaultValue="formData[item.key]" v-model="formData[item.key]" v-else-if="item.type === 'radio'" :disabled="item.disabled">
            <a-radio :value="option.value" v-for="option in item.options">{{option.title}}</a-radio>
          </a-radio-group>
          <a-cascader v-model="formData[item.key]" style="width: 100%;" :options="cityData" :fieldNames="fieldNames" :placeholder="item.placeholder" v-else-if="item.type === 'address'" allowClear />
          <a-slider :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'slider'" />
          <StyleInput :options="item.options" :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'style_input'" />
          <BoxListInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'box_list_input' || item.type === 'box_ids'" ></BoxListInput>
          <ProductInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'product_id'" ></ProductInput>
          <UserInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'user_id'" ></UserInput>
          <ProductListInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'product_list_input' || item.type === 'product_ids'" ></ProductListInput>
          <ActivityListInput :disabled="item.disabled" :activityType="item.activity_type" v-model="formData[item.key]" v-else-if="item.type === 'activity_list_input' || item.type === 'activity_ids'" ></ActivityListInput>
          <ActivityInput :disabled="item.disabled" :activityType="item.activity_type" v-model="formData[item.key]" v-else-if="item.type === 'activity_id'" ></ActivityInput>
          <VipSkuListInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'vip_sku_ids'" />
          <CouponInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'coupon_id'"></CouponInput>
          <ChipInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'chip_id'"></ChipInput>
          <UserGroupInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'user_group_id'"></UserGroupInput>
          <CouponListInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'coupon_ids'"></CouponListInput>
          <CarriageInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'carriage_input'"></CarriageInput>
          <MultiList :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'multi_list'"></MultiList>
          <MultiOpenDiscount :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'multi_open_discount'"></MultiOpenDiscount>
          <InviteRuleInput :disabled="item.disabled" v-model="formData[item.key]" v-else-if="item.type === 'invite_rule_input'"></InviteRuleInput>
          <span v-if="item.suffix" style="margin-left:6px;">{{item.suffix}}</span>

          <assetInput v-model="formData[item.key]" v-if="item.type === 'assets'"></assetInput>

          <div style="height: 16px;" v-else-if="item.type === 'blank'"></div>
          <div v-if="item.type === 'text'" class="text-value" v-html="item.text"></div>

          <div v-if="item.tips" class="tips" v-html="tipsDisplay(item)"></div>

        </div>

      </a-col>
    </template>
  </a-row>
</template>
<script>
  import cityData from '@/utils/data.city'

  // import ImageView from '@/components/ImageView/ImageView'
  import UploadFile from '@/components/UploadFile'
  import moment from 'moment'
  import IPrice from './components/IPrice'
  import MixPrice from './components/MixPrice'
	import PrizeInterval from './components/PrizeInterval'
  import RichText from '@/components/RichText'
  import iSwitch from '@/components/ISwitch/ISwitch'
  import ArrayInput from './components/ArrayInput'
  import BannerInput from './components/BannerInput'
  import UploadImages from '@/components/UploadImages/UploadImages'
  import IDatePicker from "@/components/IDatePicker/IDatePicker.vue"
  import Labels from '@/components/Labels/Labels'
  import SelectProduct from '@/components/SelectProduct/SelectProduct'
  import LinkType from "@/components/LinkType/LinkType"
  import StyleInput from "@/components/IForm/components/StyleInput.vue"
  import BoxListInput from "./components/BoxListInput.vue"
  import ProductListInput from "./components/ProductListInput.vue"
  import ProductInput from "./components/ProductInput.vue"
  import UserInput from "./components/UserInput.vue"
  import ActivityListInput from "./components/ActivityListInput.vue"
  import ActivityInput from "./components/ActivityInput.vue"
  import VipSkuListInput from "./components/VipSkuListInput.vue"
  import CouponInput from "./components/CouponInput.vue"
  import ChipInput from "./components/ChipInput.vue"
  import UserGroupInput from "./components/UserGroupInput.vue"
  import CouponListInput from "./components/CouponListInput.vue"

  import CarriageInput from "./components/CarriageInput.vue"

  import AssetInput from "./components/AssetInput.vue"
  import MultiList from './components/MultiList.vue'

  import MultiOpenDiscount from './components/MultiOpenDiscount.vue'

  import InviteRuleInput from './components/InviteRuleInput.vue'

  export default {
    components: {
      IPrice,
      MixPrice,
			PrizeInterval,
      RichText,
      UploadFile,
      iSwitch,
      ArrayInput,
      BannerInput,
      UploadImages,
      IDatePicker,
      Labels,
      SelectProduct,
      LinkType,
      StyleInput,
      BoxListInput,
      ProductListInput,
      ProductInput,
      ActivityListInput,
      ActivityInput,
      VipSkuListInput,
      CouponInput,
      ChipInput,
      UserGroupInput,
      CouponListInput,
      AssetInput,
      UserInput,
      CarriageInput,
      MultiList,
      MultiOpenDiscount,
      InviteRuleInput
    },
    props: {
      size: {
        default () {
          return 'default'
        }
      },
      formFrame: {
        type: Array
      },
      border: {
        type: Boolean,
        default () {
          return true
        }
      },
      formData: {
        type: Object
      },
      width: {
        type: String,
        default () {
          // return '800px'
        }
      },
      labelWidth: {
        type: String,
        default () {
          return '150px'
        }
      },
      title: {
        type: String,
        default () {
          return ''
        }
      },
      disabled: {
        type: Boolean,
        default () {
          return false
        }
      },
      uuid: {
        type: String,
        default () {
          return ''
        }
      }
    },
    data() {
      return {
        cityData,
        years: [],
        fieldNames: {
          label: 'text',
          value: 'text',
          children: 'children'
        },
        isInit: false,
        productAutoFillFields: null,
      }
    },
    created() {
      let start = 2025
      for (var i = 0; i <= 20; i++) {
        this.years.push(start - i + '')
      }
      // console.log('form item mounted')
      this.initForm()
    },
    filters: {

    },
    watch: {
      formFrame() {
        this.initForm()
      },
      'formData.product_id' (val) {
        this.productAutoFill(val)
      },
      'formData.node_id' (val) {
        this.productAutoFill(val)
      },
      uuid() {
        this.initForm()
      }
    },
    methods: {
      tipsDisplay (item) {
        let tips = item.tips
        if (item.sizeLimit) {
          tips = '限制' + item.sizeLimit + 'K &nbsp&nbsp' + tips
        }
        return tips
      },
      productAutoFill (val) {
        if (val && this.productAutoFillFields) {

          this.$http.get(`/shop/products/${val}`).then(res => {
            let info = res.data.info
            for (let key in this.productAutoFillFields) {
              let value = this.productAutoFillFields[key]
              this.$set(this.formData, value, info[key])
            }
          })
          // console.log('fields ==>', this.productAutoFillFields)
        }
      },
      changeMixMoneyPrice (moneyPrice, item) {
        let key = (item.key_prefix || '') + 'money_price'
        this.$set(this.formData, key, moneyPrice)
        // this.formData[]
      },
      changeMixScorePrice (scorePrice, item) {
        let key = (item.key_prefix || '') + 'score_price'
        this.$set(this.formData, key, scorePrice)
      },
	  changeStartPoint(startPoint, item) {
	    let key = (item.key_prefix || '') + 'lottery_start_point'
	    this.$set(this.formData, key, startPoint || 0)
	  },
	  changeEndPoint(endPoint, item) {
	    let key = (item.key_prefix || '') + 'lottery_end_point'
	    this.$set(this.formData, key, endPoint || 0)
	  },
      initForm () {
				console.log(this.formFrame)
        // console.log('form change    ====>', this.formFrame)
        for (var i = this.formFrame.length - 1; i >= 0; i--) {
          if (this.formFrame[i].type === 'product_id' && this.formFrame[i].auto_fill_fields) {
            this.productAutoFillFields = this.formFrame[i].auto_fill_fields
          }

          let key = this.formFrame[i].key

          // 设置默认值
          let defaultVal = this.formFrame[i].default
          if (defaultVal  && (this.formData[key] === undefined)) {
            this.$set(this.formData, key, defaultVal)
          }

        }
        // console.log('stringify ====>', JSON.parse(JSON.stringify(this.formData)))

        this.isInit = true
      },
      calcIf(item) {
        if (!item.where)
          return true

        if (typeof item.where == 'object') {
          let targetVal = ''
          let formVal = ''
          for (let key in item.where) {
            targetVal = item.where[key]
            formVal = this.formData[key]

            // 数组也是Object
            if (typeof targetVal == 'object') {
              if (targetVal.indexOf(formVal) < 0) {
                return false
              }
            }
            else if (targetVal !== formVal) {
              return false
            }
          }

          return true
        }
        else if (typeof item.where[0] == 'string')
          return this.formData[item.where[0]] === item.where[1]
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
    padding: 20px 0px 20px 0px;
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
