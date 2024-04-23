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

  const resourceType = 'seckills'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        form: {
          node_type: 'product'
        },
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
            title: '秒杀类型',
            type: 'radio',
            key: 'node_type',
            options: [
              {
                title: '商品',
                value: 'product'
              },
              // {
              //   title: '盲盒',
              //   value: 'box'
              // },
            ]
          },
          {
            title: '选择商品',
            key: 'node_id',
            type: 'product_id',
            newline: true,
            required: true,
            where: {
              node_type: 'product'
            },
            auto_fill_fields: {
              'title': 'title',
              'thumb': 'thumb',
              'money_price': 'money_price',
              'score_price': 'score_price'
            },
          },
          {
            type: 'brank',
            placeholder: '例如: 过年大放价~',
            newline: true,
            required: true
          },
          {
            title: '活动标题',
            key: 'title',
            type: 'input',
            // placeholder: '可以',
            newline: true,
            required: true,
          },
          {
            title: '封面',
            key: 'thumb',
            type: 'image',
            tips: '600*600',
            sizeLimit: 200,
            // placeholder: '可以',
            newline: true,
            required: true,
          },
          {
            title: '原价',
            key_prefix: '',
            type: 'mix_price',
            placeholder: '设置一个吸引人的价格',
            newline: true,
            required: true,
          },
          {
            title: '秒杀价',
            key_prefix: 'discount_',
            type: 'mix_price',
            placeholder: '设置一个吸引人的价格',
            newline: true,
            required: true,
          },
          {
            title: '开始时间',
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
            title: '活动库存',
            key: 'stock',
            type: 'number',
            placeholder: '请填写',
            tips: '活动库存扣减到0时自动结束活动',
            newline: true,
            required: true,
          },
          {
            title: '指定用户群',
            key: 'user_group_id',
            type: 'user_group_id',
            span: 12,
            tips: '指定后，仅符合用户群条件的用户可购买',
          },
          // {
          //   title: '必须绑定手机',
          //   key: 'is_need_phone',
          //   type: 'boolean',
          //   default: 0,
          //   tips: '开启后会强制用户先绑定手机号',
          // },
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
          this.form = {
            node_type: 'product'
          }
        }
      },
      cancel() {
        this.uuid = ''
        this.$emit('cancel')
        // this.$router.back(-1)
      },
      create() {
        this.$http.post(`/${resourceType}`, {
          type: this.type,
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
