/**
 * Formata o status de acordo com a string passada
 * @returns {String}
 */

export const formatStatus = (status) => {
  switch (status) {
    case 'disp':
      return 'Disponível'
    case 'aloc':
      return 'Alocado'
    case 'aval':
      return 'Avaliado'
  }
}
