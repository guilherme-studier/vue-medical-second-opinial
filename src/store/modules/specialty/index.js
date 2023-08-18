/* eslint-disable no-unused-vars */
import {
  updateSpecialty,
  createSpecialty,
  deleteSpecialty,
  getSpecialties,
  getSpecialty
} from '../../../services/specialty/index.js'

export default {
  namespaced: true,
  state: () => ({
    specialties: []
  }),
  mutations: {
    setSpecialties(state, specialties) {
      state.specialties = specialties
    }
  },
  actions: {
    async fetchSpecialties({ commit }) {
      try {
        const response = await getSpecialties()
        commit('setSpecialties', response.data.content)
      } catch (error) {
        console.error('Erro ao buscar as especialidades:', error)
      }
    },
    async createNewSpecialty({ commit, dispatch }, specialtyName) {
      try {
        await createSpecialty(specialtyName)
        dispatch('fetchSpecialties')
      } catch (error) {
        console.error('Erro ao criar a especialidade:', error)
      }
    },
    async deleteSpecialtyById({ commit, dispatch }, specialtyId) {
      try {
        await deleteSpecialty(specialtyId)
        dispatch('fetchSpecialties')
      } catch (error) {
        console.error('Erro ao deletar a especialidade:', error)
      }
    },
    async updateSpecialtyById({ commit, dispatch }, { specialtyId, name }) {
      try {
        await updateSpecialty(specialtyId, name)
        dispatch('fetchSpecialties')
      } catch (error) {
        console.error('Erro ao atualizar a especialidade:', error)
      }
    },
    async getSpecialtyById({ commit, dispatch }, specialtyId) {
      try {
        await getSpecialty(specialtyId)
        dispatch('fetchSpecialties')
      } catch (error) {
        console.error('Erro ao buscar a especialidade:', error)
      }
    }
  },
  getters: {
    getSpecialties: (state) => state.specialties
  }
}
