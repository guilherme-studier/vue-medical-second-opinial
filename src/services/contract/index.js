import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Criar um novo registro de caso clínico.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const createContract = (userData) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/contract`,
    data: userData
  })
}

/**
 * Buscar todos os casos clínicos.
 * @param {number} page - Número da página.
 * @param {number} size - Quantidade de casos clínicos por página.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getContracts = ({
  page = 1,
  size = 100,
  diseaseId,
  specialtyId,
  industryId
}) => {
  const url = `${BASE_URL}/contract?page=${page}&size=${size}&diseaseId=${diseaseId}&specialtyId=${specialtyId}&industryId=${industryId}`

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
 * Pesquisar por um caso clínico pelo ID.
 * @param {string} contractId - O ID do caso clínico.
 * @returns {Promise} - Uma promessa que retorna a resposta da solicitação.
 */
export const getContractById = (contractId) => {
  const url = `${BASE_URL}/contract/${contractId}`

  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url
  })
}
