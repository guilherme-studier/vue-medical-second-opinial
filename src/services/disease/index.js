import axios from 'axios'
import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Criar uma nova especialidade.
 * @param {string} name - Nome da especialidade a ser criada.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const createDisease = (name) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/disease`,
    data: { name }
  })
}

/**
 * Buscar todas as especialidades cadastradas.
 * @param {number} page - Número da página.
 * @param {number} size - Quantidade de especialidades por página.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getDiseases = (page = 1, size = 100) => {
  const url = `${BASE_URL}/disease?page=${page}&size=${size}`

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
 * Deletar uma doença pelo ID.
 * @param {string} diseaseId - O ID da especialidade a ser deletada.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const deleteDisease = (diseaseId) => {
  const url = `${BASE_URL}/disease/${diseaseId}`

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
 * Atualizar uma especialidade pelo ID.
 * @param {string} diseaseId - O ID da especialidade a ser atualizada.
 * @param {object} updatedData - Novos dados da especialidade a serem atualizados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const updateDisease = (diseaseId, name) => {
  const url = `${BASE_URL}/disease/${diseaseId}`

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
 * Atualizar uma especialidade pelo ID.
 * @param {string} diseaseId - O ID da especialidade a ser atualizada.
 * @param {object} updatedData - Novos dados da especialidade a serem atualizados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getDisease = (diseaseId) => {
  const url = `${BASE_URL}/disease/${diseaseId}`

  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url
  })
}
