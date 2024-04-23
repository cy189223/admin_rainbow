<template>
  <div class="box">
    <div class="header-content">
      <a-input class="input" placeholder="输入关键字" allowClear />
      <a-button type="primary" icon="plus" @click="handleClick">创建盲盒</a-button>
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination" bordered style="margin-top:15px;">
      <a-table-column title="标题" dataIndex="title" key="title" width="200px" />
      <a-table-column title="封面" dataIndex="thumb" key="thumb" width="80px">
        <template slot-scope="thumb">
          <img class="img" v-if="thumb" :src="thumb">
        </template>
      </a-table-column>
      <a-table-column title="售价" dataIndex="price" key="price" width="80px">
        <template slot-scope="price">
          <span>{{ price && price/100 }}(元)</span>
        </template>
      </a-table-column>
      <a-table-column title="普通款" key="box_total" width="120px">
        <template slot-scope="row">
          <span>{{ row.box_total }}款</span>&nbsp;
          <a href="javascript:;" @click="handleProduct(row)">编辑</a>
        </template>
      </a-table-column>
      <a-table-column title="隐藏款" width="140px">
        <template slot-scope="row">
          <span>{{ row.hidden_skus_count }}款</span>&nbsp;
          <a href="javascript:;" @click="handleEditHiddenSku(row)">编辑</a>
        </template>
      </a-table-column>
      <!-- <a-table-column title="隐藏款" width="140px">
        <template slot-scope="row">
          <template v-if="row.hidden_title">
            <img class="img" :src="row.hidden_thumb"><br />
            <span>{{ row.hidden_title }}</span>&nbsp;
          </template>
          <a href="javascript:;" @click="editHidden(row)">编辑</a>
        </template>
      </a-table-column> -->
      <a-table-column title="创建房间数" key="total" width="100px">
        <template slot-scope="row">
          <span>{{ row.total }}个</span>
        </template>
      </a-table-column>
      <a-table-column title="隐藏款开关" width="100px">
        <template slot-scope="row">
          <ISwitch :value="row.is_has_hidden" :active="1" :unactive="0" @change="productStatusChange($event, row)" />
        </template>
      </a-table-column>
      <a-table-column title="上首页推荐" width="110px">
        <template slot-scope="row">
          <ISwitch :value="row.is_recommend" :active="1" :unactive="0" @change="updateProduct($event, row, {is_recommend: $event})" />
        </template>
      </a-table-column>
      <a-table-column title="开盒次数" key="is_presell" width="120px">
        <template slot-scope="row">
          <div>
            普通款: <a href="javascript:;" @click="checkOpenCount(row)">{{ row.open_count }}次</a>
          </div>
          <div>
            隐藏款: 0次</a>
          </div>
        </template>
      </a-table-column>
      <a-table-column title="权重(大靠前)" width="120px">
        <template slot-scope="row">
          <span>{{ row.list_weight }}</span> &nbsp&nbsp
          <a href="javascript:;" @click="editListWeight(row)">编辑</a>
        </template>
      </a-table-column>
      <a-table-column title="操作" key="action" width="150px">
        <template slot-scope="row">
          <span>
            <a href="javascript:;" @click="getPath(row)">预览/路径</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDelete(row)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>

    <a-modal :title="`编辑 “${current.title}” 中商品信息`" style="top: 100px;" :visible="visible" width="800px" @ok="handleOk"
      @cancel="handleCancel" :confirmLoading="confirmLoading">
      <a-table class="product-table" :rowKey="row => row.id" :dataSource="small_boxes" :loading="loading" bordered
        :pagination="false" size="small">
        <a-table-column title="序号" width="50px">
          <template slot-scope="text, record, index">
            <div>{{ index+1 }}</div>
          </template>
        </a-table-column>
        <a-table-column title="图片" key="thumb" width="100px">
          <template slot-scope="row">
            <UploadImages v-model="row.thumb" size="small"></UploadImages>
          </template>
        </a-table-column>
        <a-table-column title="标题" key="title" width="60px">
          <template slot-scope="row">
            <span>
              <a-input v-model="row.title" placeholder="请输入" style="width:200px;" />
            </span>
          </template>
        </a-table-column>
        <a-table-column title="编号" key="number" width="60px">
          <template slot-scope="row">
            <span>
              <a-input v-model="row.number" placeholder="请输入" style="width:200px;" />
            </span>
          </template>
        </a-table-column>
        <a-table-column title="已抽中次数" key="number" width="80px">
          <template slot-scope="row">
            <span>
              {{row.open_count}}次
            </span>
          </template>
        </a-table-column>
      </a-table>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleOk">
          保存
        </a-button>
      </template>
    </a-modal>

    <a-modal title="编辑隐藏款" width="1000px" :footer="null" @cancel="isEditHiddenSku = fetchData() || false" :visible="isEditHiddenSku">
      <div>
        <EditHiddenSku  @close="isEditHiddenSku = false" @refresh="fetchData" :uuid="editHiddenSkuUuid"></EditHiddenSku>
      </div>
    </a-modal>

    <a-modal title="编辑权重" style="top: 100px;" :visible="visible3" width="600px" :confirmLoading="confirmLoading">

      <a-form>
        <a-form-item label="权重">
          <a-input v-model="listWeight" placeholder="请输入" style="width:300px;" />
        </a-form-item>
      </a-form>

      <template slot="footer">
        <a-button key="back" @click="handleCancel3">取消</a-button>
        <a-button key="submit" type="primary" :loading="confirmLoading" @click="submitEditListWeight">
          关闭
        </a-button>
      </template>
    </a-modal>

  </div>
