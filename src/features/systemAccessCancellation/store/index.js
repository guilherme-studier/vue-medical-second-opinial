/* eslint-disable no-unused-vars */
import { createUser } from '../../../services/user/index'

export default {
  namespaced: true,
  state: () => ({
    loading: false
  }),
  mutation: {
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async createUser({ commit }, userData) {
      commit('setLoading', true)
      return createUser(userData)
        .then((response) => {
          commit('setIndustryUser', response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
    }
  },
  getters: {
    getLoading: (state) => state.loading
  }
}
