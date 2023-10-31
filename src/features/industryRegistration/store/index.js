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
    loading: false,
    currentPage: null,
    totalPages: null
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
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    }
  },
  actions: {
    async createIndustry({ commit }, userData) {
      commit('setLoading', true)
      return createIndustry(userData)
        .then((response) => {
          commit('setIndustry', response.data)
          toast.success('Cadastro Indústria efetuado criado com sucesso', {
            timeout: 5000
          })
          return response
        })
        .catch((error) => {
          toast.warning('Não foi possível realizar o cadastro', {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fetchIndustries({ commit, state }) {
      commit('setLoading', true)
      return getIndustries()
        .then((response) => {
          commit('setIndustries', response.data)
          commit('setCurrentPage', parseInt(response.data.page))
          commit('setTotalPages', parseInt(response.data.totalPages))
        })
        .catch((error) => {
          toast.warning('Erro ao buscar as indústrias', { timeout: 5000 })
          throw error
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async deleteIndustryById({ commit, dispatch }, industryId) {
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
    async updateIndustryById({ commit, dispatch }, data) {
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
    async getIndustryById({ commit }, industryId) {
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
    },
    setPage({ commit }, page) {
      commit('setCurrentPage', page)
    }
  },
  getters: {
    getIndustries: (state) => state.industries,
    getIndustry: (state) => state.industry,
    getLoadingIndustry: (state) => state.loading,
    getCurrentPage: (state) => state.currentPage,
    getTotalPages: (state) => state.totalPages
  }
}
