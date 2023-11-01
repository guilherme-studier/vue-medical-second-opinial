import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import VueTheMask from 'vue-the-mask'

import App from './App.vue'
import router from './router'

import store from '@/store'

import 'vue-toastification/dist/index.css'
import '../src/assets/scss/global.scss'
import '@/plugins/toast/toast'

// const options = {
//   position: 'bottom-left',
//   timeout: 3000,
//   closeOnClick: true,
//   pauseOnFocusLoss: true,
//   pauseOnHover: true,
//   draggable: true,
//   draggablePercent: 0.6,
//   showCloseButtonOnHover: false,
//   hideProgressBar: false,
//   closeButton: 'button',
//   icon: true,
//   rtl: false
// }

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)

app.use(VueTheMask)

app.component('MetaManager', {
  render: () => null,
  mounted() {
    this.$meta().refresh() // Atualiza os metadados quando o componente é montado
  }
})

app.mount('#app')
