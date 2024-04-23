import { axios } from '@/utils/request'

const url = '/IPs'

export function createIP (parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

export function getIPList (parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

export function updateIP (uuid, parameter) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update',
      attributes: parameter
    }
  })
}

export function deleteIP (uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'delete'
  })
}
