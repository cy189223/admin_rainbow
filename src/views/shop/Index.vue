<template>
  <div class="content-wrap">
    <div class="header-content" style="margin-bottom:20px;">
      <a-input
        class="input"
        placeholder="输入关键字"
        allowClear
        style="width:200px;margin-right:15px;"
      />


<!--       <span class="item">
        <span>分类：</span>
        <a-select class="select" v-model="category_id" allowClear placeholder="请选择" @change="fetchData">
          <a-select-option :value="item.id" v-for="item in categories" :key="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </span> -->

      <a-button type="primary" icon="plus" @click="handleNew">添加店铺</a-button>
    </div>
    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      :loading="loading"
      @change="onPaginationChange"
      bordered
    >
      <a-table-column
        title="店铺名称"
        dataIndex="title"
        key="title"
        width="200px"
      />
      <a-table-column
        title="logo"
        key="thumb"
        width="200px"
      >
        <template slot-scope="row">
          <img :src="row.logo" v-if="row.logo">
        </template>
      </a-table-column>
      <a-table-column
        title="地址"
        key="display_address"
        width="200px"
      >
        <template slot-scope="row">
          <span>{{ row.display_address }}</span>
        </template>
      </a-table-column>
      <a-table-column
        title="标签"
        key="tag"
        width="200px"
      >
        <template slot-scope="row">
          <a-tag color="blue" v-for="(item,index) in row.tags" :key="index">{{ item }}</a-tag>
        </template>
      </a-table-column>

      <a-table-column
        title="排序"
        key="weight"
        width="100px"
      >
        <template slot-scope="row">
          <div>
            <span>{{ row.list_weight || 0 }}&nbsp;</span>
            <a-popover title="排序权重" trigger="click" v-model="row.visible">
              <template slot="content">
                <div style="display:flex;">
                  <a-input v-model="listWeight" placeholder="请输入" autofocus style="margin-right:10px;width:120px;" size="small"></a-input>
                  <a-button type="primary" size="small" @click="handleUpdateListWeight(row)" :loading="loading3">保存</a-button>
                </div>
              </template>
              <span><a href="javascript:;"><a-icon type="edit"/></a></span>
            </a-popover>
          </div>
        </template>
      </a-table-column>

      <a-table-column
        title="客服"
        key="contact"
        width="200px"
      >
        <template slot-scope="row">
          <span>{{ row.contact_name }}<br/></span>
          <span>{{ row.contact_phone }}<br/></span>
        </template>
      </a-table-column>
      <a-table-column
        title="操作"
        key="action"
      >
        <template slot-scope="row">
          <span>
            <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDlete(row)">删除</a>
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
          label="店铺名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="form.title" placeholder="请输入"/>
        </a-form-item>
        <a-form-item
          label="logo"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <UploadImages v-model="form.logo" size="small"></UploadImages>
        </a-form-item>
        <a-form-item
          label="封面"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <UploadImages v-model="form.thumb" size="small"></UploadImages>
        </a-form-item>
        <!-- <a-form-item
          label="城市"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-cascader
            allowClear
            v-model="form.address"
            :options="options"
            placeholder="请选择"
            :fieldNames="fieldNames"
            style="width:300px;" />
        </a-form-item> -->

        <a-form-item
          label="所在镇村"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <AddressSelect :address.sync="form.address"></AddressSelect>
        </a-form-item>


        <a-form-item
          label="标签"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <Labels v-model="form.tags"></Labels>
        </a-form-item>
        <a-form-item
          label="地址"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="form.display_address" placeholder="请输入"/>
        </a-form-item>
        <a-form-item
          label="经度"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="form.longitude" placeholder="请输入"/>
        </a-form-item>
        <a-form-item
          label="纬度"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="form.latitude" placeholder="请输入"/>
        </a-form-item>
        <a-form-item
          label="客服名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="form.contact_name" placeholder="请输入"/>
        </a-form-item>
        <a-form-item
          label="客服电话"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="form.contact_phone" placeholder="请输入"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
    import { getCategoryList } from '@/api/categories'
