import { useToast } from 'vue-toastification'

import { putClientDoctor } from '../services/index'

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
    async addClientDoctor({ commit }, userData) {
      commit('setLoading', true)
      return putClientDoctor(userData)
        .then(() => {
          return toast.success(
            'Atribuição de caso clínico efetuada com sucesso'
          )
        })
        .catch(() => {
          toast.warning(
            'Não foi possível efetuar a atribuição de caso clínico',
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
    getLoadingAllocationClinicalCase: (state) => state.loading
  }
}
