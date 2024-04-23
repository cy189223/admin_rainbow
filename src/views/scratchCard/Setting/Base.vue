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

  const resourceType = 'box'

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
          {
            title: '购买前要求绑定手机号',
            key: 'is_need_phone',
            type: 'boolean',
            tips: '开启后，仅绑定手机号的用户可参与开盒',
            newline: true,
            required: true,
          },
          {
            title: '显示剩余件数（普通款）',
            key: 'is_show_stock_normal',
            type: 'boolean',
            tips: '在查看奖品列表的界面显示',
            newline: true,
            required: true,
          },
          {
            title: '显示抽中概率（普通款）',
            key: 'is_show_odds_normal',
            type: 'boolean',
            tips: '在查看奖品列表的界面显示',
            newline: true,
            required: true,
          },
          {
            title: '显示剩余件数（隐藏款）',
            key: 'is_show_stock_special',
            type: 'boolean',
            tips: '在查看奖品列表的界面显示',
            newline: true,
            required: true,
          },
          {
            title: '显示抽中概率（隐藏款）',
            key: 'is_show_odds_special',
            type: 'boolean',
            tips: '在查看奖品列表的界面显示',
            newline: true,
            required: true,
          },
          {
            type: 'blank',
          },
          // {
          //   title: '开盒后随机赠送积分',
          //   key: 'is_score_reward',
          //   type: 'boolean',
          //   tips: '开启后用户每开一个盒子都将获赠随机数量的积分',
          //   newline: true,
          //   required: true,
          // },
          // {
          //   title: '最低赠送数量',
          //   key: 'min_reward',
          //   type: 'number',
          //   placeholder: '默认为1',
          //   span: 12,
          //   suffix: '积分',
          //   newline: true,
          //   required: true,
          //   where: {
          //     is_score_reward: 1
          //   }
          // },
          // {
          //   title: '最高赠送数量',
          //   key: 'max_reward',
          //   placeholder: '默认为10',
          //   type: 'number',
          //   suffix: '积分',
          //   newline: true,
          //   required: true,
          //   tips: '积分会在最低与最高之间随机一个数量~',
          //   where: {
          //     is_score_reward: 1
          //   }
          // }
        ]
      }
    },
    created() {
      // this.$http.get(`/setting/sys/${resourceType}`).then(res => {
      //   this.form = res.data.setting || {}
      //   // this.form.return_type = this.form.return_type || 'money'
      // })
    },
    mounted() {},
    watch: {},
    methods: {
      cancel() {
        this.$router.back(-1)
      },
      submit() {
        // this.$http.post(`/setting/sys/${resourceType}`, {
        //   setting: this.form
        // }).then(res => {
        //   this.$message.success('保存成功')
        // })
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
