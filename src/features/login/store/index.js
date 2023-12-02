/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { validateToken, logoutUser, login, reset } from '../services/index'

import * as h from '@/helpers/auth'
import { formatErrors } from '@/helpers/errors'
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
        name: 'Médico Solicitante',
        background: 'background-doctor-client'
      },
      {
        id: 4,
        name: 'Representante da Indústria',
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

            if (userData.username && userData.phone) return router.push('/')
            else if (
              !userData.username &&
              !userData.phone &&
              userData.role === 'consultant_doctor'
            )
              return router.push('/medical-registration')
            else if (
              !userData.username &&
              !userData.phone &&
              userData.role === 'agent'
            )
              return router.push('/representative-registration')
            else if (
              !userData.username &&
              !userData.phone &&
              userData.role === 'client_doctor'
            )
              return router.push('/registration')
            else return router.push('/')
          })
          .catch((error) => {
            const errorMessage = error.response
              ? formatErrors(error.response.data.message)
              : 'Erro desconhecido'

            toast.warning(`Erro ao efetuar o login: ${errorMessage}`, {
              timeout: 8000
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
              { timeout: 8000 }
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
          timeout: 8000
        })
      }
    },

    logoutUser({ commit }) {
      commit('setLoading', true)
      logoutUser()
        .then(async (response) => {
          localStorage.clear('token')
          localStorage.clear('user')
          await window.location.reload()
        })
        .catch((error) => {
          toast.warning('Não foi possível realizar o logout do usuário', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },

    resetPassword({ commit }, email) {
      reset(email)
        .then((response) => {
          toast.success('Email de recuperação de senha enviado com sucesso', {
            timeout: 8000
          })
        })
        .catch((error) => {
          const errorMessage = error.response
            ? formatErrors(error.response.data.message)
            : 'Erro desconhecido'

          toast.warning(`Erro ao efetuar o reset da senha: ${errorMessage}`, {
            timeout: 8000
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
