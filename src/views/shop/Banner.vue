<template>
  <div class="content-wrap">
    <a-button type="primary" icon="plus" style="margin-bottom:15px;" @click="handleNew">添加</a-button>
    <a-table
      class="table"
      :rowKey="row => row.swiper"
      :dataSource="list"
      :pagination="false"
      :loading="loading"
      bordered
    >
      <a-table-column
        title="图片"
        key="thumb"
        width="200px"
      >
        <template slot-scope="row">
          <img :src="row.swiper" v-if="row.swiper">
        </template>
      </a-table-column>
      <a-table-column
        title="绑定商品"
        dataIndex="id"
        key="id"
        width="200px"
      />
      <a-table-column
        title="操作"
        key="action"
      >
        <template slot-scope="text, record, index">
          <span>
            <a href="javascript:;" @click="up(index)">上移</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="down(index)">下移</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleEdit(record, index)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDlete(index)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>
    <a-modal
      :title="actionTitle"
      style="top: 100px;"
      :visible="visible"
      width="600px"
      @ok="handleOk"
      @cancel="visible = false"
    >
      <a-form>
        <a-form-item
          label="图片"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <UploadImages v-model="form.swiper" size="small"></UploadImages>
        </a-form-item>
        <a-form-item
          label="绑定商品"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select v-model="form.id" placeholder="请选择">
            <a-select-option :value="item.uuid" v-for="item in list2" :key="item.id">{{ item.title }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { getProductBanner, setProductBanner } from '@/api/swiper'
import UploadImages from '@/components/UploadImages/UploadImages'
import { getProductList } from '@/api/products'
export default {
  name: 'ShopBanner',
  components: {
    UploadImages
  },
  data () {
    return {
      list: [],
      currentIndex: 0,
      current: {},
      confirmLoading: false,
      loading: false,
      actionType: 0,
      form: {
        swiper: '',
        id: undefined
      },
      list2: [],
      visible: false
    }
  },
  computed: {
    actionTitle () {
      return this.actionType === 0 ? '添加轮播图' : '编辑轮播图'
    }
  },
  created () {
    this.fetchData()
    getProductList().then(res => {
      this.list2 = res.data.list
    })
  },
  methods: {
    up (index) {
      if (index > 0) {
        const temp = JSON.parse(JSON.stringify(this.list))
        const current = temp[index]
        temp.splice(index, 1)
        temp.splice(index - 1, 0, current)

        this.loading = true
        setProductBanner({
          swiper: [...temp]
        }).then(res => {
          this.fetchData()
        }).finally(() => {
          this.loading = false
        })
      }
    },
    down (index) {
      if (index < this.list.length - 1) {
        const temp = JSON.parse(JSON.stringify(this.list))
        const current = temp[index]
        temp.splice(index, 1)
        temp.splice(index + 1, 0, current)

        this.loading = true
        setProductBanner({
          swiper: [...temp]
        }).then(res => {
          this.fetchData()
        }).finally(() => {
          this.loading = false
        })
      }
    },
    handleNew () {
      this.visible = true
      this.form = {
        swiper: '',
        id: undefined
      }
      this.actionType = 0
    },
    handleOk () {
      this.confirmLoading = true
      if (this.actionType === 0) {
        setProductBanner({
          swiper: [...this.list, this.form]
        }).then(res => {
          this.fetchData()
          this.visible = false
        }).finally(() => {
          this.confirmLoading = false
        })
      } else {
        const temp = JSON.parse(JSON.stringify(this.list))
        temp.splice(this.currentIndex, 1, this.form)
        setProductBanner({
          swiper: [...temp]
        }).then(res => {
          this.fetchData()
          this.visible = false
        }).finally(() => {
          this.confirmLoading = false
        })
      }
    },
    handleEdit (row, index) {
      this.currentIndex = index
      this.form = {
        id: row.id,
        swiper: row.swiper
      }
      this.actionType = 1
      this.visible = true
    },
    handleDlete (index) {
      this.$confirm({
        title: '提示',
        content: `确认删除 ？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            const temp = JSON.parse(JSON.stringify(this.list))
            temp.splice(index, 1)
            setProductBanner({
              swiper: [...temp]
            }).then(res => {
              this.fetchData()
              resolve()
            }).finally(err => {
              reject(err)
            })
          })
        }
      })
    },
    fetchData () {
      this.loading = true
      getProductBanner().then(res => {
        this.list = res.data.swiper || []
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content-wrap {
  padding: 20px;
  background-color: #fff;
}
.table img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
