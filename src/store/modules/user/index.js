/* eslint-disable no-unused-vars */
import { useToast } from 'vue-toastification'

import { getUserById } from '../../../services/user/index'

const toast = useToast()

export default {
  namespaced: true,
  state: () => ({
    id: null,
    hashid: null,
    type: null,
    username: null,
    email: null,
    name: null,
    password: null,
    term: null,
    cpf: null,
    phone: null,
    crm: null,
    // eslint-disable-next-line camelcase
    uf_crm: null,
    cep: null,
    street: null,
    number: null,
    complement: null,
    city: null,
    state: null,
    cnpj: null,
    // eslint-disable-next-line camelcase
    corporate_name: null,
    category: null,
    specialty: null
  }),
  mutations: {
    userData(state, data) {
      state.id = data.id
      state.hashid = data.hashid
      state.type = data.type
      state.username = data.username
      state.email = data.email
      state.name = data.name
      state.password = data.password
      state.term = data.term
      state.cpf = data.cpf
      state.phone = data.phone
      state.crm = data.crm
      // eslint-disable-next-line camelcase
      state.uf_crm = data.uf_crm
      state.cep = data.cep
      state.street = data.street
      state.number = data.number
      state.complement = data.complement
      state.city = data.city
      state.state = data.state
      state.cnpj = data.cnpj
      // eslint-disable-next-line camelcase
      state.corporate_name = data.corporate_name
      state.category = data.category
      state.specialty = data.specialty
    }
  },
  actions: {
    async getUser({ commit }) {
      return getUserById()
        .then((response) => {
          commit('userData', response.data)
          localStorage.setItem('user', JSON.stringify(response.data))

          return response.data
        })
        .catch((error) => {
          toast.warning('Não foi possível carregar as informações do usuário', {
            timeout: 5000
          })
        })
    }
  },
  getters: {
    getId: (state) => state.id,
    getHashId: (state) => state.hashid,
    getType: (state) => state.type,
    getUsername: (state) => state.username,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getPassword: (state) => state.password,
    getTerm: (state) => state.term,
    getCpf: (state) => state.cpf,
    getPhone: (state) => state.phone,
    getCrm: (state) => state.crm,
    getUfCrm: (state) => state.uf_crm,
    getCep: (state) => state.cep,
    getStreet: (state) => state.street,
    getNumber: (state) => state.number,
    getComplement: (state) => state.complement,
    getCity: (state) => state.city,
    getState: (state) => state.state,
    getCnpj: (state) => state.cnpj,
    getCorporateName: (state) => state.corporate_name,
    getCategory: (state) => state.category,
    getSpecialty: (state) => state.specialty
  }
}