import { getShopList, createShop, updateShop, deleteShop } from '@/api/shops'
import { createCitys } from '@/api/utilsData'
import UploadImages from '@/components/UploadImages/UploadImages'
import Labels from '@/components/Labels/Labels'
import AddressSelect from '@/components/AddressSelect/AddressSelect'
export default {
  name: 'Shops',
  components: {
    UploadImages,
    Labels,
    AddressSelect
  },
  data () {
    return {
      categories: [],
      category_id: null,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      list: [],
      page: 1,
      per_page: 10,
      total: 0,
      current: {},
      confirmLoading: false,
      loading: false,
      visible: false,
      actionType: 0,
      fieldNames: {
        label: 'text',
        value: 'value',
        children: 'children'
      },
      options: [],
      form: {
        address: {},
        title: '',
        logo: '',
        thumb: '',
        tags: [],
        contact_name: '',
        contact_phone: '',
        display_address: '',
        longitude: '',
        latitude: ''
      },
      loading2: false,
      listWeight: 99
    }
  },
  computed: {
    pagination () {
      return {
        defaultPageSize: this.per_page,
        defaultCurrent: this.page,
        total: this.total,
        pageSizeOptions: this.pageSizeOptions,
        showSizeChanger: true
      }
    },
    actionTitle () {
      return this.actionType === 0 ? '添加店铺' : '编辑店铺'
    }
  },
  async created () {
    this.$loading.show()
    this.fetchData()
    createCitys().then(res => {
      this.options = res.data.list
    })

    getCategoryList({
      type: 'cate'
    }).then(res => {
      this.categories = res.data.list
    })

  },
  methods: {
    handleUpdateListWeight (row) {
      this.loading3 = true
      updateShop(row.uuid, {
        list_weight: this.listWeight
      }).then(() => {
        this.fetchData()
        this.listWeight = ''
      }).finally(() => {
        this.loading3 = false
      })
      row.visible = true
    },
    handleNew () {
      this.form = {
        address: {
          'province': '44',
          'city': '4409',
          'area': '440983'
        },
        title: '',
        logo: '',
        thumb: '',
        tags: [],
        contact_name: '',
        contact_phone: '',
        display_address: '',
        longitude: '',
        latitude: ''
      }
      this.actionType = 0
      this.visible = true
    },
    handleOk () {
      this.confirmLoading = true
      if (this.actionType === 0) {
        createShop({
          ...this.form,
          address: undefined,
          ...this.form.address
          // province: this.form.address && this.form.address[0],
          // city: this.form.address && this.form.address[1]
        }).then(res => {
          this.visible = false
          this.fetchData()
        }).finally(() => {
          this.confirmLoading = false
        })
      } else {
        updateShop(this.current.uuid, {
          ...this.form,
          address: undefined,
          ...this.form.address
          // province: this.form.address && this.form.address[0],
          // city: this.form.address && this.form.address[1]
        }).then(res => {
          this.visible = false
          this.fetchData()
        }).finally(() => {
          this.confirmLoading = false
        })
      }
    },
    handleEdit (row) {
      this.current = row
      this.form = {
        address: {
          province: row.province,
          city: row.city,
          area: row.area,
          town: row.town,
          village: row.village
        },
        title: row.title,
        logo: row.logo,
        thumb: row.thumb || '',
        tags: row.tags || [],
        contact_name: row.contact_name,
        contact_phone: row.contact_phone,
        display_address: row.display_address,
        longitude: row.longitude,
        latitude: row.latitude
      }
      this.visible = true
      this.actionType = 1
    },
    handleDlete (row) {
      this.$confirm({
        title: '提示',
        content: `确认删除 “${row.title}” ？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            deleteShop(row.uuid).then(res => {
              this.fetchData()
              resolve()
            }).catch(err => {
              reject(err)
            })
          })
        }
      })
    },
    onPaginationChange (e) {
      this.page = e.current
      this.per_page = e.pageSize
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getShopList({
        page: this.page,
        per_page: this.per_page,
        category_id: this.category_id
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
.content-wrap {
  background-color: #fff;
}
.header-content {
  display: flex;
  flex-wrap: wrap;
}
.table {
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
}

.item {
  margin-right: 15px;
  .select {
    width: 200px;
  }
}
</style>
