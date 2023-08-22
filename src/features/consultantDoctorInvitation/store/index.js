import { createUser } from '../../../services/user/index'

export default {
  namespaced: true,
  state: () => ({
    doctorConsultant: null
  }),
  mutations: {
    setDoctorConsultant(state, cpf) {
      state.cpf = cpf
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
    getDoctorConsultant: (state) => state.doctorConsultant
  }
}
