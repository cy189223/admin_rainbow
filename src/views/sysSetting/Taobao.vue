<template>
  <div class="container">
    <IForm :formFrame="frame" class="form-container" :formData.sync="form">
    </IForm>
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

  const resourceType = 'taobao'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        uuid: '',
        form: {
        },
        categoryList: []
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
            title: '设置说明',
            type: 'text',
            text: '此设置只适合适配有淘宝端小程序的用户使用'
          },
          {
            type: 'blank',
          },
          // {
          //   title: '应用Logo',
          //   key: 'logo',
          //   type: 'image',
          //   placeholder: '',
          //   // span: 12,
          //   isShowImageTips: false,
          //   tips: '显示在淘宝小程序的标题栏, 200*200',
          //   newline: true,
          //   // required: true,
          // },
          {
            title: '淘宝客服昵称',
            key: 'contact_name',
            // type: '',
            placeholder: '淘宝客服的昵称',
            span: 12,
            tips: '用户打开客服聊天界面时会显示此客服昵称',
            newline: true,
            // required: true,
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
