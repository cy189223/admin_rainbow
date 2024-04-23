<template>
  <div class="container">
    <div class="input-c">
      <span class="key">页面名称</span>
      <a-input placeholder="页面名称(仅后台显示)" v-model="form.title"></a-input>
    </div>
    <IPage v-model="form.content" :baseFrame="baseFrame"></IPage>
    <!-- <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm> -->
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
  // import IForm from "@/components/IForm"
  import IPage from "@/components/IPage"

  const resourceType = 'pages'

  export default {
    components: {
      IPage
      // AttrEditor
    },
    data() {
      return {
        form: {},
        categoryList: [],
        baseFrame: [
          {
            title: '标题文字',
            key: 'title',
            span: 14,
            // newline: true,
            placeholder: '标题栏标题，请填写'
          },
          {
            title: '标题栏颜色',
            key: 'nav_color',
            span: 8,
            type: 'input',
            // newline: true,
            placeholder: '格式如 #FFFFFF'
          },
          // {
          //   title: '样式',
          //   key: 'style',
          //   span: 24,
          //   type: 'style_input',
          //   newline: true,
          //   placeholder: '格式如 #FFFFFF'
          // }
        ]
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
          this.form = {
            content: {
              modules: []
            }
          }
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

  .input-c {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .key {
      font-weight: 500;
      width: 80px;
      flex: 0 0 80px;
    }
  }

  .container {
    .btn {
      margin-right: 30px;
    }
  }
</style>
