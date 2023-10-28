/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { updateUserClientDoctor } from '../../../services/user/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    user: null,
    loading: false
  }),
  mutations: {
    setClientDoctor(state, user) {
      state.user = user
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async updateClientDoctor({ commit }, userData) {
      commit('setLoading', true)
      return updateUserClientDoctor(userData)
        .then((response) => {
          commit('setClientDoctor', response.data)
          toast.success('Cadastro atualizado com sucesso', { timeout: 5000 })
          return response
        })
        .catch((error) => {
          toast.warning(
            'Não foi possível realizar a atualização do cadastro Médico Cliente',
            {
              timeout: 5000
            }
          )
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getUser: (state) => state.user,
    getLoadingRegistration: (state) => state.loading
  }
}
