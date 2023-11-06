import axios from 'axios'

import store from '@/store'

const USER_BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Ativar Voucher
 * Endpoint para editar um caso clínico/voucher
 */
export const putVoucher = (questionnaire, voucherId) => {
  return axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/voucher/${voucherId}`,
    data: {
      questionnaire: questionnaire,
      completed: true
    }
  })
}
