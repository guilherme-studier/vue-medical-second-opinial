/* eslint-disable no-unused-vars */
import { createIndustryRepresentative } from '@/services/industryRepresentative/index'

export default {
  namespaced: true,
  state: () => ({
    representative: null
  }),
  mutations: {
    setRepresentative(state, representative) {
      state.representative = representative
    }
  },
  actions: {
    async createUser({ commit }, userData) {
      return createIndustryRepresentative(userData)
        .then((response) => {
          commit('setUser', response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
    }
  },
  getters: {
    getRepresentative: (state) => state.representative
  }
}
