import store from '@/store'

const isRegistred = () => store?.getters['user/isRegistred']

export const all = [
  {
    id: 1,
    name: 'Início',
    route: '/'
  },
  // {
  //   id: 2,
  //   name: 'Cadastro Indústria',
  //   route: '/induster'
  // },
  {
    id: 3,
    name: 'Registro de Contrato e Geração de Casos Clínicos',
    route: '/registration-clinical-cases'
  },
  {
    id: 4,
    name: 'Consulta Contratos Casos Clínicos',
    route: '/consultation-clinical-contracts'
  },
  {
    id: 5,
    name: 'Geração de Convite para Médico Consultor',
    route: '/consultant-doctor'
  },
  {
    id: 6,
    name: 'Gestão de Representantes da Indústria',
    route: '/industry-representant-management'
  },
  {
    id: 7,
    name: isRegistred ? 'Atualização de Dados Cadastrais' : 'Cadastro',
    route: '/medical-registration'
  },
  {
    id: 8,
    name: 'Cadastro',
    route: '/registration'
  },
  {
    id: 8,
    name: 'Administração de Casos Clínicos Designados',
    route: '/adm-clinical-cases'
  },
  {
    id: 9,
    name: 'Atribuição de Casos Clínicos',
    route: '/allocation-clinical-cases'
  },
  {
    id: 10,
    name: isRegistred ? 'Atualização de Dados Cadastrais' : 'Cadastro',
    route: '/representative-registration'
  },
  {
    id: 11,
    name: 'Casos Clínicos Designados',
    route: '/clinical-cases-evaluation'
  },
  {
    id: 16,
    name: 'Ativação de Caso Clínico',
    route: '/active-clinical-case'
  },
  {
    id: 12,
    name: 'Gestão de Especialidades',
    route: '/specialties'
  },
  {
    id: 13,
    name: 'Gestão de Doenças',
    route: '/illnesses'
  },
  // Casos clínicos designados - Representante Indústria
  {
    id: 14,
    name: 'Casos Clínicos Designados',
    route: '/clinical-cases-industry'
  },
  {
    id: 17,
    name: 'Gestão de Patrocinadores',
    route: '/industries'
  }
  // {
  //   id: 18,
  //   name: 'Registro de Pessoas Autorizadas a Distribuir Casos Clínicos',
  //   route: '/authorized-distribute-clinical-cases'
  // }
]

export const routes = {
  admin: [
    {
      id: 1,
      name: 'Início',
      route: '/'
    },
    // {
    //   id: 2,
    //   name: 'Cadastro Indústria',
    //   route: '/induster'
    // },
    {
      id: 3,
      name: 'Registro de Contrato e Geração de Casos Clínicos',
      route: '/registration-clinical-cases'
    },
    // {
    //   id: 18,
    //   name: 'Registro de Pessoas Autorizadas a Distribuir Casos Clínicos',
    //   route: '/authorized-distribute-clinical-cases'
    // },
    {
      id: 4,
      name: 'Consulta Contratos Casos Clínicos',
      route: '/consultation-clinical-contracts'
    },
    {
      id: 5,
      name: 'Geração de Convite para Médico Consultor',
      route: '/consultant-doctor'
    },
    {
      id: 6,
      name: 'Gestão de Representantes da Indústria',
      route: '/industry-representant-management'
    },
    {
      id: 12,
      name: 'Gestão Especialidades',
      route: '/specialties'
    },
    {
      id: 17,
      name: 'Gestão de Patrocinadores',
      route: '/industries'
    },
    {
      id: 13,
      name: 'Gestão de Doenças',
      route: '/illnesses'
    },
    {
      id: 19,
      name: 'Contrato de Casos Clínicos',
      route: '/contract-clinical-case'
    },
    {
      id: 20,
      name: 'Consulta Casos Clínicos',
      route: '/clinical-case-consultation'
    }
  ],
  partner: [
    {
      id: 1,
      name: 'Início',
      route: '/'
    },
    // {
    //   id: 2,
    //   name: 'Cadastro Indústria',
    //   route: '/induster'
    // },
    {
      id: 3,
      name: 'Registro de Contrato e Geração de Casos Clínicos',
      route: '/registration-clinical-cases'
    },
    // {
    //   id: 18,
    //   name: 'Registro de Pessoas Autorizadas a Distribuir Casos Clínicos',
    //   route: '/authorized-distribute-clinical-cases'
    // },
    {
      id: 4,
      name: 'Consulta Contratos Casos Clínicos',
      route: '/consultation-clinical-contracts'
    },
    {
      id: 5,
      name: 'Geração de Convite para Médico Consultor',
      route: '/consultant-doctor'
    },
    {
      id: 6,
      name: 'Gestão de Representantes da Indústria',
      route: '/industry-representant-management'
    },
    {
      id: 12,
      name: 'Gestão Especialidades',
      route: '/specialties'
    },
    {
      id: 17,
      name: 'Gestão de Patrocinadores',
      route: '/industries'
    },
    {
      id: 13,
      name: 'Gestão de Doenças',
      route: '/illnesses'
    },
    {
      id: 19,
      name: 'Contrato de Casos Clínicos',
      route: '/contract-clinical-case'
    },
    {
      id: 20,
      name: 'Consulta Casos Clínicos',
      route: '/clinical-case-consultation'
    }
  ],
  consultantdoctor: [
    {
      id: 1,
      name: 'Início',
      route: '/'
    },
    {
      id: 7,
      name: isRegistred ? 'Atualização de Dados Cadastrais' : 'Cadastro',
      route: '/medical-registration'
    },
    {
      id: 8,
      name: 'Administração de Casos Clínicos Designados',
      route: '/adm-clinical-cases'
    },
    {
      id: 15,
      name: 'Avaliação de Casos Clínicos Designados',
      route: '/clinical-cases-consultation-doctor'
    },
    {
      id: 16,
      name: 'Ativação de Caso Clínico',
      route: '/active-clinical-case'
    }
  ],
  clientdoctor: [
    {
      id: 1,
      name: 'Início',
      route: '/'
    },
    {
      id: 8,
      name: isRegistred ? 'Atualização de Dados Cadastrais' : 'Cadastro',
      route: '/registration'
    },
    {
      id: 11,
      name: 'Casos Clínicos Designados',
      route: '/clinical-cases-evaluation'
    },
    {
      id: 16,
      name: 'Ativação de Caso Clínico',
      route: '/active-clinical-case'
    }
  ],
  agent: [
    {
      id: 1,
      name: 'Início',
      route: '/'
    },
    {
      id: 10,
      name: isRegistred ? 'Atualização de Dados Cadastrais' : 'Cadastro',
      route: '/representative-registration'
    },
    {
      id: 9,
      name: 'Atribuição de Casos Clínicos',
      route: '/allocation-clinical-cases'
    }
    // {
    //   id: 20,
    //   name: 'Consulta Casos Clínicos',
    //   route: '/clinical-case-consultation'
    // }
  ]
}
