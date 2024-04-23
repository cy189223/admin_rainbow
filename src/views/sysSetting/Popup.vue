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

  const resourceType = 'popup'

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
            title: '弹窗开关',
            key: 'is_enabled',
            type: 'boolean',
            placeholder: '',
            // span: 12,
            tips: '关闭后不再显示弹窗',
            newline: true,
            required: true,
          },
          {
            title: '弹窗编号',
            key: 'number',
            // type: '',
            placeholder: '非必填',
            // span: 12,
            tips: '每个编号的弹窗只对同一用户显示一次，改变编号后会强制再次显示给此前显示过的用户',
            newline: true,
            // required: true,
          },
          {
            title: '弹窗图片',
            key: 'image',
            type: 'image',
            placeholder: '非必填',
            isShowImageTips: false,
            // span: 12,
            tips: '宽度为1000px, 高度自动适应. 图片显示固定占据屏幕宽度的88%，可使用半透明图片合理安排透明位置',
            newline: true,
            // required: true,
          },
          {
            title: '图片链接',
            key: 'link',
            type: 'link',
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
