/* eslint-disable no-unused-vars */
import { validateToken, logoutUser, login, reset } from '../services/index'

import * as h from '@/helpers/auth'
import router from '@/router'

import { useToast } from 'vue-toastification'

const toast = useToast()

export default {
  state: () => ({
    user: h.getFromStorage('user')
      ? JSON.parse(h.getFromStorage('user'))
      : null,
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
        const toast = useToast()
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

        commit('setUser', userData)

        localStorage.setItem('user', JSON.stringify(userData))
        router.push('/')
      } catch (error) {
        toast.warning('Não foi possível realizar o login')
        console.error(error)
      }
    },
    async validateToken({ dispatch, commit }, token) {
      try {
        const response = await validateToken(token)
      } catch (error) {
        dispatch('logoutUser')
        toast.warning('Não foi possível validar o usuário logado')
      }
    },
    async logoutUser({ commit }) {
      try {
        const response = await logoutUser()

        localStorage.clear()
        router.push('/login')
      } catch (error) {
        console.error('Erro ao fazer logout:', error.message)
      }
    },
    async resetPassword({ commit }, email) {
      try {
        const response = await reset({ email })

        // Exiba uma mensagem de sucesso no console
        console.log('E-mail enviado com sucesso:', response)
      } catch (error) {
        console.error('Erro ao redefinir a senha:', error.message)
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
