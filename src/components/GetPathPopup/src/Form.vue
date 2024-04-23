<template>
  <div class="loading">
    <a-modal
      :title="title"
      style="top: 100px;"
      :visible.sync="visible"
      width="700px"
      @ok="visible = false"
      @cancel="visible = false"
    >
     <div>
       <span class="item-title">路径:</span>
       <span>{{path}}</span>
       <a-button class="copy-btn" @click="copyText(path)" type="primary" size="small">复制</a-button>

	    <a-button class="copy-btn" @click="showQrcode(path)" size="small">小程序码预览</a-button>
     </div>
     <div style="margin-top: 10px;">
       <span class="item-title">URL:</span>
       <span>{{url}}</span>
       <a-button class="copy-btn" @click="getUrl" type="primary" size="small" v-if="!url">点击获取</a-button>
       <a-button class="copy-btn" @click="copyText(url)" type="primary" size="small" v-else>复制</a-button>
     </div>
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
// import UploadVideo from '@/components/UploadVideo/UploadVideo'
import moment from 'moment'

export default {
  name: 'Form',
  components: {
    // UploadVideo
  },
  data () {
    return {
      visible: false,
      options: {},
      title: '预览/路径及链接',
      page: '',
      param: '',
      miniappCode: '',
      url: ''
    }
  },
  computed: {
    path () {
      return this.page + '?' + this.param
    },
    aliUrl () {
      return 'https://m.duanqu.com/?_ariver_appid=' + '3000000026610842' + '&page=' + encodeURIComponent(this.path)
      // return 'https://m.duanqu.com/?_ariver_appid=' + '3000000026610842' + '&page=' + encodeURIComponent(this.page) + '&query=' + encodeURIComponent(this.param)
    }
  },
  watch: {
    path () {
        this.miniappCode = ''
        this.url = ''
    }
  },
  methods: {
    parseOptions (options) {
      this.options = options
      this.page = options.page
      this.param = options.param
    },
    copyText (text)  {
       this.$copyText(text)
       this.$message.success('复制成功')
    },
    getUrl () {
      this.$http.post('/miniapp/url', {
         path: this.page,
         query: this.param
      }).then(res => {
        this.url = res.data.url
      })
    },
    showQrcode (path) {
      this.$http.get('/miniapp/qrcode', {
        params: {
          path: path
        }
      }).then(res => {
        this.miniappCode = res.data.info
      })
    }
  }
}
</script>
<style lang="scss">
.loading {
    width: 120px;
    height: 120px;
    position: fixed;
    top: 32%;
    left: 50%;
    margin-left: -60px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    z-index: 10000;
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.item-title {
  font-size: 130%;
  font-weight: bold;
  margin-right: 10px;
}
.loading svg {
  margin: 0 auto;
}
.copy-btn {
  margin-left: 20px;
}
.loading p {
  text-align: center;
  line-height: 30px;
  color: #eeeeee;
}

.image-c {
  text-align: center;
  .miniapp-code {
    width: 200px;
    border: 1px solid #e1e1e1;
    margin-top: 10px;
  }
}
</style>
