<template>
  <div class="content-wrap">
    <div class="header-action" style="margin-bottom: 20px;">
      <a-button type="primary" icon="plus" @click="handlePlus">添加分类</a-button>
      <a-input-search
        placeholder="输入关键字"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      :loading="loading"
    >
      <a-table
        class="expanded-table"
        slot="expandedRowRender"
        slot-scope="row"
        :rowKey="row => row.uuid"
        :dataSource="row.sub_categories"
        :pagination="false"
      >
        <a-table-column
          title="子分类"
          dataIndex="title"
          key="childTitle"
        />
        <a-table-column
          title="图片"
          key="thumb"
        >
          <template slot-scope="childRow">
            <img class="thumb" :src="childRow.thumb" alt="">
          </template>
        </a-table-column>
        <a-table-column
          title="商品数量"
          key="sub_products_count"
        >
          <template slot-scope="childRow">
            <span>{{ childRow.products_count }}</span>
          </template>
        </a-table-column>
        <a-table-column
          title="操作"
          key="childAction"
        >
          <template slot-scope="childRow">
            <span>
              <a href="javascript:;" @click="handleEdit(childRow, row.id)">编辑</a>
              <a-divider type="vertical" />
              <a href="javascript:;" @click="handleDlete(childRow, row.id)">删除</a>
            </span>
          </template>
        </a-table-column>

      </a-table>
      <a-table-column
        title="分类标题"
        dataIndex="title"
        key="title"
      />
      <a-table-column
        title="图片"
        key="thumb"
      >
        <template slot-scope="row">
          <img class="thumb" :src="row.thumb" alt="">
        </template>
      </a-table-column>
      <a-table-column
        title="子分类"
        key="children"
      >
        <template slot-scope="row">
          <span>{{ row.sub_categories.length }}</span>
        </template>
      </a-table-column>
      <a-table-column
        title="商品数量"
        key="products_count"
      >
        <template slot-scope="row">
          <span>{{ row.products_count }}</span>
        </template>
      </a-table-column>
      <a-table-column
        title="是否推送到商城首页"
        key="is_home"
      >
        <template slot-scope="row">
          <ISwitch :value="row.is_home" :active="1" :unactive="0" @change="statusChange($event, row)"/>
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
      @cancel="handleCancel"
    >
      <a-form
        :form="form"
      >
        <a-form-item
          label="标题"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            placeholder="请输入"
            v-decorator="[
              'title',
              {rules: [{ required: true, message: '请输入标题' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="副标题"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            placeholder="请输入"
            v-decorator="[
              'sub_title'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="封面图"
          :label-col="{ span: 5 }"
        >
          <upload-images tips="建议尺寸: 400 * 400" v-model="thumb" size="small"></upload-images>
        </a-form-item>
        <a-form-item
          label="父分类"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'parent_id'
            ]"
            placeholder="空时为一级分类"
            allowClear
          >
            <a-select-option :value="item.id" v-for="item in list" :key="item.id">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
// import { getCategoryList, createCategory, updateCategory, deleteCategory } from '@/api/category'
import UploadImages from '@/components/UploadImages/UploadImages'
import ISwitch from '@/components/ISwitch/ISwitch'
export default {
  name: 'Category',
  components: {
    UploadImages,
    ISwitch
  },
  data () {
    return {
      loading: false,
      list: [],
      page: 1,
      per_page: 10,
      total: 0,
      visible: false,
      form: this.$form.createForm(this),
      thumb: '',
      current: {},
      actionType: 0 // 0为创建分类，1为编辑分类
    }
  },
  computed: {
    pagination () {
      return {
        defaultPageSize: this.per_page,
        defaultCurrent: this.page,
        total: this.total
      }
    },
    actionTitle () {
      return this.actionType === 0 ? '创建分类' : '编辑分类'
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    statusChange (e, row) {
      this.loading = true
      this.$api.emit('category.update', row.uuid, {
        is_home: e
      }).then(res => {
        this.fetch()
      })
    },
    onSearch (value) {
      console.log(value)
    },
    handleDlete (row) {
      this.$confirm({
        title: '提示',
        content: `确认删除分类 “${row.title}” ？`,
        onOk: () => {
          this.$api.emit('category.destory', row.uuid).then(res => {
              this.fetch()
          })
        }
      })
    },
    handleEdit (row, id) {
      this.visible = true
      this.actionType = 1
      this.current = row
      this.$nextTick(() => {
        this.form.setFields({
          title: {
            value: row.title
          },
          parent_id: {
            value: id || ''
          },
          sub_title: {
            value: row.sub_title || ''
          }
        })
        this.thumb = row.thumb
      })
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const sendData = {
            title: values.title,
            parent_id: values.parent_id,
            sub_title: values.sub_title,
            thumb: this.thumb
          }
          if (this.actionType === 0) {
            this.$api.emit('category.store', sendData).then(res => {
              this.visible = false
              this.fetch()
            })
          } else {
            this.$api.emit('category.update', this.current.uuid, sendData).then(res => {
              this.visible = false
              this.fetch()
            })
          }
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    handlePlus () {
      this.visible = true
      this.actionType = 0
      this.thumb = ''
      this.form.resetFields()
    },
    fetch () {
      this.loading = true
      this.$api.emit('category.list', {
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
<style lang="less" scoped>
.content-wrap {
  background-color: #fff;
}
.table {
  background-color: #fff;

  .thumb {
    height: 50px;
    width: auto;
  }
}
.header-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
