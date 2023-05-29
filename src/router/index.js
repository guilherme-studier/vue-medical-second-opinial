// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// rotas
import Layout from '@/views/layout/Layout'
import Login from '@/views/login/Login'

// childrens
import Home from '@/components/home/Home'

const routes = [
  {
    path: '/',
    name: '',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: 'home'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: true
    }
  }
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
