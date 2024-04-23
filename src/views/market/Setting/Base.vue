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

  const resourceType = 'market'

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
        tenantList: []
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
      tenantOptions () {
        return this.tenantList.map(item => {
          return {
            title: item.title,
            value: item.id
          }
        })
      },
      frame() {
        return [
          {
            title: '允许挂售',
            key: 'is_enabled',
            type: 'boolean',
            tips: '开启后，用户的盒柜仓库中有“挂售”入口',
            newline: true,
            required: true,
          },
          {
            type: 'blank'
          },
          {
            title: '开启自动购买',
            key: 'is_auto_buy',
            type: 'boolean',
            tips: '开启后，将使用设置的商户对以建设价挂售的商品进行购买',
            newline: true,
            required: true,
          },
          {
            title: '自动购买的商户',
            key: 'auto_buy_tenant_id',
            type: 'select',
            options: this.tenantOptions,
            tips: '请确保商户绑定的用户有足够的积分或红包余额',
            required: true,
            span: 12,
            newline: true,
            where: {
              'is_auto_buy': 1
            }
          },
          // {
          //   title: '时间设定',
          //   key: 'auto_buy_timeout',
          //   type: 'number',
          //   prefix: '挂售',
          //   suffix: '分钟后系统自动购买',
          //   tips: '最低为1分钟',
          //   required: true,
          //   span: 12,
          //   newline: true,
          //   where: {
          //     'is_auto_buy': 1
          //   },
          //   default: 1
          // },
        ]
      }
    },
    created() {
      this.$http.get(`/setting/sys/${resourceType}`).then(res => {
        this.form = res.data.setting || {}
        // this.form.return_type = this.form.return_type || 'money'
      })

      this.$http('/market/tenants').then(res => {
        this.tenantList = res.data.list
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
