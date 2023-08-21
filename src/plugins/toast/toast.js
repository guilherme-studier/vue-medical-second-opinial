import { createApp } from 'vue'
import App from '@/App'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './toastification.css'

const app = createApp(App)

const options = {
  position: 'bottom-right',
  timeout: false,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  closeButton: false,
  hideProgressBar: false,
  icon: 'icon-toast-warning',
  transition: 'Vue-Toastification__fade',
  maxToasts: 5,
  newestOnTop: true
}

app.use(Toast, options)
