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

  const resourceType = 'preset_account'

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
        subType: 'preset_account'
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
          // {
          //   title: '禁止盲盒返售',
          //   key: 'is_ban_return_sale',
          //   type: 'boolean',
          //   default: 0,
          //   // span: 12,
          //   tips: '禁止返售功能后用户无法在小程序前端进行返售操作',
          //   newline: true,
          //   required: true,
          // },
          {
            title: '预留手机号',
            key: 'phone',
            tips: '预留手机号仅为了演示或配合提交App审核使用，可使用已存在用户的手机号',
            span: 12,
            newline: true
          },
          {
            title: '预留验证码',
            key: 'phone_code',
            tips: '6位数字',
            span: 6,
            newline: true
          }
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
