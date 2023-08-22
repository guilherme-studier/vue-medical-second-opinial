/* eslint-disable no-unused-vars */
import { createUser } from '../../../services/user/index'

export default {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async createUser({ commit }, userData) {
      return createUser(userData)
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
    getUser: (state) => state.user
  }
}
