<template>
  <div class="container">

    <div class="tips-c">
      系统仅支持二级分销佣金。可同时设置红包佣金和积分佣金
      <br/>详细说明文档请参考这里: <a href="https://www.yuque.com/u1307645/mwy3k3/hvtg6t" target="_blank">分销佣金详细说明</a>
    </div>

    <a-table class="table" :rowKey="row => row.node_type" :dataSource="list">
      <a-table-column title="商品范围" width="60px">
        <template slot-scope="row">
          <div>{{row.node_type_text}}</div>
        </template>
      </a-table-column>
      <a-table-column title="开启佣金" width="60px">
        <template slot-scope="row">
          <i-switch :active="row.active || 1" v-model="row.is_enabled"></i-switch>
        </template>
      </a-table-column>

      <a-table-column title="作为直接上级时的佣金率" width="100px" v-if="!info.is_agent_leader">
        <template slot-scope="row">
          <div>
            积分: <a-input-number placeholder="不填则为0" size="small" style="width: 100px;" v-model="row.direct_score_ratio"></a-input-number> %
          </div>
          <div style="margin-top: 10px;">
            人民币: <a-input-number placeholder="不填则为0" size="small" style="width: 100px;" v-model="row.direct_money_ratio"></a-input-number> %
          </div>
        </template>
      </a-table-column>
      <a-table-column title="作为间接上级时佣金率" width="100px" v-if="!info.is_agent_leader">
        <template slot-scope="row">
          <div>
            积分: <a-input-number placeholder="不填则为0" size="small" style="width: 100px;" v-model="row.indirect_score_ratio"></a-input-number> %
          </div>
          <div style="margin-top: 10px;">
            人民币: <a-input-number placeholder="不填则为0" size="small" style="width: 100px;" v-model="row.indirect_money_ratio"></a-input-number> %
          </div>
        </template>
      </a-table-column>
      
      <a-table-column title="团队长佣金率" width="100px" v-if="info.is_agent_leader">
        <template slot-scope="row">
          <div>
            积分: <a-input-number placeholder="不填则为0" size="small" style="width: 100px;" v-model="row.leader_score_ratio"></a-input-number> %
          </div>
          <div style="margin-top: 10px;">
            人民币: <a-input-number placeholder="不填则为0" size="small" style="width: 100px;" v-model="row.leader_money_ratio"></a-input-number> %
          </div>
        </template>
      </a-table-column>

      <a-table-column title="单件佣金上限" width="100px">
        <template slot-scope="row">
          <div>
            积分: <a-input-number placeholder="空或0为不限制" size="small" style="width: 120px;" v-model="row.score_max_limit"></a-input-number>
          </div>
          <div style="margin-top: 10px;">
            人民币: <iPrice placeholder="不填则为0" size="small" style="width: 120px;" v-model="row.money_max_limit"></iPrice>
          </div>
        </template>
      </a-table-column>
    </a-table>

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
  import iSwitch from '@/components/ISwitch/ISwitch'
  import iPrice from '@/components/IForm/components/IPrice'

  export default {
    components: {
      iSwitch,
      iPrice
      // AttrEditor
    },
    data() {
      return {
        info: {},
        list: []
      }
    },
    computed: {
    },
    props: {
      uuid: {
        type: String
      }
    },
    created() {
      this.$http.get(`/agent-levels/${this.uuid}`).then(res => {
        this.list = res.data.info.brokerage_setting || []
        this.info = res.data.info
        // this.$set(this.form, 'return_type', this.form.return_type || 'money')
        // this.form.return_type = this.form.return_type || 'money'
      })
    },
    mounted() {},
    watch: {},
    methods: {
      cancel() {
        this.$router.back(-1)
      },
      submit() {
        this.$http.put(`/agent-levels/${this.uuid}`, {
          type: 'update_brokerage_setting',
          setting: this.list
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

  .tips-c {
    margin-bottom: 20px;
    font-weight: 500;
  }
</style>
