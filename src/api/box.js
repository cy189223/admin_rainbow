import { axios } from '@/utils/request'

const url = '/boxes'

export function createBox (parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

export function getBoxList (parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

export function getBoxProductList (uuid) {
  return axios({
    url: `/boxes/${uuid}/small-boxes`,
    method: 'get'
  })
}

export function OnOrOffProduct (type, uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: type // put_on为上架      put_off为下架
    }
  })
}

export function updateBoxProductList (uuid, parameter) {
  return axios({
    url: `/boxes/${uuid}/small-boxes`,
    method: 'put',
    data: {
      small_boxes: parameter
    }
  })
}

export function getBoxInfo (uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'get'
  })
}

export function updateBox (uuid, parameter) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update',
      attributes: parameter
    }
  })
}

export function updateHidden (uuid, parameter) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update_hidden',
      ...parameter
    }
  })
}

export function deleteBox (uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'delete'
  })
}
