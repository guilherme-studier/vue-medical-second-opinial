import { faFile, faComment } from '@fortawesome/free-solid-svg-icons'

import store from '@/store'

export default {
  namespaced: true,
  state: () => ({
    icon: require('@/assets/icons/icon-voucher.svg'),
    iconSearch: require('@/assets/icons/icon-search.svg'),
    doctor: 'Dr. Guilherme Studier',
    vouchers: 4,
    tableHeader: ['Casos clínicos', 'id', 'Doença', 'Médico', 'Ação'],
    tableData: [
      {
        name: 'Tratamento Doença XYZ',
        id: '002',
        illness: 'Doença 1',
        doctor: 'Olavo Pereira',
        action: [
          {
            icon: faFile,
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: faComment,
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalMessage',
                '23011014002'
              )
            }
          }
        ]
      },
      {
        name: 'Tratamento Doença ABC',
        id: '003',
        illness: 'Doença 3',
        doctor: 'Emilia Souza',
        action: [
          {
            icon: faFile,
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: faComment,
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalMessage',
                '23011014002'
              )
            }
          }
        ]
      },
      {
        name: 'Tratamento Enfermidade DBC',
        id: '005',
        illness: 'Doença 3',
        doctor: 'Eduardo Pereira',
        action: [
          {
            icon: faFile,
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: faComment,
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalMessage',
                '23011014002'
              )
            }
          }
        ]
      },
      {
        name: 'Tratamento Enfermidade XYZ',
        id: '001',
        illness: 'Doença 4',
        doctor: 'Fernando Moura',
        action: [
          {
            icon: faFile,
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalSeem',
                '23011014002'
              )
            }
          },
          {
            icon: faComment,
            handler: () => {
              store.dispatch(
                'clinicalCasesConsultationDoctor/handleModalMessage',
                '23011014002'
              )
            }
          }
        ]
      }
    ],
    isModalSeem: false,
    isModalMessage: false,
    modalSeemContent: {
      voucher: '30082023',
      seem: null
    },
    modalMessageContent: {
      voucher: '30082023',
      messages: [
        {
          id: '52',
          name: 'Dra. Cristina Flores',
          date: '01/02/2023 14:15',
          message:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {
          id: '53',
          name: 'Médico Cliente',
          date: '01/02/2023 14:15',
          message:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          id: '52',
          name: 'Dra. Cristina Flores',
          date: '01/02/2023 14:15',
          message:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }
        // Outras mensagens aqui
      ]
    },
    searchTerm: '',
    loading: false,
    error: false
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
    }
  },
  getters: {
    getIcon: (state) => state.icon,
    getVouchers: (state) => state.vouchers,
    getIsModalSeem: (state) => state.isModalSeem,
    getIsModalMessage: (state) => state.isModalMessage,
    getModalSeemContent: (state) => state.modalSeemContent,
    getModalMessageContent: (state) => state.modalMessageContent,
    getActiveClinicalCase: (state) => state.getActiveClinicalCase,
    getIconSearch: (state) => state.iconSearch,
    getDoctor: (state) => state.doctor,
    getTableHeader: (state) => state.tableHeader,
    getTableData: (state) => state.tableData,
    getSearchTerm: (state) => state.searchTerm,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getFilteredTableData: (state) => {
      if (!state.searchTerm) {
        return state.tableData
      }

      const searchTerm = state.searchTerm.toLowerCase()
      return state.tableData.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm)
          }
          return false
        })
      })
    }
  },
  actions: {
    handleModalSeem(context, voucher) {
      context.commit('toggleIsModalSeem', voucher)
    },
    handleModalMessage(context, voucher) {
      context.commit('toggleIsModalMessage', voucher)
    },
    handleSeem(context, text) {
      alert(text)
    },
    handleMessage(content, text) {
      alert(text)
    }
  }
}
