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

  const resourceType = 'box_room'

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
          // {
          //   type: 'blank',
          //   tips: '参考演示图请联系客服领取',
          // },
          {
            title: '背景音乐',
            key: 'bgm',
            type: 'file',
            tips: 'mp3文件, 会循环播放，控制在1M内',
            newline: true,
            // required: true,
          },
          {
            title: '页面背景图',
            key: 'bg_image',
            type: 'image',
            tips: 'png，200K内, 尺寸请参考演示图(联系客服领取参考图片包)',
            isShowImageTips: false,
            newline: true,
            required: true,
          },
          {
            title: '大箱子前挡板(3D版)',
            key: 'box_up',
            type: 'image',
            tips: 'png，200K内, 尺寸请参考演示图(联系客服领取参考图片包)',
            isShowImageTips: false,
            newline: true,
            required: true,
          },
          {
            title: '大箱子后挡板(3D版)',
            key: 'box_bottom',
            type: 'image',
            tips: 'png，200K内, 尺寸请参考演示图(联系客服领取参考图片包)',
            isShowImageTips: false,
            newline: true,
            required: true,
          },
          {
            title: '小盒子图',
            key: 'small_box',
            type: 'image',
            tips: 'png，200K内, 尺寸请参考演示图(联系客服领取参考图片包)',
            isShowImageTips: false,
            newline: true,
            required: true,
          },
          {
            title: '左后方3D形象',
            key: 'item_1',
            type: 'image',
            tips: 'png，200K内, 尺寸请参考演示图(联系客服领取参考图片包)',
            isShowImageTips: false,
            newline: true,
            required: true,
          },
          {
            title: '右后方3D形象',
            key: 'item_2',
            type: 'image',
            tips: 'png，200K内, 尺寸请参考演示图(联系客服领取参考图片包)',
            isShowImageTips: false,
            newline: true,
            required: true,
          },
          {
            title: '右前方3D形象',
            key: 'item_3',
            type: 'image',
            tips: 'png，200K内, 尺寸请参考演示图(联系客客服领取参考图片包)',
            isShowImageTips: false,
            newline: true,
            required: true,
          }
        ]
      }
    },
    created() {
      this.$http.get(`/setting/ui/${resourceType}`).then(res => {
        this.form = res.data.setting || {}
		console.log(this.form)
      })
    },
    mounted() {
    },
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
