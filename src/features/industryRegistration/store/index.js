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
    createIndustry({ commit }, userData) {
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
    fetchIndustries({ commit }) {
      commit('setLoading', true)
      return getIndustries()
        .then((response) => {
          commit('setIndustries', response.data)
        })
        .catch((error) => {
          toast.warning('Erro ao buscar as indústrias', { timeout: 5000 })
          throw error
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    deleteIndustryById({ commit, dispatch }, industryId) {
      commit('setLoading', true)
      return deleteIndustry(industryId)
        .then(() => {
          dispatch('fetchIndustries')
          toast.success('Indústria removida com sucesso!', { timeout: 5000 })
        })
        .catch((error) => {
          toast.warning('Erro ao deletar a indústria', { timeout: 5000 })
          throw error
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updateIndustryById({ commit, dispatch }, data) {
      commit('setLoading', true)
      return updateIndustry(data.id, data.name)
        .then(() => {
          dispatch('fetchIndustries')
          toast.success('Indústria atualizada com sucesso!', {
            timeout: 5000
          })
        })
        .catch((error) => {
          toast.warning('Erro ao atualizar a indústria', { timeout: 5000 })
          throw error
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    getIndustryById({ commit }, industryId) {
      commit('setLoading', true)
      return getIndustry(industryId)
        .then((response) => {
          commit('setIndustry', response.data.content)
        })
        .catch((error) => {
          toast.warning('Erro ao buscar a indústria', { timeout: 5000 })
          throw error
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getIndustries: (state) => state.industries,
    getIndustry: (state) => state.industry,
    getLoadingIndustry: (state) => state.loading
  }
}
