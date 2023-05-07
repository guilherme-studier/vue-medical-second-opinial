import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
  position: 'bottom-left',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

Vue.use(Toast, options)

import Services from '@/plugins/axios'

import '@/assets/scss/global.scss'

Vue.use(Services)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
