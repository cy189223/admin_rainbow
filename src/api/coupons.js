import { axios } from '@/utils/request'

const url = '/coupons'

export function createCoupon (parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

export function getCouponList (parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

export function getCouponInfo (uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'get'
  })
}

export function updateCoupon (uuid, parameter) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update',
      attributes: parameter
    }
  })
}

export function deleteCoupon (uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'delete'
  })
}
