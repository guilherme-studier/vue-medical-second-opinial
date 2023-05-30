import VueTheMask from 'vue-the-mask'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '../src/assets/scss/global.scss'

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

const app = createApp(App)

app.use(router)
app.use(store)

app.use(VueTheMask)
app.use(Toast, options)

import Services from '@/plugins/axios'

app.use(Services)

app.component('MetaManager', {
  render: () => null,
  mounted() {
    this.$meta().refresh() // Atualiza os metadados quando o componente é montado
  }
})

app.mount('#app')
