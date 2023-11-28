import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken
const doctorId = () => store?.getters?.getUserId

/**
 * Buscar Casos Clínicos Designados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getClinicalCasesClientDoctor = (page = 1) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/voucher/doctor/${doctorId()}?page=${page}&size=10`
  })
}

/**
 * Busca as mensagens referentes ao voucherId
 *  * @param {string} voucherId - O ID do voucher.
 */
export const getMessages = (voucherId) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/voucher/messages/${voucherId}?&size=50`
  })
}

/**
 * Envia uma nova mensagem
 *  * @param {string} id
 *  * @param {string} message
 */
export const putMessage = (userData) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/voucher/add-voucher-message/${userData.id}`,
    data: {
      message: userData.message
    }
  })
}
