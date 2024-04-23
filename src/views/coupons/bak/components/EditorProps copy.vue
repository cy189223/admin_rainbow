<template>
  <div class="editor-content">
    <a-form>
      <a-form-item
        label="标题"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.title" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="发行数量"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.total" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="使用的商品范围"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-radio-group name="radioGroup" v-model="form.usable_range_type" @change="change">
          <a-radio :value="0">全场通用</a-radio>
          <a-radio :value="1">指定盲盒</a-radio>
          <a-radio :value="2">指定商品</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="指定盲盒"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        v-if="form.usable_range_type===0"
      >
        <a-select mode="multiple" placeholder="请选择" v-model="form.usable_ids">
          <a-select-option v-for="item in boxes" :key="item.uuid" :value="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="指定商品"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        v-if="form.usable_range_type===1"
      >
        <a-select mode="multiple" placeholder="请选择" v-model="form.usable_ids">
          <a-select-option v-for="item in products" :key="item.uuid" :value="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="抵扣现金金额"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.discount_money" placeholder="请输入" style="width:300px;" />
      </a-form-item>

      <a-form-item
        label="最低可用金额"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input
          v-model="form.minimum_money"
          placeholder="不填写则不限制"
        />
      </a-form-item>

      <a-form-item
        v-if="form.time_limit_type === 0"
        label="固定有效期"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-range-picker
          :showTime="{
            hideDisabledOptions: true,
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
          }"
          :vlaue="[form.usable_start_at, form.usable_end_at]"
          format="YYYY-MM-DD HH:mm:ss"
          :defaultValue="[moment(form.usable_start_at), moment(form.usable_end_at)]"
          @change="dateChange"
        />
      </a-form-item>
      <a-form-item
        label="兑换码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.code" placeholder="不填则自动生成6位长度兑换码" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label=""
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row>
          <a-col :offset="labelCol.span + 2"><slot name="footer"></slot></a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import moment from 'moment'
import { getBoxList } from '@/api/box'
import { getProductList } from '@/api/products'
export default {
  name: 'EditorProps',
  props: {
    form: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      moment,
      boxes: [],
      products: [],
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }
  },
  created () {
    getBoxList().then(res => {
      this.boxes = res.data.list
    })
    getProductList().then(res => {
      this.products = res.data.list
    })
  },
  methods: {
    dateChange (e) {
      console.log(e)
      this.form.usable_start_at = e[0] ? e[0].format('YYYY-MM-DD HH:mm:ss') : ''
      this.form.usable_end_at = e[0] ? e[1].format('YYYY-MM-DD HH:mm:ss') : ''
    },
    change () {
      this.form.usable_ids = undefined
    }
  }
}
</script>
<style lang="less" scoped>
.editor-content {
  width: 650px;
}
</style>
