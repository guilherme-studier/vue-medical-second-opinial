import axios from 'axios'
import * as rax from 'retry-axios'

import { deleteCookie, getAuthCookieName } from '../helpers/auth'
import { errorMessageHandler } from '../helpers/errors'
import store from '../store/index'

const contextsCache = {}
const servicesContext = require.context('!@/services', true, /\.js$/i)

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
      Authorization: () => store.getters.getAuthToken
    }
  }
})

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

const onError = (error) => {
  const endpoint = error.config.url
  const code = parseInt(error.response && error.response.status)
  const errorMessages = errorMessageHandler(error)

  if (code === 401 || (code === 403 && endpoint !== '/auth/signin')) {
    deleteCookie(getAuthCookieName())
    store.dispatch('setAuthToken', null)
    store.dispatch('setIsTokenExpired', true)
    if (endpoint !== '/auth/signin') window.location = '/login'
  }

  return Promise.reject({ ...errorMessages, ...error })
}

const onResponse = (response) => {
  if (response.status === 200) {
    store.dispatch('setRetryDelay', null)
  }

  if (
    response.status === 200 &&
    response.headers['token-expired'] &&
    JSON.parse(response.headers['token-expired']) &&
    store.getters['config/getLogged']
  ) {
    deleteCookie(getAuthCookieName())
    store.dispatch('setAuthToken', null)
    store.dispatch('setIsTokenExpired', true)
  }

  return response
}

endpoints.interceptors.response.use(onResponse, onError)

const Services = {}

Services.install = function(app) {
  Object.keys(contextsCache).forEach((key) => {
    const service = contextsCache[key].default(endpoints)
    const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')
    app.config.globalProperties[`$${name}`] = service
  })
}

export default Services
