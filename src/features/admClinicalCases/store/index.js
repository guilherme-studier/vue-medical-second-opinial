import { faCheck, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useToast } from 'vue-toastification'

import { getClinicalCasesConsultantDoctor } from '../../clinicalCasesConsultationDoctor/services/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    doctor: 'Dr. Guilherme Studier',
    tableHeader: ['Casos Clínicos', 'ID', 'Doença', 'Data', 'Status', 'Ação'],
    tableData: [
      {
        clinicalCases: 'Tratamento Enfermidade ABC',
        id: '001',
        illness: 'Doença 1',
        date: '2016-05-03',
        status: 'Em avaliação',
        action: [
          {
            icon: faCheck,
            status: 1,
            handler: () => alert('Função do item 1')
          },
          {
            icon: faXmark,
            status: 0,
            handler: () => alert('Função do item 1')
          },
          {
            icon: faTrash,
            status: 1,
            handler: () => alert('Função do item 1')
          }
        ]
      },
      {
        clinicalCases: 'Tratamento Doença XYZ',
        id: '002',
        illness: 'Doença 2',
        date: '2016-05-03',
        status: 'Em avaliação',
        action: [
          {
            icon: faCheck,
            status: 0,
            handler: () => alert('Função do item 1')
          },
          {
            icon: faXmark,
            status: 1,
            handler: () => alert('Função do item 1')
          },
          {
            icon: faTrash,
            status: 1,
            handler: () => alert('Função do item 1')
          }
        ]
      },
      {
        clinicalCases: 'Tratamento Enfermidade FG',
        id: '003',
        illness: 'Doença 3',
        date: '2016-05-03',
        status: 'Em avaliação',
        action: [
          {
            icon: faCheck,
            status: 0,
            handler: () => alert('Função do item 1')
          },
          {
            icon: faXmark,
            status: 1,
            handler: () => alert('Função do item 1')
          },
          {
            icon: faTrash,
            status: 1,
            handler: () => alert('Função do item 1')
          }
        ]
      },
      {
        clinicalCases: 'Tratamento UTI',
        id: '004',
        illness: 'Doença 4',
        date: '2016-05-03',
        status: 'Em avaliação',
        action: [
          {
            icon: faCheck,
            status: 1,
            handler: () => alert('Função do item 1')
          },
          {
            icon: faXmark,
            status: 1,
            handler: () => alert('Função do item 1')
          },
          {
            icon: faTrash,
            status: 1,
            handler: () => alert('Função do item 1')
          }
        ]
      }
    ],
    loading: false,
    error: false,
    errorMessage: '',
    clinicalCases: []
  }),
  mutations: {
    setTableData(state, data) {
      state.tableData = data
    },
    setLoading(state, value) {
      state.loading = value
    },
    setError(state, { value, message }) {
      state.error = value
      state.errorMessage = message
    },
    setClinicalCases(state, clinicalCases) {
      state.clinicalCases = clinicalCases
    }
  },
  actions: {
    fetchTableData({ commit }) {
      commit('setLoading', true)
      setTimeout(() => {
        const dataFromApi = []
        commit('setTableData', dataFromApi)
        commit('setLoading', false)
      }, 1000)
    },
    async fetchClinicalCases({ commit, dispatch }) {
      commit('setLoading', true)
      dispatch('getClinicalCases')
    },
    getClinicalCases({ commit }) {
      return getClinicalCasesConsultantDoctor()
        .then((response) => {
          commit('setClinicalCases', response.data)
        })
        .catch(() => {
          toast.warning(
            'Erro ao buscar os casos clínicos de Médico Consultor',
            {
              timeout: 5000
            }
          )
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  getters: {
    getDoctor: (state) => state.doctor,
    getVouchers: (state) => state.tableData.length,
    getTableData: (state) => state.tableData,
    getTableHeader: (state) => state.tableHeader,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getErrorMessage: (state) => state.errorMessage,
    getClinicalCases: (state) => state.clinicalCases
  }
}
