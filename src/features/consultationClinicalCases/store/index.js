/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { getContracts } from '../../../services/contract/index.js'
import { getUsers } from '../../../services/user/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    clinicalCases: 3,
    contracts: [],
    contract: {},
    industry: null,
    specialty: null,
    illness: null,
    doctors: [],
    doctor: null,
    totalPages: null,
    totalContent: null,
    page: 1
  }),
  mutations: {
    setContracts(state, contracts) {
      state.contracts = contracts
    },
    setContract(state, data) {
      state.data = data
    },
    setLoading(state, value) {
      state.loading = value
    },
    setIndustry(state, industry) {
      state.industry = !industry ? null : industry
    },
    setSpecialty(state, specialty) {
      state.specialty = !specialty ? null : specialty
    },
    setIllness(state, illness) {
      state.illness = !illness ? null : illness
    },
    setDoctors(state, doctors) {
      state.doctors = doctors
    },
    setDoctor(state, doctor) {
      state.doctor = !doctor ? null : doctor
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setTotalContent(state, totalContent) {
      state.totalContent = totalContent
    },
    setPage(state, page) {
      state.page = page
    }
  },
  actions: {
    async fetchContracts({ commit, state }) {
      commit('setLoading', true)
      const params = {
        diseaseId: state.illness,
        specialtyId: state.specialty,
        industryId: state.industry,
        consultantDoctorId: state.doctor,
        page: state.page
      }

      try {
        const response = await getContracts(params)
        commit('setContracts', response.data.content)
        commit('setTotalPages', response.data.totalPages)
        commit('setTotalContent', response.data.totalContent)
      } catch (error) {
        commit('setError', true)
        toast.warning('Erro ao buscar os casos clínicos', { timeout: 8000 })
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchConsultantDoctors({ commit }) {
      commit('setLoading', true)

      return getUsers({ type: 'consultant_doctor' })
        .then((response) => {
          commit('setDoctors', response?.data?.content)
          return response.data
        })
        .catch((error) => {
          toast.warning(
            'Não foi possível carregar as informações dos usuários',
            {
              timeout: 8000
            }
          )
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    setIndustryId({ commit }, industry) {
      commit('setIndustry', industry)
    },
    setSpecialtyId({ commit }, specialty) {
      commit('setSpecialty', specialty)
    },
    setIllnessId({ commit }, illness) {
      commit('setIllness', illness)
    },
    setDoctorId({ commit }, doctor) {
      commit('setDoctor', doctor)
    },
    updatePage({ commit }, page) {
      commit('setPage', page)
    }
  },
  getters: {
    getContract: (state) => state.contract,
    getContracts: (state) => state.contracts,
    getLoadingContracts: (state) => state.loading,
    getIndustry: (state) => state.industry,
    getSpecialty: (state) => state.specialty,
    getIllness: (state) => state.illness,
    getDoctors: (state) => state.doctors,
    getDoctor: (state) => state.doctor,
    getTotalPages: (state) => state.totalPages,
    getTotalContent: (state) => state.totalContent,
    getPage: (state) => state.page
  }
}
