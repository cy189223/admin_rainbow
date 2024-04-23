<template>
  <div class="container">
    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
    <div slot="action" style="display: flex; justify-content: flex-end;">
      <a-button class="btn" @click="cancel">取消</a-button>
      <a-button class="btn" type="primary" @click="submit">提交</a-button>
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

  const resourceType = 'jikas'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        form: {},
        categoryList: []
      }
    },
    props: {
      uuid: {
        type: String
      },
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
        return [{
            title: '活动标题',
            key: 'title',
            newline: true,
            required: true
          },
          {
            title: '副标题',
            key: 'sub_title',
            placeholder: '例如: 直播中随机抽取10位幸运儿',
            tips: '显示在活动页面上方',
            newline: true,
            // required: true
          },
          // {
          //   title: '参与码',
          //   key: 'join_codes',
          //   tips: '选填。参与码可设置多个，可在公众号或微信群中发放给用户',
          //   type: 'tags',
          //   newline: true,
          // },
          {
            title: '封面',
            key: 'thumb',
            type: 'image',
            isShowImageTips: false,
            tips: '800*800',
            sizeLimit: 200,
            newline: true,
            required: true
          },
          // {
          //   title: '详情图',
          //   key: 'images',
          //   isShowImageTips: false,
          //   tips: '宽度1000px，长图建议切成多张小图上传',
          //   type: 'images',
          //   newline: true,
          // },
          {
            title: '允许购买抽卡次数',
            key: 'is_payable',
            type: 'boolean',
            newline: true,
            required: true,
          },
          {
            title: '积分价格',
            key: 'score_price',
            type: 'number',
            suffix: '积分抽一次',
            newline: true,
            required: true,
            where: {
              is_payable: 1
            }
          },
          {
            type: 'blank',
            newline: true,
          },
          {
            title: '邀请注册送抽卡次数',
            key: 'is_inviteable',
            type: 'boolean',
            newline: true,
            required: true,
          },
          {
            title: '赠送数量',
            key: 'invite_reward_times',
            type: 'number',
            prefix: '每邀请一个新用户赠送',
            suffix: '次抽卡次数',
            newline: true,
            required: true,
            default: 1,
            where: {
              is_inviteable: 1
            }
          },
          {
            type: 'blank',
            newline: true,
          },
          {
            title: '开放参与时间',
            key: 'start_at',
            type: 'date',
            newline: true,
            required: true,
          },
          {
            title: '结束时间',
            key: 'end_at',
            type: 'date',
            newline: true,
            required: true,
          },
          {
            type: 'blank',
            newline: true,
          },
          {
            title: '奖品设置',
            type: 'text',
            text: '创建后在列表中设置奖品',
          },
          {
            type: 'blank',
            newline: true,
          },
          {
            title: '抽盲盒送抽卡次数',
            key: 'box_ids',
            type: 'box_ids',
            // sizeLimit: 250,
            tips: '绑定盲盒活动后，用户每抽1个小盒都会<span style="color:red">免费获得</span>一次抽卡次数',
            // required: true,
            newline: true,
          },
        ]
      }
    },
    created() {},
    mounted() {
      this.uuid = this.uuid || this.$route.params.uuid

      // this.$http.get('/article/categories').then(res => {
      // 	this.categoryList = res.data.list
      // })

      this.initForm()
    },
    watch: {
      uuid() {
        this.initForm()
      }
    },
    methods: {
      initForm() {
        if (this.uuid) {
          this.$http(`/${resourceType}/${this.uuid}`).then(res => {
            this.form = res.data.info
          })
        } else {
          this.form = this.$initForm(this.frame)
        }
      },
      cancel() {
        this.uuid = ''
        this.$emit('cancel')
        // this.$router.back(-1)
      },
      create() {
        this.$http.post(`/${resourceType}`, {
          ...this.form
        }).then(res => {
          this.$message.success('创建成功')
          this.$emit('success')
          // this.$router.push({
          // 	path: './list'
          // })
        })
      },
      update() {
        this.$http.patch(`/${resourceType}/${this.uuid}`, {
          type: 'update',
          attributes: this.form
        }).then(res => {
          this.$message.success('更新成功')
          this.$emit('success')
          // this.uuid = ''
          // this.form = {}

          // this.$router.push({
          // 	path: '../list'
          // })
        })
      },
      submit() {
        if (this.uuid)
          this.update()
        else
          this.create()
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
