<template>
  <div class="content-wrap">
    <div style="margin-bottom: 20px;">
      <a-button type="primary" icon="plus" @click="plusRoles">添加角色</a-button>
    </div>
    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <a-table-column
        title="名称"
        dataIndex="name"
        key="name"
      />
      <a-table-column
        title="描述"
        dataIndex="description"
        key="description"
      />
      <a-table-column
        title="权限"
        dataIndex="perm_codes"
        key="perm_codes"
      >
        <template slot-scope="perm_codes">
          <span>{{ getPermissionText(perm_codes) }}</span>
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
          label="角色名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入角色名称' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="角色描述"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            :autosize="{ minRows: 2, maxRows: 6 }"
            v-decorator="[
              'description'
            ]"
          />
        </a-form-item>
        <a-form-item
          label="角色权限"
          :label-col="{ span: 5 }"
        >
          <a-checkbox-group :options="getPermissions()" v-model="checkedList">
            <span slot="label" slot-scope="{value}">{{ value }}</span>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { getRoleList, createRole, updateRole, deleteRole } from '@/api/manage'
import permissions from '@/utils/permissions'
export default {
  name: 'Roles',
  data () {
    return {
      loading: false,
      list: [],
      page: 1,
      per_page: 10,
      total: 0,
      visible: false,
      form: this.$form.createForm(this),
      checkedList: [],
      currentRole: {},
      actionType: 0 // 0为创建角色，1为编辑角色
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
      return this.actionType === 0 ? '创建角色' : '编辑角色'
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    getPermissions () {
      const arr = []
      Object.keys(permissions).forEach((item) => {
        arr.push({
          value: item,
          label: permissions[item]
        })
      })
      return arr
    },
    getPermissionText (codes) {
      const arr = []
      codes.forEach(item => {
        arr.push(permissions[item])
      })
      return arr.join('、')
    },
    handleDlete (row) {
      this.$confirm({
        title: '提示',
        content: `确认删除角色 “${row.name}” ？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            deleteRole(row.uuid).then(res => {
              this.fetch()
              resolve()
            }).catch(err => {
              reject(err)
            })
          })
        }
      })
    },
    handleEdit (row) {
      this.visible = true
      this.actionType = 1
      this.currentRole = row
      this.$nextTick(() => {
        this.form.setFields({
          name: {
            value: row.name
          },
          description: {
            value: row.description
          }
        })
      })
      this.checkedList = JSON.parse(JSON.stringify(row.perm_codes))
    },
    handleOk () {
      this.form.validateFields(['name', 'description'], { force: true }, (err, values) => {
        if (!err) {
          const sendData = {
            name: values.name,
            description: values.description,
            perms: this.checkedList
          }
          if (this.actionType === 0) {
            createRole(sendData).then(res => {
              this.visible = false
              this.fetch()
            })
          } else {
            updateRole(sendData, this.currentRole.uuid).then(res => {
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
    plusRoles () {
      this.visible = true
      this.actionType = 0
      this.checkedList = []
      this.form.resetFields()
    },
    handleTableChange (pagination, filters, sorter) {
      this.page = pagination.current
      this.fetch()
    },
    fetch () {
      this.loading = true
      getRoleList({
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
.table {
  background-color: #fff;
}
</style>
