import { consultantDoctor } from '../services/index'

export default {
  namespaced: true,
  state: () => ({
    doctorConsultant: null,
    loading: false
  }),
  mutations: {
    setDoctorConsultant(state, cpf) {
      state.cpf = cpf
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async consultantDoctor({ commit }, userData) {
      commit('setLoading', true)
      return consultantDoctor(userData)
        .then((response) => {
          commit('setDoctorConsultant', response.data)
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
    getDoctorConsultant: (state) => state.doctorConsultant,
    getLoading: (state) => state.loading
  }
}
