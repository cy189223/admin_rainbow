<template>
  <div class="container">

    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>

    <!-- <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm> -->
    <div slot="action" style="display: flex; justify-content: flex-end;">
      <a-button class="btn" @click="cancel">取消</a-button>
      <a-button class="btn" type="primary" @click="submit">提交</a-button>
    </div>

  </div>
</template>

<script>
  // import AttrEditor from "./components/AttrEditor"
  import IForm from "@/components/IForm"

  const resourceType = 'boxes'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        form: {
        },
        boxList: []
      }
    },
    props: {
      uuid: {
        type: String
      }
    },
    computed: {
      frame() {
        return [
          {
            title: '所属盲盒',
            key: 'box_id',
            newline: true,
            required: true,
            type: 'select',
            options: this.optionBoxList
          },
          {
            title: '用户头像',
            key: 'images',
            type: 'images',
            tips: '模拟100个用户信息请上传100个头像图片',
            newline: true,
            required: true,
          },
          {
            title: '其它信息',
            key: 'content',
            type: 'textarea',
            required: true,
            span: 23,
            options: this.imageTagOptions,
            tips: '一行一个，字段间使用_相连<br/>格式: 用户名_开盒时间 <br/> 如: 小明_2021-05-01 10:10:10'
          }
        ]
      },
      optionBoxList () {
        return this.boxList.map(item => {
          return {
            title: item.title,
            value: item.id
          }
        })
      }
    },
    created() {},
    mounted() {
      this.uuid = this.uuid || this.$route.params.uuid

      this.$http.get('/boxes').then(res => {
        this.boxList = res.data.list
      })

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
            ...this.$initForm(this.frameBase),
            ...this.$initForm(this.frameUI)
          }
        }
      },
      cancel() {
        this.$emit('cancel')
        // this.$router.back(-1)
      },
      create() {
        this.$http.post('/box-rank', {
          ...this.form
        }).then(res => {
          this.$message.success('创建成功')
          this.$emit('success')
          this.uuid = ''
          this.form = {}
          // this.$router.push({
          // 	path: './list'
          // })
        })
      },
      submit() {
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
