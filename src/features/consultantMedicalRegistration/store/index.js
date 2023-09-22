import { updateUser } from '../../../services/user/index'

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
    async updateConsultantMedical({ commit }, userData) {
      return updateUser(userData)
        .then((response) => {
          commit('setDoctorConsultant', response.data)
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
