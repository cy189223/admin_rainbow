<template>
  <div class="content-wrap">
    <div class="header-action" style="margin-bottom: 20px;">
      <a-button type="primary" icon="plus" @click="handlePlus">添加{{title}}</a-button>
      <span style="margin-left: 10px;" v-if="tips">{{tips}}</span>
      <span style="flex-grow: 1;"></span>
      <a-input-search placeholder="输入关键字" style="width: 200px" @search="onSearch" />
    </div>
    <a-table class="table" :rowKey="row => row.uuid" :dataSource="list" :pagination="pagination"
      @change="currentChange">

      <a-table class="expanded-table" slot="expandedRowRender" slot-scope="row" :rowKey="row => row.uuid"
        :dataSource="row.sub_categories" :pagination="false" v-if="subCategory">
        <a-table-column title="子分类" dataIndex="title" key="childTitle" />
        <a-table-column title="图片" key="thumb">
          <template slot-scope="childRow">
            <img class="thumb" :src="childRow.thumb" alt="">
          </template>
        </a-table-column>
        <!-- <a-table-column
          title="商品数量"
          key="sub_products_count"
        >
          <template slot-scope="childRow">
            <span>{{ childRow.products_count }}</span>
          </template>
        </a-table-column> -->
        <a-table-column title="操作" key="childAction">
          <template slot-scope="childRow">
            <span>
              <a href="javascript:;" @click="handleEdit(childRow, row.id)">编辑</a>
              <a-divider type="vertical" />
              <a href="javascript:;" @click="handleDlete(childRow, row.id)">删除</a>
            </span>
          </template>
        </a-table-column>
      </a-table>

      <a-table-column title="分类标题" dataIndex="title" key="title" />
      <a-table-column title="图片" key="thumb" v-if="isShowThumb">
        <template slot-scope="row">
          <img class="thumb" :src="row.thumb" alt="">
        </template>
      </a-table-column>
      <a-table-column title="子分类" key="children" v-if="subCategory">
        <template slot-scope="row">
          <span>{{ row.sub_categories.length }}</span>
        </template>
      </a-table-column>
      <!-- <a-table-column
        title="商品数量"
        key="products_count"
      >
        <template slot-scope="row">
          <span>{{ row.products_count }}</span>
        </template>
      </a-table-column> -->
      <a-table-column title="权重" key="list_weight">
        <template slot-scope="row">
          <span>{{ row.list_weight }}</span>
          <span @click="handleEditListWeight(row)" style="margin-left: 10px;"><a href="javascript:;">
              <a-icon type="edit" />
            </a></span>
        </template>
      </a-table-column>
      <a-table-column title="显示/隐藏">
        <template slot-scope="row">
          <ISwitch :value="row.is_listed" :active="1" :unactive="0" @change="listedStatusChange($event, row)" />
        </template>
      </a-table-column>

      <!-- <a-table-column>
        <div slot="title">
          显示分类内商品(小程序)
          <tips>不开启时，此分类内商品将不会显示在小程序上的商品列表内  (App端不受影响)</tips>
        </div>
        <template slot-scope="row">
          <ISwitch :value="row.is_show_product_miniapp" :active="1" :unactive="0"
            @change="isShowProductMiniappStatusChange($event, row)" />
        </template>
      </a-table-column> -->


      <a-table-column title="操作" key="action">
        <template slot-scope="row">
          <span>
            <a href="javascript:;" @click="handleEdit(row)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleDlete(row)">删除</a>
          </span>
        </template>
      </a-table-column>
    </a-table>
    <a-modal :title="actionTitle" style="top: 100px;" :visible="visible" width="600px" @ok="handleOk"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input placeholder="请输入" v-decorator="[
              'title',
              {rules: [{ required: true, message: '请输入标题' }]}
            ]" />
        </a-form-item>
        <!-- <a-form-item
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
        </a-form-item> -->
        <a-form-item label="封面图" :label-col="{ span: 5}" v-if="isShowThumb">
          <!-- <upload-images tips="建议尺寸: 400 * 400" v-model="thumb" size="small"></upload-images> -->
          <upload-images v-model="thumb" tips="建议尺寸 400*400" size="small"></upload-images>
        </a-form-item>
        <a-form-item label="父分类" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" v-if="subCategory">
          <a-select v-decorator="[
              'parent_id'
            ]" placeholder="空时为一级分类" allowClear>
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
    props: {
      type: {
        type: String
      },
      title: {
        type: String,
        default () {
          return '分类'
        }
      },
      tips: {
        type: String,
        default () {
          return ''
        }
      },
      isShowThumb: {
        type: Boolean
      },
      subCategory: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    components: {
      UploadImages,
      ISwitch
    },
    data() {
      return {
        loading: false,
        list: [],
        page: 1,
        per_page: 10,
        total: 0,
        thumb: '',
        visible: false,
        form: this.$form.createForm(this),
        current: {},
        actionType: 0 // 0为创建分类，1为编辑分类
      }
    },
    watch: {
      type() {
        this.page = 1
        this.fetch()
      }
    },
    computed: {
      pagination() {
        return {
          defaultPageSize: this.per_page,
          defaultCurrent: this.page,
          total: this.total
        }
      },
      actionTitle() {
        return (this.actionType === 0 ? '创建' : '编辑') + this.title
      }
    },
    created() {
      this.fetch()
    },
    methods: {
      isShowProductMiniappStatusChange(e, row) {
        this.updateCategory(row.uuid, {
          is_show_product_miniapp: e
        })
      },
      listedStatusChange(e, row) {
        this.updateCategory(row.uuid, {
          is_listed: e
        })
      },
      currentChange(pagination) {
        console.log(pagination)
        this.page = pagination.current
        this.fetch()
      },
      onSearch(value) {
        console.log(value)
      },
      handleDlete(row) {
        this.$confirm({
          title: '提示',
          content: `确认删除分类 “${row.title}” ？`,
          onOk: () => {
            this.$http.delete(`/${this.type}/categories/${row.uuid}`).then(res => {
              this.fetch()
            })
            // this.$api.emit('category.destory', row.uuid).then(res => {
            //     this.fetch()
            // })
          }
        })
      },
      handleEditListWeight(row) {
        this.$globalForm.show({
          title: '编辑排序',
          items: [{
            type: 'number',
            key: 'list_weight',
            title: '排序',
            default: row.list_weight,
            required: true
          }, ],
          success: (data) => {
            this.updateCategory(row.uuid, data).then(res => {
              this.$message.success('保存成功');
              this.$globalForm.hide()
            })
          }
        })
      },
      handleEdit(row, id) {
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
      handleOk() {
        this.form.validateFields((err, values) => {
          if (!err) {
            const sendData = {
              title: values.title,
              parent_id: values.parent_id,
              sub_title: values.sub_title,
              thumb: this.thumb
            }
            if (this.actionType === 0) {
              this.$http.post(`/${this.type}/categories`, {
                ...sendData
              }).then(res => {
                this.visible = false
                this.fetch()
              })
            } else {
              this.updateCategory(this.current.uuid, sendData)
            }
          }
        })
      },
      updateCategory(uuid, data) {
        return this.$http.put(`/${this.type}/categories/${uuid}`, {
          type: 'update',
          attributes: data
        }).then(res => {
          this.visible = false
          this.fetch()
        })
      },
      handleCancel() {
        this.visible = false
      },
      handlePlus() {
        this.visible = true
        this.actionType = 0
        this.thumb = ''
        this.form.resetFields()
      },
      fetch() {
        this.$http.get(`/${this.type}/categories`, {
          params: {
            page: this.page,
            per_page: this.per_page
          }
        }).then(res => {
          this.list = res.data.list
          this.total = res.data.item_total
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
