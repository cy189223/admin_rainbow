<template>
  <div class="container">

    <h3>获取小程序码</h3>
    <a-input v-model="path" placeholder="请输入路径, 不填则为首页" style="width: 400px; margin-right: 10px;"></a-input>
    <a-button type="primary" @click="getQrcode">获取</a-button>

    <h3 style="margin-top: 30px;">常用路径</h3>

    <ul class="path-list">
      <li v-for="(item, index) in systemPathList">
        <span class="left">{{item.title}}</span>
        <span class="right">{{item.path}}</span>
      </li>
    </ul>

    <a-modal
      style="top: 100px;"
      :visible.sync="visible"
      width="700px"
      @ok="visible = false"
      @cancel="visible = false"
    >
     <div class="image-c" v-if="miniappCode">
       <img :src="'data:image/png;base64,' + miniappCode" class="miniapp-code">
     </div>
     <!-- <div style="margin-top: 10px;">
       <span class="item-title">淘宝:</span>
       <a :href="aliUrl" target="_blank">{{aliUrl}}</a>
       <a-button class="copy-btn" @click="copyText(aliUrl)" type="primary" size="small">复制</a-button>
     </div> -->
    </a-modal>

  </div>
</template>

<script>
  // import AttrEditor from "./components/AttrEditor"

  import IPage from "@/components/IPage"

  const resourceType = 'activity_home'

  export default {
    components: {
      IPage
    },
    data() {
      return {
        systemPathList: [],
        path: '',
        visible: false
      }
    },
    computed: {
    },
    created() {
      this.getSystemPathList()
    },
    mounted() {

    },
    watch: {},
    methods: {
      getSystemPathList() {
        this.$http.get('/paths').then(res => {
          this.systemPathList = res.data.list
        })
      },
      cancel() {
        this.$router.back(-1)
      },
      submit() {
        this.$http.post(`/setting/ui/${resourceType}`, {
          setting: this.page
        }).then(res => {
          this.$message.success('保存成功')
        })
      },
      getQrcode() {
          this.$http.get('/miniapp/qrcode', {
            params: {
              path: this.path || '/pages/index/index'
            }
          }).then(res => {
            this.miniappCode = res.data.info

            this.visible = true
          })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: 120px;
  }

  .container {
    .btn {
      margin-right: 30px;
    }
  }

  .path-list {
    li {
      margin-bottom: 10px;
    }
    .right {
      margin-left: 50px;
    }
  }
  .action-c {
    margin-top: 20px;
  }
</style>
