/* eslint-disable no-unused-vars */
import { createUser } from '../../../services/user/index'

export default {
  namespaced: true,
  state: () => ({
    industryUser: null,
    loading: false
  }),
  mutations: {
    setIndustryUser(state, industryUser) {
      state.industryUser = industryUser
    },
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
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getIndustryUser: (state) => state.industryUser,
    getLoading: (state) => state.loading
  }
}
