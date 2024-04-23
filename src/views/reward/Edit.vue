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

  const resourceType = 'accounts'

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
        return [
          {
            title: '开始时间',
            key: 'start_time',
            type: 'date',
            newline: true,
            required: true,
          },
          {
            title: '结束时间',
			key: 'end_time',
            type: 'date',
            newline: true,
            required: true,
          },
          {
            title: '类型',
            key: 'type',
            type: 'radio',
            default: 'fudai',
						required: true,
            options: [
              // {
              //   title: '福袋（无限赏）',
              //   value: 'fudai'
              // },
              {
                title: 'PK',
                value: 'pk'
              }
            ],
            newline: true,
            // tips: '如设置为多期开奖，则此处不能选择“按固定时间开奖“'
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
