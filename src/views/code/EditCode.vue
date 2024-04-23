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

  const resourceType = 'codes'

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
        return [{
            title: '标题',
            key: 'title',
            tips: '仅后台显示',
            newline: true,
            required: true,
          },
          {
              title: '批号',
              key: 'batch_number',
              tips: '必填，导出时可使用此项筛选',
              newline: true,
              required: true,
          },
          {
            title: '兑换码',
            key: 'code',
            tips: '4~10个字符，不要使用空格，不区分大小写，建议使用全大写字母',
            newline: true,
            required: true,
			min:4,
			max:10
          },
          {
            type: "blank",
          },
          {
            title: '每个码可激活次数',
            key: 'stock',
            type: 'number',
            tips: '库存即可兑换次数 (注:每个用户固定只能兑换1次)',
            newline: true,
            required: true,
          },
          {
            title: '兑换类型',
            key: 'code_type',
            type: 'radio',
            options: [{
                title: '积分',
                value: 'score'
              },
              {
                title: '红包',
                value: 'redpack'
              },
              {
                title: '优惠券(含兑换/包邮券)',
                value: 'coupon'
              },
              // {
              //   title: '碎片',
              //   value: 'chip'
              // },
              {
                title: '排除卡',
                value: 'exclude_card'
              },
              {
                title: '透视卡',
                value: 'show_card'
              },
            ],
            newline: true,
            required: true,
          },
          {
            title: '兑换积分',
            key: 'score',
            type: 'number',
            newline: true,
            required: true,
            where: {
              code_type: 'score'
            }
          },
          {
            title: '兑换红包',
            key: 'redpack',
            type: 'price',
            newline: true,
            required: true,
            where: {
              code_type: 'redpack'
            }
          },
          {
            title: '兑换数量',
            key: 'prize_total',
            type: 'number',
            newline: true,
            required: true,
            default: 1,
            prefix: '每个码兑换',
            suffix: '张',
            where: {
              code_type: 'exclude_card'
            }
          },
          {
            title: '兑换数量',
            key: 'prize_total',
            type: 'number',
            newline: true,
            required: true,
            default: 1,
            prefix: '每个码兑换',
            suffix: '张',
            where: {
              code_type: 'show_card'
            }
          },
          // {
          //   title: '碎片',
          //   key: 'chip_id',
          //   type: 'chip_id',
          //   newline: true,
          //   required: true,
          //   span: 12,
          //   where: {
          //     code_type: 'chip'
          //   }
          // },
          {
            title: '兑换数量',
            key: 'prize_total',
            type: 'number',
            newline: true,
            required: true,
            default: 1,
            prefix: '每个码兑换',
            suffix: '块',
            where: {
              code_type: 'chip'
            }
          },
          {
            title: '优惠券',
            key: 'coupon_id',
            type: 'coupon_id',
            newline: true,
            required: true,
            span: 12,
            where: {
              code_type: 'coupon'
            }
          },
        ]
      }
    },
    created() {},
    mounted() {
      this.uuid = this.uuid || this.$route.params.uuid

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
