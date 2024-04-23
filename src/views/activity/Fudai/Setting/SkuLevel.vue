<template>
  <div class="container">

    <a-table class="product-table" :rowKey="row => row.id" :dataSource="setting.list" style="width:800px" bordered :pagination="false" size="small">
      <a-table-column title="序号" width="20px">
        <template slot-scope="text, record, index">
          <div>等级{{ index+1 }}</div>
        </template>
      </a-table-column>
      <a-table-column title="标题" key="thumb" width="80px">
        <template slot-scope="row">
          <a-input v-model="row.title"></a-input>
          <!-- {{row.title}} -->
        </template>
      </a-table-column>
      <a-table-column title="图标" key="odds" width="40px">
        <template slot-scope="row">
          <UploadImages size="small" v-model="row.icon" :isShowTips="false"></UploadImages>
          <!-- <a-input v-model.number="row.odds" style="width: 100px;"></a-input> % -->
          <!-- {{row.title}} -->
        </template>
      </a-table-column>
      <!-- <a-table-column title="上下架" width="80px">
        <template slot-scope="row">
          <span>
            <i-switch :active="row.status || 1" v-model="row.status" size="small"></i-switch>
          </span>
        </template>
      </a-table-column> -->
    </a-table>

    <div class="btn-c" style="margin-top: 30px;">
      <a-button key="submit" type="primary" @click="submitSave">
        保存
      </a-button>
    </div>

  </div>
</template>

<script>
  // import AttrEditor from "./components/AttrEditor"
  // import IForm from "@/components/IForm"
  import UploadImages from '@/components/UploadImages/UploadImages'

  const resourceType = 'fudai_sku_level'

  export default {
    components: {
      UploadImages
      // AttrEditor
    },
    data() {
      return {
        uuid: '',
        setting: {},
        // list: []
      }
    },
    computed: {
    },
    created() {
      this.$http.get(`/setting/sys/${resourceType}`).then(res => {
        this.setting = res.data.setting && res.data.setting || {
          "list": [
            {
              title: "",
              icon: ""
            },
            {
              title: "",
              icon: ""
            },
            {
              title: "",
              icon: ""
            },
            {
              title: "",
              icon: ""
            },
            {
              title: "",
              icon: ""
            }
          ]
        }
      })
    },
    mounted() {
    },
    watch: {},
    methods: {
      cancel() {
        this.$router.back(-1)
      },
      submitSave() {
        this.$http.post(`/setting/sys/${resourceType}`, {
          setting: this.setting
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
