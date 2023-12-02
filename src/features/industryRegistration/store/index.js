/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import {
  createIndustry,
  getIndustries,
  deleteIndustry,
  updateIndustry,
  getIndustry
} from '../../../services/industry/index'

import { formatErrors } from '@/helpers/errors'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    industry: null,
    industries: [],
    loading: false,
    totalPages: null,
    totalContent: null,
    page: 1
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
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setTotalContent(state, totalContent) {
      state.totalContent = totalContent
    },
    setPage(state, page) {
      state.page = page
    }
  },
  actions: {
    async createIndustry({ commit, dispatch }, userData) {
      commit('setLoading', true)
      return createIndustry(userData)
        .then((response) => {
          commit('setIndustry', response.data)
          toast.success('Cadastro Indústria efetuado criado com sucesso', {
            timeout: 8000
          })
          dispatch('fetchIndustries')
          return response
        })
        .catch((error) => {
          toast.warning('Não foi possível realizar o cadastro', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fetchIndustries({ commit, state }, size = 10) {
      commit('setLoading', true)
      return getIndustries(state.page, size)
        .then((response) => {
          commit('setIndustries', response.data.content)
          commit('setTotalPages', response.data.totalPages)
          commit('setTotalContent', response.data.totalContent)
        })
        .catch((error) => {
          toast.warning('Erro ao buscar as indústrias', { timeout: 8000 })
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
          toast.success('Indústria removida com sucesso!', { timeout: 8000 })
        })
        .catch((error) => {
          const errorMessage = error.response
            ? formatErrors(error.response.data.message)
            : 'Erro desconhecido'

          toast.warning(`Erro ao tentar deletar a indústria: ${errorMessage}`, {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async updateIndustryById({ commit, dispatch }, userData) {
      commit('setLoading', true)
      return updateIndustry(userData)
        .then(() => {
          dispatch('fetchIndustries')
          toast.success('Indústria atualizada com sucesso!', {
            timeout: 8000
          })
        })
        .catch((error) => {
          toast.warning('Erro ao atualizar a indústria', { timeout: 8000 })
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
          toast.warning('Erro ao buscar a indústria', { timeout: 8000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updatePage({ commit }, page) {
      commit('setPage', page)
    }
  },
  getters: {
    getIndustries: (state) => state.industries,
    getIndustry: (state) => state.industry,
    getLoadingIndustry: (state) => state.loading,
    getTotalPages: (state) => state.totalPages,
    getTotalContent: (state) => state.totalContent,
    getPage: (state) => state.page
  }
}
