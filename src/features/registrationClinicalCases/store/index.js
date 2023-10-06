/* eslint-disable no-unused-vars */
import { createContract } from '@/services/contract/index.js'

export default {
  namespaced: true,
  state: () => ({
    clinicalCase: null,
    loading: false
  }),
  mutations: {
    setClinicalCase(state, user) {
      state.user = user
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async createClinicalCase({ commit }, userData) {
      commit('setLoading', true)
      return createContract(userData)
        .then((response) => {
          commit('setUser', response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getClinicalCase: (state) => state.user,
    getLoading: (state) => state.loading
  }
}
