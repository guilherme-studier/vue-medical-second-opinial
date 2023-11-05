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
    error: false
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
    }
  },
  actions: {
    async fetchClinicalCases({ commit, dispatch }) {
      commit('setLoading', true)
      dispatch('getClinicalCases')
    },
    async getClinicalCases({ commit }) {
      return getClinicalCases()
        .then((response) => {
          commit('setClinicalCases', response.data.content)
        })
        .catch(() => {
          toast.warning(
            'Erro ao buscar os casos clínicos de Médico Consultor',
            {
              timeout: 5000
            }
          )
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async acceptClinicalCase({ commit }, voucherId) {
      commit('setLoading', true)
      return putClinicalCase('accept', voucherId)
        .then(() => {
          toast.success('Caso Clínico aceito com sucesso', {
            timeout: 5000
          })
        })
        .catch(() => {
          toast.warning('Não foi possível aceitar este caso clínico', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async declineClinicalCase({ commit }, voucherId) {
      commit('setLoading', true)
      return putClinicalCase('decline', voucherId)
        .then(() => {
          toast.success('Caso Clínico aceito com sucesso', {
            timeout: 5000
          })
        })
        .catch(() => {
          toast.warning('Não foi possível aceitar este caso clínico', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async cancelClinicalCase({ commit }, voucherId) {
      commit('setLoading', true)
      return putClinicalCase('cancel', voucherId)
        .then(() => {
          toast.success('Caso Clínico aceito com sucesso', {
            timeout: 5000
          })
        })
        .catch(() => {
          toast.warning('Não foi possível aceitar este caso clínico', {
            timeout: 5000
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
    getLoading: (state) => state.loading
  }
}
