// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// rotas
import Layout from '@/views/layout/Layout'
import Login from '@/views/login/Login'

// childrens
import Home from '@/features/home/Home'
import IndustryRegistration from '@/features/industryRegistration/IndustryRegistration'
import VoucherGenerator from '@/features/voucherGenerator/VoucherGenerator'
import ConsultantDoctorInvitation from '@/features/consultantDoctorInvitation/ConsultantDoctorInvitation'
import SystemAccessCancellation from '@/features/systemAccessCancellation/SystemAccessCancellation'

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
          title: 'Início'
        }
      },
      {
        path: '/induster',
        name: 'IndustryRegistration',
        component: IndustryRegistration,
        meta: {
          title: 'Cadastro Indústria'
        }
      },
      {
        path: '/voucher-generator',
        name: 'Voucher Generator',
        component: VoucherGenerator,
        meta: {
          title: 'Geração de Vouchers'
        }
      },
      {
        path: '/consultant-doctor',
        name: 'ConsultantDoctorInvitation',
        component: ConsultantDoctorInvitation,
        meta: {
          title: 'Geração de Convite para Médico Consultor'
        }
      },
      {
        path: '/access-cancellation',
        name: 'SystemAccessCancellation',
        component: SystemAccessCancellation,
        meta: {
          title: 'Cancelamento de Acesso ao Sistema'
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
