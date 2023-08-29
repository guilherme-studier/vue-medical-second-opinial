import iconCheckActive from '@/assets/icons/icon-check-active.svg'
import iconCheckInactive from '@/assets/icons/icon-check-inactive.svg'
import iconCloseActive from '@/assets/icons/icon-close-active.svg'
import iconCloseInactive from '@/assets/icons/icon-close-inactive.svg'
import iconTrashActive from '@/assets/icons/icon-trash-active.svg'
import iconTrashInactive from '@/assets/icons/icon-trash-inactive.svg'

export default {
  namespaced: true,
  state: () => ({
    doctor: 'Dr. Guilherme Studier',
    vouchers: 2,
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
            icon: iconCheckActive,
            handler: () => alert('Função do item 1')
          },
          {
            icon: iconCloseActive,
            handler: () => alert('Função do item 1')
          },
          {
            icon: iconTrashActive,
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
            icon: iconCheckActive,
            handler: () => alert('Função do item 1')
          },
          {
            icon: iconCloseInactive,
            handler: () => alert('Função do item 1')
          },
          {
            icon: iconTrashInactive,
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
            icon: iconCheckInactive,
            handler: () => alert('Função do item 1')
          },
          {
            icon: iconCloseActive,
            handler: () => alert('Função do item 1')
          },
          {
            icon: iconTrashInactive,
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
            icon: iconCheckActive,
            handler: () => alert('Função do item 1')
          },
          {
            icon: iconCloseActive,
            handler: () => alert('Função do item 1')
          },
          {
            icon: iconTrashActive,
            handler: () => alert('Função do item 1')
          }
        ]
      }
    ],
    loading: false,
    error: false,
    errorMessage: ''
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
    }
  },
  getters: {
    getDoctor: (state) => state.doctor,
    getVouchers: (state) => state.vouchers,
    getTableData: (state) => state.tableData,
    getTableHeader: (state) => state.tableHeader,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getErrorMessage: (state) => state.errorMessage
  }
}
