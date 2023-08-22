/* eslint-disable no-unused-vars */
import { createUser } from '../../../services/user/index'

export default {
  namespaced: true,
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
  }
}
