/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { validateToken, logoutUser, login, reset } from '../services/index'

import * as h from '@/helpers/auth'
import router from '@/router'

const toast = useToast()

export default {
  state: () => ({
    user: h.getFromStorage('token')
      ? JSON.parse(h.getFromStorage('token'))
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
    ],
    loading: false,
    error: false,
    validatePassword: false
  }),
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    },
    setValidatePassword(state, value) {
      state.validatePassword = value
    }
  },
  actions: {
    loginUser({ commit }, { username, password }) {
      commit('setLoading', true)

      const toast = useToast()

      // se o usuário já estiver logado, a função de login será chamada para validar a atualização dos dados do usuário
      if (!this.getters.getUserToken) {
        login({ email: username, password })
          .then((response) => {
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

            localStorage.setItem('token', JSON.stringify(userData))

            router.push('/')
          })
          .catch((error) => {
            toast.warning('Não foi possível realizar o login', {
              timeout: 5000
            })
          })
          .finally(() => {
            commit('setLoading', false)
          })
      } else {
        login({ email: username, password })
          .then(() => {
            commit('setValidatePassword', true)
          })
          .catch((error) => {
            commit('setValidatePassword', false)
            toast.warning(
              'Não foi possível validar a senha do usuário para realizar a atualização dos dados cadastrais',
              { timeout: 5000 }
            )
          })
          .finally(() => {
            commit('setLoading', false)
          })
      }
    },

    async validateToken({ dispatch, commit }, token) {
      try {
        const response = await validateToken(token)
      } catch (error) {
        dispatch('logoutUser')
        toast.warning('Não foi possível validar o usuário logado', {
          timeout: 5000
        })
      }
    },

    logoutUser({ commit }) {
      logoutUser()
        .then(async (response) => {
          localStorage.clear('token')
          localStorage.clear('user')
          await window.location.reload()
        })
        .catch((error) => {
          toast.warning('Não foi possível realizar o logout do usuário', {
            timeout: 5000
          })
        })
    },

    resetPassword({ commit }, email) {
      reset({ email })
        .then((response) => {
          toast.success('E-mail de reset de senha enviado com sucesso', {
            timeout: 5000
          })
        })
        .catch((error) => {
          toast.warning('Não foi possível realizar o reset da senha', {
            timeout: 5000
          })
        })
    }
  },
  getters: {
    getLoginOptions: (state) => state.loginOptions,
    getUserId: (state) => (state.user ? state.user.id : null),
    getUsername: (state) => (state.user ? state.user.username : null),
    getUserFirstname: (state) => (state.user ? state.user.firstname : null),
    getUserLastname: (state) => (state.user ? state.user.lastname : null),
    getUserEmail: (state) => (state.user ? state.user.email : null),
    getUserToken: (state) => (state.user ? state.user.token : null),
    getRole: (state) => (state.user ? state.user.role : null),
    isLoggedIn: (state) =>
      state.user ? state.user.token && state.user.id && state.user.role : null,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getValidatePassword: (state) => state.validatePassword
  }
}
