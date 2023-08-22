/* eslint-disable no-unused-vars */
import { createUser } from '../../../services/user/index'

export default {
  namespaced: true,
  state: () => ({
    industryUser: null
  }),
  mutations: {
    setIndustryUser(state, industryUser) {
      state.industryUser = industryUser
    }
  },
  actions: {
    async createUser({ commit }, userData) {
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
    getIndustryUser: (state) => state.industryUser
  }
}
