import axios from 'axios'

import store from '@/store'

const BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken

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

  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${BASE_URL}/voucher/all`,
    params: defaultParams
  })
}
