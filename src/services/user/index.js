import axios from 'axios'

const BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'
const token = 'seu_token_de_autenticacao' // Substitua pelo seu token de autenticação

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
      Authorization: `Bearer ${token}`
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
      Authorization: `Bearer ${token}`
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
      Authorization: `Bearer ${token}`
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
      Authorization: `Bearer ${token}`
    },
    url
  })
}

/**
 * Buscar todos os usuários cadastrados.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getUsers = (page, size) => {
  const url = `${BASE_URL}/users?page=${page}&size=${size}`

  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    url
  })
}

/**
 * Buscar os dados de um usuário pelo ID.
 * @param {string} userId - O ID do usuário a ser buscado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getUserById = (userId) => {
  const url = `${BASE_URL}/users/${userId}`

  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
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
export const updateUser = (userId, userData) => {
  const url = `${BASE_URL}/users/${userId}`

  return axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    url,
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
      Authorization: `Bearer ${token}`
    },
    url
  })
}
