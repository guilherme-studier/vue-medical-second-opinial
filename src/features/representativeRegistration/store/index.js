/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { updateIndustryRepresentant } from '@/services/industryRepresentant/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    representative: null,
    loading: false
  }),
  mutations: {
    setRepresentative(state, representative) {
      state.representative = representative
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async updateRepresentativeIndustry({ commit }, userData) {
      commit('setLoading', true)
      return updateIndustryRepresentant(userData)
        .then((response) => {
          commit('setRepresentative', response.data)
          toast.success('Cadastro atualizado com sucesso', {
            timeout: 8000
          })
          return response
        })
        .catch((error) => {
          toast.warning(
            'Não foi possível realizar a atualização do cadastro Representante',
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
    getRepresentative: (state) => state.representative,
    getLoadingRepresentative: (state) => state.loading
  }
}
