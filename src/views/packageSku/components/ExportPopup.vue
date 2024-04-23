<template>
  <a-modal title="导出物品记录数据" style="top: 100px;" :visible="isShow" width="800px" @ok="handleOk" @cancel="handleCancel"
    okText="确认导出">
    <IForm :formFrame="frame" class="form-container" :formData.sync="form"></IForm>
    共查询到 {{itemTotal}} 条物品记录
  </a-modal>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
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
            title: '所属用户手机号',
            key: 'user_phone',
            tips: '填入手机号筛选特定用户，不填则导出所有记录'
          },
          {
            type: 'select',
            key: "status",
            title: "物品状态",
            options: [
              {
                title: '全部',
                value: 'all'
              },
              {
                title: '待处理',
                value: 'pending'
              },
              {
                title: '已提货',
                value: 'picked'
              },
              {
                title: '已返售',
                value: 'return_saled'
              },
              {
                title: '已转让',
                value: 'resaled'
              },
              {
                title: '转售中',
                value: 'resale_pending'
              },
            ],
            default: 'all'
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
        },
        itemTotal: 0
      }
    },
    watch: {
      form: {
        handler(new_value, old_value) {
          this.$http.post('/export/package-sku/total', this.form).then(res => {
            this.itemTotal = res.data.total
          })
        },
        deep: true
      }
    },
    mounted () {
      this.$http.post('/export/package-sku/total', this.form).then(res => {
        this.itemTotal = res.data.total
      })
    },
    methods: {
      handleChange({
        file,
        fileList
      }) {},
      handleOk() {
        this.$http.post('/export/package-sku', {
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
