<template>
  <a-modal title="导出订单" style="top: 100px;" :visible="isShow" width="600px" @ok="handleOk" @cancel="handleCancel"
    okText="确认导出">
    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
    共查询到 {{itemTotal}} 条记录
  </a-modal>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import IForm from "@/components/IForm"

  import {
    createExport
  } from '@/api/orders'

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
        return [{
            title: '标题筛选',
            key: 'title',
            // type: '小',
            newline: true,
            tips: '不填则不筛选标题',
          },
          {
            title: '批次筛选',
            key: 'batch_number',
            // type: '小',
            newline: true,
            tips: '不填则导出所有批次',
          }
        ]
      }
    },
    data() {
      return {
        form: {
          title: '',
          batch_number: ''
        },
        itemTotal: 0,
      }
    },
    watch: {
      form: {
        handler(new_value, old_value) {
          this.$http.post('/export/code-total', this.form).then(res => {
            this.itemTotal = res.data.total
          })
        },
        deep: true
      }
    },
    mounted() {
      this.$http.post('/export/code-total', this.form).then(res => {
        this.itemTotal = res.data.total
      })
    },
    methods: {
      handleChange({
        file,
        fileList
      }) {},
      handleOk() {
        this.$http.post('/export/codes', {
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
