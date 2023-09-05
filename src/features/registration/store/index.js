/* eslint-disable no-unused-vars */
import { createUser } from '../../../services/user/index'

export default {
  namespaced: true,
  state: () => ({
    user: null,
    loading: false
  }),
  mutations: {
    setUser(state, user) {
      state.user = user
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
    getUser: (state) => state.user,
    getLoading: (state) => state.loading
  }
}
