import axios from 'axios'

import store from '@/store'

const USER_BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Obter a lista de representantes da indústria.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getIndustryRepresentant = () => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/industry-representative`
  })
}

/**
 * Criar um novo representante da indústria.
 * @param {object} userData - Os dados do representante da indústria (name, cpf, email, industryId).
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const createIndustryRepresentant = (userData) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/industry-representative`,
    data: userData // Não precisa mais envolver em um array
  })
}

/**
 * Cancelar o representante da indústria com o ID especificado.
 * @param {string} representantId - O ID do representante da indústria a ser cancelado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const cancelIndustryRepresentant = (representantId) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/industry-representative/${representantId}/cancel`
  })
}
