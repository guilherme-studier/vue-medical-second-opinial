/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import {
  updateSpecialty,
  createSpecialty,
  deleteSpecialty,
  getSpecialties,
  getSpecialty
} from '../../../services/specialty/index.js'

import { formatErrors } from '@/helpers/errors'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    specialties: [],
    loading: false,
    error: false,
    totalPages: null,
    totalContent: null,
    page: 1
  }),
  mutations: {
    setSpecialties(state, specialties) {
      state.specialties = specialties
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
    fetchSpecialties({ commit, state }, size = 10) {
      commit('setLoading', true)
      getSpecialties(state.page, size)
        .then((response) => {
          commit('setSpecialties', response.data.content)
          commit('setTotalPages', response.data.totalPages)
          commit('setTotalContent', response.data.totalContent)
        })
        .catch((error) => {
          commit('setError', true)
          toast.warning('Erro ao buscar as especialidades', { timeout: 5000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updatePage({ commit }, page) {
      commit('setPage', page)
    },
    createNewSpecialty({ commit, dispatch }, specialtyName) {
      commit('setLoading', true)
      createSpecialty(specialtyName)
        .then(() => {
          dispatch('fetchSpecialties')
          toast.success('Especialidade criada com sucesso!', { timeout: 5000 })
        })
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao criar a especialidade', { timeout: 5000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    deleteSpecialtyById({ commit, dispatch }, specialtyId) {
      commit('setLoading', true)
      deleteSpecialty(specialtyId)
        .then(() => {
          dispatch('fetchSpecialties')
          toast.success('Especialidade removida com sucesso!', {
            timeout: 5000
          })
        })
        .catch((error) => {
          const errorMessage = error.response
            ? formatErrors(error.response.data.message)
            : 'Erro desconhecido'

          toast.warning(
            `Erro ao tentar deletar a especialidade: ${errorMessage}`,
            {
              timeout: 5000
            }
          )
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updateSpecialtyById({ commit, dispatch }, data) {
      commit('setLoading', true)
      updateSpecialty(data.id, data.name)
        .then(() => {
          dispatch('fetchSpecialties')
          toast.success('Especialidade atualizada com sucesso!', {
            timeout: 5000
          })
        })
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao atualizar a especialidade', { timeout: 5000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    getSpecialtyById({ commit, dispatch }, specialtyId) {
      commit('setLoading', true)
      getSpecialty(specialtyId)
        .then(() => {
          dispatch('fetchSpecialties')
        })
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao buscar a especialidade', { timeout: 5000 })
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
    getSpecialties: (state) => state.specialties,
    getLoadingSpecialtys: (state) => state.loading,
    getErrorSpecialtys: (state) => state.error,
    getTotalPages: (state) => state.totalPages,
    getTotalContent: (state) => state.totalContent,
    getPage: (state) => state.page
  }
}
