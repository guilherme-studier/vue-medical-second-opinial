/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { getAllVouchers, getVoucherHistoric } from '../services/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    vouchers: [],
    loadingVouchers: false,
    totalPages: null,
    totalContent: null,
    page: 1,
    industry: null,
    contract: null,
    consultantDoctor: null,
    status: null,
    voucherHistory: null
  }),
  mutations: {
    setVouchers(state, vouchers) {
      state.vouchers = vouchers
    },
    setVoucherHistory(state, voucherHistory) {
      state.voucherHistory = voucherHistory
    },
    setLoadingVouchers(state, value) {
      state.loadingVouchers = value
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setTotalContent(state, totalContent) {
      state.totalContent = totalContent
    },
    setPage(state, page) {
      state.page = page
    },
    setIndustry(state, industry) {
      state.industry = !industry ? null : industry
    },
    setContract(state, contract) {
      state.contract = !contract ? null : contract
    },
    setConsultantDoctor(state, consultantDoctor) {
      state.consultantDoctor = !consultantDoctor ? null : consultantDoctor
    },
    setStatus(state, status) {
      state.status = !status ? null : status
    }
  },
  actions: {
    async fetchVoucherAll({ commit, state }) {
      commit('setLoadingVouchers', true)
      const params = {
        page: state.page,
        contractId: state.contract,
        industryId: state.industry,
        consultantDoctorId: state.consultantDoctor,
        status: state.status
      }

      return getAllVouchers(params)
        .then((response) => {
          commit('setVouchers', response.data.content)
          commit('setTotalPages', response.data.totalPages)
          commit('setTotalContent', response.data.totalContent)
          return response.data
        })
        .catch((error) => {
          toast.warning('Não foi possível buscar os vouchers', {
            timeout: 8000
          })
          throw error
        })
        .finally(() => {
          commit('setLoadingVouchers', false)
        })
    },
    updatePage({ commit }, page) {
      commit('setPage', page)
    },
    setIndustryId({ commit }, industry) {
      commit('setIndustry', industry)
    },
    setContractId({ commit }, contract) {
      commit('setContract', contract)
    },
    setConsultantDoctorId({ commit }, consultantDoctor) {
      commit('setConsultantDoctor', consultantDoctor)
    },
    setStatusId({ commit }, status) {
      commit('setStatus', status)
    },
    async fetchVoucherHistory({ commit }, voucherId) {
      commit('setLoadingVouchers', true)

      return getVoucherHistoric(voucherId)
        .then((response) => {
          commit('setVoucherHistory', response.data)
          return response.data
        })
        .catch((error) => {
          toast.warning('Não foi possível buscar o histórico do voucher', {
            timeout: 8000
          })
          throw error
        })
        .finally(() => {
          commit('setLoadingVouchers', false)
        })
    }
  },
  getters: {
    getVouchers: (state) => state.vouchers,
    getLoadingVouchers: (state) => state.loadingVouchers,
    getTotalPages: (state) => state.totalPages,
    getTotalContent: (state) => state.totalContent,
    getPage: (state) => state.page,
    getIndustry: (state) => state.industry,
    getContractVoucher: (state) => state.contract,
    getConsultantDoctor: (state) => state.consultantDoctor,
    getStatus: (state) => state.status,
    getVoucherHistory: (state) => state.voucherHistory
  }
}
