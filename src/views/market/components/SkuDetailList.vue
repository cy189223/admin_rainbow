<template>
  <a-modal title="转售商品" style="top: 100px;" :visible="isShow" width="800px" @ok="handleCancel" @cancel="handleCancel"
    okText="关闭">
    <div class="list">
      <div class="item" v-for="(item, index) in info.package_skus">
        <img :src="item.thumb  + '?x-oss-process=image/resize,w_400'" class="thumb" style="margin-right: 10px;" />
        <div class="total">{{item.total}}件</div>
        <div>
          <div class="title" style="font-weight: 500; font-size: 110%;">
            {{item.title}}
            <a-tag v-if="item.sku_type_text === 'virtual_asset'" color='orange'>虚拟资产</a-tag>
          </div>
          <!-- <div>【{{row.sid}}】</div> -->
          <div>
            <PriceDisplay :info="item"></PriceDisplay>
          </div>
        </div>
      </div>
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
      isShow: {
        type: Boolean
      },
      info: {
        type: Object
      }
    },
    computed: {

    },
    data() {
      return {
        form: {},
        itemTotal: 0
      }
    },
    watch: {},
    mounted() {
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

  .list {
    display: flex;
    // border: 1px solid red;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .item {
    margin-top: 10px;
    position: relative;
    // border: 1px solid #f1f1f1;
  }

  .total {
    position: absolute;
    top: 10px;
    right: 20px;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0px 10px;
  }

  .thumb {
    height: 110px;
    width: 110px;
    border-radius: 6px;
    object-fit: contain;
  }

  .title {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>
