/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import {
  getContractByIndustryId,
  getContract,
  getContracts,
  getDoctorsByContractId
} from '../services/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    contractsByIndustryId: null,
    contracts: [],
    contract: null,
    doctors: [],
    loading: false
  }),
  mutations: {
    setContractsByIndustryId(state, contractsByIndustryId) {
      state.contractsByIndustryId = contractsByIndustryId
    },
    setContracts(state, contracts) {
      state.contracts = contracts
    },
    setContract(state, contract) {
      state.contract = contract
    },
    setDoctors(state, doctors) {
      state.doctors = doctors
    },
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    fetchContractByIndustryId({ commit }, industryId) {
      commit('setLoading', true)
      commit('setContractsByIndustryId', null)

      getContractByIndustryId(industryId)
        .then((response) => {
          commit('setContractsByIndustryId', response.data)
        })
        .catch(() => {
          toast.warning('Não foi possível buscar o contrato de caso clínico', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    fetchDoctorsByContractId({ commit }, contractId) {
      commit('setLoading', true)

      getDoctorsByContractId(contractId)
        .then((response) => {
          commit('setDoctors', response.data)
        })
        .catch(() => {
          toast.warning('Não foi possível buscar os médicos consultores', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    fetchContract({ commit }, id) {
      commit('setLoading', true)

      getContract(id)
        .then((response) => {
          commit('setContract', response.data)
        })
        .catch(() => {
          toast.warning('Não foi possível busca o contrato de caso clínico', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    fetchContracts({ commit }) {
      commit('setLoading', true)

      getContracts()
        .then((response) => {
          commit('setContracts', response.data)
        })
        .catch(() => {
          toast.warning('Não foi possível consultar os contratos clínicos', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    clearContractsByIndustryId({ commit }) {
      commit('setContractsByIndustryId', null)
    },
    clearDoctors({ commit }) {
      commit('setDoctors', null)
    }
  },
  getters: {
    getContractsByIndustryId: (state) => state.contractsByIndustryId,
    getContracts: (state) => state.contracts,
    getContract: (state) => state.contract,
    getDoctors: (state) => state.doctors,
    getContractLoading: (state) => state.loading
  }
}
