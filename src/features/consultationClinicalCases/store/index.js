/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { getContracts } from '../../../services/contract/index.js'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    clinicalCases: 3,
    contracts: [],
    contract: {}
  }),
  mutations: {
    setContracts(state, contracts) {
      state.contracts = contracts
    },
    setContract(state, data) {
      state.data = data
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async fetchContracts({ commit }, params) {
      commit('setLoading', true)
      getContracts(
        params.page,
        params.size,
        params.diseaseId,
        params.specialtyId,
        params.industryId
      )
        .then((response) => {
          commit('setContracts', response.data.content)
        })
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao buscar os casos clínicos', { timeout: 5000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getContract: (state) => state.contract,
    getContracts: (state) => state.contracts,
    getLoadingContracts: (state) => state.loading
  }
}
