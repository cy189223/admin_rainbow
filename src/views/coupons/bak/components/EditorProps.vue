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

  const resourceType = 'coupons'

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
            span: 12,
            newline: true,
            required: true,
          },
          {
            title: '发行数量',
            key: 'total',
            type: 'number',
            newline: true,
            required: true,
          },
          {
            title: '使用范围',
            key: 'usable_range_type',
            type: 'radio',
            options: [{
                title: '全场通用',
                value: 2
              },
              {
                title: '指定盲盒',
                value: 0
              },
              {
                title: '指定商品',
                value: 1
              }
            ],
            newline: true,
            required: true,
          },
          {
            title: '指定盲盒',
            key: 'usable_ids',
            type: 'box_list_input',
            where: {
              usable_range_type: 0
            },
            newline: true,
            required: true,
          },
          {
            title: '指定商品',
            key: 'usable_ids',
            type: 'product_list_input',
            where: {
              usable_range_type: 1
            },
            newline: true,
            required: true,
          },
          {
            title: '最低可用金额',
            key: 'minimum_money',
            type: 'price',
            tips: '订单需要达到此金额才可使用，不填写则不限制',
            newline: true,
            // required: true,
          },
          {
            type: 'blank'
          },
          {
            title: '优惠类型',
            key: 'discount_type',
            type: 'radio',
            options: [{
                title: '现金减免',
                value: 0
              },
              {
                title: '折扣优惠',
                value: 1
              }
            ],
            newline: true,
            required: true,
          },
          {
            title: '现金优惠',
            key: 'discount_money',
            type: 'price',
            newline: true,
            required: true,
            where: {
              discount_type: 0
            },
          },
          {
            title: '折扣',
            key: 'discount_rate',
            type: 'number',
            newline: true,
            required: true,
            placeholder: '7.5折请填写75',
            where: {
              discount_type: 1
            },
          },
          {
            type: 'blank'
          },
          {
            title: '有限期类型',
            type: 'radio',
            key: 'time_limit_type',
            options: [
              {
                title: '固定有限期',
                value: 0
              },
              {
                title: '按领取时间计算',
                value: 1
              }
            ],
            newline: true,
            required: true,
          },
          {
            title: '有效期开始',
            type: 'date',
            key: 'usable_start_at',
            newline: true,
            required: true,
            where: {
              time_limit_type: 0
            },
          },
          {
            title: '有效期结束',
            type: 'date',
            key: 'usable_end_at',
            newline: true,
            required: true,
            where: {
              time_limit_type: 0
            },
          },
          {
            title: '有限时间',
            type: 'number',
            key: 'valid_time',
            prefix: '领取后',
            suffix: '小时内有效',
            newline: true,
            required: true,
            where: {
              time_limit_type: 1
            },
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
