/* eslint-disable no-unused-vars */
import { login, validateToken, logoutUser } from '../services/index'

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
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
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
    },
    async validateToken({ dispatch, commit }, token) {
      try {
        const response = await validateToken(token)
      } catch (error) {
        dispatch('logoutUser')
      }
    },
    async logoutUser({ commit }) {
      try {
        const response = await logoutUser()
        console.log('Logout bem-sucedido:', response)

        localStorage.clear()
      } catch (error) {
        console.error('Erro ao fazer logout:', error.message)
      }
    }
  },
  getters: {
    getLoginOptions: (state) => state.loginOptions,
    getUserId: (state) => (state.user ? state.user.id : null),
    getUsername: (state) => (state.user ? state.user.username : ''),
    getUserFirstname: (state) => (state.user ? state.user.firstname : ''),
    getUserLastname: (state) => (state.user ? state.user.lastname : ''),
    getUserEmail: (state) => (state.user ? state.user.email : ''),
    getUserToken: (state) => (state.user ? state.user.token : ''),
    isLoggedIn: (state) => (state.user ? state.user.token && state.user.id : '')
  }
}
