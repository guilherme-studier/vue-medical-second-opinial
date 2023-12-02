/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import {
  getClinicalCasesClientDoctor,
  createOrEditOpinion,
  getMessages,
  putMessage
} from '../services/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    icon: require('@/assets/icons/icon-voucher.svg'),
    iconSearch: require('@/assets/icons/icon-search.svg'),
    isModalSeem: false,
    isModalMessage: false,
    clinicalCases: [],
    searchTerm: '',
    messages: [],
    opinion: null,
    loading: false,
    loadingOpinion: false,
    loadingMessages: false,
    loadingActiveVoucher: false,
    error: false,
    isActiveVoucher: false,
    voucher: {},
    totalPages: null,
    totalContent: null,
    page: 1
  }),
  mutations: {
    updateSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    toggleIsModalSeem(state) {
      state.isModalSeem = !state.isModalSeem
    },
    toggleIsModalMessage(state) {
      state.isModalMessage = !state.isModalMessage
    },
    toggleIsActiveVoucher(state, voucher) {
      state.isActiveVoucher = !state.isActiveVoucher
      state.voucher = voucher
    },
    setClinicalCases(state, clinicalCases) {
      state.clinicalCases = clinicalCases
    },
    setOpinion(state, opinion) {
      state.opinion = opinion
    },
    setMessages(state, messages) {
      state.messages = messages
    },
    setLoading(state, value) {
      state.loading = value
    },
    setLoadingOpinion(state, value) {
      state.loadingOpinion = value
    },
    setLoadingMessages(state, value) {
      state.loadingMessages = value
    },
    setLoadingActiveVoucher(state, value) {
      state.loadingActiveVoucher = value
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
    handleModalSeem({ commit }, opinion) {
      commit('toggleIsModalSeem')
      commit('setOpinion', opinion)
    },
    handleModalMessage({ dispatch, commit }, voucherId) {
      commit('toggleIsModalMessage', voucherId)
      if (voucherId) dispatch('fetchMessages', voucherId)
    },
    handleActiveVoucher({ commit }, voucher) {
      commit('toggleIsActiveVoucher', voucher)
    },
    onActiveVoucherPage({ commit }) {
      commit('setLoadingActiveVoucher', true)
    },
    offActiveVoucherPage({ commit }) {
      commit('setLoadingActiveVoucher', false)
    },
    async fetchClinicalCases({ commit, dispatch }) {
      commit('setLoading', true)
      dispatch('getClinicalCases')
    },
    async getClinicalCases({ commit, state }) {
      return getClinicalCasesClientDoctor(state.page)
        .then((response) => {
          commit('setClinicalCases', response.data.content)
          commit('setTotalPages', response.data.totalPages)
          commit('setTotalContent', response.data.totalContent)
        })
        .catch(() => {
          toast.warning(
            'Erro ao buscar os casos clínicos de Médico Consultor',
            {
              timeout: 8000
            }
          )
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updatePage({ commit }, page) {
      commit('setPage', page)
    },
    async putOpinion({ commit, dispatch }, userData) {
      commit('setLoadingOpinion', true)
      return createOrEditOpinion(userData)
        .then(() => {
          toast.success('Parecer registrado com sucesso', {
            timeout: 8000
          })
          dispatch('getClinicalCases')
        })
        .catch(() => {
          toast.warning('Não foi possível registrar o parecer do médico', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoadingOpinion', false)
        })
    },
    async fetchMessages({ commit }, voucherId) {
      commit('setLoadingMessages', true)
      return getMessages(voucherId)
        .then((response) => {
          commit('setMessages', response.data.content)
        })
        .catch(() => {
          toast.warning('Erro ao buscar as mensagens deste voucher', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoadingMessages', false)
        })
    },
    async putNewMessage({ commit }, userData) {
      commit('setLoadingMessages', true)
      return putMessage(userData)
        .then(() => {
          toast.success('Mensagem enviada com sucesso', {
            timeout: 8000
          })
        })
        .catch(() => {
          toast.warning(
            'Não foi possível enviar esta mensagem, tente novamente mais tarde',
            {
              timeout: 8000
            }
          )
        })
    }
  },
  getters: {
    getIcon: (state) => state.icon,
    getIsModalSeem: (state) => state.isModalSeem,
    getIsModalMessage: (state) => state.isModalMessage,
    getActiveClinicalCase: (state) => state.getActiveClinicalCase,
    getIconSearch: (state) => state.iconSearch,
    getTableHeader: (state) => state.tableHeader,
    getTableData: (state) => state.tableData,
    getSearchTerm: (state) => state.searchTerm,
    getError: (state) => state.error,
    getOpinion: (state) => state.opinion,
    getMessages: (state) => state.messages,
    getClinicalCases: (state) => state.clinicalCases,
    getLoadingClinicalCases: (state) => state.loading,
    getLoadingOpinion: (state) => state.loadingOpinion,
    getLoadingMessages: (state) => state.loadingMessages,
    getIsActiveVoucher: (state) => state.isActiveVoucher,
    getVoucher: (state) => state.voucher,
    getLoadingActiveVoucher: (state) => state.loadingActiveVoucher,
    getTotalPages: (state) => state.totalPages,
    getTotalContent: (state) => state.totalContent,
    getPage: (state) => state.page
  }
}
