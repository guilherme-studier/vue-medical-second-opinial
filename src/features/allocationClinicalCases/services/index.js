import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Geração de Convite para Médico Consultor.
 * @param {string} name - Nome
 * @param {string} cpf - CPF
 * @param {string} email - E-mail
 * @param {string} contractId - E-mail
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const putClientDoctor = (userData) => {
  return axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/voucher/add/client-doctor`,
    data: userData
  })
}
