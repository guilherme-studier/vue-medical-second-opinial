import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Geração de Convite para Médico Consultor.
 * @param {string} name - Nome
 * @param {string} cpf - CPF
 * @param {string} email - E-mail
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const consultantDoctor = (userData) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/consultant-doctor`,
    data: userData
  })
}
