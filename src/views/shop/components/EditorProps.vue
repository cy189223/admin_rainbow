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
        label="分类"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-select mode="multiple" v-model="form.category_ids" allowClear placeholder="请选择" style="width:300px;">
          <a-select-option :value="item.id" v-for="item in categories" :key="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="标签"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <div>
          <template v-for="(tag, index) in form.tags">
            <a-tag :key="index" closable :afterClose="() => handleClose(index)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input
            v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '100px' }"
            v-model="inputValue"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
            <a-icon type="plus" /> 添加
          </a-tag>
        </div>
      </a-form-item>
      <a-form-item
        label="评分"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.score" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="人均消费"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.avg_price" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="美食类型"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.cate_type" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="地址"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.display_address" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="经度"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.longitude" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="纬度"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input v-model="form.latitude" placeholder="请输入" style="width:300px;" />
      </a-form-item>
      <a-form-item
        label="封面图"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <UploadImages v-model="form.thumb" size="small"></UploadImages>
      </a-form-item>
      <a-form-item
        label="轮播图"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <UploadImages v-model="form.images" size="small"></UploadImages>
      </a-form-item>
      <a-form-item
        label="详情图"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <UploadImages v-model="form.detail_images" size="small"></UploadImages>
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
import { getCategoryList } from '@/api/categories'
import UploadImages from '@/components/UploadImages/UploadImages'
export default {
  name: 'EditorProps',
  components: {
    UploadImages
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
      categories: [],
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      },
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    getCategoryList({
      type: 'cate'
    }).then(res => {
      this.categories = res.data.list
    })
  },
  methods: {
    handleClose (index) {
      this.form.tags.splice(index, 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      const inputValue = this.inputValue
      const tags = this.form.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style lang="less" scoped>
.editor-content {
  width: 650px;
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
