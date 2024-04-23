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

  const resourceType = 'vip-skus'

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
        return [
          {
              title: '套餐封面',
              key: 'thumb',
              type: 'image',
              newline: true,
              required: true,
              tips: '500*500 此封面只会显示管理后台的订单列表中'
            },
          {
            title: '套餐标题',
            key: 'title',
            newline: true,
            required: true,
          },
          {
            title: '价格(人民币)',
            key: 'money_price',
            type: 'price',
            newline: true,
            required: true,
          },
          {
            title: '价格(积分)',
            key: 'score_price',
            type: 'number',
            placeholder: '选填',
            newline: true,
            // required: true,
          },
          {
            type: 'brank',
            newline: true,
          },
          {
            title: 'VIP时长(天)',
            key: 'days',
            placeholder: '购买后可续期的时长，单位为天',
            newline: true,
            required: true,
          },
          {
            title: '库存',
            key: 'stock',
            newline: true,
            required: true,
          },
          {
            type: 'brank',
            newline: true,
          },
          // {
          //   title: '推广返佣(红包)',
          //   key: 'brokerage_money',
          //   type: 'price',
          //   tips: '选填: 订单完成后，返佣会直接以红包发放给上级(仅一级)',
          //   newline: true,
          // },
          // {
          //   title: '下单奖励(积分)',
          //   key: 'reward_score',
          //   span: 24,
          //   type: 'number',
          //   tips: '选填: 订单完成后，奖励以积分直接发放给购买用户',
          //   newline: true,
          // }
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
          this.form = {}
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
				console.log(this.form)
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
