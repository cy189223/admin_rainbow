<template>
  <div class="container">
    <IForm :formFrame="frame" :formData.sync="form" :border="false"></IForm>



    <div class="title-key">
      分组筛选条件:
    </div>
    <div class="condition-c">
      <div class="item">
         <ICheckbox v-model="form.options.phone.is_used" /> 已绑定手机号
      </div>
      <div class="item">
         <ICheckbox v-model="form.options.birthday.is_used" /> 已填写生日
      </div>
      <div class="item">
         <ICheckbox v-model="form.options.vip.is_used" /> 已成为VIP
      </div>
      <div class="item">
         <ICheckbox v-model="form.options.register_time.is_used" />
         注册时间 <ICompare size="small" v-model="form.options.register_time.type" />
         <a-input style="width: 80px;" v-model.number="form.options.register_time.value" placeholder="整数" size="small"></a-input> 小时
      </div>
      <div class="item">
         <ICheckbox v-model="form.options.level_score.is_used" />
         用户成长值 <ICompare size="small" v-model="form.options.level_score.type" />
         <a-input style="width: 80px;" v-model.number="form.options.level_score.value" placeholder="整数" size="small"></a-input>
      </div>
      <div class="item">
         <ICheckbox v-model="form.options.score.is_used" />
         用户积分 <ICompare size="small" v-model="form.options.score.type" />
         <a-input style="width: 80px;" v-model.number="form.options.score.value" placeholder="整数" size="small"></a-input>
      </div>
      <div class="item">
         <ICheckbox v-model="form.options.invitee_total.is_used" />
         邀请用户数 <ICompare size="small" v-model="form.options.invitee_total.type" />
         <a-input style="width: 80px;" v-model.number="form.options.invitee_total.value" placeholder="整数" size="small"></a-input>人
      </div>
    </div>

    <div style="margin-left: 60px; margin-top: 30px;">
      当前符合条件用户数: {{userTotal}}
    </div>
    <div style="margin-left: 60px; margin-top: 10px; color: #aaa;">
      注意：符合条件的用户数量有可能会随时间动态变化
    </div>
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
  import ICompare from "@/components/IForm/components/ICompare.vue"
  import ICheckbox from "@/components/IForm/components/ICheckbox.vue"

  const resourceType = 'user-groups'

  export default {
    components: {
      IForm,
      ICompare,
      ICheckbox
      // AttrEditor
    },
    data() {
      return {
        defaultForm: {
          title: '',
          options: {
            phone: {
              is_used: 0,
            },
            birthday: {
              is_used: 0
            },
            vip: {
              is_used: 0
            },
            register_time: {
              is_used: 0,
              type: '>',
              value: 0
            },
            level_score: {
              is_used: 0,
              type: '>',
              value: 0
            },
            score: {
              is_used: 0,
              type: '>',
              value: 0
            },
            invitee_total: {
              is_used: 0,
              type: '>',
              value: 0
            }
          }
        },
        form: {},
        categoryList: [],
        userTotal: 0
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
        return [
          // {
          //   title: '分组标题',
          //   key: 'title',
          //   tips: '此标题仅在管理后台中显示',
          //   span: 12,
          //   newline: true,
          //   required: true,
          // },
          {
            title: '标题',
            tips: '此名称会在小程序中向用户展示',
            key: 'title',
            span: 12,
            newline: true,
            required: true,
          }
        ]
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
      },
      form: {
        handler(new_value, old_value) {
          this.$http.post('user-group/check-total', {
            ...this.form
          }).then(res => {
            this.userTotal = res.data.total
          })
        },
        deep: true
      }
    },
    methods: {
      initForm() {
        if (this.uuid) {
          this.$http(`/${resourceType}/${this.uuid}`).then(res => {
            this.form = res.data.info
          })
        } else {
          // this.$set(this.form, this.defaultForm)
          this.form = this.defaultForm
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

  .title-key {
    margin-left: 60px;
  }

  .condition-c {
    margin-left: 160px;
    .item {
      margin-bottom: 10px;
    }
  }

  .container {
    .btn {
      margin-right: 30px;
    }
  }
</style>
