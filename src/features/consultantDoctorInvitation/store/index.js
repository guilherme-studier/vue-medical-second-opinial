import { createUser } from '../../../services/user/index'

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
    getDoctorConsultant: (state) => state.doctorConsultant,
    getLoading: (state) => state.loading
  }
}
