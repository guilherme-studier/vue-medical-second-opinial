import { useToast } from 'vue-toastification'

import { putVoucher } from '../services/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    loading: null
  }),
  mutations: {
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async editVoucher({ commit }, userData) {
      commit('setLoading', true)
      return putVoucher(userData.data, userData.voucherId)
        .then(() => {
          return toast.success('Caso clínico ativado com sucesso', {
            timeout: 5000
          })
        })
        .catch(() => {
          toast.warning('Não foi possível ativar este caso clínico', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getLoading: (state) => state.loading
  }
}
