//router
import { createRouter, createWebHistory } from 'vue-router'

// childrens
import ActiveClinicalCases from '@/features/activeClinicalCases'
import AdmClinicalCases from '@/features/admClinicalCases'
import AllocationClinicalCases from '@/features/allocationClinicalCases'
import AuthorizedDistributeClinicalCases from '@/features/authorizedDistributeClinicalCases'
import ClinicalCasesConsultationDoctor from '@/features/clinicalCasesConsultationDoctor'
import ClinicalCasesEvaluation from '@/features/clinicalCasesEvaluation'
import ClinicalCasesIndustry from '@/features/clinicalCasesIndustry'
import ConsultantDoctorInvitation from '@/features/consultantDoctorInvitation'
import ConsultantMedicalRegistration from '@/features/consultantMedicalRegistration'
import ConsultationClinicalCases from '@/features/consultationClinicalCases'
import Home from '@/features/home/index.vue'
import Illnesses from '@/features/illnesses'
import Industries from '@/features/industries'
import IndustryRegistration from '@/features/industryRegistration'
// rotas
import Login from '@/features/login'
import Registration from '@/features/registration'
import RegistrationClinicalCases from '@/features/registrationClinicalCases'
import RepresentativeRegistration from '@/features/representativeRegistration'
import Specialties from '@/features/specialties'
import SystemAccessCancellation from '@/features/systemAccessCancellation'
import Tests from '@/features/test/index.vue'
import store from '@/store'
import Layout from '@/views/layout'

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
          title: 'Cancelamento de Acesso ao Sistema por Representante da Indústria'
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
        name: 'clinicalCasesEvaluation',
        component: ClinicalCasesEvaluation,
        meta: {
          title: 'Casos Clínicos Designados'
        }
      },
      {
        path: '/clinical-cases-industry',
        name: 'clinicalCasesIndustry',
        component: ClinicalCasesIndustry,
        meta: {
          title: 'Casos Clínicos Designados'
        }
      },
      {
        path: '/clinical-cases-consultation-doctor',
        name: 'clinicalCasesConsultationDoctor',
        component: ClinicalCasesConsultationDoctor,
        meta: {
          title: 'Casos Clínicos Designados'
        }
      },
      {
        path: '/active-clinical-case',
        name: 'activeClinicalCase',
        component: ActiveClinicalCases,
        meta: {
          title: 'Ativação de Caso Clínico'
        }
      },
      {
        path: '/specialties',
        name: 'Specialties',
        component: Specialties,
        meta: {
          title: 'Gestão de Especialidades'
        }
      },
      {
        path: '/illnesses',
        name: 'Illnesses',
        component: Illnesses,
        meta: {
          title: 'Gestão de Doenças'
        }
      },
      {
        path: '/industries',
        name: 'Industries',
        component: Industries,
        meta: {
          title: 'Gestão de Indústrias'
        }
      },
      {
        path: '/authorized-distribute-clinical-cases',
        name: 'AuthorizedDistributeClinicalCases',
        component: AuthorizedDistributeClinicalCases,
        meta: {
          title: 'Registro de Pessoas Autorizadas a Distribuir Casos Clínicos'
        }
      }
    ],
    beforeEnter: (to, from, next) => {
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