</template>
<script>
  import ISwitch from '@/components/ISwitch/ISwitch'
  import UploadImages from '@/components/UploadImages/UploadImages'
  import EditHiddenSku from './components/EditHiddenSku'

  import {
    OnOrOffProduct,
    getBoxList,
    deleteBox,
    updateBox,
    getBoxProductList,
    updateBoxProductList,
    updateHidden
  } from '@/api/box'
  export default {
    name: 'Box',
    components: {
      UploadImages,
      ISwitch,
      EditHiddenSku
    },
    data() {
      return {
        isEditHiddenSku: false,
        editHiddenSkuUuid: '',
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        list: [],
        page: 1,
        per_page: 10,
        total: 0,
        current: {},
        confirmLoading: false,
        loading: false,
        visible: false,
        visible2: false,
        visible3: false,
        listWeight: 99,
        small_boxes: [],
        hidden: {
          title: null,
          thumb: null,
          number: null
        }
      }
    },
    computed: {
      pagination() {
        return {
          defaultPageSize: this.per_page,
          defaultCurrent: this.page,
          total: this.total,
          pageSizeOptions: this.pageSizeOptions,
          showSizeChanger: true
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      getPath(row) {
        this.$getPathPopup.show({
          page: '/pages/luckDraw/index',
          param: 'uuid=' + row.uuid
        });
        // this.$confirm({
        //    title: '小程序路径',
        //    content: '/pages/luckDraw/index?uuid=' + row.uuid,
        //    okText: '确认',
        //    cancelText: '取消',
        //  })
      },
      productStatusChange(e, row) {
        this.loading = true
        OnOrOffProduct(e === 1 ? 'put_on_hidden' : 'put_off_hidden', row.uuid).finally(() => {
          this.$message.success('更新成功')
          this.fetchData()
        })
      },
      updateProduct(e, row, obj = {}) {
        this.loading = true
        let obj2 = {
          'list_weight': row.list_weight,
          ...obj
        }
        updateBox(row.uuid, obj2).then((res) => {
          this.fetchData()
          this.$message.success('更新成功')
        })
      },
      handleCancel() {
        this.visible = false
      },
      handleCancel2() {
        this.visible2 = false
      },
      handleCancel3() {
        this.visible3 = false
      },
      handleOk() {
        const smallBoxes = []
        this.small_boxes.forEach(item => {
          smallBoxes.push({
            title: item.title,
            thumb: item.thumb,
            number: item.number,
            id: item.id
          })
        })
        this.confirmLoading = true
        updateBoxProductList(
          this.current.uuid,
          smallBoxes
        ).then(res => {
          this.$message.success('已提交保存')
          this.visible = false
          this.fetchData()
        }).finally(() => {
          this.confirmLoading = false
        })
      },
      submitEditHidden() {
        updateHidden(this.current.uuid, {
          ...this.hidden
        }).then(res => {
          this.$message.success('已提交保存')
          this.visible2 = false
          this.fetchData()
        })
      },
      submitEditListWeight() {
        updateBox(this.current.uuid, {
          list_weight: this.listWeight
        }).then(res => {
          this.$message.success('保存成功')
          this.visible3 = false
          this.fetchData()
        })
      },
      handleProduct(row) {
        this.current = row
        this.loading = true
        this.visible = true
        getBoxProductList(row.uuid).then(res => {
          this.small_boxes = res.data.list
        }).finally(() => {
          this.loading = false
        })
      },
      // 编辑隐藏款
      handleEditHiddenSku(row) {
        this.editHiddenSkuUuid = row.uuid
        this.isEditHiddenSku = true
      },
      checkOpenCount(row) {
        this.current = row
        this.loading = true
        this.visible = true
        getBoxProductList(row.uuid).then(res => {
          this.small_boxes = res.data.list
        }).finally(() => {
          this.loading = false
        })
      },
      editListWeight(row) {
        this.current = row
        this.loading = true
        this.visible3 = true

        this.listWeight = row.list_weight
        // getBoxProductList(row.uuid).then(res => {
        //   this.small_boxes = res.data.list
        // }).finally(() => {
        //   this.loading = false
        // })
      },
      handleDelete(row) {
        this.$confirm({
          title: '提示',
          content: `确认删除 “${row.title}” ？`,
          onOk: () => {
            return new Promise((resolve, reject) => {
              deleteBox(row.uuid).then(res => {
                this.fetchData()
                resolve()
              }).catch(err => {
                reject(err)
              })
            })
          }
        })
      },
      handleClick() {
        this.$router.push({
          name: 'BoxCreate'
        })
      },
      handleEdit(row) {
        this.$router.push({
          name: 'BoxEdit',
          params: {
            uuid: row.uuid
          }
        })
      },
      onPaginationChange(e) {
        this.page = e.current
        this.per_page = e.pageSize
        this.fetchData()
      },
      fetchData() {
        this.loading = true
        getBoxList({
          page: this.page,
          per_page: this.per_page
        }).then(res => {
          this.list = res.data.list
          this.total = res.data.item_total
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box {
    // padding: 20px;
    background-color: #fff;
  }

  .header-content {
    .input {
      margin-right: 15px;
      width: 200px;
    }
  }

  .table {
    .img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
  }
</style>
