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

  const resourceType = 'app-versions'

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
        return [
          {
            title: '系统类型',
            key: 'os_type',
            type: 'radio',
            default: 'android',
            options: [
              {
                title: '安卓',
                value: 'android'
              },
              {
                title: 'iOS',
                value: 'ios'
              },
            ],
            newline: true,
            required: true,
          },
          {
            title: '版本号',
            key: 'version',
            tips: '格式使用三段式如: 1.0.0',
            newline: true,
            required: true,
          },
          {
            title: '安装包上传',
            key: 'package_url',
            type: 'file',
            newline: true,
            required: true,
          },
          {
            title: '更新说明',
            key: 'desc',
            tips: '一行一个说明点，不需要加数字序号',
            newline: true,
            // required: true,
            type: 'textarea',
            options: this.groupOptions
          }
        ]
      }
    },
    created() {
      this.$http('/app-versions', 'GET', {
        per_page: 100
      }).then(res => {
        this.tagList = res.data.list
      })

      this.$http('/app-versions', 'GET', {
        per_page: 100
      }).then(res => {
        this.groupList = res.data.list
      })
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
