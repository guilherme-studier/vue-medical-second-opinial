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
      try {
        const response = await login({ email: username, password })

        const userData = {
          id: response.data.id,
          username: response.data.username,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          phone: response.data.phone,
          email: response.data.email,
          token: response.data.token,
          role: response.data.role
        }

        // Converter o objeto para uma string JSON e salvar no localStorage
        localStorage.setItem('user', JSON.stringify(userData))

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
