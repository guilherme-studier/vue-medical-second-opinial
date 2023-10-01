/* eslint-disable no-unused-vars */
import { updateUser } from '../../../services/user/index'

export default {
  namespaced: true,
  state: () => ({
    representative: null,
    loading: false
  }),
  mutations: {
    setRepresentative(state, representative) {
      state.representative = representative
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async updateRepresentativeIndustry({ commit }, userData) {
      commit('setLoading', true)
      return updateUser(userData)
        .then((response) => {
          commit('setRepresentative', response.data)
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
    getRepresentative: (state) => state.representative,
    getLoadingRepresentative: (state) => state.loading
  }
}
