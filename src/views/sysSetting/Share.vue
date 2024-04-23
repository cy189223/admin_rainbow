<template>
  <div class="container">
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

  const resourceType = 'share'

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
            title: '默认转发标题',
            key: 'share_title',
            type: 'input',
            tips: '无商品标题时显示此标题, 可使用"{name}"替换转发时的用户名',
            newline: true,
            required: true,
          },
          {
            title: '默认转发图片',
            key: 'share_image',
            type: 'image',
            tips: '无商品图片时显示此图片，680*540',
            newline: true,
            required: true,
          },
          {
              type: 'blank',
          },
          {
            title: '安卓安装地址',
            key: 'android_app_url',
            type: 'input',
            tips: '安卓用户打开分享出去的App时跳转的地址',
            newline: true,
            // required: true
          },
          {
            title: 'IOS安装地址',
            key: 'ios_app_url',
            type: 'input',
            tips: 'iOS用户打开分享出去的App时跳转的地址',
            newline: true,
            // required: true
          },
          {
              type: 'blank',
          },
          {
            title: '使用openInstall安装',
            key: 'is_openinstall_enable',
            type: 'boolean',
            tips: '如果你没有购买openinstall的服务，请勿开启此项',
            newline: true,
            required: true,
          },
          {
            title: 'openInstall appKey',
            key: 'openinstall_appkey',
            type: 'input',
            tips: '填写openinstall分配给你的appkey',
            newline: true,
            required: true,
            span: 12,
            where: {
              is_openinstall_enable: 1
            }
          },
        ]
      }
    },
    created() {
      this.$http.get(`/setting/sys/${resourceType}`).then(res => {
        this.form = res.data.setting || {}
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
