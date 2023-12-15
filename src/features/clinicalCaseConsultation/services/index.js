import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken
const agentId = () => store?.getters?.getUserId
const getRole = () => store?.getters?.getRole

/**
 * Endpoint para buscar todos os vouchers com opção de filtros.
 * @param {Object} params - Parâmetros de filtro.
 * @param {number} params.page - Número da página (obrigatório, default é 1).
 * @param {number} params.size - Número de itens por página.
 * @param {number} params.industryId - Id da indústria para filtro.
 * @param {number} params.contractId - Id do contrato para filtro.
 * @param {number} params.consultantDoctorId - Id do médico consultor para filtro.
 * @param {number} params.agentId - Id do agente para filtro.
 * @param {number} params.status - Status para filtro.
 */
export const getAllVouchers = (params) => {
  const defaultParams = { page: 1, ...params }
  const headers = {
    'content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  }

  if (getRole() === 'agent') {
    defaultParams.agentId = agentId()
  }

  return axios({
    method: 'GET',
    headers,
    url: `${BASE_URL}/voucher/all`,
    params: defaultParams
  })
}

/**
 * Endpoint para buscar o histórico de um voucher específico.
 * @param {number} voucherId - Id do voucher para o qual o histórico será buscado.
 */
export const getVoucherHistoric = (voucherId) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/voucher-historic/${voucherId}`
  })
}
