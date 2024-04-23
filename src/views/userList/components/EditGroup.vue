<template>
  <div class="container">
    <IForm :formFrame="frame" :formData.sync="form" :border="false"></IForm>



    <div class="title-key">
      分组筛选条件:
    </div>
    <div class="condition-c">
      <div class="item">
         <a-checkbox value="">已绑定手机号</a-checkbox>
      </div>
      <div class="item">
         <a-checkbox value="">已填写生日</a-checkbox>
      </div>
      <div class="item">
         <a-checkbox value="">已成为VIP</a-checkbox>
      </div>
      <div class="item">
         <a-checkbox value="">注册时间大于 <a-input style="width: 80px;" placeholder="整数" size="small"></a-input> 小时</a-checkbox>
      </div>
      <div class="item">
         <a-checkbox value="">用户成长值大于 <a-input style="width: 80px;" placeholder="整数" size="small"></a-input></a-checkbox>
      </div>
      <div class="item">
         <a-checkbox value="">邀请用户数大于 <a-input style="width: 80px;" placeholder="整数" size="small"></a-input>人</a-checkbox>
      </div>
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

  const resourceType = 'topics'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        form: {},
        categoryList: []
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
          {
            title: '分组标题',
            key: 'title',
            tips: '此标题仅在管理后台中显示',
            span: 12,
            newline: true,
            required: true,
          },
          {
            title: '显示名称',
            tips: '此名称会在小程序中向用户展示',
            key: 'display_title',
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
