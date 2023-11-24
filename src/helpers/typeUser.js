/**
 * Formata o type user de acordo com a string passada
 * @returns {String}
 */

export const formatTypeUser = (user) => {
  switch (user) {
    case 'client_doctor':
      return 'Médico Solicitante'
    case 'consultant_doctor':
      return 'Médico Consultor'
    case 'admin':
      return 'Administrador CEOS'
    case 'agent':
      return 'Representante da Indústria'
  }
}
