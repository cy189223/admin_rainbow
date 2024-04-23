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

  const resourceType = 'agent-levels'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        form: {},
        categoryList: [],
        tagList: [],
        groupList: []
      }
    },
    props: {
      uuid: {
        type: String
      }
    },
    computed: {
      // categoryOptions() {
      //   return this.categoryList.map(item => {
      //     return {
      //       title: item.title,
      //       value: item.id
      //     }
      //   })
      // },
      tagOptions() {
        return this.tagList.map(item => {
          return {
            title: item.title,
            value: item.id
          }
        })
      },
      groupOptions() {
        return this.groupList.map(item => {
          return {
            title: item.title,
            value: item.id
          }
        })
      },
      frame() {
        return [{
            title: '分销等级',
            key: 'level',
            type: 'number',
            newline: true,
            required: true,
          },
          {
            title: '等级名称',
            key: 'title',
            type: 'input',
            span: 18,
            newline: true,
            required: true,
          },
          {
            title: '等级描述',
            key: 'description',
            type: 'textarea',
            span: 18,
            newline: true,
            required: true,
          },
          // {
          //   type: 'blank',
          // },
          // {
          //   title: '佣金结算方式',
          //   key: 'brokerage_type',
          //   type: 'radio',
          //   span: 18,
          //   options: [
          //     {
          //       title: '系统内结算',
          //       value: 'online',
          //     },
          //     {
          //       title:  '系统外结算',
          //       value:  'offline'
          //     }
          //   ],
          //   tips: '系统内结算为实时发放佣金到用户的帐户余额中。 系统外结算只统计销售额，虽人工对帐并人工结算给'
          //   default: 'online',
          //   newline: true,
          //   required: true,
          // },
        ]
      }
    },
    created() {
    },
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
