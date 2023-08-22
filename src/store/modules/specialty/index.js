/* eslint-disable no-unused-vars */
import {
  updateSpecialty,
  createSpecialty,
  deleteSpecialty,
  getSpecialties,
  getSpecialty
} from '../../../services/specialty/index.js'

import { useToast } from 'vue-toastification'

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
        console.error('Erro ao buscar as especialidades:', error)
        toast.warning('Erro ao buscar as especialidades')
      }
    },
    async createNewSpecialty({ commit, dispatch }, specialtyName) {
      try {
        await createSpecialty(specialtyName)
        dispatch('fetchSpecialties')
        toast.success('Especialidade criada com sucesso!')
      } catch (error) {
        console.error('Erro ao criar a especialidade:', error)
        toast.warning('Erro ao criar a especialidade')
      }
    },
    async deleteSpecialtyById({ commit, dispatch }, specialtyId) {
      try {
        await deleteSpecialty(specialtyId)
        dispatch('fetchSpecialties')
        toast.success('Especialidade removida com sucesso!')
      } catch (error) {
        console.error('Erro ao deletar a especialidade:', error)
        toast.warning('Erro ao deletar a especialidade')
      }
    },
    async updateSpecialtyById({ commit, dispatch }, data) {
      try {
        await updateSpecialty(data.id, data.name)
        dispatch('fetchSpecialties')
        toast.success('Especialidade atualizada com sucesso!')
      } catch (error) {
        console.error('Erro ao atualizar a especialidade:', error)
        toast.warning('Erro ao atualizar a especialidade')
      }
    },
    async getSpecialtyById({ commit, dispatch }, specialtyId) {
      try {
        await getSpecialty(specialtyId)
        dispatch('fetchSpecialties')
      } catch (error) {
        console.error('Erro ao buscar a especialidade:', error)
        toast.warning('Erro ao buscar a especialidade')
      }
    }
  },
  getters: {
    getSpecialties: (state) => state.specialties
  }
}
