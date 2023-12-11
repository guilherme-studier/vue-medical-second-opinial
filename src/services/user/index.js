import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'
const getToken = () => store?.getters?.getUserToken
const getUserId = () => store?.getters?.getUserId

/**
 * Cria um usuário na plataforma.
 * @param {object} userData - Dados do usuário a serem criados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const createUser = (userData) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/users`,
    data: userData
  })
}

/**
 * Ativar um usuário através do token de ativação.
 * @param {string} activationToken - O token de ativação do usuário.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const activateUser = (activationToken) => {
  const url = `${BASE_URL}/users/token/${activationToken}`

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
 * Aprovar um usuário pelo ID.
 * @param {string} userId - O ID do usuário a ser aprovado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const approveUser = (userId) => {
  const url = `${BASE_URL}/users/${userId}/approve`

  return axios({
    method: 'POST', // Ou o método apropriado para aprovar usuários na sua API
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url
  })
}

/**
 * Bloquear um usuário pelo ID.
 * @param {string} userId - O ID do usuário a ser bloqueado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const blockUser = (userId) => {
  const url = `${BASE_URL}/users/${userId}/block`

  return axios({
    method: 'POST', // Ou o método apropriado para bloquear usuários na sua API
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url
  })
}

export const getUsers = ({ type }) => {
  let url = `${BASE_URL}/users?`
  if (type) {
    url += `&type=${type}`
  }

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
 * Buscar os dados de um usuário pelo ID.
 * @param {string} userId - O ID do usuário a ser buscado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getUserById = () => {
  const url = `${BASE_URL}/users/${getUserId()}`

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
 * Atualizar um usuário pelo ID.
 * @param {string} userId - O ID do usuário a ser atualizado.
 * @param {object} userData - Dados do usuário a serem atualizados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const updateUser = (userData) => {
  return axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/users/${getUserId()}`,
    data: userData
  })
}

/**
 * Atualizar um usuário client_doctor pelo ID.
 * @param {string} userId - O ID do usuário a ser atualizado.
 * @param {object} userData - Dados do usuário a serem atualizados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const updateUserClientDoctor = (userData) => {
  return axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/users/${getUserId()}/client-doctor`,
    data: userData
  })
}

/**
 * Deletar um usuário pelo ID.
 * @param {string} userId - O ID do usuário a ser deletado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const deleteUser = (userId) => {
  const url = `${BASE_URL}/users/${userId}`

  return axios({
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url
  })
}
