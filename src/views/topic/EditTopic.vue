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

  const resourceType = 'topics'

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
            title: '发布用户',
            key: 'user_id',
            newline: true,
            required: true,
            type: 'user_id',
          },
          {
            title: '评论内容',
            key: 'text',
            type: 'textarea',
            newline: true,
            required: true,
          },
          {
            title: '评论图片',
            key: 'images',
            type: 'images',
            newline: true,
            required: true,
          },
          {
            title: '阅读量',
            key: 'visit_total',
            newline: true,
            required: true,
          },
          {
            title: '所属圈子',
            key: 'group_id',
            newline: true,
            // required: true,
            type: 'select',
            options: this.groupOptions
          },
          {
            title: '所属话题',
            key: 'tag_id',
            newline: true,
            // required: true,
            type: 'select',
            options: this.tagOptions
          },
        ]
      }
    },
    created() {
      this.$http('/topic-tags', 'GET', {
        per_page: 100
      }).then(res => {
        this.tagList = res.data.list
      })

      this.$http('/topic-groups', 'GET', {
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
