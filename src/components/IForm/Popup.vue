<template>
  <div class="loading">
    <a-modal
      :title="title"
      style="top: 100px;"
      :zIndex="1001"
      :visible.sync="visible"
      v-if="visible"
      width="800px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <IForm :formFrame="frame" :labelWidth="options.labelWidth" v-if="isParsed" :formData.sync="form"></IForm>
    </a-modal>
  </div>
</template>

<script>
import IForm from './IForm'

export default {
  name: 'Popup',
  components: {
    IForm
  },
  data () {
    return {
      options: {},
      title: '请填写',
      visible: false,
      frame: [],
      form: {
      },
      isParsed: false
    }
  },
  methods: {
    onChange(date, dateString) {
        console.log(date, dateString);
    },
    parseOptions(options) {
      let data = options.form || this.$initForm(options.frame)
      this.form = {}
      for (let key in data) {
        this.$set(this.form, key, data[key])
      }

      this.title = options.title || this.title
      this.frame = options.frame

      this.options = options
      this.isParsed = true
    },
    handleSubmit() {
      let flag = true
      let data = {}
      this.frame.forEach(item => {
        if ((item.type !== 'mix_price') && item.required && (this.form[item.key] === undefined || this.form[item.key] === null)) {
          this.$message.warning('请填写或选择:' + item.title)
          flag = false
        }
        if (item.type === 'date' && this.form[item.key]) {
          // this.form[item.key] = this.form[item.key].format('YYYY-MM-DD')
        }

        if (item.type === 'mix_price') {
          let keyPrefix = item.key_prefix || ''
          data[keyPrefix + 'money_price'] = this.form[keyPrefix + 'money_price']
          data[keyPrefix + 'score_price'] = this.form[keyPrefix + 'score_price']
        }else if(item.type == 'prize_interval'){
			let keyPrefix = item.key_prefix || ''
			data[keyPrefix + 'lottery_start_point'] = this.form[keyPrefix + 'lottery_start_point']
			data[keyPrefix + 'lottery_end_point'] = this.form[keyPrefix + 'lottery_end_point']
		}
        else {
          data[item.key] = this.form[item.key]
        }

      })

      if (!flag)
        return false;

      this.options && this.options.success(data)
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
