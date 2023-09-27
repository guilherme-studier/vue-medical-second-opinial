import { useToast } from 'vue-toastification'

import {
  updateDisease,
  createDisease,
  deleteDisease,
  getDiseases,
  getDisease
} from '../../../services/disease/index.js'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    diseases: [],
    loading: false,
    error: false
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
    }
  },
  actions: {
    fetchDiseases({ commit }) {
      commit('setLoading', true)
      getDiseases()
        .then((response) => {
          commit('setDiseases', response.data.content)
        })
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao buscar as doenças', { timeout: 5000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
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
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao deletar a doença', { timeout: 5000 })
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
    }
  },
  getters: {
    getDiseases: (state) => state.diseases,
    getLoadingDiseases: (state) => state.loading,
    getErrorDiseases: (state) => state.error
  }
}
