/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { putActiveClientDoctor } from '../services/index'

import * as h from '@/helpers/auth'
import { formatErrors } from '@/helpers/errors'
import router from '@/router'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    user: h.getFromStorage('token')
      ? JSON.parse(h.getFromStorage('token'))
      : null,
    loading: false
  }),
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLoading(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    activeClientDoctor({ commit }, params) {
      commit('setLoading', true)
      putActiveClientDoctor({ params })
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
          const errorMessage = error?.response
            ? formatErrors(error.response.data.message)
            : 'Erro desconhecido'

          toast.warning(`Erro ao efetuar o login: ${errorMessage}`, {
            timeout: 5000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getLoading: (state) => state.loading,
    getUserId: (state) => (state.user ? state.user.id : null),
    getUsername: (state) => (state.user ? state.user.username : null),
    getUserFirstname: (state) => (state.user ? state.user.firstname : null),
    getUserLastname: (state) => (state.user ? state.user.lastname : null),
    getUserEmail: (state) => (state.user ? state.user.email : null),
    getUserToken: (state) => (state.user ? state.user.token : null),
    getRole: (state) => (state.user ? state.user.role : null),
    isLoggedIn: (state) =>
      state.user ? state.user.token && state.user.id && state.user.role : null
  }
}
