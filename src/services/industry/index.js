import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Criar uma nova indústria.
 * @param {string} name - Nome da indústria a ser criada.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const createIndustry = (userData) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/industry`,
    data: userData
  })
}

/**
 * Buscar todas as indústrias cadastradas.
 * @param {number} page - Número da página.
 * @param {number} size - Quantidade de indústrias por página.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getIndustries = (page = 1, size = 10) => {
  const url = `${BASE_URL}/industry?page=${page}&size=${size}`

  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url
  })
}

/**
 * Deletar uma industria pelo ID.
 * @param {string} industryId - O ID da industria a ser deletada.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const deleteIndustry = (industryId) => {
  const url = `${BASE_URL}/industry/${industryId}`

  return axios({
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url
  })
}

/**
 * Atualizar uma industria pelo ID.
 * @param {string} industryId - O ID da industria a ser atualizada.
 * @param {object} updatedData - Novos dados da industria a serem atualizados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const updateIndustry = (industryId, name) => {
  const url = `${BASE_URL}/industry/${industryId}`

  return axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url,
    data: { name }
  })
}

/**
 * Atualizar uma industria pelo ID.
 * @param {string} industryId - O ID da industria a ser atualizada.
 * @param {object} updatedData - Novos dados da industria a serem atualizados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getIndustry = (industryId) => {
  const url = `${BASE_URL}/specialty/${industryId}`

  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url
  })
}
