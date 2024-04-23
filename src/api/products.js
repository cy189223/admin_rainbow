import { axios } from '@/utils/request'

const url = '/shop/products'

export function createProduct (parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

export function getProductList (parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

export function getProductInfo (uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'get'
  })
}

export function updateProduct (uuid, parameter) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update',
      attributes: parameter
    }
  })
}

export function deleteProduct (uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'delete'
  })
}
