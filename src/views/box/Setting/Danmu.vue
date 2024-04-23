<template>
  <div class="container">

    <div style="margin-bottom: 20px;">
      <a-radio-group v-model="danmuType" buttonStyle="solid" style="margin-right: 20px;">
        <!-- <a-radio-button value="home">首页弹幕</a-radio-button> -->
        <a-radio-button value="box_detail_danmu">盲盒房间(大盒)弹幕</a-radio-button>
        <a-radio-button value="box_open_danmu">盲盒开盒(小盒)页弹幕</a-radio-button>
      </a-radio-group>
    </div>

    <!-- <div style="color: red; font-size: 90%;">弹幕内容格式 “***抽到了***”</div> -->

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

  // const resourceType = 'box_danmu'

  export default {
    components: {
      IForm
      // AttrEditor
    },
    data() {
      return {
        uuid: '',
        form: {},
        categoryList: [],
        danmuType: 'box_detail_danmu'
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
        return [{
            title: '显示开关',
            key: 'is_enabled',
            type: 'boolean',
            placeholder: '',
            // span: 12,
            tips: '关闭后不显示弹幕',
            newline: true,
            required: true,
          },
          {
            title: '显示头像',
            key: 'is_headimg',
            type: 'boolean',
            placeholder: '',
            // span: 12,
            tips: '开启后如果有用户头像则显示',
            newline: true,
            required: true,
          },
          {
            title: '仅显示当前款记录',
            key: 'is_limit_uuid',
            type: 'boolean',
            placeholder: '',
            // span: 12,
            tips: '开启后只显示该页面对应盲盒的记录，关闭显示所有盲盒款的记录',
            newline: true,
            required: true,
          },
          {
            title: '仅显示隐藏款记录',
            key: 'is_only_special',
            type: 'boolean',
            placeholder: '',
            // span: 12,
            tips: '开启后弹幕只显示隐藏款的开盒记录',
            newline: true,
            required: true,
          },
        ]
      }
    },
    created() {
      this.initForm()
    },
    mounted() {},
    watch: {
      danmuType () {
        this.initForm()
      }
    },
    methods: {
      initForm () {
        this.$http.get(`/setting/sys/${this.danmuType}`).then(res => {
          this.form = res.data.setting || {}
          // this.$set(this.form, 'return_type', this.form.return_type || 'money')
          // this.form.return_type = this.form.return_type || 'money'
        })
      },
      cancel() {
        this.$router.back(-1)
      },
      submit() {
        this.$http.post(`/setting/sys/${this.danmuType}`, {
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
