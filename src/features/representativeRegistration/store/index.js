/* eslint-disable no-unused-vars */
import { createUser } from '@/services/user/index'

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
    getRepresentative: (state) => state.representative
  }
}
