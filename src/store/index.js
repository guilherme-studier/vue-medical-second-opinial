import Vue from 'vue'
import Vuex from 'vuex'
import { getCurrentUserAccess } from '../helpers/auth'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: getCurrentUserAccess() /** Token de autenticação */,
    retryDelay: null /** Armazena o tempo de delay até executar uma nova requisição para a que falhou */,
    isTokenExpired: false /** Flag que verifica se o token atual está expirado */,
    csrf: null /** Token CSRF */
  },
  mutations: {
    updateAuthToken(state, token) {
      state.authToken = token
    },
    updateRetryDelay(state, delay) {
      state.retryDelay = delay
    },
    updateIsTokenExpired(state, isExpired) {
      state.isTokenExpired = isExpired
    },
    updateCsrf(state, csrf) {
      state.csrf = csrf
    }
  },
  actions: {
    setAuthToken({ commit }, token) {
      commit('updateAuthToken', token)
    },
    setRetryDelay({ commit }, delay) {
      commit('updateRetryDelay', delay)
    },
    setIsTokenExpired({ commit }, isExpired) {
      commit('updateIsTokenExpired', isExpired)
    },
    setCsrf({ commit }, csrf) {
      commit('updateCsrf', csrf)
    }
  },
  modules: {
    user
  },
  getters: {
    getAuthToken: (state) => state.authToken,
    getRetryDelay: (state) => state.retryDelay,
    getIsTokenExpired: (state) => state.isTokenExpired,
    getCsrf: (state) => state.csrf
  }
})
