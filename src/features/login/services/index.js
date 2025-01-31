import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'
const getToken = () => store?.getters?.getUserToken
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
 * @see https://meso.poatech.com.br:450/user/api/1.0/vaidateToken
 * Validate Token
 **/

export const validateToken = () => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/validateToken`,
    data: {
      token: getToken()
    }
  })
}

/**
 * Resetar a senha do usuário.
 * @param {string} email - O email do usuário para o qual o reset de senha será solicitado.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const reset = ({ email }) => {
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: `${BASE_URL}/user/password`,
    data: {
      email: email
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
