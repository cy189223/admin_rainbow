<template>
  <div class="page-content">
    <template v-if="isInit">

      <div>
        <span style="font-weight: 500;">邀请奖励:</span>
      </div>

      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="基础奖励">

          <div class="desc">每邀请一个新用户注册时，邀请人可获得以下奖励：<br />（不勾选则无奖励，多选则同时奖励勾选的资产）</div>
          <AssetInput v-model="setting.base_reward"></AssetInput>

        </a-tab-pane>
        <a-tab-pane key="2" tab="额外奖励" force-render>

          <div class="desc">可以设置分阶段的额外奖励</div>

          <div class="item" v-for="(item, index) in setting.option_reward">
            <div class="desc">
              <div class="index-circle">{{index + 1}}</div>
              当邀请人数达到
              <a-input size="small" class="number-input" v-model.number="setting.option_reward[index].value" />
              人时，额外奖励:
            </div>
            <AssetInput v-model="setting.option_reward[index].asset"></AssetInput>
          </div>

          <div>
            <a-button size="small" @click="addItem" type="primary">增加一项</a-button>
            <a-button size="small" @click="removeItem" style="margin-left: 20px;">删除一项</a-button>
          </div>

        </a-tab-pane>
      </a-tabs>

      <div style="margin-top: 60px;">
        <div style="font-weight: 500; margin-bottom: 6px;">每日限制:</div>
        <div>
          每人每日最多可邀请
          <a-input-number v-model="setting.max_invite_per_day"></a-input-number>
          人
        </div>
        <div style="font-size: 90%; color: gray;">填0或不填则表示不限制，超出当日限制后将不绑定上下级关系</div>
      </div>

      <div style="margin-top: 60px;">
        <div style="font-weight: 500; margin-bottom: 6px;">佣金有效期:</div>
        <div>
          邀请后仅对
          <a-input-number v-model="setting.brokerage_timeout"></a-input-number>
          小时内的订单计算佣金
        </div>
        <div style="font-size: 90%; color: gray;">填0或不填则表示不限制时间</div>
      </div>

      <div class="action">
        <a-button class="btn" type="primary" @click="submit">保存设置</a-button>
      </div>

    </template>

  </div>
</template>
<script>
  import IForm from "@/components/IForm"
  import AssetInput from "@/components/IForm/components/AssetInput"
  export default {
    components: {
      IForm,
      AssetInput
    },
    data() {
      return {
        isInit: false,
        setting: {
          brokerage_timeout: 0,
          base_reward: {},
          option_reward: []
        }
      }
    },
    computed: {},
    created() {},
    mounted() {
      this.$http({
        url: '/setting/sys/invite',
        method: 'get',
        data: {}
      }).then(res => {
        // console.log('res ===>', res)

        let temp = res.data.setting || {}

        this.setting = {
          ...this.setting,
          ...temp,
        }

        this.isInit = true


        // this.setting = res.data.setting
        // this.setting = {
        //   ...this.setting,
        //   ...temp,
        // }

        // console.log('api fetch ===>', temp.option_reward[1])
        // console.log('api fetch ===>', this.setting)
      })
    },
    methods: {
      addItem() {
        this.setting.option_reward.push({
          value: 0,
          asset: {}
        })
      },
      removeItem() {
        this.setting.option_reward.pop()
      },
      submit() {
        this.$http({
          url: '/setting/sys/invite',
          method: 'post',
          data: {
            setting: this.setting
          }
        }).then(res => {
          this.$message.success('保存成功')
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-content {
    // margin-top: 10px;
    padding-bottom: 20px;
    padding-left: 20px;
  }

  .title {
    font-weight: 500;
    font-size: 20px;
  }

  .desc {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .item {
    margin-bottom: 30px;

    .index-circle {
      border: 1px solid #999;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: inline-block;
      text-align: center;
      line-height: 20px;
    }
  }

  .number-input {
    width: 80px;
    margin: 0px 4px;
  }

  .action {
    margin-top: 50px;
  }

  .asset-input {
    margin-left: 20px;
  }
</style>
