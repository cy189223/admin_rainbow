<template>
  <div class="content-wrap">
    <div style="margin-bottom: 20px;">
      <a-button type="primary" icon="plus" @click="plusAdmins">添加管理员</a-button>
    </div>
    <a-table
      class="table"
      :rowKey="row => row.uuid"
      :dataSource="list"
      :pagination="pagination"
      :loading="loading"
    >
      <a-table-column
        title="名称"
        dataIndex="name"
        key="name"
      />
      <a-table-column
        title="手机号"
        dataIndex="phone"
        key="phone"
      />
      <a-table-column
        title="角色"
        dataIndex="roles"
        key="roles"
      >
        <template slot-scope="roles">
          <span>{{ getRolesText(roles) }}</span>
        </template>
      </a-table-column>
      <a-table-column
        title="最后活跃"
        dataIndex="last_active_at"
        key="last_active_at"
      >
        <template slot-scope="last_active_at">
          <span>{{ last_active_at | formatDate }}</span>
        </template>
      </a-table-column>
      <a-table-column
        title="操作"
        key="action"
      >
        <template slot-scope="row">
          <span>
            <a href="javascript:;" @click="handleResetPassword(row)">重设密码</a>
            <a-divider type="vertical" />
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
          label="名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入名称' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'phone',
              {rules: [{ required: true, message: '请输入手机号' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="密码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          v-if="actionType===0"
        >
          <a-input
            type="password"
            v-decorator="[
              'password',
              {rules: [{ required: true, message: '请输入密码' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="角色"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            mode="multiple"
            v-decorator="[
              'roles',
              {rules: [{ required: true, message: '请选择管理员角色' }]}
            ]"
            placeholder="选择角色"
          >
            <a-select-option :value="item.id" v-for="item in roleList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
// import { getAdminList, createAdmin, updateAdmin, deleteAdmin, getRoleList } from '@/api/manage'
import md5 from 'md5'
import moment from 'moment'
export default {
  name: 'Admins',
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
      current: {},
      roleList: [],
      actionType: 0 // 0为创建管理员，1为编辑管理员
    }
  },
  computed: {
    pagination () {
      return {
        defaultPageSize: this.per_page,
        defaultCurrent: this.page,
        total: this.total,
        onChange: (e) => {
          this.page = e
          this.fetch()
        }
      }
    },
    actionTitle () {
      return this.actionType === 0 ? '创建管理员' : '编辑管理员'
    }
  },
  filters: {
    formatDate (value) {
      return value ? moment(value).fromNow() : ''
    }
  },
  created () {
    this.fetch()
    this.$api.emit('admin.role.list').then(res => {
      this.roleList = res.data.list
    })
  },
  methods: {
    handleResetPassword (row) {
      this.$iForm.show({
        title: '重设管理员密码',
        frame: [
          {
            type: 'password',
            title: '新密码',
            key: 'password',
            required: true,
            placeholder: '6位长度以上',
          },
          {
            type: 'password',
            title: '确认新密码',
            key: 'password_repeat',
            required: true,
            placeholder: '6位长度以上',
          }
        ],
        success: (data) => {
          if (data.password !== data.password_repeat) {
            this.$message.error('两次输入的密码不一致');
            return false;
          }
          this.$http.patch(`/admins/${row.uuid}`, {
            type: 'reset_password',
            ...data
          }).then(res => {
            this.$message.success('操作成功');
            this.$iForm.hide()
            this.fetchData()
          })
        },
      })
    },
    handleDlete (row) {
      this.$confirm({
        title: '提示',
        content: `确认删除管理员 “${row.name}” ？`,
        onOk: () => {
          return new Promise((resolve, reject) => {
            this.$api.emit('admin.destory', row.uuid).then(res => {
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
      this.current = row
      this.$nextTick(() => {
        const roles = []
        row.roles.forEach(item => {
          roles.push(item.id)
        })
        this.form.setFields({
          name: {
            value: row.name
          },
          phone: {
            value: row.phone
          },
          roles: {
            value: roles
          }
        })
      })
    },
    getRolesText (roles) {
      const arr = []
      roles.forEach(item => {
        arr.push(item.name)
      })
      return arr.join('、')
    },
    handleOk () {
      const flieds = this.actionType === 0 ? ['name', 'password', 'phone', 'roles'] : ['name', 'phone', 'roles']
      this.form.validateFields(flieds, { force: true }, (err, values) => {
        if (!err) {
          const sendData = {
            name: values.name,
            phone: values.phone,
            roles: values.roles
          }
          if (this.actionType === 0) {
            sendData.password = md5(values.password)
            this.$api.emit('admin.store', sendData).then(res => {
              this.visible = false
              this.fetch()
            })
          } else {
            this.$api.emit('admin.update', this.current.uuid, sendData).then(res => {
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
    plusAdmins () {
      this.visible = true
      this.actionType = 0
      this.checkedList = []
      this.form.resetFields()
    },
    fetch () {
      this.loading = true
      this.$api.emit('admin.list', {
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
