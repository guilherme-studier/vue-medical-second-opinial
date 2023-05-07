/**
 * Configura o axios, faz uma injeção de dependencia no Vue
 * e exporta como um plugin para ser usado globalmente
 */

import axios from 'axios'
import * as rax from 'retry-axios'
import store from '../store/index'
import { deleteCookie, getAuthCookieName } from '../helpers/auth'
import { errorMessageHandler } from '../helpers/errors'

const contextsCache = {}
const servicesContext = require.context(
  '!@/services' /** procura no diretório */,
  true /** busca em subdiretórios */,
  /\.js$/i /** somento arquivos .js */
)

function importAll(contextsArray) {
  contextsArray
    .keys()
    .forEach((key) => (contextsCache[key] = contextsArray(key)))
}

importAll(servicesContext)

const endpoints = axios.create({
  baseURL: process.env.VUE_APP_URI,
  timeout: 30000,
  withCredentials: true,
  xsrfHeaderName: 'X-CSRF-TOKEN',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      Authorization: `${store.getters.getAuthToken}`
    }
  }
})

/**
 * Adiciona o retry ao instâcia do axios
 * @see https://github.com/JustinBeckwith/retry-axios
 */
endpoints.defaults.raxConfig = {
  instance: endpoints,
  retry: 10,
  noResponseRetries: 10,
  statusCodesToRetry: [
    [100, 199],
    [429, 429],
    [500, 599]
  ],
  onRetryAttempt: (err) => {
    const cfg = rax.getConfig(err)
    store.dispatch(
      'setRetryDelay',
      ((Math.pow(2, cfg.currentRetryAttempt) - 1) / 2) * 1000
    )
  }
}
rax.attach(endpoints)

/** Métodos customizados */
const onError = (error) => {
  const endpoint = error.config.url
  const code = parseInt(error.response && error.response.status)
  const errorMessages = errorMessageHandler(error)

  /** Se não foi autorizado porque o token expirou */
  if (code === 401 || (code === 403 && endpoint !== '/auth/signin')) {
    /** Exclui o cookie */
    deleteCookie(getAuthCookieName())

    /** Limpa o token da store */
    store.dispatch('setAuthToken', null)

    /** Seta a flag de token expirado */
    store.dispatch('setIsTokenExpired', true)

    /** Redirecionar para a tela de login */
    if (endpoint !== '/auth/signin') window.location = '/login'
  }

  return Promise.reject({ ...errorMessages, ...error })
}

const onResponse = (response) => {
  /** Remove a mensagem de retry se existir */
  if (response.status === 200) {
    store.dispatch('setRetryDelay', null)
  }

  /** se o token expirou e está logado */
  if (
    response.status === 200 &&
    response.headers['token-expired'] &&
    JSON.parse(response.headers['token-expired']) &&
    store.getters['config/getLogged']
  ) {
    /** Exclui o cookie */
    deleteCookie(getAuthCookieName())

    /** Limpa o token da store */
    store.dispatch('setAuthToken', null)

    /** Seta a flag de token expirado */
    store.dispatch('setIsTokenExpired', true)
  }

  return response
}

/** Adiciona um interceptador na resposta */
endpoints.interceptors.response.use(onResponse, onError)

const Services = {}

Services.install = function(Vue) {
  Object.keys(contextsCache).forEach((key) => {
    const service = contextsCache[key].default(endpoints)
    /** extrai o nome do serviço, usa o mesmo nome do arquivo .js */
    const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')

    Vue.prototype[`$${name}`] = service
  })
}

export default Services
