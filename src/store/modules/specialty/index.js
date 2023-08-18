import {
  //createSpecialty,
  getSpecialties
  //deleteSpecialty,
  //updateSpecialty,
  //getSpecialty
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
        const specialties = response.data // Assuming the API response structure has an array of specialties
        commit('setSpecialties', specialties)
      } catch (error) {
        console.error('Error fetching specialties:', error)
      }
    }
    // Add more actions for other API operations (create, update, delete, get)
  },
  getters: {
    getSpecialties: (state) => state.specialties
  }
}
