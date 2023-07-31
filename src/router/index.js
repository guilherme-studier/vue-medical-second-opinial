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
import DesignatedVouchers from '@/features/designatedVouchers/DesignatedVouchers'
import ConsultantMedicalRegistration from '@/features/consultantMedicalRegistration/ConsultantMedicalRegistration'
import Registration from '@/features/registration/Registration'
import VoucherAdministration from '@/features/voucherAdministration/VoucherAdministration'
import VoucherAllocation from '@/features/voucherAllocation/VoucherAllocation'
import RepresentativeRegistration from '@/features/representativeRegistration/RepresentativeRegistration'

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
        path: '/designated-vouchers',
        name: 'DesignatedVouchers',
        component: DesignatedVouchers,
        meta: {
          title: 'Vouchers Designados'
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
      },
      {
        path: '/medical-registration',
        name: 'ConsultantMedicalRegistration',
        component: ConsultantMedicalRegistration,
        meta: {
          title: 'Cadastro Médico Consultor'
        }
      },
      {
        path: '/registration',
        name: 'Registration',
        component: Registration,
        meta: {
          title: 'Cadastro'
        }
      },
      {
        path: '/voucher-administration',
        name: 'VoucherAdministration',
        component: VoucherAdministration,
        meta: {
          title: 'Administração de Vouchers'
        }
      },
      {
        path: '/voucher-allocation',
        name: 'VoucherAllocation',
        component: VoucherAllocation,
        meta: {
          title: 'Atribuição de Vouchers'
        }
      },
      {
        path: '/representative-registration',
        name: 'RepresentativeRegistration',
        component: RepresentativeRegistration,
        meta: {
          title: 'Cadastro Representante'
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

// Update the document title on each navigation
router.beforeEach((to, from, next) => {
  const baseTitle = 'Ceos'

  // Check if the route has a title defined in its meta
  if (to.meta && to.meta.title) {
    document.title = `${baseTitle} | ${to.meta.title}`
  } else {
    document.title = baseTitle
  }

  next()
})

export default router
