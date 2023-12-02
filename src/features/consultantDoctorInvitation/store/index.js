import { useToast } from 'vue-toastification'

import { consultantDoctor } from '../services/index'

const toast = useToast()

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
    async putConsultantDoctor({ commit }, userData) {
      commit('setLoading', true)
      return consultantDoctor(userData)
        .then((response) => {
          commit('setDoctorConsultant', response.data)
          toast.success('Convite para Médico Consultor efetuado com sucesso', {
            timeout: 8000
          })
        })
        .catch(() => {
          toast.warning('Erro realizar o convite para Médico Consultor', {
            timeout: 8000
          })
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
