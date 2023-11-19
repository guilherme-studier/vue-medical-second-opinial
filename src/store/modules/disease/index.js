import { useToast } from 'vue-toastification'

import {
  updateDisease,
  createDisease,
  deleteDisease,
  getDiseases,
  getDisease
} from '../../../services/disease/index.js'

import { formatErrors } from '@/helpers/errors'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    diseases: [],
    loading: false,
    error: false,
    totalPages: null,
    totalContent: null,
    page: 1
  }),
  mutations: {
    setDiseases(state, diseases) {
      state.diseases = diseases
    },
    setLoading(state, value) {
      state.loading = value
    },
    setError(state, value) {
      state.error = value
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
    fetchDiseases({ commit, state }, size = 10) {
      commit('setLoading', true)
      getDiseases(state.page, size)
        .then((response) => {
          commit('setDiseases', response.data.content)
          commit('setTotalPages', response.data.totalPages)
          commit('setTotalContent', response.data.totalContent)
        })
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao buscar as doenças', { timeout: 5000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updatePage({ commit }, page) {
      commit('setPage', page)
    },
    createNewDisease({ commit, dispatch }, diseaseName) {
      commit('setLoading', true)
      createDisease(diseaseName)
        .then(() => {
          dispatch('fetchDiseases')
          toast.success('Doença criada com sucesso!', { timeout: 5000 })
        })
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao criar a doença', { timeout: 5000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    deleteDiseaseById({ commit, dispatch }, diseaseId) {
      commit('setLoading', true)
      deleteDisease(diseaseId)
        .then(() => {
          dispatch('fetchDiseases')
          toast.success('Doença removida com sucesso!', { timeout: 5000 })
        })
        .catch((error) => {
          const errorMessage = error.response
            ? formatErrors(error.response.data.message)
            : 'Erro desconhecido'

          toast.warning(`Erro ao tentar deletar a doença: ${errorMessage}`, {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updateDiseaseById({ commit, dispatch }, data) {
      commit('setLoading', true)
      updateDisease(data.id, data.name)
        .then(() => {
          dispatch('fetchDiseases')
          toast.success('Doença atualizada com sucesso!', { timeout: 5000 })
        })
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao atualizar a doença', { timeout: 5000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    getDiseaseById({ commit, dispatch }, diseaseId) {
      commit('setLoading', true)
      getDisease(diseaseId)
        .then(() => {
          dispatch('fetchDiseases')
        })
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao buscar a doença', { timeout: 5000 })
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
    getDiseases: (state) => state.diseases,
    getLoadingDiseases: (state) => state.loading,
    getErrorDiseases: (state) => state.error,
    getTotalPages: (state) => state.totalPages,
    getTotalContent: (state) => state.totalContent,
    getPage: (state) => state.page
  }
}
