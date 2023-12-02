/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { putActiveClientDoctor } from '../services/index'

import * as h from '@/helpers/auth'
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
        .then(() => {
          toast.success(
            'Cadastro ativado com sucesso, realize seu primeiro login na plataforma',
            {
              timeout: 8000
            }
          )
          router.push('/login')
        })
        .catch((error) => {
          toast.warning('Erro ao efetuar a ativação do cadastro', {
            timeout: 8000
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
