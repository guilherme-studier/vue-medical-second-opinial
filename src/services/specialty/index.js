import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Criar uma nova especialidade.
 * @param {string} name - Nome da especialidade a ser criada.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const createSpecialty = (name) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/specialty`,
    data: { name }
  })
}

/**
 * Buscar todas as especialidades cadastradas.
 * @param {number} page - Número da página.
 * @param {number} size - Quantidade de especialidades por página.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getSpecialties = (page = 1, size = 10) => {
  const url = `${BASE_URL}/specialty?page=${page}&size=${size}`

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
 * Deletar uma especialidade pelo ID.
 * @param {string} specialtyId - O ID da especialidade a ser deletada.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const deleteSpecialty = (specialtyId) => {
  const url = `${BASE_URL}/specialty/${specialtyId}`

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
 * @param {string} specialtyId - O ID da especialidade a ser atualizada.
 * @param {object} updatedData - Novos dados da especialidade a serem atualizados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const updateSpecialty = (specialtyId, name) => {
  const url = `${BASE_URL}/specialty/${specialtyId}`

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
 * @param {string} specialtyId - O ID da especialidade a ser atualizada.
 * @param {object} updatedData - Novos dados da especialidade a serem atualizados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getSpecialty = (specialtyId) => {
  const url = `${BASE_URL}/specialty/${specialtyId}`

  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url
  })
}
