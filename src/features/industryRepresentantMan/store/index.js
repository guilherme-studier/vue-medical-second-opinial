/* eslint-disable no-unused-vars */
// Seu arquivo Vuex

import { useToast } from 'vue-toastification'

import {
  updateIndustryRepresentant,
  createIndustryRepresentant,
  getIndustryRepresentant,
  getIndustryRepresentants,
  cancelIndustryRepresentant
} from '@/services/industryRepresentant/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    industryRepresentant: null,
    industryRepresentants: [],
    loading: false,
    currentPage: null,
    totalPages: null
  }),
  mutations: {
    setLoading(state, value) {
      state.loading = value
    },
    setIndustryRepresentant(state, representant) {
      state.industryRepresentant = representant
    },
    setIndustryRepresentants(state, representants) {
      state.industryRepresentants = representants
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    }
  },
  actions: {
    async editIndustryRepresentant({ commit, dispatch, state }, userData) {
      commit('setLoading', true)
      return updateIndustryRepresentant(
        state.industryRepresentant?.id,
        userData
      )
        .then((response) => {
          toast.success(
            'Dados do Representante da Indústria atualizados com sucesso',
            {
              timeout: 5000
            }
          )
          dispatch('fetchIndustryRepresentants')
        })
        .catch((error) => {
          toast.warning('Não foi possível editar os dados do Representante', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fetchIndustryRepresentant({ commit }, industryRepresentId) {
      commit('setLoading', true)
      return getIndustryRepresentant(industryRepresentId)
        .then((response) => {
          commit('setIndustryRepresentant', response?.data)
        })
        .catch((error) => {
          toast.warning('Erro ao buscar os dados do Representante', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fetchIndustryRepresentants({ commit, state }) {
      commit('setLoading', true)

      return getIndustryRepresentants(state.currentPage)
        .then((response) => {
          commit('setIndustryRepresentants', response.data.content)
          commit('setCurrentPage', response.data.page)
          commit('setTotalPages', response.data.totalPages)
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
    async createIndustryRepresentant({ commit, dispatch }, userData) {
      commit('setLoading', true)
      return createIndustryRepresentant(userData)
        .then(() => {
          toast.success('Representante da indústria criado com sucesso')
          dispatch('fetchIndustryRepresentants')
        })
        .catch((error) => {
          toast.warning('Erro ao criar o representante da indústria', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async cancelIndustryRepresentant({ commit, dispatch }, representantId) {
      commit('setLoading', true)
      return cancelIndustryRepresentant(representantId)
        .then(() => {
          toast.success('Representante da indústria cancelado com sucesso')
          dispatch('fetchIndustryRepresentants')
        })
        .catch((error) => {
          toast.warning('Erro ao cancelar o representante da indústria', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    clearIndustryRepresentant({ commit }) {
      commit('setLoading', true)
      commit('setIndustryRepresentant', null)
      commit('setLoading', false)
    },
    setPage({ commit }, page) {
      commit('setCurrentPage', page)
    }
  },
  getters: {
    getLoadingRepresentantIndustry: (state) => state.loading,
    getIndustryRepresentant: (state) => state.industryRepresentant,
    getIndustryRepresentants: (state) => state.industryRepresentants,
    getCurrentPage: (state) => state.currentPage,
    getTotalPages: (state) => state.totalPages
  }
}
