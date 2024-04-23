import { axios } from '@/utils/request'

const url = '/elf'

export function createPet (parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

export function getPetList (parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

export function getPetInfo (uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'get'
  })
}

export function updatePet (uuid, parameter) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'patch',
    data: {
      type: 'update',
      attributes: parameter
    }
  })
}

export function deletePet (uuid) {
  return axios({
    url: `${url}/${uuid}`,
    method: 'delete'
  })
}

export function getPetExchangeCodeList (parameter) {
  return axios({
    url: '/elf-codes',
    method: 'get',
    data: parameter
  })
}

export function createPetExchangeCode (parameter) {
  return axios({
    url: '/elf-codes',
    method: 'post',
    data: parameter
  })
}

export function deletePetExchangeCode (uuid) {
  return axios({
    url: `/elf-codes/${uuid}`,
    method: 'delete'
  })
}
