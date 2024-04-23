<template>
  <a-modal
    title="批量发货"
    style="top: 100px;"
    :visible="isShow"
    width="600px"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认批量发货"
    :destroyOnClose="true"
  >
    <a-form>
      <a-form-item
      label="Excel文件"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      confirmText="批量发货"
      >
        <a-upload name="excel" :action="uploadUrl" :beforeUpload="beforeUpload" :headers="headers" @change="handleChange">
          <a-button>
            <a-icon type="upload" /> 上传Excel文件
          </a-button>
        </a-upload>
        <div class="tips">
          一共5列: 请下载下方格式示例（第一行表头将被忽略）
          <div>
          	<a target="_blank" href="http://hquesoft.oss-cn-shenzhen.aliyuncs.com/box/%E6%89%B9%E9%87%8F%E5%8F%91%E8%B4%A7%E5%AF%BC%E5%85%A5%E7%A4%BA%E4%BE%8B.xlsx">
          		Excel格式示例
          	</a>
          </div>
        </div>
      </a-form-item>
      <a-form-item
      label="有效行数"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      >
        <span>{{rowTotal}}</span>
      </a-form-item>
      <a-form-item
      label="可正常发货订单数"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      >
        <span>{{orderTotal}}</span>
      </a-form-item>
      <a-form-item
      label="编号不存在的行:"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      v-if="info.not_found_rows && info.not_found_rows.length != 0"
      >
        <span  style="color: red">{{info.not_found_rows}}</span>
      </a-form-item>
      <a-form-item
      label="不是待发货的行"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      v-if="info.not_deliver_pending_rows && info.not_deliver_pending_rows.length != 0"
      >
        <span style="color: red">{{info.not_deliver_pending_rows}}</span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { mapGetters } from 'vuex'
import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  components: {
  },
  props: {
    isShow: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['baseUrl']),
    uploadUrl () {
      return `${this.baseUrl}/admin-api/batch-deliver`
    },
  },
  data () {
    return {
      submitUuid: '',
      rowTotal: 0,
      orderTotal: 0,
      info: {},
      headers: {
        Authorization: this.$ls.get(ACCESS_TOKEN)
      },
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }
  },
  methods: {
    beforeUpload (file, fileList) {
        this.rowTotal = 0
        this.orderTotal = 0
        this.submitUuid = ''
    },
    handleChange ({ file, fileList }) {
      if (file.response) {
        if (file.response.status_code == 409) {
          this.$message.warning('Excel格式不正确，请参考示例Excel修改后上传');
          return false;
        }
        if (file.response.status_code == 500) {
          this.$message.warning('上传失败，请检查Excel格式');
          return false;
        }

        // this.loading = false
        let data = file.response.data

        this.rowTotal = data.row_total
        this.orderTotal = data.order_total
        this.submitUuid = data.uuid
        this.info = data
      }
    },
    handleOk () {
      if (!this.submitUuid || !this.orderTotal) {
        this.$message.warning('未匹配到可发货订单，请重新选择文件')
        return false
      }

      this.$http({
        'url': '/submit-batch-deliver',
        'method': 'POST',
        'data': {
          uuid: this.submitUuid
        }
      }).then(res => {
        this.$message.success('批量发货成功');
        this.$emit('success')
      })
    },
    handleCancel () {
      this.submitUuid = ""
      this.info = {}
      this.rowTotal = 0
      this.orderTotal = 0
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
