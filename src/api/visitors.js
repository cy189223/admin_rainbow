import { axios } from '@/utils/request'

const url = '/visitors'

export function getVisitorList (parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}
