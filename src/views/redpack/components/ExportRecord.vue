<template>
  <a-modal title="导出提现数据" style="top: 100px;" :visible="isShow" width="600px" @ok="handleOk" @cancel="handleCancel"
    okText="确认导出">
    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
    共查询到 {{itemTotal}} 条记录
  </a-modal>
</template>
<script>
  import IForm from "@/components/IForm"

  export default {
    components: {
      IForm
    },
    props: {
      isShow: {
        type: Boolean
      }
    },
    computed: {
      frame() {
        return [
          {
            title: '变动时间(开始)',
            type: 'date',
            key: 'created_start_at',
            showTime: false
          },
          {
            title: '变动时间(结束)',
            type: 'date',
            key: 'created_end_at',
            showTime: false
          },
          {
            title: '用户手机号',
            key: 'user_phone',
            tips: '填入手机号，不填则导出所有记录'
          },
          {
            type: 'number',
            key: "per_page",
            title: "每页条数",
            default: 2000,
          },
          {
            type: 'number',
            key: "page",
            title: "要导出的页码",
            tips: '填5则导出第5页',
            default: 1
          },
        ]
      }
    },
    data() {
      return {
        form: {
          start_at: null,
          end_at: null
        },
        itemTotal: 0
      }
    },
    watch: {
      form: {
        handler(new_value, old_value) {
          this.$http.post('/export/redpack-record/total', this.form).then(res => {
            this.itemTotal = res.data.total
          })
        },
        deep: true
      }
    },
    mounted () {
      this.$http.post('/export/redpack-record/total', this.form).then(res => {
        this.itemTotal = res.data.total
      })
    },
    methods: {
      handleChange({
        file,
        fileList
      }) {},
      handleOk() {
        this.$http.post('/export/redpack-record', {
          ...this.form
        }).then(res => {
          const tempwindow = window.open()
          tempwindow.location = process.env.VUE_APP_BASE_URL + `${res.data.url}`
          // window.open(process.env.VUE_APP_BASE_URL + `/${res.data.url}`, '_blank')
        }).finally(() => {})
      },
      handleCancel() {
        this.$emit('hide')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tips {
    color: gray;
    font-size: 80%;
  }
</style>
