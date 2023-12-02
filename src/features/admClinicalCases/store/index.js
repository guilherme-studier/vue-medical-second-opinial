/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { getClinicalCases, putClinicalCase } from '../services/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    icon: require('@/assets/icons/icon-voucher.svg'),
    iconSearch: require('@/assets/icons/icon-search.svg'),
    clinicalCases: [],
    searchTerm: '',
    loading: false,
    error: false,
    totalPages: null,
    totalContent: null,
    page: 1
  }),
  mutations: {
    updateSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    setClinicalCases(state, clinicalCases) {
      state.clinicalCases = clinicalCases
    },
    setLoading(state, value) {
      state.loading = value
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setTotalContent(state, totalContent) {
      state.totalContent = totalContent
    },
    setPage(state, page) {
      state.page = page
    }
  },
  actions: {
    async fetchClinicalCases({ commit, dispatch }) {
      commit('setLoading', true)
      dispatch('getClinicalCases')
    },
    async getClinicalCases({ commit, state }) {
      return getClinicalCases(state.page)
        .then((response) => {
          commit('setClinicalCases', response.data.content)
          commit('setTotalPages', response.data.totalPages)
          commit('setTotalContent', response.data.totalContent)
        })
        .catch(() => {
          toast.warning(
            'Erro ao buscar os casos clínicos de Médico Consultor',
            {
              timeout: 8000
            }
          )
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updatePage({ commit }, page) {
      commit('setPage', page)
    },
    async acceptClinicalCase({ commit, dispatch }, voucherId) {
      commit('setLoading', true)
      return putClinicalCase('accept', voucherId)
        .then(() => {
          toast.success('Caso Clínico aceito com sucesso', {
            timeout: 8000
          })
          dispatch('getClinicalCases')
        })
        .catch(() => {
          toast.warning('Não foi possível aceitar este caso clínico', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async declineClinicalCase({ commit, dispatch }, voucherId) {
      commit('setLoading', true)
      return putClinicalCase('decline', voucherId)
        .then(() => {
          toast.success('Caso Clínico declinado com sucesso', {
            timeout: 8000
          })
          dispatch('getClinicalCases')
        })
        .catch(() => {
          toast.warning('Não foi possível declinar este caso clínico', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async cancelClinicalCase({ commit, dispatch }, voucherId) {
      commit('setLoading', true)
      return putClinicalCase('cancel', voucherId)
        .then(() => {
          toast.success('Caso Clínico cancelado com sucesso', {
            timeout: 8000
          })
          dispatch('getClinicalCases')
        })
        .catch(() => {
          toast.warning('Não foi possível cancelar este caso clínico', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getIcon: (state) => state.icon,
    getIconSearch: (state) => state.iconSearch,
    getSearchTerm: (state) => state.searchTerm,
    getError: (state) => state.error,
    getClinicalCases: (state) => state.clinicalCases,
    getLoading: (state) => state.loading,
    getTotalPages: (state) => state.totalPages,
    getTotalContent: (state) => state.totalContent,
    getPage: (state) => state.page
  }
}
