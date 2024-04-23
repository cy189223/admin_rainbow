<template>
  <a-modal title="订单售后详情" style="top: 100px;" :visible="isShow" width="800px" @ok="handleOk" @cancel="handleCancel"
    :footer="false">
    <div class="item">
      <div class="key">订单ID:</div>
      <div class="value">{{order.id}}</div>
    </div>
    <div class="item">
      <div class="key">订单编号:</div>
      <div class="value">{{order.number}}</div>
    </div>
    <div class="item">
      <div class="key">订单状态:</div>
      <div class="value">{{order.union_status_text}}</div>
    </div>
    <div class="item">
      <div class="key">售后发起时间:</div>
      <div class="value">{{info.created_at}}</div>
    </div>
    <div class="item">
      <div class="key">售后原因:</div>
      <div class="value">{{info.reason}}</div>
    </div>
    <div class="item">
      <div class="key">售后描述:</div>
      <div class="value">{{info.desc}}</div>
    </div>
    <div class="item">
      <div class="key">是否收到货:</div>
      <div class="value">
        <template v-if="info.deliver_status === 1">未收到货</template>
        <template v-else>已收到货</template>
      </div>
    </div>
    <div class="item">
      <div class="key">图片凭证:</div>
      <div class="value">
        <template v-if="info.images && info.images.length">
          <a :href="item" target="_blank" v-for="(item, index) in info.images">
            <img :src="item" class="aftersale-image" />
          </a>
        </template>
        <span v-else> / </span>
      </div>
    </div>


    <div class="item">
      <div class="key">售后状态:</div>
      <div class="value">
        <a-tag :color="colorMap[info.union_status]">{{info.union_status_text}}</a-tag>
      </div>
    </div>
    <div class="item" v-if="info.audited_at">
      <div class="key">审核时间:</div>
      <div class="value">
        {{info.audited_at || '-'}}
      </div>
    </div>
    <div class="item">
      <div class="key">审核备注:</div>
      <div class="value">
        {{info.audit_remark || '-'}}
      </div>
    </div>

    <div class="item" v-if="info.sendback_at">
      <div class="key">寄回时间:</div>
      <div class="value">
        {{info.sendback_at || '-'}}
      </div>
    </div>

    <div class="item" v-if="info.sendback_info">
      <div class="key">寄回物流:</div>
      <div class="value">
        {{info.sendback_info.express_name || '-'}}
      </div>
    </div>

    <div class="item" v-if="info.sendback_info">
      <div class="key">寄回单号:</div>
      <div class="value">
        {{info.sendback_info.express_number || '-'}}
      </div>
    </div>

    <div class="item" v-if="info.completed_at">
      <div class="key">完成时间:</div>
      <div class="value">
        {{info.completed_at || '-'}}
      </div>
    </div>

    <!-- <div class="item">
      <div class="key">图片凭证:</div>
      <div class="value">
        <template v-if="info.images && info.images.length">
          <a :href="item" target="_blank" v-for="(item, index) in info.images">
            <img :src="item" class="aftersale-image" />
          </a>
        </template>
        <span v-else> / </span>
      </div>
    </div> -->
    <!-- <div class="item">
      <div class="key">寄回时间 :</div>
      <div class="value">
        <template v-if="deliver_status === 1">未收到货</template>
        <template v-else>已收到货</template>
      </div>
    </div> -->

    <div class="btn-c">
      <a-button style="margin-left: 30px;" type="primary" @click="initData()">
        <span>刷新</span>
      </a-button>

      <a-button v-if="info.union_status !== 'completed'" style="margin-right: 10px; float: right;" type="danger" @click="reject()">
        <span>关闭售后</span>
      </a-button>

      <template v-if="info.union_status === 'audit_pending'">
        <a-button style="margin-right: 10px; float: right;" v-if="info.deliver_status === 1" type="primary"
          @click="acceptAftersale()">
          <span>同意仅退款</span>
        </a-button>
        <a-button style="margin-right: 10px; float: right;" v-if="info.deliver_status === 2" type="primary"
          @click="acceptOnlyRefund()">
          <span>同意退货退款</span>
        </a-button>
      </template>

      <template v-if="info.union_status === 'sendback_received_pending'">
        <a-button style="margin-right: 10px; float: right;" type="primary" @click="acceptComplete()">
          <span>完成售后</span>
        </a-button>
      </template>

    </div>
  </a-modal>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    components: {},
    props: {
      order: {
        type: Object
      },
      isShow: {
        type: Boolean
      }
    },
    computed: {
      uuid() {
        return this.order.aftersale && this.order.aftersale.uuid
      }
    },
    data() {
      return {
        info: {},
        colorMap: {
          audit_rejected: 'red',
          completed: 'green'
        }
      }
    },
    watch: {
      uuid() {
        this.initData()
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        this.$http('/aftersales/' + this.uuid).then(res => {
          this.info = res.data.info
        })
      },
      handleOk() {},
      handleCancel() {
        this.$emit('hide')
      },
      acceptOnlyRefund() {
        this.$iForm.show({
          title: '确认同意仅退款吗？',
          labelWidth: '50px',
          frame: [{
              title: '操作说明',
              type: 'text',
              text: '<span style="color:red">此操作不会自动退款</span>，同意后将标记为已完成售后。 <br/>同意后需单独对订单进行“退款并关闭”操作'
            },
            {
              title: '审核备注',
              type: 'textarea',
              tips: '此说明会展示在用户前端中',
              key: 'remark',
              span: 22,
            },
          ],
          success: (data) => {
            this.$http.put('/aftersales/' + this.uuid, {
              type: 'accept',
              ...data
            }).then(res => {
              this.initData()
              this.$message.success('操作成功')
              this.$iForm.hide()
              this.$emit('refresh')
            })
          }
        })
      },
      acceptAftersale() {
        this.$iForm.show({
          title: '确认同意退货退款吗？',
          labelWidth: '50px',
          frame: [{
              title: '操作说明',
              type: 'text',
              text: '同意后，用户需退回收到的货物并填写寄回快递信息'
            },
            {
              title: '审核备注',
              type: 'textarea',
              tips: '此说明会展示在用户前端中',
              key: 'remark',
              span: 22,
            },
          ],
          success: (data) => {
            this.$http.put('/aftersales/' + this.uuid, {
              type: 'accept',
              ...data
            }).then(res => {
              this.initData()
              this.$message.success('操作成功')
              this.$iForm.hide()
              this.$emit('refresh')
            })
          }
        })
      },
      acceptComplete() {
        this.$iForm.show({
          title: '确认标记为已完成吗？',
          labelWidth: '50px',
          frame: [{
              title: '操作说明',
              type: 'text',
              text: '<span style="color:red">此操作不会自动退款</span> <br/>标记后需单独对订单进行“退款并关闭”操作'
            },
            // {
            //   title: '审核备注',
            //   type: 'textarea',
            //   tips: '此说明会展示在用户前端中',
            //   key: 'remark',
            //   span: 22,
            // },
          ],
          success: (data) => {
            this.$http.put('/aftersales/' + this.uuid, {
              type: 'complete',
              ...data
            }).then(res => {
              this.initData()
              this.$message.success('操作成功')
              this.$iForm.hide()
              this.$emit('refresh')
            })
          }
        })
      },
    },
    reject() {
      this.$iForm.show({
        title: '填写拒绝售后的原因',
        labelWidth: '50px',
        frame: [{
          title: '原因',
          type: 'textarea',
          tips: '此说明会展示在用户前端中',
          key: 'remark',
          span: 22,
        }],
        success: (data) => {
          this.$http.put('/aftersales/' + this.uuid, {
            type: 'reject',
            ...data
          }).then(res => {
            this.initData()
            this.$message.success('操作成功')
            this.$iForm.hide()
            this.$emit('refresh')
          })
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .tips {
    color: gray;
    font-size: 80%;
  }

  .item {
    display: flex;

    .key {
      width: 100px;
      flex: 0 0 100px;
      text-align: right;
      margin-right: 20px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }

  .aftersale-image {
    height: 60px;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .btn-c {
    overflow: hidden;
    margin: 20px 0px 10px 0px;
  }
</style>
