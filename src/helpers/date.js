/**
 * Formata uma data de acordo com a string passada
 * @param {Date} date Date obj da data a ser formatada
 * @returns {String}
 */

export const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
