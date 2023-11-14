import { useToast } from 'vue-toastification'

import { saveVoucher, activeVoucher, getVoucher } from '../services/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    voucher: {},
    loading: null
  }),
  mutations: {
    setLoading(state, value) {
      state.loading = value
    },
    setVoucher(state, voucher) {
      state.voucher = voucher
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
    async fetchVoucher({ commit }, voucherId) {
      commit('setLoading', true)
      return getVoucher(voucherId)
        .then((response) => {
          commit('setVoucher', response.data)
        })
        .catch(() => {
          toast.warning('Não foi possível localizar dados do voucher', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getLoading: (state) => state.loading,
    getVoucherInfos: (state) => state.voucher
  }
}
