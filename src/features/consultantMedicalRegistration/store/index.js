/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { updateUser } from '../../../services/user/index'

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
    async updateConsultantMedical({ commit }, userData) {
      commit('setLoading', true)
      return updateUser(userData)
        .then((response) => {
          commit('setDoctorConsultant', response.data)
          toast.success('Cadastro de Médico Consultor atualizado com sucesso', {
            timeout: 8000
          })
          return response
        })
        .catch((error) => {
          const errorMessage = error.response
            ? error.response.data.message
            : 'Erro desconhecido'

          toast.warning(
            `Erro ao realizar a atualização de cadastro: ${errorMessage}`,
            {
              timeout: 8000
            }
          )
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getDoctorConsultant: (state) => state.doctorConsultant,
    getLoadingConsultant: (state) => state.loading
  }
}
