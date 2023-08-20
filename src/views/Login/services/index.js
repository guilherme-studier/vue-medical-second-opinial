import axios from 'axios'
import getUserToken from '../store/index'

const BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'
const getToken = () => getUserToken()

/**
 * @see https://meso.poatech.com.br:450/user/api/1.0/auth
 **/

export const login = ({ email, password }) => {
  return axios({
    method: 'POST',
    //headers: { 'content-type': 'multipart/form-data' },
    url: `${BASE_URL}/auth`,
    data: {
      email,
      password
    }
  })
}

/**
 * Resetar a senha do usuário.
 * @param {string} email - O email do usuário para o qual o reset de senha será solicitado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const reset = ({ email = 'teste@gmail.com' }) => {
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: `${BASE_URL}/password`,
    data: {
      email
    }
  })
}

/**
 * Validar um token.
 * @param {string} token - O token a ser validado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const validateToken = (token = getToken()) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/validateToken`,
    data: {
      token
    }
  })
}

/**
 * Realizar logout de um usuário.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const logoutUser = () => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/logout`
  })
}
