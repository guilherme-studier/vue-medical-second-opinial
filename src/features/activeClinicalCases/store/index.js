import { useToast } from 'vue-toastification'

import { saveVoucher, activeVoucher } from '../services/index'

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
    async saveEditVoucher({ commit }, userData) {
      commit('setLoading', true)
      return saveVoucher(userData.data, userData.voucherId)
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
    },
    async activeVoucher({ commit }, userData) {
      commit('setLoading', true)
      return activeVoucher(userData.data, userData.voucherId)
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
    },
    onActiveVoucherPage({ commit }) {
      commit('setLoading', true)
    },
    offActiveVoucherPage({ commit }) {
      commit('setLoading', false)
    }
  },
  getters: {
    getLoadingActiveClinicalCase: (state) => state.loading
  }
}
