/* eslint-disable no-unused-vars */
import {
  updateDisease,
  createDisease,
  deleteDisease,
  getDiseases,
  getDisease
} from '../../../services/disease/index.js'

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
        console.error('Erro ao buscar as doenças:', error)
      }
    },
    async createNewDisease({ commit, dispatch }, diseaseName) {
      try {
        await createDisease(diseaseName)
        dispatch('fetchDiseases')
      } catch (error) {
        console.error('Erro ao criar a doença:', error)
      }
    },
    async deleteDiseaseById({ commit, dispatch }, diseaseId) {
      try {
        await deleteDisease(diseaseId)
        dispatch('fetchDiseases')
      } catch (error) {
        console.error('Erro ao deletar a doença:', error)
      }
    },
    async updateDiseaseById({ commit, dispatch }, { diseaseId, name }) {
      try {
        await updateDisease(diseaseId, name)
        dispatch('fetchDiseases')
      } catch (error) {
        console.error('Erro ao atualizar a doença:', error)
      }
    },
    async getDiseaseById({ commit, dispatch }, diseaseId) {
      try {
        await getDisease(diseaseId)
        dispatch('fetchDiseases')
      } catch (error) {
        console.error('Erro ao buscar a doença:', error)
      }
    }
  },
  getters: {
    getDiseases: (state) => state.diseases
  }
}
