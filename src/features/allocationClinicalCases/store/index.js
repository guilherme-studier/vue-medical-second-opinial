import { createUser } from '../../../services/user/index'

export default {
  namespaced: true,
  state: () => ({
    allocationClinicalCase: null
  }),
  mutations: {
    setAllocationClinicalCase(state, allocationClinicalCase) {
      state.allocationClinicalCase = allocationClinicalCase
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
    getAllocationClinicalCase: (state) => state.allocationClinicalCase
  }
}
