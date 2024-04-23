<template>
  <div class="container">

    <!-- <div style="margin-bottom: 20px;">
      <a-radio-group v-model="subType" buttonStyle="solid" style="margin-right: 20px;">
        <a-radio-button value="return_sale">返售设置</a-radio-button>
        <a-radio-button value="box">盲盒房间(大盒)弹幕</a-radio-button>
        <a-radio-button value="small_box">盲盒开盒(小盒)页弹幕</a-radio-button>
      </a-radio-group>
    </div> -->



    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
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

  const resourceType = 'carriage'

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
        categoryList: [],
        subType: 'return_sale'
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
            title: '盒柜发货运费',
            key: 'package_sku',
            type: 'carriage_input',
            // default: [],
            // span: 12,
            tips: '',
            newline: true,
            required: true,
            tips: '不添加则为免邮'
          },
          {
            type: 'blank',
          },
          {
            title: '商城商品下单运费',
            key: 'product',
            type: 'carriage_input',
            // default: [],
            // span: 12,
            tips: '',
            newline: true,
            required: true,
            tips: '不添加则为免邮'
          }
        ]
      }
    },
    created() {
      this.$http.get(`/setting/sys/${resourceType}`).then(res => {
        this.form = res.data.setting || {}
        this.$set(this.form, 'return_type', this.form.return_type || 'money')
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
