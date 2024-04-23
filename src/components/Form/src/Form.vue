<template>
  <div class="loading">
    <a-modal
      :title="title"
      style="top: 100px;"
      :visible.sync="visible"
      width="600px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form class="form">
        <a-form-item
          :label="item.title"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          v-for="item in items"
        >
          <a-select v-model="form[item.key]" placeholder="请选择" v-if="item.type === 'select'">
            <a-select-option :value="option.id" v-for="option in item.options" :key="option.id">{{ option.title || option.name }}</a-select-option>
          </a-select>
          <a-textarea  style="width:100%" v-model="form[item.key]" v-else-if="item.type === 'text'">
          </a-textarea>
          <a-input  style="width:100%" :placeholder="item.placeholder || '请填写'" v-model="form[item.key]" v-else-if="item.type === 'string'">
          </a-input>
          <a-date-picker format="YYYY-MM-DD" v-model="form[item.key]" @change="onChange" v-else-if="item.type === 'date'" placeholder="请选择日期" />
          <a-input  style="width:100%" v-model.number="form[item.key]" v-else-if="item.type === 'number'">
          </a-input>
          <UploadImages :defaultVal="item.default" v-model="form[item.key]" v-else-if="item.type === 'images' || item.type === 'image'"></UploadImages>
          <UploadVideo v-model="form[item.key]" v-else-if="item.type === 'videos' || item.type === 'video'"></UploadVideo>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
// import UploadVideo from '@/components/UploadVideo/UploadVideo'
import moment from 'moment'

export default {
  name: 'Form',
  components: {
    // UploadVideo
  },
  data () {
    return {
      options: {},
      title: '请填写',
      items: [],
      visible: false,
      form: {
      },
      images: [],
    }
  },
  methods: {
    onChange(date, dateString) {
        console.log(date, dateString);
    },
    parseOptions(options) {
      this.title = options.title || this.title
      this.items = options.items || []

      let obj= {}
      this.items.forEach(item => {
        if (item.default) {
          if (item.type === 'date')
            obj[item.key] = moment(item.default, 'YYYY-MM-DD')
          else
            obj[item.key] = item.default
        }
        else if (item.type === 'images' || item.type === 'videos')
          obj[item.key] = []
        else
          obj[item.key] = ''
      })

      this.form = obj

      this.options = options
    },
    handleSubmit() {
      let flag = true
      this.items.forEach(item => {
        if (item.required && !this.form[item.key]) {
          this.$message.warning('请填写或选择:' + item.title)
          flag = false
        }
        if (item.type === 'date' && this.form[item.key]) {
          this.form[item.key] = this.form[item.key].format('YYYY-MM-DD')
        }
      })

      if (!flag)
        return false;

      this.options && this.options.success(this.form)
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
<style>
.loading {
    width: 120px;
    height: 120px;
    position: fixed;
    top: 32%;
    left: 50%;
    margin-left: -60px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    z-index: 10000;
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.loading svg {
  margin: 0 auto;
}

.loading p {
  text-align: center;
  line-height: 30px;
  color: #eeeeee;
}
</style>
