/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import {
  updateSpecialty,
  createSpecialty,
  deleteSpecialty,
  getSpecialties,
  getSpecialty
} from '../../../services/specialty/index.js'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    specialties: [],
    loading: false,
    error: false
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
    }
  },
  actions: {
    fetchSpecialties({ commit }) {
      commit('setLoading', true)
      getSpecialties()
        .then((response) => {
          commit('setSpecialties', response.data.content)
        })
        .catch((error) => {
          commit('setError', true)
          toast.warning('Erro ao buscar as especialidades', { timeout: 5000 })
        })
        .finally(() => {
          commit('setLoading', false)
        })
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
        .catch(() => {
          commit('setError', true)
          toast.warning('Erro ao deletar a especialidade', { timeout: 5000 })
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
    }
  },
  getters: {
    getSpecialties: (state) => state.specialties,
    getLoadingSpecialtys: (state) => state.loading,
    getErrorSpecialtys: (state) => state.error
  }
}
