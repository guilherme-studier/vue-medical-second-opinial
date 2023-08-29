import { createApp } from 'vue'
import { createStore } from 'vuex'

import user from './modules/user'
import { getCurrentUserAccess } from '../helpers/auth'

import admClinicalCases from '@/features/admClinicalCases/store/index'
import allocationClinicalCases from '@/features/allocationClinicalCases/store/index'
import clinicalCasesEvaluation from '@/features/clinicalCasesEvaluation/store/index'
import consultantDoctorInvitation from '@/features/consultantDoctorInvitation/store/index'
import home from '@/features/home/stores/index'
import industryRegistration from '@/features/industryRegistration/store/index'
import login from '@/features/login/store/index'
import registration from '@/features/registration/store/index'
import registrationClinicalCases from '@/features/registrationClinicalCases/store/index'
import representativeRegistration from '@/features/representativeRegistration/store/index'
import systemAccessCancellation from '@/features/systemAccessCancellation/store/index'
import disease from '@/store/modules/disease/index'
import specialty from '@/store/modules/specialty/index'

const store = createStore({
  state: {
    authToken: getCurrentUserAccess(),
    retryDelay: null,
    isTokenExpired: false,
    csrf: null
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
    user,
    home,
    login,
    disease,
    specialty,
    registration,
    admClinicalCases,
    industryRegistration,
    clinicalCasesEvaluation,
    systemAccessCancellation,
    allocationClinicalCases,
    registrationClinicalCases,
    representativeRegistration,
    consultantDoctorInvitation
  },
  getters: {
    getAuthToken: (state) => state.authToken,
    getRetryDelay: (state) => state.retryDelay,
    getIsTokenExpired: (state) => state.isTokenExpired,
    getCsrf: (state) => state.csrf
  }
})

const app = createApp({})
app.use(store)

export default store
