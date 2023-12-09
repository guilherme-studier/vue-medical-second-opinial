import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Endpoint para buscar contratos com o id de uma indústria.
 * @param {string} industry - Id da indústria.
 */
export const getContractByIndustryId = (id) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/contract/industry/${id}`
  })
}

/**
 * Endpoint para buscar contratos clínicos.
 */
export const getContracts = () => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/contract`
  })
}

/**
 * Endpoint para buscar médicos de um contrato clínico.
 */
export const getDoctorsByContractId = (contractId) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/contract-doctors/${contractId}`
  })
}

/**
 * Endpoint para ocontrato de caso clínico pelo id
 */
export const getContract = (id) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/contract/${id}`
  })
}
