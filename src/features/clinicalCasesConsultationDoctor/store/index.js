/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import {
  getClinicalCasesConsultantDoctor,
  createOrEditOpinion
} from '../services/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    icon: require('@/assets/icons/icon-voucher.svg'),
    iconSearch: require('@/assets/icons/icon-search.svg'),
    isModalSeem: false,
    isModalMessage: false,
    clinicalCases: [],
    searchTerm: '',
    loading: false,
    error: false
  }),
  mutations: {
    updateSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    toggleIsModalSeem(state) {
      state.isModalSeem = !state.isModalSeem
    },
    toggleIsModalMessage(state) {
      state.isModalMessage = !state.isModalMessage
    },
    setClinicalCases(state, clinicalCases) {
      state.clinicalCases = clinicalCases
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    handleModalSeem(context, voucher) {
      context.commit('toggleIsModalSeem', voucher)
    },
    handleModalMessage(context, voucher) {
      context.commit('toggleIsModalMessage', voucher)
    },
    async fetchClinicalCases({ commit, dispatch }) {
      commit('setLoading', true)
      dispatch('getClinicalCases')
    },
    getClinicalCases({ commit }) {
      return getClinicalCasesConsultantDoctor()
        .then((response) => {
          commit('setClinicalCases', response.data)
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
    async putOpinion({ commit }, userData) {
      commit('setLoading', true)
      return createOrEditOpinion(userData)
        .then(() => {
          toast.success('Parecer registrado com sucesso', {
            timeout: 5000
          })
        })
        .catch(() => {
          toast.warning('Não foi possível registrar o parecer do médico', {
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
    getIsModalSeem: (state) => state.isModalSeem,
    getIsModalMessage: (state) => state.isModalMessage,
    getActiveClinicalCase: (state) => state.getActiveClinicalCase,
    getIconSearch: (state) => state.iconSearch,
    getTableHeader: (state) => state.tableHeader,
    getTableData: (state) => state.tableData,
    getSearchTerm: (state) => state.searchTerm,
    getError: (state) => state.error,
    getClinicalCases: (state) => state.clinicalCases,
    getLoadingClinicalCases: (state) => state.loading
  }
}
