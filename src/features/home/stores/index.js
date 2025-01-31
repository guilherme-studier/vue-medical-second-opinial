export default {
  namespaced: true,
  state: () => ({
    doctorName: 'Dr. Guilherme Studier',
    dataBoxes: [
      { title: 'Indústrias Cadastradas', quantity: '2' },
      { title: 'Vouchers aguardando ativação', quantity: '3' },
      { title: 'Vouchers designados', quantity: '4' }
    ],
    loading: false,
    error: false
  }),
  actions: {
    // em desenvolvimento
  },
  getters: {
    getDoctorName: (state) => state.doctorName,
    getDataBoxes: (state) => state.dataBoxes,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  }
}
