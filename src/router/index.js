// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Importe seus componentes de rota aqui
//import Login from '@/views/Login'
//import Admin from '@/views/Admin'

const routes = [
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,
  //   meta: {
  //     requiresNotAuth: true
  //   }
  // },
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: Admin,
  //   meta: {
  //     requiresAuth: true
  //   }
  // }
  // Outras rotas aqui
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_PATH),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

export default router
