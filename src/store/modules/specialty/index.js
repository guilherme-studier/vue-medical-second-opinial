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
        toast.warning('Erro ao buscar as especialidades', { timeout: 5000 })
      }
    },
    async createNewSpecialty({ commit, dispatch }, specialtyName) {
      try {
        await createSpecialty(specialtyName)
        dispatch('fetchSpecialties')
        toast.success('Especialidade criada com sucesso!', { timeout: 5000 })
      } catch (error) {
        toast.warning('Erro ao criar a especialidade', { timeout: 5000 })
      }
    },
    async deleteSpecialtyById({ commit, dispatch }, specialtyId) {
      try {
        await deleteSpecialty(specialtyId)
        dispatch('fetchSpecialties')
        toast.success('Especialidade removida com sucesso!', { timeout: 5000 })
      } catch (error) {
        toast.warning('Erro ao deletar a especialidade', { timeout: 5000 })
      }
    },
    async updateSpecialtyById({ commit, dispatch }, data) {
      try {
        await updateSpecialty(data.id, data.name)
        dispatch('fetchSpecialties')
        toast.success('Especialidade atualizada com sucesso!', {
          timeout: 5000
        })
      } catch (error) {
        toast.warning('Erro ao atualizar a especialidade', { timeout: 5000 })
      }
    },
    async getSpecialtyById({ commit, dispatch }, specialtyId) {
      try {
        await getSpecialty(specialtyId)
        dispatch('fetchSpecialties')
      } catch (error) {
        toast.warning('Erro ao buscar a especialidade', { timeout: 5000 })
      }
    }
  },
  getters: {
    getSpecialties: (state) => state.specialties
  }
}
