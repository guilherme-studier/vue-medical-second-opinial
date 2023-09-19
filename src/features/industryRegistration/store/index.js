/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import {
  createIndustry,
  getIndustries,
  deleteIndustry,
  updateIndustry,
  getIndustry
} from '../../../services/industry/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    industry: null,
    industries: [],
    loading: false
  }),
  mutations: {
    setIndustry(state, industries) {
      state.industries = industries
    },
    setIndustries(state, industries) {
      state.industries = industries
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    async createIndustry({ commit }, userData) {
      commit('setLoading', true)
      return createIndustry(userData)
        .then((response) => {
          commit('setIndustry', response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fetchIndustries({ commit }) {
      try {
        const response = await getIndustries()
        commit('setIndustries', response.data)
      } catch (error) {
        toast.warning('Erro ao buscar as indústrias', { timeout: 5000 })
      }
    },
    async deleteIndustryById({ commit, dispatch }, industryId) {
      try {
        await deleteIndustry(industryId)
        dispatch('fetchIndustries')
        toast.success('Indústria removida com sucesso!', { timeout: 5000 })
      } catch (error) {
        toast.warning('Erro ao deletar a indústria', { timeout: 5000 })
      }
    },
    async updateIndustryById({ commit, dispatch }, data) {
      try {
        await updateIndustry(data.id, data.name)
        dispatch('fetchIndustries')
        toast.success('Indústria atualizada com sucesso!', {
          timeout: 5000
        })
      } catch (error) {
        toast.warning('Erro ao atualizar a indústria', { timeout: 5000 })
      }
    },
    async getIndustryById({ commit, dispatch }, industryId) {
      try {
        const response = await getIndustry(industryId)
        commit('setIndustry', response.data.content)
      } catch (error) {
        toast.warning('Erro ao buscar a indústria', { timeout: 5000 })
      }
    }
  },
  getters: {
    getIndustries: (state) => state.industries,
    getIndustry: (state) => state.industry,
    getLoading: (state) => state.loading
  }
}
