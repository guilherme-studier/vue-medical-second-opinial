/* eslint-disable no-unused-vars */
import { login } from '../services/index'

export default {
  namespaced: true,
  state: () => ({
    loginOptions: [
      {
        id: 1,
        name: 'Instituto Ceos',
        background: 'background-ceos'
      },
      {
        id: 2,
        name: 'Médico Consultor',
        background: 'background-doctor'
      },
      {
        id: 3,
        name: 'Médico Cliente',
        background: 'background-doctor-client'
      },
      {
        id: 4,
        name: 'Patrocinador',
        background: 'background-sponsor'
      }
    ]
  }),
  actions: {
    async loginUser({ commit }, { username, password }) {
      console.log(username)
      try {
        const response = await login({ email: username, password })
        console.log('Dados da resposta:', response)
      } catch (error) {
        console.error('Erro na chamada à API:', error.message)
      }
    }
  },
  getters: {
    getLoginOptions: (state) => state.loginOptions
  }
}
