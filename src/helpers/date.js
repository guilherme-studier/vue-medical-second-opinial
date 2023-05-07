/**
 * Formata uma data de acordo com a string passada
 * @param {Date} date Date obj da data a ser formatada
 * @returns {String}
 */
export const formatDate = (date = 'dd/MM/yyyy') => {
  const dArr = date.split('-')
  return dArr[2] + '/' + dArr[1] + '/' + dArr[0]
}
