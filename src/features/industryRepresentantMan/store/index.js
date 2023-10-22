/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import {
  getIndustryRepresentant,
  cancelIndustryRepresentant
} from '@/services/industryRepresentant/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    industryRepresentants: []
  }),
  mutations: {
    setLoading(state, value) {
      state.loading = value
    },
    setIndustryRepresentants(state, representants) {
      state.industryRepresentants = representants
    }
  },
  actions: {
    async fetchIndustryRepresentants({ commit }) {
      commit('setLoading', true)
      return getIndustryRepresentant()
        .then((response) => {
          commit('setIndustryRepresentants', response.data.content)
        })
        .catch((error) => {
          toast.warning('Erro ao buscar os representantes da indústria', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async cancelIndustryRepresentant({ commit }, representantId) {
      commit('setLoading', true)
      return cancelIndustryRepresentant(representantId)
        .then(() => {
          toast.success('Representante da indústria cancelado com sucesso')
        })
        .catch((error) => {
          toast.warning('Erro ao cancelar o representante da indústria', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getLoadingRepresentantIndustryMan: (state) => state.loading,
    getIndustryRepresentants: (state) => state.industryRepresentants
  }
}
