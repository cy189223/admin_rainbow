import { axios } from '@/utils/request'

const URL = {
  banner: '/swiper',
  deal: '/pages/deal',
  rule: '/pages/rule'
}

export function getBanners (type) {
  return axios({
    url: URL.banner,
    method: 'get',
    params: {
      type: type
    }
  })
}

export function postBanners (type, paramter) {
  return axios({
    url: URL.banner,
    method: 'put',
    data: {
      type: type,
      swiper: paramter
    }
  })
}

export function getDeal () {
  return axios({
    url: URL.deal,
    method: 'get'
  })
}

export function postDeal (content) {
  return axios({
    url: URL.deal,
    method: 'put',
    data: {
      content: content
    }
  })
}

export function getRule () {
  return axios({
    url: URL.rule,
    method: 'get'
  })
}

export function postRule (content) {
  return axios({
    url: URL.rule,
    method: 'put',
    data: {
      content: content
    }
  })
}
