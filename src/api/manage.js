import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/admin-roles',
  admin: '/admins'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getAdminList (parameter) {
  return axios({
    url: api.admin,
    method: 'get',
    params: parameter
  })
}

export function createAdmin (data) {
  return axios({
    url: api.admin,
    method: 'post',
    data: data
  })
}

export function updateAdmin (data, uuid) {
  return axios({
    url: `${api.admin}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update',
      attributes: data
    }
  })
}

export function deleteAdmin (uuid) {
  return axios({
    url: `${api.admin}/${uuid}`,
    method: 'delete'
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function createRole (data) {
  return axios({
    url: api.role,
    method: 'post',
    data: data
  })
}

export function updateRole (data, uuid) {
  return axios({
    url: `${api.role}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update',
      attributes: data
    }
  })
}
export function deleteRole (uuid) {
  return axios({
    url: `${api.role}/${uuid}`,
    method: 'delete'
  })
}
