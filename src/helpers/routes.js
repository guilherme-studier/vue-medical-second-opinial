export const all = [
  {
    id: 1,
    name: 'Início',
    route: '/'
  },
  {
    id: 2,
    name: 'Cadastro Indústria',
    route: '/induster'
  },
  {
    id: 3,
    name: 'Registro de Contrato e Geração de Casos Clínicos',
    route: '/registration-clinical-cases'
  },
  {
    id: 4,
    name: 'Consulta Casos Clínicos',
    route: '/cosultation-clinical-cases'
  },
  {
    id: 5,
    name: 'Geração de Convite para Médico Consultor',
    route: '/consultant-doctor'
  },
  {
    id: 6,
    name: 'Cancelamento de Acesso ao Sistema',
    route: '/access-cancellation'
  },
  {
    id: 7,
    name: 'Cadastro Médico Consultor',
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
    name: 'Cadastro Representante',
    route: '/representative-registration'
  },
  {
    id: 11,
    name: 'Casos Clínicos Designados',
    route: '/clinical-cases-evaluation'
  },
  {
    id: 14,
    name: 'Ativação de Caso Clínico',
    route: '/active-clinical-case'
  },
  {
    id: 12,
    name: 'Especialidades',
    route: '/specialties'
  },
  {
    id: 13,
    name: 'Doenças',
    route: '/illnesses'
  }
]

export const routes = {
  admin: [
    {
      id: 1,
      name: 'Início',
      route: '/'
    },
    {
      id: 2,
      name: 'Cadastro Indústria',
      route: '/induster'
    },
    {
      id: 3,
      name: 'Registro de Contrato e Geração de Casos Clínicos',
      route: '/registration-clinical-cases'
    },
    {
      id: 4,
      name: 'Consulta Casos Clínicos',
      route: '/cosultation-clinical-cases'
    },
    {
      id: 5,
      name: 'Geração de Convite para Médico Consultor',
      route: '/consultant-doctor'
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
      name: 'Cadastro Médico Consultor',
      route: '/medical-registration'
    },
    {
      id: 8,
      name: 'Administração de Casos Clínicos Designados',
      route: '/adm-clinical-cases'
    },
    {
      id: 11,
      name: 'Casos Clínicos Designados',
      route: '/clinical-cases-evaluation'
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
      name: 'Cadastro',
      route: '/registration'
    },
    {
      id: 11,
      name: 'Casos Clínicos Designados',
      route: '/clinical-cases-evaluation'
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
      name: 'Cadastro Representante',
      route: '/representative-registration'
    },
    {
      id: 9,
      name: 'Atribuição de Casos Clínicos',
      route: '/allocation-clinical-cases'
    },
    {
      id: 11,
      name: 'Casos Clínicos Designados',
      route: '/clinical-cases-evaluation'
    }
  ]
}
