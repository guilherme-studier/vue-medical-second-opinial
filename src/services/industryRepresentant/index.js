import axios from 'axios'

import store from '@/store'

const USER_BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Pesquisar pelo Representante da Indústria
 * @param {object} industryRepresentId - id do Representante da Indústria.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getIndustryRepresentant = (industryRepresentId) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/industry-representative/${industryRepresentId}`
  })
}

/**
 * Obter a lista de representantes da indústria.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getIndustryRepresentants = (page = 0, size = 10) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/industry-representative?page=${page}&size=${size}`
  })
}

/**
 * Editar o representante da indústria.
 * @param {object} industryRepresentId - id do Representante da Indústria.
 * @param {object} userData - Os dados do representante da indústria (name, email, industryId).
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const updateIndustryRepresentant = (industryRepresentId, userData) => {
  return axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/industry-representative/${industryRepresentId}`,
    data: userData
  })
}

/**
 * Criar o representante da indústria.
 * @param {object} userData - Os dados do representante da indústria (name, email, industryId).
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
    data: userData
  })
}

/**
 * Cancelar o representante da indústria com o ID especificado.
 * @param {string} representantId - O ID do representante da indústria a ser cancelado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const cancelIndustryRepresentant = (representantId) => {
  return axios({
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/industry-representative/${representantId}/cancel`
  })
}
