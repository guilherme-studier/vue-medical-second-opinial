import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Criar uma nova indústria.
 * @param {string} name - Nome da indústria a ser criada.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const createIndustryRepresentative = (userData) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/industry-representative`,
    data: userData
  })
}
