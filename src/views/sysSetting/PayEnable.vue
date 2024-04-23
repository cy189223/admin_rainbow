<template>
  <div class="container">

    <!-- <div style="margin-bottom: 20px;">
      <a-radio-group v-model="subType" buttonStyle="solid" style="margin-right: 20px;">
        <a-radio-button value="return_sale">返售设置</a-radio-button>
        <a-radio-button value="box">盲盒房间(大盒)弹幕</a-radio-button>
        <a-radio-button value="small_box">盲盒开盒(小盒)页弹幕</a-radio-button>
      </a-radio-group>
    </div> -->


    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
    <div slot="action">
      <!-- <a-button class="btn" @click="cancel">取消</a-button> -->
      <a-button class="btn" type="primary" @click="submit">保存</a-button>
    </div>
    <!-- <AttrEditor :form.sync="form">
			<div slot="action">
				<a-button class="btn" @click="cancel">取消</a-button>
				<a-button class="btn" type="primary" @click="submit">提交</a-button>
			</div>
		</AttrEditor> -->

  </div>
</template>

<script>
  // import AttrEditor from "./components/AttrEditor"
  import IForm from "@/components/IForm"

  const resourceType = 'pay_enable'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        uuid: '',
        form: {
          banner: []
        },
        categoryList: [],
        subType: 'return_sale'
      }
    },
    computed: {
      categoryOptions() {
        return this.categoryList.map(item => {
          return {
            title: item.title,
            value: item.id
          }
        })
      },
      frame() {
        return [
          {
            title: '允许创建商城订单',
            key: 'is_shop_enabled',
            type: 'boolean',
            default: 0,
            // span: 12,
            tips: '开启后才可正常创建商城订单',
            newline: true,
            required: true,
          },
          {
            title: '无法下单提示语',
            key: 'shop_tips',
            span: 12,
            placeholder: '默认为“系统维护中”',
            newline: true,
            required: true,
            tips: '商城无法下单时提示用户'
          },
          {
            type: 'blank'
          },
          {
            title: '允许创建福袋订单',
            key: 'is_fudai_enabled',
            type: 'boolean',
            default: 0,
            span: 12,
            tips: '开启后才可正常创建福袋订单',
            newline: true,
            // required: true,
          },
          {
            title: '无法下单提示语',
            key: 'fudai_tips',
            type: 'input',
            placeholder: '默认为“系统维护中”',
            span: 12,
            newline: true,
            required: true,
            tips: '福袋无法下单时提示用户'
          },
          {
            type: 'blank'
          },
          {
            title: '允许创建一番赏订单',
            key: 'is_yifanshang_enabled',
            type: 'boolean',
            default: 0,
            span: 12,
            tips: '开启后才可正常创建一番赏订单',
            newline: true,
            // required: true,
          },
          {
            title: '无法下单提示语',
            key: 'yifanshang_tips',
            type: 'input',
            placeholder: '默认为“系统维护中”',
            span: 12,
            newline: true,
            required: true,
            tips: '一番赏无法下单时提示用户'
          },
        ]
      }
    },
    created() {
      this.$http.get(`/setting/sys/${resourceType}`).then(res => {
        this.form = res.data.setting || {}
        this.$set(this.form, 'return_type', this.form.return_type || 'money')
        // this.form.return_type = this.form.return_type || 'money'
      })
    },
    mounted() {},
    watch: {},
    methods: {
      cancel() {
        this.$router.back(-1)
      },
      submit() {
        this.$http.post(`/setting/sys/${resourceType}`, {
          setting: this.form
        }).then(res => {
          this.$message.success('保存成功')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-container {
    padding-bottom: 120px;
  }

  .container {
    .btn {
      margin-right: 30px;
    }
  }
</style>
