<template>
  <div class="container">
    <IForm :formFrame="frame" labelWidth="200px" class="form-container" :formData.sync="form"></IForm>
    <div slot="action">
      <!-- <a-button class="btn" @click="cancel">取消</a-button> -->
      <a-button class="btn" type="primary" @click="submit">保存</a-button>
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

  const resourceType = 'pk_base'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        uuid: '',
        form: {
          banner: []
        },
        categoryList: []
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
		 //  {
		 //    title: 'A阵营人数',
		 //    key: 'personNumber',
		 //    type: 'number',
		 //    // default:4,
		 //    // tips: '图片请单独使用图片组件',
		 //    isShowImageTips: false,
		 //    placeholder: '请输入A阵营人数',
		 //    newline: true,
			// auto_fill_fields: {
			//   'a_money_price': 'a_money_price',
			//   'a_score_price': 'a_score_price',
			//   'b_money_price': 'b_money_price',
			//   'b_score_price': 'b_score_price',
			// },
		 //  },
		 //  {
		 //  	title: 'A阵营PK售价',
		 //  	key_prefix: 'a_',
		 //  	type: 'mix_price',
		 //  	newline: true,
		 //  	required: true,
		 //  },
		 //  {
		 //  	title: 'B阵营PK售价',
		 //  	key_prefix: 'b_',
		 //  	type: 'mix_price',
		 //  	newline: true,
		 //  	required: true,
		 //  },
			{
			  title: '全局赏规则说明',
			  key: 'html',
			  type: 'textarea',
			  span: 23,
			  // tips: '图片请单独使用图片组件',
			  isShowImageTips: false,
			  placeholder: '请输入',
			  newline: true
			},
			{
			  title: 'PK规则说明',
			  key: 'pkhtml',
			  type: 'textarea',
			  span: 23,
			  // tips: '图片请单独使用图片组件',
			  isShowImageTips: false,
			  placeholder: '请输入',
			  newline: true
			}
        ]
      }
    },
    created() {
      this.$http.get(`/setting/sys/${resourceType}`).then(res => {
        this.form = res.data.setting || {}
        // this.form.return_type = this.form.return_type || 'money'
      })
    },
    mounted() {},
    watch: {},
    methods: {
      cancel() {
        this.$router.back(-1)
      },
      submit() {
        this.$http.post(`/setting/sys/${resourceType}`, {
          setting: this.form
        }).then(res => {
          this.$message.success('保存成功')
        })
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
