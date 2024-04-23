import { axios } from '@/utils/request'

const url = '/users'

export function getUserList (parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

export function updateUser (parameter, uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update',
      attributes: parameter
    }
  })
}
