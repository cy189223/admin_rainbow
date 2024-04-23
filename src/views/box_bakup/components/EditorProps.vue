<template>
  <div class="editor-content">
    <a-form>
      <a-form-item
        label="所属IP"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-select v-model="form.category_ids" mode="multiple" placeholder="请选择" style="width:200px;">
          <a-select-option v-for="item in ips" :key="item.id" :value="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="标题"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.title" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="标签"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <div class="attr-item">
          <div class="attr-item-value">
            <Labels v-model="form.tags"></Labels>
          </div>
        </div>
      </a-form-item>
      <a-form-item
        label="封面图"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <UploadImages v-model="form.thumb" size="small"></UploadImages>
        <span  class="tips">500*500，长方形封面为 700*300</span>
      </a-form-item>

     <!-- <a-form-item
        label="天猫开盒次数商品ID"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.tmail_product_id" placeholder="不填则默认为 630211982338" style="width:300px;" />
      </a-form-item> -->

      <!-- <a-form-item
        label="封面图形状"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-radio-group name="radioGroup" v-model="form.display_mode">
          <a-radio :value="0">正方形</a-radio>
          <a-radio :value="1">长方形</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item
        label="大盒顶部图(扁平风)"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <UploadImages v-model="form.box_top_bg" size="small"></UploadImages>
        <span  class="tips">800*450 png （用于扁平风格时9宫格顶部的图片）</span>
      </a-form-item>
      <a-form-item
        label="小盒3D图片"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <UploadImages v-model="form.small_box_3d_image" size="small"></UploadImages>
        <span class="tips">600*900 png</span>
      </a-form-item>
      <!-- <a-form-item
        label="背景色"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <div class="color-picker">
          <colorPicker v-model="form.bg_color" />
        </div>
      </a-form-item> -->
      <a-form-item
        label="小盒未售出时图片"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <UploadImages v-model="form.small_box_thumb" size="small"></UploadImages>
        <span  class="tips">200*200</span>
      </a-form-item>
      <a-form-item
        label="售价(人民币)"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.money_price" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="售价(积分)"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.score_price" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="普通款款式数量"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-radio-group name="radioGroup" v-model="form.box_total" :disabled="disabled">
          <a-radio :value="6">6</a-radio>
          <a-radio :value="8">8</a-radio>
          <a-radio :value="9">9</a-radio>
          <a-radio :value="12">12</a-radio>
          <a-radio :value="16">16</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="是否预售"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <ISwitch v-model="form.is_presell" :active="1" :unactive="0"></ISwitch>
      </a-form-item>
      <a-form-item
        label="预售时间"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        v-if="form.is_presell"
      >
        <a-date-picker
          v-model="form.presell_date"
          format="YYYY-MM-DD HH:mm:ss"
          :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
        />
      </a-form-item>
      <a-form-item
        label="创建房间数"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model.number="form.room_total" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="商品预览图"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <UploadImages multiple v-model="form.detail_images" size="small"></UploadImages>
        <span class="tips">宽度1024以下，长图建议切成多张小图上传</span>
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
import UploadImages from '@/components/UploadImages/UploadImages'
import ISwitch from '@/components/ISwitch/ISwitch'
import moment from 'moment'
import { getIPList } from '@/api/ips'
import Labels from '@/components/Labels/Labels'
export default {
  name: 'EditorProps',
  components: {
    UploadImages,
    ISwitch,
    Labels
  },
  props: {
    form: {
      type: Object,
      default () {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ips: [],
      moment,
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }
  },
  created () {
    this.$http('/ip/categories').then(res => {
      this.ips = res.data.list
    })
  }
}
</script>
<style lang="less" scoped>
.editor-content {
  width: 650px;
}
.tips {
  color: #aaa;
}
.color-picker {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  padding: 5px;
  border: 1px solid #DCDFE6;
  width: 27px;
  height: 27px;
  /deep/ .m-colorPicker {
    display: block;
    .box.open {
      z-index: 10;
    }
  }
}
</style>
