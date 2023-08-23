// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// store
import store from '@/store'

// rotas
import Layout from '@/views/layout'
import Login from '@/views/login'

// childrens
import Tests from '@/features/test/index.vue'
import Home from '@/features/home/index.vue'
import IndustryRegistration from '@/features/industryRegistration'
import RegistrationClinicalCases from '@/features/registrationClinicalCases'
import ConsultantDoctorInvitation from '@/features/consultantDoctorInvitation'
import SystemAccessCancellation from '@/features/systemAccessCancellation'
import ConsultationClinicalCases from '@/features/consultationClinicalCases'
import ConsultantMedicalRegistration from '@/features/consultantMedicalRegistration'
import Registration from '@/features/registration'
import AdmClinicalCases from '@/features/admClinicalCases'
import AllocationClinicalCases from '@/features/allocationClinicalCases'
import RepresentativeRegistration from '@/features/representativeRegistration'
import ClinicalCasesEvaluation from '@/features/clinicalCasesEvaluation'
import Specialties from '@/features/specialties'
import Illnesses from '@/features/illnesses'

const routes = [
  {
    path: '/',
    name: '',
    component: Layout,
    children: [
      {
        path: '/teste-de-apis',
        name: 'Testes',
        component: Tests,
        meta: {
          title: 'Testes de apis'
        }
      },
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
        path: '/registration-clinical-cases',
        name: 'Registro de Contrato e Geração de Casos Clínicos',
        component: RegistrationClinicalCases,
        meta: {
          title: 'Registro de Contrato e Geração de Casos Clínicos'
        }
      },
      {
        path: '/cosultation-clinical-cases',
        name: 'ConsultationClinicalCases',
        component: ConsultationClinicalCases,
        meta: {
          title: 'Consulta Casos Clínicos'
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
        path: '/adm-clinical-cases',
        name: 'AdmClinicalCases',
        component: AdmClinicalCases,
        meta: {
          title: 'Administração de Casos Clínicos Designados'
        }
      },
      {
        path: '/allocation-clinical-cases',
        name: 'AllocationClinicalCases',
        component: AllocationClinicalCases,
        meta: {
          title: 'Atribuição de Casos Clínicos'
        }
      },
      {
        path: '/representative-registration',
        name: 'RepresentativeRegistration',
        component: RepresentativeRegistration,
        meta: {
          title: 'Cadastro Representante'
        }
      },
      {
        path: '/clinical-cases-evaluation',
        name: 'VouchersEvaluation',
        component: ClinicalCasesEvaluation,
        meta: {
          title: 'Casos Clínicos Designados'
        }
      },
      {
        path: '/specialties',
        name: 'Specialties',
        component: Specialties,
        meta: {
          title: 'Especialidades'
        }
      },
      {
        path: '/illnesses',
        name: 'Illnesses',
        component: Illnesses,
        meta: {
          title: 'Doenças'
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      console.log(store.getters)
      if (!store.getters.isLoggedIn) next('/login')
      else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next('/')
      } else {
        next()
      }
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

  if (to.meta && to.meta.title) {
    document.title = `${baseTitle} | ${to.meta.title}`
  } else {
    document.title = baseTitle
  }

  next()
})

export default router
