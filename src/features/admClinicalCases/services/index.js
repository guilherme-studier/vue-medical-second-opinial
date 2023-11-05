import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken
const doctorId = () => store?.getters?.getUserId

/**
 * Buscar Casos Clínicos Designados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getClinicalCases = () => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/voucher/doctor/${doctorId()}`
  })
}

export const putClinicalCase = (action, voucherId) => {
  return axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/voucher/action/${voucherId}`,
    data: {
      action
    }
  })
}
