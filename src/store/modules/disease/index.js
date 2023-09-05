/* eslint-disable no-unused-vars */
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
    diseases: []
  }),
  mutations: {
    setDiseases(state, diseases) {
      state.diseases = diseases
    }
  },
  actions: {
    async fetchDiseases({ commit }) {
      try {
        const response = await getDiseases()
        commit('setDiseases', response.data.content)
      } catch (error) {
        alert('Erro ao buscar as doenças:', error)
        toast.warning('Erro ao buscar as doenças', { timeout: 5000 })
      }
    },
    async createNewDisease({ commit, dispatch }, diseaseName) {
      try {
        await createDisease(diseaseName)
        dispatch('fetchDiseases')
        toast.success('Doença criada com sucesso!', { timeout: 5000 })
      } catch (error) {
        alert('Erro ao criar a doença:', error)
        toast.warning('Erro ao criar a doença', { timeout: 5000 })
      }
    },
    async deleteDiseaseById({ commit, dispatch }, diseaseId) {
      try {
        await deleteDisease(diseaseId)
        dispatch('fetchDiseases')
        toast.success('Doença removida com sucesso!', { timeout: 5000 })
      } catch (error) {
        alert('Erro ao deletar a doença:', error)
        toast.warning('Erro ao deletar a doença', { timeout: 5000 })
      }
    },
    async updateDiseaseById({ commit, dispatch }, data) {
      try {
        await updateDisease(data.id, data.name)
        dispatch('fetchDiseases')
        toast.success('Doença atualizada com sucesso!', { timeout: 5000 })
      } catch (error) {
        alert('Erro ao atualizar a doença:', error)
        toast.warning('Erro ao atualizar a doença', { timeout: 5000 })
      }
    },
    async getDiseaseById({ commit, dispatch }, diseaseId) {
      try {
        await getDisease(diseaseId)
        dispatch('fetchDiseases')
      } catch (error) {
        alert('Erro ao buscar a doença:', error)
        toast.warning('Erro ao buscar a doença', { timeout: 5000 })
      }
    }
  },
  getters: {
    getDiseases: (state) => state.diseases
  }
}
