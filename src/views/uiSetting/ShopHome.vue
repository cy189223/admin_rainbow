<template>
  <div class="container">

    <IPage v-model="page" :baseFrame="baseFrame"></IPage>

    <div class="action-c">
      <!-- <a-button class="btn" @click="cancel">取消</a-button> -->
      <a-button class="btn" type="primary" @click="submit">提交保存</a-button>
    </div>

  </div>
</template>

<script>
  // import AttrEditor from "./components/AttrEditor"

  import IPage from "@/components/IPage"

  const resourceType = 'shop_home'

  export default {
    components: {
      IPage
    },
    data() {
      return {
        uuid: '',
        page: {}
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
      baseFrame() {
        return [
          {
            title: '标题文字',
            key: 'title',
            span: 8,
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
    created() {
      this.$http.get(`/setting/ui/${resourceType}`).then(res => {
        this.page = res.data.setting || this.$defaultPageObject
		this.$set(this.page,'from_type','shopHome')
      })
    },
    mounted() {
    },
    watch: {},
    methods: {
      cancel() {
        this.$router.back(-1)
      },
      submit() {
        this.$http.post(`/setting/ui/${resourceType}`, {
          setting: this.page
        }).then(res => {
          this.$message.success('保存成功')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: 120px;
  }

  .container {
    .btn {
      margin-right: 30px;
    }
  }

  .action-c {
    margin-top: 20px;
  }
</style>
