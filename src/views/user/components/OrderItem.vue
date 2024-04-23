<template>
  <div class="order-item">
    <div class="order-item-top">
      <a-icon class="star" type="star" @click="markOrder" :theme="info.marked_at ? 'filled' : 'outlined'"></a-icon>
      <div style="margin-left: 10px;">{{ info.number }}</div>
	 <div>
	    <a-tag :color="statusColors[info.union_status]">{{ info.union_status_text }}</a-tag>
	  
	    <span  v-if="info.closed_reason" style="font-weight: 500; font-size: 90%;">{{info.closed_reason}}</span>
	  
	    <a-tag v-if="info.activity_type_text">{{ info.activity_type_text }}</a-tag>
	  </div>

      <!-- <div>运费:<span class="value">{{(info.carriage || 0) / 100}}</span></div> -->
      <div v-if="info.type === 'package'">提货时间:<span class="value">{{ info.created_at|dateFormat }}</span></div>
      <div v-else>领取时间:<span class="value">{{ info.created_at|dateFormat }}</span></div>
      <div v-if="info.offline_use_at">核销时间:<span class="value">{{ info.offline_use_at|dateFormat }}</span></div>
      <div v-if="info.closed_at">关闭时间:<span class="value">{{ info.closed_at|dateFormat }}</span></div>
    </div>
    <div class="products">
      <div class="product-item">
        <img class="thumb" :src="info.goods_image + '?x-oss-process=image/resize,w_400'">
        <div class="content">
          <div class="info-detail">
            <div class="product-title">
              <!-- <span class="shang-title" v-if="item.options && item.options.shang_title">{{item.options.shang_title}}</span> -->
              <a href="javascript:;">{{ info.goods_name }}</a>

              <span class="node-type-text">{{info.level_name}}奖品</span>
              <!-- <span class="shang-title" v-if="info.goods_desc">{{info.goods_desc}}</span>

              <span class="value" style="color:gray; margin-left:10px;">{{info.goods_desc}}</span> -->

              <span class="value" style="color:gray; margin-left:10px;" v-if="info.pay_order_number">支付订单:{{ info.pay_order_number}}</span>

              <span class="value" style="color:gray; margin-left:10px;" v-if="info.supplier">{{ info.supplier}}</span>

            </div>
          </div>
          <div class="attrs">
            <span>{{info.goods_desc}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="user-info-wrapper">
      <div class="user-info-content" v-if="info.user">
        <img class="headimg" :src="info.user.headimg" alt="">
        <div class="user-ame">{{ info.user.name }}</div>
        <div class="user-phone" style="margin-left: 16px;" v-if="info.user.phone">{{ info.user.phone }}</div>
        <div style="margin-left: 10px;">
          <a-tag color="red" v-if="info.user.client_type === 'ali'">天猫用户</a-tag>
        </div>
        <div class="address" v-if="info.address">
          <a href="javascript:;">
            <a-icon type="user" style="padding-right:4px;"></a-icon>
          </a>
          <span>{{ info.real_name}}&nbsp;&nbsp;</span>
          <span>{{ info.mobile }}</span>&nbsp;&nbsp;
          <span>{{ info.address }}</span>&nbsp;
          <!-- <a href="javascript:;" @click="handleSetAddress">
            <a-icon type="edit"></a-icon>
          </a> -->
        </div>
      </div>
    </div>
    <div class="remark">
      <div v-if="info.remark">订单备注：{{ info.remark }}</div>
      <!-- <div>
        <span>商家备注：{{ info.seller_remark || '无' }}</span>&nbsp;
        <a href="javascript:;" @click="handleSetRemark">
          <a-icon type="edit"></a-icon>
        </a>
      </div> -->
    </div>
    <div class="deliver" v-if="info.deliver_record">
      <span>订单发货:&nbsp;&nbsp;
        <template v-if="info.deliver_record.type === 'express'">
          {{ info.deliver_record.express_name }}&nbsp;&nbsp;{{ info.deliver_record.express_number }}
          <template v-if="info.deliver_record.remark">
            ({{info.deliver_record.remark}})
          </template>
        </template>
        <template v-else>
          (无需物流){{info.deliver_record.remark}}
        </template>
      </span>
      <span>&nbsp;&nbsp;{{info.deliver_record.updated_at}}</span>

      <a href="javascript:;" style="margin-left: 10px;" @click="handleEditDeliverInfo">
        <a-icon type="edit"></a-icon>
      </a>

    </div>

    <div class="aftersale" v-if="info.aftersale">
      <div>
        <span>售后进度：<a-tag :color="colorMap[info.aftersale.union_status]">{{ info.aftersale.union_status_text || '' }}</a-tag> </span>&nbsp;
        <span>{{ info.aftersale.reason || '' }}</span>&nbsp;
        <span>(发起于{{ info.aftersale.created_at || '' }})</span>&nbsp;
        <a-button size="small" style="margin-right: 10px" type="primary" @click="handleActions('查看售后')">
          <span>查看售后</span></a-button>
      </div>
    </div>

    <div class="actions">
      <template v-if="info.union_status==='deliver_pending'">
        <a-button size="small" style="margin-right: 10px" type="primary" @click="handleActions('订单发货')">
          <span>订单发货</span></a-button>
      </template>
      <template v-if="info.union_status==='close_pending'">
        <a-button size="small" type="danger" style="margin-right: 15px;" @click="handleActions('退款并关闭')">
          <span>同意退款</span></a-button>
        <a-button size="small" type="primary" @click="handleActions('取消退款')"><span>取消退款</span></a-button>
      </template>
      <!-- <template
        v-if="(info.union_status==='deliver_pending' || info.union_status==='delivered' || info.union_status === 'completed' || info.union_status === 'comment_pending') && info.miniapp_type !== 'ali'">
        <a-button size="small" style="margin-right: 10px" type="danger" @click="handleActions('退款并关闭')">
          <span>退款并关闭</span></a-button>
      </template> -->
      <!-- <template
        v-if="info.union_status==='deliver_pending' && info.type === 'package'">
        <a-button size="small" style="margin-right: 10px" type="danger" @click="handleActions('撤回物品仓库')">
          <span>撤回物品仓库</span></a-button>
      </template> -->
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name: 'OrderItem',
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        statusColors: {
          pay_pending: '#F56C6C',
          deliver_pending: '#E6A23C',
          delivered: '#1890FF',
          completed: '#67C23A',
          comment_pending: '#2BA246',
          closed: '#909399',
          close_pending: 'red'
        },
        visible: false,
        colorMap: {
          audit_rejected: 'red',
          completed: 'green'
        }
      }
    },
    filters: {
      dateFormat(value) {
        return moment(value).format('YYYY-MM-DD HH:mm')
      },
      priceToFixed(value) {
        return value ? (value / 100).toFixed(2) : '0.00'
      }
    },
    methods: {
      markOrder() {
        this.$emit('mark')
      },
      handleEditDeliverInfo() {
        this.$emit('edit-deliver-info')
      },
      handleSetAddress() {
        this.$emit('set-address')
      },
      handleSetRemark() {
        this.$emit('set-remark')
      },
      handleActions(type) {
        this.$emit('actions', type)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .star {
    cursor: pointer;
  }

  .line-through {
    text-decoration: line-through;
  }

  .order-item {
    border: 1px solid #E4E7ED;
    background-color: #fff;
    margin-bottom: 15px;

    .value {
      color: #111;
      padding-left: 4px;
    }

    .order-item-top {
      padding: 0 15px;
      height: 33px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #E4E7ED;

      &>div {
        margin-right: 15px;
        color: #909399;
        font-size: 14px;
      }
    }

    .products {
      padding-left: 40px;

      .product-item {
        padding: 10px 0;
        border-bottom: 1px solid #E4E7ED;
        display: flex;

        &:last-child {
          border-bottom: none;
        }

        .thumb {
          height: 50px;
        }

        .shang-title {
        	font-size: 80%;
        	font-weight: 500;
          background:  #FCF6D8;
          color: #F58348;
          padding: 2px 5px;
          // font-size: 24rpx;
          border-radius: 6px;
          margin-left: 10px;
        }

        .node-type-text {
        	font-size: 80%;
        	font-weight: 500;
          background:  #FCF6D8;
          color: #F58348;
          padding: 2px 5px;
          // font-size: 24rpx;
          border-radius: 6px;
          margin-left: 10px;
        }

        .content {
          margin-left: 10px;
          font-size: 14px;

          .attrs {
            color: #909399;
            font-size: 13px;
          }

          .meta {
            font-size: 13px;
          }

          .group-price-tag {
            display: none;
            color: #393939;
            font-size: 10%;
            padding: 2px 8px;
            border-radius: 50px;
            margin-right: 20px;
            background: #F1F1F1;
            background: #FA253B;
            color: white;
          }
        }
      }
    }

    .user-info-wrapper {
      padding: 0px 15px;

      .user-info-content {
        display: flex;
        align-items: center;

        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 5px;
        }

        .address {
          margin-left: 15px;
        }
      }
    }

    .remark {
      padding: 0 15px;
      margin-top: 10px;
    }

    .aftersale {
      padding: 0 15px;
      margin-top: 10px;
    }

    .actions {
      padding: 10px 15px;
    }

    .deliver {
      padding: 0 15px;
    }
  }
</style>
