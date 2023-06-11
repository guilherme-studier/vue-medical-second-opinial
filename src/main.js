import VueTheMask from 'vue-the-mask'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Toast from 'vue-toastification'
import {
  ElButton,
  ElRadioGroup,
  ElRadio,
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn
} from 'element-plus'
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

app.component(ElRadioGroup.name, ElRadioGroup)
app.component(ElButton.name, ElButton)
app.component(ElRadio.name, ElRadio)
app.component(ElSelect.name, ElSelect)
app.component(ElOption.name, ElOption)
app.component(ElTable.name, ElTable)
app.component(ElTableColumn.name, ElTableColumn)

import Services from '@/plugins/axios'

app.use(Services)

app.component('MetaManager', {
  render: () => null,
  mounted() {
    this.$meta().refresh() // Atualiza os metadados quando o componente é montado
  }
})

app.mount('#app')
