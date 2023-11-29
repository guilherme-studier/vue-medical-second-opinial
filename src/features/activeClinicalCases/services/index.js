import axios from 'axios'

import store from '@/store'

const USER_BASE_URL = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
const getToken = () => store?.getters?.getUserToken

/**
 * Salvar desenvolvimento do Voucher
 * Endpoint para editar um caso clínico/voucher
 */
export const saveVoucher = (questionnaire, voucherId) => {
  return axios({
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/voucher/${voucherId}`,
    data: {
      questionnaire: questionnaire,
      completed: false
    }
  })
}

/**
 * Upload de arquivos
 * Endpoint realizar o upload de um documento para o voucher do contrato clínico
 */
export const postUrl = (data) => {
  const formData = new FormData()
  formData.append('body', data.file)
  return axios({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/voucher/${data.voucherId}/document`,
    data: formData
  })
}

export const getUrl = (voucherId) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/voucher/files/${voucherId}`
  })
}

export const getFileDownload = (voucherId) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/voucher/download/files/${voucherId}`,
    responseType: 'blob'
  })
}

/**
 * Ativar Voucher
 * Endpoint para editar um caso clínico/voucher
 */
export const activeVoucher = (questionnaire, voucherId) => {
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

/**
 * Coletar dados do Voucher
 * Endpoint para verificar os dados de um caso clínico/voucher
 */
export const getVoucher = (voucherId) => {
  return axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    url: `${USER_BASE_URL}/voucher/${voucherId}`
  })
}
