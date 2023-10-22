import { createApp } from 'vue'
import { createStore } from 'vuex'

import { getCurrentUserAccess } from '../helpers/auth'

import admClinicalCases from '@/features/admClinicalCases/store/index'
import allocationClinicalCases from '@/features/allocationClinicalCases/store/index'
import authorizedDistributeClinicalCases from '@/features/authorizedDistributeClinicalCases/store/index'
import clinicalCasesConsultationDoctor from '@/features/clinicalCasesConsultationDoctor/store/index'
import clinicalCasesEvaluation from '@/features/clinicalCasesEvaluation/store/index'
import clinicalCasesIndustry from '@/features/clinicalCasesIndustry/store/index'
import consultantDoctorInvitation from '@/features/consultantDoctorInvitation/store/index'
import consultantMedicalRegistration from '@/features/consultantMedicalRegistration/store/index'
import consultationClinicalCases from '@/features/consultationClinicalCases/store/index'
import home from '@/features/home/stores/index'
import industry from '@/features/industryRegistration/store/index'
import industryRepresentantMan from '@/features/industryRepresentantMan/store/index'
import login from '@/features/login/store/index'
import registration from '@/features/registration/store/index'
import registrationClinicalCases from '@/features/registrationClinicalCases/store/index'
import representativeRegistration from '@/features/representativeRegistration/store/index'
import disease from '@/store/modules/disease/index'
import specialty from '@/store/modules/specialty/index'
import user from '@/store/modules/user/index'

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
    industry,
    specialty,
    registration,
    admClinicalCases,
    clinicalCasesIndustry,
    clinicalCasesEvaluation,
    industryRepresentantMan,
    allocationClinicalCases,
    consultationClinicalCases,
    registrationClinicalCases,
    representativeRegistration,
    consultantDoctorInvitation,
    consultantMedicalRegistration,
    clinicalCasesConsultationDoctor,
    authorizedDistributeClinicalCases
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
