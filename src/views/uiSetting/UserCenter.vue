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

  const resourceType = 'user_center'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        uuid: '',
        form: {
          items: []
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
            title: '显示悬浮按钮',
            type: 'boolean',
            key: 'is_show_float_btn',
            newline: true,
            required: true,
          },
          {
            title: '悬浮按钮图片',
            key: 'float_btn_image',
            type: 'image',
            isShowImageTips: false,
            tips: '300*300, 200K以内, 可以上传gif动态图片',
            newline: true,
            required: true,
            where: {
              is_show_float_btn: 1
            }
          },
          {
            title: '点击链接',
            key: 'float_btn_link',
            type: 'link',
            newline: true,
            required: true,
            where: {
              is_show_float_btn: 1
            }
          },
          {
            title: '左右晃动动画',
            key: 'float_btn_is_animate',
            type: 'boolean',
            tips: '开启后系统会自动给悬浮按钮增加左右晃动动画',
            newline: true,
            required: true,
            where: {
              is_show_float_btn: 1
            }
          },
          {
            type: 'blank'
          },
          {
            title: '显示VIP开通入口',
            type: 'boolean',
            key: 'is_show_vip',
            newline: true,
            required: true,
          },
          {
            title: '显示"邀请记录"',
            type: 'boolean',
            key: 'is_show_invite_total',
            newline: true,
            required: true,
          },
          {
            title: 'Banner位',
            type: 'banner_input',
            key: 'banner',
            tips: '建议尺寸 680*160。 显示在我的订单栏正下方。',
            newline: true,
            required: true,
            placeholder: '建议6个字以内'
          },
          {
            title: '下方菜单项',
            type: 'banner_input',
            key: 'items',
            newline: true,
            required: true,
            placeholder: '建议6个字以内'
          },
          {
            title: '底部版权说明',
            type: 'input',
            key: 'copyright',
            newline: true,
            required: true,
            span: 12,
            placeholder: '如 Copyright © 2021 鸿雀信息科技',
            tips: '不填则不显示'
          }
        ]
      }
    },
    created() {
      this.$http.get(`/setting/ui/${resourceType}`).then(res => {
        this.form = res.data.setting || {
          items: []
        }
      })
    },
    mounted() {},
    watch: {},
    methods: {
      cancel() {
        this.$router.back(-1)
      },
      submit() {
        this.$http.post(`/setting/ui/${resourceType}`, {
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
