import { axios } from '@/utils/request'

const url = '/orders'

export function getOrderList (parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

export function getOrdersTotal (params) {
  return axios({
    url: '/order-stat/total',
    method: 'get',
    params: params
  })
}

export function orderDeliver (uuid, parameter) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'deliver',
      deliver_info: parameter
    }
  })
}

export function setOrderRemark (uuid, remark) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update_seller_remark',
      seller_remark: remark
    }
  })
}

export function setOrderAddress (uuid, address) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update_address',
      address: address
    }
  })
}

export function createExport (data) {
  return axios({
    url: `/export/orders`,
    method: 'post',
    data: data
  })
}

export function getExpressList () {
  return axios({
    url: `/express-list`,
    method: 'get'
  })
}
