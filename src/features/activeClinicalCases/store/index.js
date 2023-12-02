import { useToast } from 'vue-toastification'

import {
  saveVoucher,
  activeVoucher,
  getVoucher,
  getUrl,
  getFileDownload,
  postUrl
} from '../services/index'

import router from '@/router'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    voucher: {},
    loading: null,
    file: null
  }),
  mutations: {
    setLoading(state, value) {
      state.loading = value
    },
    setVoucher(state, voucher) {
      state.voucher = voucher
    },
    setFile(state, file) {
      state.file = file
    }
  },
  actions: {
    async saveEditVoucher({ commit }, userData) {
      commit('setLoading', true)
      return saveVoucher(userData.data, userData.voucherId)
        .then(() => {
          return toast.success('Caso clínico salvo com sucesso', {
            timeout: 8000
          })
        })
        .catch(() => {
          toast.warning('Não foi possível salvar este caso clínico', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async activeVoucher({ commit }, userData) {
      commit('setLoading', true)
      return activeVoucher(userData.data, userData.voucherId)
        .then(() => {
          toast.success('Caso clínico ativado com sucesso', {
            timeout: 8000
          })
          return router.push('/clinical-cases-evaluation')
        })
        .catch(() => {
          toast.warning('Não foi possível ativar este caso clínico', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fetchVoucher({ commit, dispatch }, voucherId) {
      commit('setLoading', true)
      return getVoucher(voucherId)
        .then((response) => {
          commit('setVoucher', response.data)
          dispatch('fetchFile', voucherId)
        })
        .catch(() => {
          toast.warning('Não foi possível localizar dados do voucher', {
            timeout: 8000
          })
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fechVoucherDownload({ commit }, fileData) {
      commit('setLoading', true)
      try {
        const response = await getFileDownload(fileData.id)

        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: 'image/png' })
        )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileData.name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success('Download realizado com sucesso', { timeout: 8000 })
      } catch (error) {
        toast.warning('Não foi possível realizar o download do arquivo', {
          timeout: 8000
        })
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchFile({ commit }, voucherId) {
      return getUrl(voucherId)
        .then((response) => {
          commit('setFile', response.data)
        })
        .catch(() => {
          toast.warning(
            'Não foi possível carregar os arquivos relacionados ao voucher',
            {
              timeout: 8000
            }
          )
        })
    },
    // eslint-disable-next-line no-unused-vars
    async postFile({ commit }, data) {
      const formData = new FormData()
      formData.append('body', data.file)

      return postUrl(data.file, data.voucherId)
        .then(() => {
          toast.success('Upload realizado com sucesso', {
            timeout: 8000
          })
        })
        .catch(() => {
          toast.warning(
            'Não foi possível carregar os arquivos relacionados ao voucher',
            {
              timeout: 8000
            }
          )
        })
    }
  },
  getters: {
    getLoading: (state) => state.loading,
    getVoucherInfos: (state) => state.voucher,
    getFile: (state) => state.file
  }
}
